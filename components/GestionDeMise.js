import React from 'react'
import styles from '../styles/GestionMise.module.css'
import TextField from '@mui/material/TextField';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function GestionDeMise(){

    const [msg, setMsg] = React.useState(false)

    const [formData, setFormData] = React.useState({
        mise: 20,
        cote: 1.60,
        last: "gagnant"
    })

    const handleChange = (event) => {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name] : type === 'checkbox' ? checked : value
            }
        })
    };

    const calculMise = () => {
        let mise = formData.mise.toString().replace(',', '.')
        let cote = formData.cote.toString().replace(',', '.')
        let last = formData.last

        if(last == "perdant"){
            let newMise = (mise*2.4)/cote
            setMsg(`${newMise.toFixed(2)}€`)
        }
        else{
            setMsg("Your base bets")
        }
    }

    return (
        <div className={styles.AppGestion}>
            <span className="app-title-h2">
            The bet management tool
            </span>
            <p><strong>To get your update:</strong> Indicate whether your last bet won or lost, then provide the place in the last bet and its rating. It only remains to validate!</p>
            <div className="flex aligncenter mwrap mTop20">
                <FormControl className={styles.radios} sx={{['@media(max-width:810px)']: { width: '53%', transform: 'translateY(-2px)'}}}>
                    <FormLabel id="demo-row-radio-buttons-group-label">Last result</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        value={formData.last}
                        onChange={handleChange}
                    >
                        <FormControlLabel name="last" value="gagnant" control={<Radio size="small" />} label="Win" />
                        <FormControlLabel name="last" value="perdant" control={<Radio size="small" />} label="Loss" />
                    </RadioGroup>
                </FormControl>
                <TextField sx={{['@media(max-width:810px)']: { width: '40%'}}} id="outlined-basic" size="small" label="Last bet" name="mise" value={formData.mise} defaultValue="20" variant="outlined" onChange={handleChange} className={styles.textField} />
                <TextField sx={{['@media(max-width:810px)']: { width: '50%', marginTop: '20px', marginLeft: '0px !important'}}} id="outlined-basic" size="small" label="Quote des Tages" name="cote" value={formData.cote} defaultValue="1.65" variant="outlined" onChange={handleChange} className={styles.textField} />
                <Button variant="contained" size="small" sx={{ width: '20%', ['@media(max-width:810px)']: { width: '40%', marginTop: '20px', marginLeft: '10px'}}} onClick={calculMise} disableElevation>
                    Validate
                </Button>
            </div>
            {msg && (
            <Alert severity="success" sx={{marginTop: '20px'}}>
                <AlertTitle sx={{color: 'green', fontSize: '16px'}}>{msg}</AlertTitle>
                <span style={{color: 'green', fontSize:'14px'}}>To better continue developing your bankroll, here is the <strong>recommended bet</strong> for the day prediction by the Winflix Bet Management algorithm.</span>
            </Alert>
            )}
        </div>
    )
}