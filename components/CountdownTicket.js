import React, { useEffect } from 'react'
import { UserContext } from '../UserContext'

export default function CountdownTicket({date}){

    const calculateTimeLeft = () => {
        const difference = +new Date(date) - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
              hours: Math.floor(difference / (1000 * 60 * 60)),
              minutes: Math.floor((difference / 1000 / 60) % 60),
              seconds: Math.floor((difference / 1000) % 60),
              days: Math.floor((Math.floor(difference / (1000 * 60 * 60))/24)),
            };
          }      
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft())
    const {timer, setTimer} = React.useContext(UserContext)
    const {ticket, setTicket} = React.useContext(UserContext)

    useEffect(() => {
      setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    });

    useEffect(() => {
        if(timeLeft.minutes == 0 && timeLeft.seconds == 0){
            setTimer(null)
            setTicket([])
        }
    }, [timeLeft])

    return (
        <>
        <div id="app-reste">
            <span className="flex aligncenter">
                <span className="material-icons" data-icon="timer"></span>
                It takes {timeLeft.minutes} min and {timeLeft.seconds} sec to validate your ticket
            </span>
        </div>        
        </>
    )
}