import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { ACTIONS, GameContext } from '../../context/GameContext';


const Timer = ({timeLimit = 60, activateTimer = false}) => {

    const { state, dispatch } = useContext(GameContext);

    const [time, setTime] = useState(state.timeLeft);
    const [second, setSecond] = useState();
    const [minute, setMinute] = useState();

    useEffect(() => {

        let intervalId;
    
        const secondCounter = time % 60;
        const minuteCounter = Math.floor(time / 60);

        let computedSecond = '';
        let computedMinute = '';

        if(String(time) === '60') 
        {
            computedSecond = 60;
            computedMinute = null;
        }
        else
        {
            computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}`: secondCounter;
            computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}`: minuteCounter;
        }
        setSecond(computedSecond);
        setMinute(computedMinute);

        if (state.isTimerOn && state.timeLeft > 0) {
            intervalId = setInterval(() => {
                dispatch({type: ACTIONS.DECREASETIME});
                setTime(time - 1);
            }, 1000);
        };

        if (!state.isTimerOn && state.timeLeft < state.timeLimit) {
            intervalId = setInterval(() => {
                dispatch({type: ACTIONS.INCREASETIME});
                setTime(time + 1);
            }, 50);
        };
        
        return () => clearInterval(intervalId);
    }, [state.isTimerOn, time])


    return (
        <motion.div
            // className="nes-button"
            style={{ margin: '1.5rem', marginTop: '2rem',}}
            animate={{ scale: 1.3 }}
            transition={{ duration: 0.3 }}
        >
            <button className="nes-btn is-primary double-layered-button" style={{display: "flex", flexFlow: "column nowrap", justifyContent: "center", alignItems: "center"}}><h5>Time</h5>{minute == '00' ? null : minute}{second}</button>  
        </motion.div>
    )
}

export default Timer
