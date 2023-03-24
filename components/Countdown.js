import React, { useEffect } from 'react'

export default function Countdown({date}){

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

    const [timeLeft, setTimeLeft] = React.useState(calculateTimeLeft());

    useEffect(() => {
      setTimeout(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);
    });

    return (
        <div className="app-countdown">
            <div className="item_c">
                <span className="title_ct">{timeLeft.days}</span>
                <span className="res_ct">Days</span>
            </div>
            <div className="item_c">
                <span className="title_ct">{timeLeft.hours}</span>
                <span className="res_ct">Hours</span>
            </div>
            <div className="item_c">
                <span className="title_ct">{timeLeft.minutes}</span>
                <span className="res_ct">Min</span>
            </div>
            <div className="item_c">
                <span className="title_ct">{timeLeft.seconds}</span>
                <span className="res_ct">Sec</span>
            </div>
        </div>
    )
}