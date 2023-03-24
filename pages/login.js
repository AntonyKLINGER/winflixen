import React, { useContext, useEffect } from 'react'
import { UserContext } from '../UserContext'
import Head from 'next/head'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/legacy/image'
import Sidebar from '../components/Sidebar'
import PronoNext from '../components/PronoNextMatch'
import MetasWintips from '../components/MetasWintips'
import PronoBoxResult from '../components/PronoBoxResult'
import { HeaderCTA, OutilsCTA } from '../components/CTA'
import { RedButton } from '../components/Buttons'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton'
import Checkbox from '@mui/material/Checkbox';
import styles from '../styles/Login.module.css'
import { WINFLIX_URL } from '../config'
import Cookies from 'universal-cookie';
import { log } from 'util';
import CryptoJS from 'crypto-js'

export default function Login(){

    const title = `Login to Winflix-Software`;

    const {user, setUser, sub, setSub} = useContext(UserContext)
    const {tokenUser, setTokenUser} = useContext(UserContext)
    const {credits, setCredits} = useContext(UserContext)
    const [errMsg, setErrMsg] = React.useState(false)
    const [charge, setCharge] = React.useState(false)
    const [forget, setForget] = React.useState(false)
    const [passreset, setPassreset] = React.useState(null)
    const [result, setResult] = React.useState(undefined)

    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
        token: "",
        loggedIn: false,
        remember: true
    })

    const [login, setLogin] = React.useState({})

    function handleChangePass(event){
        const {type, name, value} = event.target
        setPassreset(value)
    }

    function handleChange(event){
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name] : type === 'checkbox' ? checked : value
            }
        })
    }

    function refreshPage() {
        window.location.href = "https://winflix.net/en/";
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if(formData.username != '' && formData.password != ''){
            setCharge(true)
            setErrMsg(false)
            const fetcher = await fetch(`${WINFLIX_URL}/api/user/login/?username=${formData.username}&pass=${formData.password}`)
            const json = await fetcher.json()
            if(json.message == "success"){
                if(formData.remember == true){
                    const cipher = JSON.stringify(json)
                    const passer = "crypted"
                    const encr = CryptoJS.AES.encrypt(cipher, passer)
                    localStorage.setItem("wfToken", encr)
                    setUser({ username: json.username, user_id: json.user_id })
                    setSub({ id: json.sub_id, status: json.status })
                }
                Router.push("/football/")
                setCharge(false)
            }
            else{
                setErrMsg(true)
                setCharge(false)
            }
        }
        else{
            setErrMsg(true)
        }
    }

    const changePass = async () => {
        const fetcher = await fetch(`${WINFLIX_URL}/api/user/pass/change/?mail=${passreset}`)
        const json = await fetcher.json()
        setResult(json.message)
        setPassreset("")
    }

    return (
        <div className={styles.appLogin}>
            <Head>
                <title>{title}</title>
                <meta name="description" content={`Need to find the best base site ⚽? Choose Winflix, a reliable prediction service developed by sports betting experts. 93% Fiablite and VIP Recommended!`} />
                <link rel="alternate" hrefLang="fr-fr" href="https://winflix.net/login/" />
                <link rel="alternate" hrefLang="de-de" href="https://winflix.net/de/login/" />
                <link rel="alternate" hrefLang="it-it" href="https://winflix.net/it/login/" />
                <link rel="alternate" hrefLang="en-en" href="https://winflix.net/en/login/" />
                <link rel="alternate" hrefLang="fr" href="https://winflix.net/login/" />
                <link rel="alternate" hrefLang="de" href="https://winflix.net/de/login/" />
                <link rel="alternate" hrefLang="it" href="https://winflix.net/it/login/" />
                <link rel="alternate" hrefLang="en" href="https://winflix.net/en/login/" />
            </Head>
            <ol itemScope itemType="http://schema.org/BreadcrumbList" style={{display: "none"}}>
              <li itemProp="itemListElement" itemScope
                  itemType="http://schema.org/ListItem">
                <a itemProp="item" href="https://winflix.net/it/">
                <span itemProp="name">Football Predictions Website</span></a>
                <meta itemProp="position" content="1" />
              </li>
            </ol>
            <div className="app-boxed">
                <div className="mBot20">
                    <HeaderCTA />
                </div>          
                <div className="flex toColumn flex-start">
                    <div className="w65 relative mRight30 mRnone wm100">
                        <div className="app-content mBot30">
                            <div className="flex aligncenter">
                                <h1>Login to Winflix</h1> 
                            </div>       
                            <p>Sign up to use all Winflix services.</p>
                            <form onSubmit={handleSubmit}>
                                <div className="flex toColumn mmTop20">
                                    <TextField id="outlined-basic" sx={{['@media(max-width:810px)']: { width: '100%', marginBottom: '10px'}}} size="small" label="Login or e-mail" name="username" variant="outlined" className={`${styles.textField} wm100`} value={formData.username} onChange={handleChange} />
                                    <TextField id="outlined-basic" sx={{['@media(max-width:810px)']: { width: '100%'}}} size="small" label="Password" name="password" type="password" variant="outlined" className={`${styles.textField} wm100`} value={formData.password} onChange={handleChange} />
                                </div>
                                <span className={styles.forgetPass} onClick={() => setForget(prev => !prev)}>Did you forget your password ?</span>
                                {forget && (
                                    <>
                                    <p>Enter your account email address. You will receive an email with your new password. You can then change it on your My Account page.</p>
                                    <TextField id="outlined-basic" sx={{['@media(max-width:810px)']: { width: '100%', marginBottom: '10px'}}} size="small" label="E-mail" name="passreset" variant="outlined" className={styles.textField} value={passreset} onChange={handleChangePass} />
                                    <Button onClick={changePass} variant="contained" disableElevation size="small" sx={{ marginLeft: '10px' }}>
                                        Restore
                                    </Button>
                                    {result && (
                                        <p>{result}</p>
                                    )}
                                    </>
                                )}
                                <FormGroup size="small" className={styles.remember}>
                                    <FormControlLabel size="small" onChange={handleChange} control={<Checkbox size="small" name="remember" defaultChecked />} label="Save me" />
                                </FormGroup>
                                {charge ? (
                                    <div className="text-right">
                                        <Button variant="contained" size="small">
                                          Verification in progress...
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="text-right">
                                        <Button onClick={handleSubmit} variant="contained" disableElevation size="small">
                                          Login
                                        </Button>
                                    </div>
                                )}
                                {errMsg ? (
                                    <span className="errMsg">Username or wrong password.</span>
                                ) : (
                                    <></>
                                )}  
                            </form>                     
                        </div>
                    </div>
                    <div className="w35 wm100">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </div>
    )
}
