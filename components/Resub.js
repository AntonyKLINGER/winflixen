import React, { useState, useEffect, useContext } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { UserContext } from '../UserContext'
import Link from 'next/link'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import {WINFLIX_URL} from '../config'
import styles from '../styles/Register.module.css'
import Script from 'next/script'
import Button from '@mui/material/Button'

export default function Resub({details}){
    const stripe = useStripe()
    const elements = useElements()

    const [complete, setComplete] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [errorf, setErrorf] = React.useState("")
    const [nextPayment, setNextPayment] = useState(null)

    useEffect(() => {
        let dateYear = new Date();
        dateYear.setFullYear(dateYear.getFullYear() + 1);
        setNextPayment(dateYear.getFullYear()+'-'+String(dateYear.getMonth()+1).padStart(2, '0')+'-'+String(dateYear.getDate()).padStart(2, '0')+' '+String(dateYear.getHours()).padStart(2, '0')+':'+String(dateYear.getMinutes()).padStart(2, '0')+':'+String(dateYear.getMinutes()).padStart(2, '0'))
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)

        const { paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
              address: {
                country: "EN"
              },
              email: details.user_email,
              name: details.firstname+" "+details.name
            },
        });

        const myCard = elements.getElement(CardElement)

        const { source } = await stripe.createSource(myCard, { owner: { email: details.user_email } })

        if(!source){
            setLoading(false)
            return;
        }

        const { data: customerCreate } = await axios.post("/en/api/stripe-customer-create", {
            email: details.user_email,
            name: details.firstname+" "+details.name,
            payment_method: paymentMethod,
            country: 'EN'
        });


        const { data: customerSource } = await axios.post("/en/api/stripe-source-attach", {
            customer: customerCreate.id,
            source: source.id
        });

        const order = await createOrder({
            email: details.user_email,
            firstName: details.firstname,
            lastName: details.name,    
            product_id: '',
            tel: '',
            country: 'EN',
            user_id: details.ID,
            customer_id: customerCreate.id,
            stripeSource: source.id  
        })

        const { data: clientSecret } = await axios.post("/en/api/stripe-payment-intent", {
            amount: 59.90*100,
            description: `Winflix EN | 100% Foot - Commande ${order.id}`
        });
        
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id
        });

        if(error){
          setErrorf("There was a mistake.")
          setLoading(false)
          return;
        }

        if(paymentIntent.status != "succeeded"){
          const statusChange = await updateOrder({
            id: order.id,
            status: 'failed'
          })
         
          setErrorf("There was an error with your card. Please try again or use a different card.")
          setLoading(false)
          return;
        }

        const subscription = await createSubscription({
            paymentMethodId: source.id,
            customer_id: details.ID,
            customerID: customerCreate.id,
            product_id: "",    
            parent_id: order.id,
            country: "EN",
            tel: "",
            interval: "year",
            price: "129.90",
            billing_period: "year",
            billing_interval: 1,
            next_payment_date: nextPayment,
            payment_method: 'stripe',
            trial_end_date: nextPayment        
          })

          // désactivation de toutes les autres sub du user
          const checksubs = await disableAllSubs({
            user: details.ID
          })

          setComplete(true)
          setLoading(false)

    }

    return (
        <div>
            {!complete ? (
                <form onSubmit={handleSubmit}>
                    <div className="flex aligncenter toColumn mmTop30">
                        <div className={`${styles.Stripe} w60 mRight20 wm100 mRnone mmBot20`}>
                        <span className={styles.method}><span className="material-icons">credit_card</span>Card payment method</span>
                        <span className={styles.conditions}>Secure payment through Stripe operator. All your card details are safe.</span>
                        <CardElement options={{ hidePostalCode: true }} />
                        </div>
                        <div className="w40 wm100">
                            <div className={`flex aligncenter ${styles.soBox} w100 mmBot10`}>
                                <div className="w60">
                                    <span className={styles.soTitle}>Exceptional annual offer !</span>
                                    <span className={styles.soRemise}>-70% over the year</span>
                                </div>
                                <div className="w30 text-right">
                                    <span className={styles.soPrices}>
                                        49.90$
                                        <span>/<del>129.90$</del></span>
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <Button onClick={handleSubmit} disabled={loading} variant="contained" sx={{ marginTop:'10px' }} disableElevation>{loading === false ? "Take advantage of the offer": "Please wait..."}</Button>
                            </div>   
                        </div>
                    </div>    
                    {errorf}    
                </form>
            ) : (
                <p><strong>Congratulations! </strong> Now you can enjoy all Winflix services unlimited for 1 year!</p>
            )}
        </div>
    )
}




const createOrder = async (orderData) => {
    try {
      const response = await axios.post('https://wpen.winflix.net/wp-json/wc/v3/orders/', {        
        payment_method: "stripe",
        payment_method_title: "Carte bancaire",
        set_paid: true,
        customer_id: orderData.user_id,
        billing: {
          first_name: orderData.firstName,
          last_name: orderData.lastName,
          address_1: '',
          city: '',
          state: '',
          postcode: '',
          country: '',
          email: orderData.email,
          phone: ''
        },
        shipping: {
          first_name: orderData.firstName,
          last_name: orderData.lastName,
          address_1: '',
          city: '',
          state: '',
          postcode: '',
          country: ''
        },
        meta_data: [
          {          
            key: "_stripe_customer_id",
            value: `${orderData.customer_id}`
          },
          {
            key: "_stripe_source_id",
            value: `${orderData.stripeSource}`
          }
        ],
        line_items: [
          {
            product_id: 3520,
            quantity: 1,
            total: "49.90"
          }
        ], 
        coupon_lines: [
          {
            code: "unsubscribe"
          }
        ]       
      }, {
        auth: {
          username: 'ck_628e45ef5edc3afe37e684d5e0150e224d959c66',
          password: 'cs_b8db749eb7437258f1884a84949628acb78869be',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
}

const updateOrder = async (datas) => {
    try{
      const reponse = await axios.put(`https://wpen.winflix.net/wp-json/wc/v3/orders/${datas.id}`, {
        status: datas.status
      },{
        auth: {
          username: 'ck_628e45ef5edc3afe37e684d5e0150e224d959c66',
          password: 'cs_b8db749eb7437258f1884a84949628acb78869be',
        },
      });
      return reponse.data
    }      
    catch (error) {
      throw error;
    }
}


const createSubscription = async (subscriptionData) => {
    try {
    const response = await axios.post('https://wpen.winflix.net/wp-json/wc/v3/subscriptions/', {
      source: subscriptionData.paymentMethodId,
      status: 'active',
      customer_id: subscriptionData.customer_id,
      product_id: 3520,
      parent_id: subscriptionData.parent_id,
      payment_method: 'stripe',
      payment_details: {
        post_meta: {
          _stripe_customer_id: `${subscriptionData.customerID}`,
          _stripe_source_id: `${subscriptionData.paymentMethodId}`
        }
      },  
      billing_period: subscriptionData.billing_period,
      billing_interval: subscriptionData.billing_interval,
      next_payment_date_gmt: subscriptionData.next_payment_date,    
      next_payment_date: subscriptionData.next_payment_date,      
      next_payment_date_gmt: JSON.stringify(subscriptionData.next_payment_date),
      line_items: [
        {
          product_id: 3520,
          quantity: 1
        }
      ]
    }, {
      auth: {
        username: 'ck_628e45ef5edc3afe37e684d5e0150e224d959c66',
        password: 'cs_b8db749eb7437258f1884a84949628acb78869be',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const disableAllSubs = async (dataUser) => {
    const fetcher = await fetch(`${WINFLIX_URL}/api/user/sub/able/?user=${dataUser.user}`)
    const json = await fetcher.json()
    return json
}