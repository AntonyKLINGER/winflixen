import React, { useEffect } from 'react'
import { initGA, logPageView } from '../lib/analytics';
import Head from 'next/head'
import { UserContext } from '../UserContext'
import Router, { useRouter } from 'next/router'
import '../styles/globals.css'
import '../styles/responsify.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NProgress from 'nprogress'
import CryptoJS from 'crypto-js'
import { WINFLIX_URL } from '../config'
import Script from 'next/script'
import * as ga from '../lib/google-analytics'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    initGA();
    logPageView();

    const handleRouteChange = (url) => {
      logPageView();
      NProgress.done(false);
    };

    Router.events.on('routeChangeStart', (url) => {
      NProgress.start();
    });

    Router.events.on('routeChangeComplete', handleRouteChange);

    Router.events.on('routeChangeError', (err, url) => {
      NProgress.done(false);
    });

    // Clean up event listener
    return () => {
      Router.events.off('routeChangeComplete', handleRouteChange);
      Router.events.off('routeChangeStart', () => {
        NProgress.start();
      });
      Router.events.off('routeChangeError', () => {
        NProgress.done(false);
      });
    };
  }, []);
  

  const [cry, setCry] = React.useState({username: '', user_id: 0, sub_id: '', status: 'on-hold'})
  const [user, setUser] = React.useState({username: cry.username, user_id: cry.user_id})
  const [sub, setSub] = React.useState({id: cry.sub_id, status: cry.status})
  const [tokenUser, setTokenUser] = React.useState("")

  const [open, setOpen] = React.useState(false)
  const [loadTicket, setLoadTicket] = React.useState(true)
  const [ticket, setTicket] = React.useState([])
  const [cote, setCote] = React.useState(1.00)
  const [gain, setGain] = React.useState(0.00)
  const [timer, setTimer] = React.useState(null)
  const [loadUser, setLoadUser] = React.useState(false)

  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if(localStorage.getItem("wfToken")){

      const bytes = CryptoJS.AES.decrypt(localStorage.getItem("wfToken").toString(), "crypted");
      const originalString = bytes.toString(CryptoJS.enc.Utf8);
      const cr = JSON.parse(originalString)

      const checker = async () => {
          setLoadUser(false)
          if(user.user_id != cr.user_id | sub.status != cr.status){
      
          setUser({username: cr.username, user_id: cr.user_id})
          setSub({id: cr.sub_id, status: cr.status})

          setLoadUser(true)
          
          const fetcher = await fetch(`${WINFLIX_URL}/api/user/sub/?user=${cr.user_id}`)
          const json = await fetcher.json()
          if(json.sub_id != cr.sub_id || json.status != cr.status){
            setSub({ sub_id: json.sub_id, status: json.status })
            const ne = { user_id: cr.user_id, username: cr.username, sub_id: json.sub_id, status: json.status }
            const cipher = JSON.stringify(ne)
            const passer = "crypted"
            const encr = CryptoJS.AES.encrypt(cipher, passer)
            localStorage.setItem("wfToken", encr)
          }

        }

      }

      checker()

      }
      else{
        setLoadUser(true)
      }
    }
  }, [router.route])


  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <link rel="manifest" href="https://winflix.net/manifest.json" />
      <link rel="apple-touch-icon" href="https://winflix.net/apple-touch-icon.png" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />  
      <meta name="ga-site-verification" content="ljCh12CaXuf17p9ziF0e8rA8" />
      <meta name="p:domain_verify" content="19ccf280dd08d911476e49a1ca198feb"/>
      <link rel="canonical" href={`https://winflix.net/en${router.asPath}`} />
    </Head>
    <UserContext.Provider value={{tokenUser, setTokenUser, user, setUser, sub, setSub, open, setOpen, loadTicket, setLoadTicket, ticket, setTicket, cote, setCote, gain, setGain, timer, setTimer, loadUser, setLoadUser}}>
      <Header />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=AW-665703888`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics-script" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-665703888');
        `}
      </Script>
        <Component {...pageProps} />
      <Footer />
    </UserContext.Provider>
    </>
  )

}

export default MyApp
