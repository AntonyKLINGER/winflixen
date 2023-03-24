import React, { useState, useEffect, useContext } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { UserContext } from '../UserContext'
import Link from 'next/link'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import {WINFLIX_URL} from '../config'
import styles from '../styles/Register.module.css'
import Script from 'next/script'

export default function Subscription(){
    const stripe = useStripe()
    const elements = useElements()

    const [productId, setProductId] = useState(3512)
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [subscription, setSubscription] = useState(null);
    const [success, setSuccess] = useState(false)
    const {user, setUser} = useContext(UserContext)
    const [paymenter, setPaymenter] = React.useState(null)
    const [order, setOrder] = React.useState(null)
    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();
    const [nextPayment, setNextPayment] = useState(null)
    const [trial, setTrial] = useState(null) 
    const [complete, setComplete] = useState(false)

    const selectProduct = (id) => {
      setProductId(id)
    }

    useEffect(() => {
      let date = new Date()
      date.setDate(date.getDate() + 3);
      let dateMonth = new Date();
      dateMonth.setMonth(dateMonth.getMonth() + 1);
      let dateYear = new Date();
      dateYear.setFullYear(dateYear.getFullYear() + 1);
      if(productId == "3512"){
        setNextPayment(date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2, '0')+'-'+String(date.getDate()).padStart(2, '0')+' '+String(date.getHours()).padStart(2, '0')+':'+String(date.getMinutes()).padStart(2, '0')+':'+String(date.getMinutes()).padStart(2, '0'))
        setTrial(date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2, '0')+'-'+String(date.getDate()).padStart(2, '0')+' '+String(date.getHours()).padStart(2, '0')+':'+String(date.getMinutes()).padStart(2, '0')+':'+String(date.getMinutes()).padStart(2, '0'))
      }
      if(productId == "3513"){
        setNextPayment(dateMonth.getFullYear()+'-'+String(dateMonth.getMonth()+1).padStart(2, '0')+'-'+String(dateMonth.getDate()).padStart(2, '0')+' '+String(dateMonth.getHours()).padStart(2, '0')+':'+String(dateMonth.getMinutes()).padStart(2, '0')+':'+String(dateMonth.getMinutes()).padStart(2, '0'))
      }   
      if(productId == "3520"){
        setNextPayment(dateYear.getFullYear()+'-'+String(dateYear.getMonth()+1).padStart(2, '0')+'-'+String(dateYear.getDate()).padStart(2, '0')+' '+String(dateYear.getHours()).padStart(2, '0')+':'+String(dateYear.getMinutes()).padStart(2, '0')+':'+String(dateYear.getMinutes()).padStart(2, '0'))
      }   
    }, [productId])


    const ConversionTracking = ({ complete }) => {
      useEffect(() => {
        if(complete !== false){
          window.gtag('event', 'conversion', {'send_to': 'AW-665703888/7ZhVCO360twDENCrt70C'});
        }        
      }, [complete])

      return null;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        //console.log("produit choisi : ", productId)

        const testMail = await checkmail(event.target.email.value)
        //console.log(testMail);

        if(testMail.message == "disponible"){

              const { paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
                billing_details: {
                  address: {
                    country: event.target.country.value
                  },
                  email: event.target.email.value,
                  name: event.target.lastName.value
                },
              });

              //console.log("method : ", paymentMethod)

              const myCard = elements.getElement(CardElement)

              const { source, error } = await stripe.createSource(myCard, { owner: { email: event.target.email.value } })

              //console.log("source", source)

              const { data: customerCreate } = await axios.post("/en/api/stripe-customer-create", {
                  email: event.target.email.value,
                  name: event.target.firstName.value+' '+event.target.lastName.value,
                  payment_method: paymentMethod,
                  country: event.target.country.value
              });

              //console.log(customerCreate)

              const { data: customerSource } = await axios.post("/en/api/stripe-source-attach", {
                  customer: customerCreate.id,
                  source: source.id
              });

              //console.log(customerSource)

              const customer = await createCustomer({
                email: event.target.email.value,
                firstName: event.target.firstName.value,
                lastName: event.target.lastName.value,
                password: event.target.password.value,
                tel: event.target.tel.value
              });
              setCustomer(customer);

              const order = await createOrder({
                email: event.target.email.value,
                firstName: event.target.firstName.value,
                lastName: event.target.lastName.value,    
                product_id: productId,
                tel: event.target.tel.value,
                country: event.target.country.value,
                user_id: customer.id,
                customer_id: customerCreate.id,
                stripeSource: source.id  
              })

              //console.log(order)

              if(productId == 3520 || productId == 3513){

                const { data: clientSecret } = await axios.post("/en/api/stripe-payment-intent", {
                    amount: productId == 3513 ? 14.90*100 : 89.90*100,
                    description: `Winflix EN | 100% Foot - Commande ${order.id}`
                });
                
                const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id
                });
                
                //console.log(paymentIntent)

                if(error){
                  setError("Une erreur est survenue.")
                  setIsLoading(false)
                  return;
                }
  
                if(paymentIntent.status != "succeeded"){
                  const statusChange = await updateOrder({
                    id: order.id,
                    status: 'failed'
                  })
                 
                  setError("There was an error with your card. Please try again or use a different card.")
                  setIsLoading(false)
                  return;
                }

              }

            
              const subscription = await createSubscription({
                paymentMethodId: source.id,
                customer_id: customer.id,
                customerID: customerCreate.id,
                product_id: productId,    
                parent_id: order.id,
                country: event.target.country.value,
                tel: event.target.tel.value,
                interval: productId == 3512 ? "week" : productId == 3513 ? "month" : "year",
                price: productId == 3512 ? "9.90" : productId == 3513 ? "29.90" : "129.90",
                billing_period: productId == 3512 ? "week" : productId == 3513 ? "month" : "year",
                billing_interval: 1,
                next_payment_date: nextPayment,
                payment_method: 'stripe',
                trial_end_date: nextPayment        
              })

              //console.log(subscription)

              // désactivation de toutes les autres sub du user
              const checksubs = await disableAllSubs({
                user: customer.id
              })

              console.log(checksubs)

              setComplete(true)
              setIsLoading(false)
              
            }
            else{
              setError("Sorry, this email address is already in use.")
              setIsLoading(false)
            }

      };
    

    return (
        <div className={styles.appRegister}>
          
          <div className={`app-boxed-small ${styles.paddM}`}>
            <div className="text-center">
              <h1>The adventure starts here.</h1>
              <span className={styles.engage}>Non-binding, immediately.</span>
            </div>
            {!complete ? (
              <form onSubmit={handleSubmit}>
              <div className="flex toColumn space-between">
                <div className={`w50 mRight50 wm100 mRnone relative ${styles.backWhite}`}>
                    <div className={isLoading == true ? "loadingVIP" : ""}>
                    <div className={styles.form}>
                    <label>
                        <span>E-mail*</span>
                        <input type="email" name="email" required />
                    </label>
                    <label>
                        <span>Password*</span>
                        <input type="password" name="password" required />
                    </label>
                    <div className="flex" style={{ gap: '20px' }}>
                      <label style={{ width: "60%"}}>
                          <span>Phone*</span>
                          <input placeholder="" type="tel" name="tel" required />
                      </label>
                      <label style={{ width: "40%"}}>
                        <span>Country*</span>
                        <select defaultValue="US" name="country" required>
                        <option value="AF">Afghanistan</option>
                        <option value="AX">Aland Islands</option>
                        <option value="AL">Albania</option>
                        <option value="DZ">Algeria</option>
                        <option value="AS">American Samoa</option>
                        <option value="AD">Andorra</option>
                        <option value="AO">Angola</option>
                        <option value="AI">Anguilla</option>
                        <option value="AQ">Antarctica</option>
                        <option value="AG">Antigua and Barbuda</option>
                        <option value="AR">Argentina</option>
                        <option value="AM">Armenia</option>
                        <option value="AW">Aruba</option>
                        <option value="AU">Australia</option>
                        <option value="AT">Austria</option>
                        <option value="AZ">Azerbaijan</option>
                        <option value="BS">Bahamas</option>
                        <option value="BH">Bahrain</option>
                        <option value="BD">Bangladesh</option>
                        <option value="BB">Barbados</option>
                        <option value="BY">Belarus</option>
                        <option value="BE">Belgium</option>
                        <option value="BZ">Belize</option>
                        <option value="BJ">Benin</option>
                        <option value="BM">Bermuda</option>
                        <option value="BT">Bhutan</option>
                        <option value="BO">Bolivia</option>
                        <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                        <option value="BA">Bosnia and Herzegovina</option>
                        <option value="BW">Botswana</option>
                        <option value="BV">Bouvet Island</option>
                        <option value="BR">Brazil</option>
                        <option value="IO">British Indian Ocean Territory</option>
                        <option value="BN">Brunei Darussalam</option>
                        <option value="BG">Bulgaria</option>
                        <option value="BF">Burkina Faso</option>
                        <option value="BI">Burundi</option>
                        <option value="KH">Cambodia</option>
                        <option value="CM">Cameroon</option>
                        <option value="CA">Canada</option>
                        <option value="CV">Cape Verde</option>
                        <option value="KY">Cayman Islands</option>
                        <option value="CF">Central African Republic</option>
                        <option value="TD">Chad</option>
                        <option value="CL">Chile</option>
                        <option value="CN">China</option>
                        <option value="CX">Christmas Island</option>
                        <option value="CC">Cocos (Keeling) Islands</option>
                        <option value="CO">Colombia</option>
                        <option value="KM">Comoros</option>
                        <option value="CG">Congo</option>
                        <option value="CD">Congo, Democratic Republic of the Congo</option>
                        <option value="CK">Cook Islands</option>
                        <option value="CR">Costa Rica</option>
                        <option value="CI">Cote D'Ivoire</option>
                        <option value="HR">Croatia</option>
                        <option value="CU">Cuba</option>
                        <option value="CW">Curacao</option>
                        <option value="CY">Cyprus</option>
                        <option value="CZ">Czech Republic</option>
                        <option value="DK">Denmark</option>
                        <option value="DJ">Djibouti</option>
                        <option value="DM">Dominica</option>
                        <option value="DO">Dominican Republic</option>
                        <option value="EC">Ecuador</option>
                        <option value="EG">Egypt</option>
                        <option value="SV">El Salvador</option>
                        <option value="GQ">Equatorial Guinea</option>
                        <option value="ER">Eritrea</option>
                        <option value="EE">Estonia</option>
                        <option value="ET">Ethiopia</option>
                        <option value="FK">Falkland Islands (Malvinas)</option>
                        <option value="FO">Faroe Islands</option>
                        <option value="FJ">Fiji</option>
                        <option value="FI">Finland</option>
                        <option value="FR">France</option>
                        <option value="GF">French Guiana</option>
                        <option value="PF">French Polynesia</option>
                        <option value="TF">French Southern Territories</option>
                        <option value="GA">Gabon</option>
                        <option value="GM">Gambia</option>
                        <option value="GE">Georgia</option>
                        <option value="DE">Germany</option>
                        <option value="GH">Ghana</option>
                        <option value="GI">Gibraltar</option>
                        <option value="GR">Greece</option>
                        <option value="GL">Greenland</option>
                        <option value="GD">Grenada</option>
                        <option value="GP">Guadeloupe</option>
                        <option value="GU">Guam</option>
                        <option value="GT">Guatemala</option>
                        <option value="GG">Guernsey</option>
                        <option value="GN">Guinea</option>
                        <option value="GW">Guinea-Bissau</option>
                        <option value="GY">Guyana</option>
                        <option value="HT">Haiti</option>
                        <option value="HM">Heard Island and Mcdonald Islands</option>
                        <option value="VA">Holy See (Vatican City State)</option>
                        <option value="HN">Honduras</option>
                        <option value="HK">Hong Kong</option>
                        <option value="HU">Hungary</option>
                        <option value="IS">Iceland</option>
                        <option value="IN">India</option>
                        <option value="ID">Indonesia</option>
                        <option value="IR">Iran, Islamic Republic of</option>
                        <option value="IQ">Iraq</option>
                        <option value="IE">Ireland</option>
                        <option value="IM">Isle of Man</option>
                        <option value="IL">Israel</option>
                        <option value="IT">Italy</option>
                        <option value="JM">Jamaica</option>
                        <option value="JP">Japan</option>
                        <option value="JE">Jersey</option>
                        <option value="JO">Jordan</option>
                        <option value="KZ">Kazakhstan</option>
                        <option value="KE">Kenya</option>
                        <option value="KI">Kiribati</option>
                        <option value="KP">Korea, Democratic People's Republic of</option>
                        <option value="KR">Korea, Republic of</option>
                        <option value="XK">Kosovo</option>
                        <option value="KW">Kuwait</option>
                        <option value="KG">Kyrgyzstan</option>
                        <option value="LA">Lao People's Democratic Republic</option>
                        <option value="LV">Latvia</option>
                        <option value="LB">Lebanon</option>
                        <option value="LS">Lesotho</option>
                        <option value="LR">Liberia</option>
                        <option value="LY">Libyan Arab Jamahiriya</option>
                        <option value="LI">Liechtenstein</option>
                        <option value="LT">Lithuania</option>
                        <option value="LU">Luxembourg</option>
                        <option value="MO">Macao</option>
                        <option value="MK">Macedonia, the Former Yugoslav Republic of</option>
                        <option value="MG">Madagascar</option>
                        <option value="MW">Malawi</option>
                        <option value="MY">Malaysia</option>
                        <option value="MV">Maldives</option>
                        <option value="ML">Mali</option>
                        <option value="MT">Malta</option>
                        <option value="MH">Marshall Islands</option>
                        <option value="MQ">Martinique</option>
                        <option value="MR">Mauritania</option>
                        <option value="MU">Mauritius</option>
                        <option value="YT">Mayotte</option>
                        <option value="MX">Mexico</option>
                        <option value="FM">Micronesia, Federated States of</option>
                        <option value="MD">Moldova, Republic of</option>
                        <option value="MC">Monaco</option>
                        <option value="MN">Mongolia</option>
                        <option value="ME">Montenegro</option>
                        <option value="MS">Montserrat</option>
                        <option value="MA">Morocco</option>
                        <option value="MZ">Mozambique</option>
                        <option value="MM">Myanmar</option>
                        <option value="NA">Namibia</option>
                        <option value="NR">Nauru</option>
                        <option value="NP">Nepal</option>
                        <option value="NL">Netherlands</option>
                        <option value="AN">Netherlands Antilles</option>
                        <option value="NC">New Caledonia</option>
                        <option value="NZ">New Zealand</option>
                        <option value="NI">Nicaragua</option>
                        <option value="NE">Niger</option>
                        <option value="NG">Nigeria</option>
                        <option value="NU">Niue</option>
                        <option value="NF">Norfolk Island</option>
                        <option value="MP">Northern Mariana Islands</option>
                        <option value="NO">Norway</option>
                        <option value="OM">Oman</option>
                        <option value="PK">Pakistan</option>
                        <option value="PW">Palau</option>
                        <option value="PS">Palestinian Territory, Occupied</option>
                        <option value="PA">Panama</option>
                        <option value="PG">Papua New Guinea</option>
                        <option value="PY">Paraguay</option>
                        <option value="PE">Peru</option>
                        <option value="PH">Philippines</option>
                        <option value="PN">Pitcairn</option>
                        <option value="PL">Poland</option>
                        <option value="PT">Portugal</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="QA">Qatar</option>
                        <option value="RE">Reunion</option>
                        <option value="RO">Romania</option>
                        <option value="RU">Russian Federation</option>
                        <option value="RW">Rwanda</option>
                        <option value="BL">Saint Barthelemy</option>
                        <option value="SH">Saint Helena</option>
                        <option value="KN">Saint Kitts and Nevis</option>
                        <option value="LC">Saint Lucia</option>
                        <option value="MF">Saint Martin</option>
                        <option value="PM">Saint Pierre and Miquelon</option>
                        <option value="VC">Saint Vincent and the Grenadines</option>
                        <option value="WS">Samoa</option>
                        <option value="SM">San Marino</option>
                        <option value="ST">Sao Tome and Principe</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="SN">Senegal</option>
                        <option value="RS">Serbia</option>
                        <option value="CS">Serbia and Montenegro</option>
                        <option value="SC">Seychelles</option>
                        <option value="SL">Sierra Leone</option>
                        <option value="SG">Singapore</option>
                        <option value="SX">Sint Maarten</option>
                        <option value="SK">Slovakia</option>
                        <option value="SI">Slovenia</option>
                        <option value="SB">Solomon Islands</option>
                        <option value="SO">Somalia</option>
                        <option value="ZA">South Africa</option>
                        <option value="GS">South Georgia and the South Sandwich Islands</option>
                        <option value="SS">South Sudan</option>
                        <option value="ES">Spain</option>
                        <option value="LK">Sri Lanka</option>
                        <option value="SD">Sudan</option>
                        <option value="SR">Suriname</option>
                        <option value="SJ">Svalbard and Jan Mayen</option>
                        <option value="SZ">Swaziland</option>
                        <option value="SE">Sweden</option>
                        <option value="CH">Switzerland</option>
                        <option value="SY">Syrian Arab Republic</option>
                        <option value="TW">Taiwan, Province of China</option>
                        <option value="TJ">Tajikistan</option>
                        <option value="TZ">Tanzania, United Republic of</option>
                        <option value="TH">Thailand</option>
                        <option value="TL">Timor-Leste</option>
                        <option value="TG">Togo</option>
                        <option value="TK">Tokelau</option>
                        <option value="TO">Tonga</option>
                        <option value="TT">Trinidad and Tobago</option>
                        <option value="TN">Tunisia</option>
                        <option value="TR">Turkey</option>
                        <option value="TM">Turkmenistan</option>
                        <option value="TC">Turks and Caicos Islands</option>
                        <option value="TV">Tuvalu</option>
                        <option value="UG">Uganda</option>
                        <option value="UA">Ukraine</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="GB">United Kingdom</option>
                        <option value="US">United States</option>
                        <option value="UM">United States Minor Outlying Islands</option>
                        <option value="UY">Uruguay</option>
                        <option value="UZ">Uzbekistan</option>
                        <option value="VU">Vanuatu</option>
                        <option value="VE">Venezuela</option>
                        <option value="VN">Viet Nam</option>
                        <option value="VG">Virgin Islands, British</option>
                        <option value="VI">Virgin Islands, U.s.</option>
                        <option value="WF">Wallis and Futuna</option>
                        <option value="EH">Western Sahara</option>
                        <option value="YE">Yemen</option>
                        <option value="ZM">Zambia</option>
                        <option value="ZW">Zimbabwe</option>
                    </select>
                      </label>
                    </div>
                    <label>
                      <span>Name*</span>
                        <input type="text" name="lastName" required />
                    </label>
                    <label>
                      <span>First Name*</span>
                        <input type="text" name="firstName" required />
                    </label>
                    </div>
                    <div className={styles.Stripe}>
                      <span className={styles.method}><span className="material-icons">credit_card</span>Method of payment for the card</span>
                      <span className={styles.conditions}>Secure payment through Stripe operator. If you opt for the Hebdo Passport in the first week, no amount will be charged. All your card details are safe.</span>
                      <CardElement options={{ hidePostalCode: true }} />
                    </div>
                    </div>
                </div>
                <div className="w50 wm100 mmTop20">
                  <div>
                    <div className={isLoading == true ? "loadingVIP" : ""}>
                    <h3 className="mBot20">Please select a formula :</h3>
                    <label onClick={() => selectProduct(3512)}>
                      <div className={`${styles.subChoice} ${productId == 3512 && styles.active}`}>
                        <div className="flex aligncenter space-between">
                          <div className="flex aligncenter">
                            <div className={styles.checkBox}>
                              <span className="material-icons">check</span>
                            </div>
                            <div>
                              <span className={styles.titleSub}>Pass weekly</span>
                              <span className={styles.saveSub}>50% save</span>
                            </div>
                          </div>
                          <span className={styles.priceSub}>4.90$ <span>/ <del>9.90$</del></span></span>
                        </div>                      
                      </div>                    
                    </label>
                    <label onClick={() => selectProduct(3513)}>
                      <div className={`${styles.subChoice} ${productId == 3513 && styles.active}`}>
                        <div className="flex aligncenter space-between">
                          <div className="flex aligncenter">
                            <div className={styles.checkBox}>
                              <span className="material-icons">check</span>
                            </div>
                            <div>
                              <span className={styles.titleSub}>Pass monthly</span>
                              <span className={styles.saveSub}>50% save</span>
                            </div>
                          </div>
                          <span className={styles.priceSub}>14.90$ <span>/ <del>29.90$</del></span></span>
                        </div>                      
                      </div>                    
                    </label>
                    <label onClick={() => selectProduct(3520)}>
                      <div className={`${styles.subChoice} ${productId == 3520 && styles.active}`}>
                        <div className="flex aligncenter space-between">
                          <div className="flex aligncenter">
                            <div className={styles.checkBox}>
                              <span className="material-icons">check</span>
                            </div>
                            <div>
                              <span className={styles.titleSub}>Pass yearly</span>
                              <span className={styles.saveSub}>30% save</span>
                            </div>
                          </div>
                          <span className={styles.priceSub}>89.90$ <span>/ <del>129.90$</del></span></span>
                        </div>                      
                      </div>                    
                    </label>
                    </div>
                    <div className="text-right">
                      <button type="submit" className={styles.Submit} disabled={isLoading}>
                          {isLoading ? 'Account creation...' : 'Choose this pass'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              </form>
            ) : (
              <>
              <div className="text-center">
                <span className={`material-icons ${styles.verif}`}>verified</span>
                <span className={styles.congrats}>Congratulations, you are a VIP member!</span>
                <span className={styles.toStart}>Per initial, vai semplicemente alla page di connessione e connettiti con i tuoi identificatori informati duree la registrazione.</span>
                <div className="text-center mTop20">
                  <Link href="/login" className={styles.toLog}>Login</Link>
                </div>
              </div>  
              <ConversionTracking complete={complete} />
              </>
            )}
            <div>
              {error && <p>{error}</p>}
            </div>
          </div>          
        </div>
    )
}


const createCustomer = async (userData) => {
    try {
      const response = await axios.post('https://wpen.winflix.net/wp-json/wc/v3/customers/', {
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        password: userData.password,
        phone: userData.tel
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
  };
  

  const getProduct = async (productId) => {
    try {
      const response = await fetch(`https://wpen.winflix.net/wp-json/wc/v3/products/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa('ck_628e45ef5edc3afe37e684d5e0150e224d959c66:cs_b8db749eb7437258f1884a84949628acb78869be')
        },
      });
      const product = await response.json();
      return product;
    } catch (error) {
      throw error;
    }
  };
  

  const createOrder = async (orderData) => {
      if(orderData.product_id == 3513 || orderData.product_id == 3520){

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
            country: orderData.country,
            email: orderData.email,
            phone: orderData.tel
          },
          shipping: {
            first_name: orderData.firstName,
            last_name: orderData.lastName,
            address_1: '',
            city: '',
            state: '',
            postcode: '',
            country: orderData.country
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
              product_id: orderData.product_id,
              quantity: 1,
              total: orderData.product_id == 3513 ? "14.99" : orderData.product_id == 3520 ? "89.99" : "0.00"
            }
          ], 
          coupon_lines: [
            {
              code: orderData.product_id == 3513 ? "monthly" : orderData.product_id == 3520 ? "year" : ""
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

    }else{
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
            country: orderData.country,
            email: orderData.email,
            phone: orderData.tel
          },
          shipping: {
            first_name: orderData.firstName,
            last_name: orderData.lastName,
            address_1: '',
            city: '',
            state: '',
            postcode: '',
            country: orderData.country
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
              product_id: orderData.product_id,
              quantity: 1,
              total: orderData.product_id == 3513 ? "14.99" : orderData.product_id == 3520 ? "89.99" : "0.00"
            }
          ],      
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
  };

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
    if(subscriptionData == 3512){
      try {
        const response = await axios.post('https://wpen.winflix.net/wp-json/wc/v3/subscriptions/', {
          source: subscriptionData.paymentMethodId,
          status: 'active',
          customer_id: subscriptionData.customer_id,
          product_id: subscriptionData.product_id,
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
          trial_length: 3,
          trial_period: "day",
          trial_end_date: subscriptionData.product_id == 3512 ? JSON.stringify(subscriptionData.next_payment_date) : "",
          trial_end_date_gmt: subscriptionData.product_id == 3512 ? JSON.stringify(subscriptionData.next_payment_date) : "", 
          line_items: [
            {
              product_id: subscriptionData.product_id,
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
    else{
      try {
        const response = await axios.post('https://wpen.winflix.net/wp-json/wc/v3/subscriptions/', {
          source: subscriptionData.paymentMethodId,
          status: 'active',
          customer_id: subscriptionData.customer_id,
          product_id: subscriptionData.product_id,
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
              product_id: subscriptionData.product_id,
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
  };

const checkmail = async (datas) => {
  const fetcher = await fetch(`${WINFLIX_URL}/api/user/checkmail/?mail=${datas}`)
  const json = await fetcher.json()
  return json
}

const disableAllSubs = async (dataUser) => {
  const fetcher = await fetch(`${WINFLIX_URL}/api/user/sub/able/?user=${dataUser.user}`)
  const json = await fetcher.json()
  return json
}