import {
	PayPalScriptProvider,
	PayPalButtons,
	usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useState, useEffect } from "react";
import {WINFLIX_URL} from '../config'

export default function PayPalButton({ infos, abo, type, onComplete }) {

  const [mailExist, setMailExist] = useState(null)
  const [load, setLoad] = useState(false)
  const [planId, setPlanId] = useState("P-69X9580931207742TMQ2V7AY")
  const [dataProduct, setDataProduct] = useState({
    id_produit: 3512,
    prix: "0.00",
    period: "week",
    nextp: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().slice(0, 19).replace("T", " ")
  })

  const checkmail = async () => {
    setLoad(false)
    const fetcher = await fetch(`${WINFLIX_URL}/api/user/checkmail/?mail=${infos.email}`)
    const json = await fetcher.json()
    setMailExist(json)
    setLoad(true)
  }

  useEffect(() => {
    checkmail();
  }, [infos.email]);

  useEffect(() => {
    setPlanId(prev => {
        if(abo == "hebdo"){
            return "P-69X9580931207742TMQ2V7AY";
        }
        if(abo == "mensuel"){
            return "P-3KF6921176975554EMQ2V6SY";
        }
        if(abo == "annuel"){
            return "P-792129114Y0379546MQ2V5SI";
        }
    })
  }, [abo])

  useEffect(() => {
    setDataProduct(prev => {
      if(abo == "hebdo"){
        return {
          id_produit: 3512,
          prix: "0.00",
          period: "week",
          nextp: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().slice(0, 19).replace("T", " ")
        }
      }
      if(abo == "mensuel"){
        return {
          id_produit: 3513,
          prix: "14.90",
          period: "month",
          nextp: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().slice(0, 19).replace("T", " ")
        }
      }
      if(abo == "annuel"){
        return {
          id_produit: 3520,
          prix: "89.90",
          period: "year",
          nextp: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().slice(0, 19).replace("T", " ")

        }
      }
    })
  }, [abo])


  const [isPaid, setIsPaid] = useState(false);

  const createSubscription = (data, actions) => {
    return actions.subscription
      .create({
        plan_id: planId,
      })
      .then((orderId) => {
        // Your code here after create the order
        return orderId;
      });
  }


  const onApprove = async (data, actions) => {

    const subscriptionId = data.subscriptionID;

    setIsPaid(true);

    // Récupérer le token de carte via `data.card`
    const cardToken = data.card?.token;

    // Créer un nouvel utilisateur dans WooCommerce
    const newUser = await createUser(
      infos.firstName,
      infos.lastName,
      infos.email,
      infos.password,
      infos.country,
      infos.phone
    );

    const parentOrder = await createParentOrder(
      newUser.id,
      infos.firstName,
      infos.lastName,
      infos.email,
      dataProduct.id_produit,
      dataProduct.prix,
      infos.country
    );

    await console.log("parent_id", parentOrder)
    const parentOrderId = await parentOrder.id

    // Envoyer le token de carte et l'ID de l'utilisateur à WooCommerce pour l'abonnement
    const subscription = await createSubscriptionWoo(
      newUser.id,
      subscriptionId,
      infos.firstName,
      infos.lastName,
      infos.email,
      parentOrderId,
      dataProduct.id_produit,
      dataProduct.prix,
      dataProduct.period,
      dataProduct.nextp,
      infos.country
    );

    onComplete(true)
  };

  const createUser = async (firstName, lastName, email, passWord, country, phone) => {
    const response = await fetch(
      "https://wpen.winflix.net/wp-json/wc/v3/customers",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            btoa(
              "ck_628e45ef5edc3afe37e684d5e0150e224d959c66:cs_b8db749eb7437258f1884a84949628acb78869be"
            ),
        },
        body: JSON.stringify({
          email: email,
          first_name: firstName,
          last_name: lastName,
          password: passWord,
          country: country,
          phone: phone
        }),
      }
    );

    const newUser = await response.json();
    return newUser;
  };

  const createParentOrder = async (
    customerId,
    firstName,
    lastName,
    email,
    idProduit,
    prix,
    country
  ) => {
    await console.log(customerId, firstName, lastName, email, idProduit, prix)
    const response = await fetch(
      "https://wpen.winflix.net/wp-json/wc/v3/orders/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            btoa(
              "ck_628e45ef5edc3afe37e684d5e0150e224d959c66:cs_b8db749eb7437258f1884a84949628acb78869be"
            ),
        },
        body: JSON.stringify({
          payment_method: "paypal",
          payment_method_title: "PayPal",
          set_paid: true,
          customer_id: customerId,
          billing: {
            first_name: firstName,
            last_name: lastName,
            email: email,
            address_1: "",
            city: "",
            state: "",
            postcode: "",
            country: country
          },
          line_items: [
            {
              product_id: idProduit,
              quantity: 1,
              total: prix
            }
          ]          
        }),
      }
    );

    const parentOrder = await response.json();
    return parentOrder;
  };

  const createSubscriptionWoo = async (
    customerId,
    subscriptionId,
    firstName,
    lastName,
    email,
    parentId,
    idProduit, 
    prix,
    period,
    nextp,
    country
  ) => {
    const response = await fetch('https://wpen.winflix.net/wp-json/wc/v3/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('ck_628e45ef5edc3afe37e684d5e0150e224d959c66:cs_b8db749eb7437258f1884a84949628acb78869be')
      },
      body: JSON.stringify({
        payment_method: 'paypal',
        payment_method_title: 'PayPal',
        set_paid: true,
        parent_id: parentId,
        product_id: idProduit,
        billing: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          address_1: '',
          city: '',
          state: '',
          postcode: '',
          country: country
        },
        billing_period: period,
        billing_interval: "1",
        next_payment_date_gmt: nextp,    
        next_payment_date: nextp,     
        line_items: [
          {
            product_id: idProduit,
            quantity: 1
          }
        ],
        customer_id: customerId,
        meta_data: [
          {
            key: '_paypal_subscription_id',
            value: subscriptionId
          },
          {
            key: '_payment_method_title',
            value: "PayPal"
          },
          {
            key: '_requires_manual_renewal',
            value: 'false'
          }
        ]
      })
    });
    
    const subscription = await response.json();
    return subscription;
  };
  

  return (
    <>
      {load && mailExist.message != "disponible" ? (
        <p>Ce mail est indisponible.</p>
      ) : (
        <PayPalScriptProvider
        options={{
          "client-id": "ATuGeg1AAW7LpwiyGR6C7cgawosn_kM0xc80_yMUi2k3KIWg-A9WLkHa27LP9U5Z9wNdDR0MM69UxZ3F",
          currency: "USD",
          intent: "subscription",
          vault: true,
        }}
      >
        <PayPalButtons createSubscription={createSubscription} onApprove={onApprove} />
        {isPaid && <p>Payment has been successful!</p>}
      </PayPalScriptProvider>
      )}   
    </>
  );
}
