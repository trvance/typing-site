import { useState, useEffect, useRef } from 'react';
import './TypingTest.css';
import { motion, useViewportScroll, useTransform, useMotionValue } from 'framer-motion';
import TypingArea from './typingArea/TypingArea';
import backgroundImage from '../images/sunny.png';
import { useMediaQuery } from 'react-responsive';
import { useInView } from 'react-intersection-observer';


const DURATION = 60;

const TypingTest = () => {
    const [isTimerOn, setIsTimerOn] = useState(false);
    const [seconds, setSeconds] = useState(DURATION);
    const [showTypingArea, setShowTypingArea] = useState(true);
    const [keyCounter, setKeyCounter] = useState(0);
    const [numWords, setNumWords] = useState(0);
    const [showGameOver, setShowGameOver] = useState(false);
    // const [isCpmOn, setIsCpmOn] = useState(true);
    // const [speed, setSpeed] = useState(isCpmOn ? keyCounter : (keyCounter/6));

    useEffect(()=>{
        if(isTimerOn){
            if (seconds !== 0) {
                let myInterval = setInterval(() => {
                    if (seconds > 0) {
                        setSeconds(seconds - 1);
                    }
                    if (seconds <= 0 ) {
                        clearInterval(myInterval);
                    } 
                }, 1000)
                return ()=> {
                    clearInterval(myInterval);
                };
            }
            // else {
            //     setIsTimerOn(false);
            // }
        }
        if(!isTimerOn && seconds < DURATION){
            let myInterval = setInterval(() => {
                if (seconds < DURATION) {
                    setSeconds(seconds + 1);
                }
                if (seconds >= DURATION) {
                    setSeconds(DURATION)
                    clearInterval(myInterval);
                } 
            }, 50)
            return ()=> {
                clearInterval(myInterval);
            };
        }
        if (seconds === 0 && showTypingArea) {
            setIsTimerOn(false);
            setShowGameOver(true);
            setShowTypingArea(false);
            displayGameText();
        }
        // if (seconds === DURATION && !showTypingArea) {
        //     setShowTypingArea(true); 
        // }
        
    });

    const displayTypingArea = () => {
        return (
            <div className="nes-container">
                <TypingArea startTimer={setIsTimerOn} keyCounter={keyCounter} setKeyCounter={setKeyCounter}/>
            </div>
        )
    };

    const displayGameText = () => {
        
        return (
                showGameOver
                    ? <div>
                        <h2 className="game-over-text">Game Over</h2>
                        <h2 className="game-over-text">You hit {keyCounter} words in one minute!</h2>
                    </div>
                    : <h2 className="reset-text">Resetting The Game...</h2>
        )
    }

    const handleRestartButton = () => {
        setIsTimerOn(false);
        if(seconds<DURATION && setShowTypingArea) {
            setTimeout(() => {
                setKeyCounter(0);
            }, 2000);
            // setSeconds(seconds+1);
            setShowTypingArea(false);
            setShowGameOver(false);
            if(!isTimerOn && seconds < DURATION){

            // while(seconds < DURATION) {
            //     let myInterval = setInterval(() => {
            //             setSeconds(seconds + 1);
            //         } 
            //     }, 50);
            //     clearInterval(myInterval);
            // }
        }
        }
    };

    const { scrollY } = useViewportScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 280]);
    const y2 = useTransform(scrollY, [0, 200], [0, 0]);

    const [ref, inView, entry] = useInView({
        /* Optional options */
        threshold: 0.5,
        triggerOnce: false
    });

    const variants = {
        visible: { opacity: 1, scale: 1, y: 0 },
        hidden: {
          opacity: 0,
          scale: 0.65,
          y: 50
        }
    };

    return(
        <>
            <motion.div style={{ y: y2, x: 0 }}>
                
            <img className="background-image" src={backgroundImage} alt="wallpaper" />
            </motion.div>

            <motion.div style={{ y: y1, x: 0 }}>
                <div className="root">
                    <h1 className="title">Typing Speed Quest</h1>
                    <p class="nes-balloon from-right">
                        Time to prove yourself!
                    </p>
                    <div className="text-area-container">
                        {
                        showTypingArea
                            ? displayTypingArea()
                            : displayGameText()   
                        }
                    </div>
                    <div className="time-bar">
                        <progress class="nes-progress is-primary" value={seconds} max="60"></progress>
                    </div>
                    <div className="btn-difficulty-row">
                        <button className="nes-btn">Easy</button>
                        <button className="nes-btn">Normal</button>
                        <button className="nes-btn is-error">Hard</button>
                    </div>
                    <motion.div
                        className="nes-button"
                        animate={{ scale: 1.5 }}
                        transition={{ duration: 0.5 }}
                    >
                        <button type="button" className="nes-btn is-primary" >{seconds}</button>  
                    </motion.div>
                    <button className="nes-btn is-success" onClick={ handleRestartButton }>Restart</button>
                </div>
            </motion.div>
        </>
    )
};

export default TypingTest;
