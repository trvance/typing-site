import { useState, useEffect, useContext } from 'react';
import './TypingTest.css';
import { motion, useViewportScroll, useTransform, useMotionValue } from 'framer-motion';
import TypingArea from './typingArea/TypingArea';
import backgroundImage from '../images/sunny.png';
import { useMediaQuery } from 'react-responsive';
import { useInView } from 'react-intersection-observer';
import { ACTIONS, GameContext } from '../context/GameContext';
import Timer from './timer/Timer';
import GameoverFrame from './gameoverFrame/GameoverFrame';
import { getByTitle } from '@testing-library/dom';

const bounceTransition = {
    y: {
      duration: .6,
      yoyo: Infinity,
      ease: "easeIn",
      delay: 0,
    },
    backgroundColor: {
      duration: 5,
      yoyo: Infinity,
      ease: "easeOut",
      repeatDelay: 0.8,
    },
}


const resetFrame = () => {
    return (
        <h2>Resetting the Game...</h2>
    )
};

const loadingScreen = () => {
    return (
        <h2>Computing your score...</h2>
    )
};

const changingDifficulty = () => {
    return (
        <h2>Changing the difficulty...</h2>
    )
};

const FRAMES = {
    TYPINGFRAME: <TypingArea />,
    GAMEOVERFRAME: <GameoverFrame />,
    LOADINGSCREEN: loadingScreen(),
    CHANGINGDIFFICULTY: changingDifficulty(),
    RESETFRAME: resetFrame(),
};

const displayMainArea = (frame) => {
    switch (frame) {
        case FRAMES.TYPINGFRAME:
            return (
                <div class="nes-container">
                    <TypingArea/>
                </div>
            );
        case FRAMES.RESETFRAME:
            return FRAMES.RESETFRAME;
        case FRAMES.LOADINGSCREEN:
            return FRAMES.LOADINGSCREEN;
        case FRAMES.CHANGINGDIFFICULTY:
            return FRAMES.CHANGINGDIFFICULTY;
        case FRAMES.GAMEOVERFRAME:
            return FRAMES.GAMEOVERFRAME;
    }
}


const TypingTest = () => {

    const {state, dispatch} = useContext(GameContext);
    const [mainArea, setMainArea] = useState(FRAMES.TYPINGFRAME);
    const [popupBubble, setPopupBubble] = useState();

    const handleEasyButton = () => {
        dispatch({ type: ACTIONS.EASYMODE });
        setMainArea(FRAMES.CHANGINGDIFFICULTY);
        setTimeout(()=>{
            setMainArea(FRAMES.TYPINGFRAME);
        }, 1500);
    }
    const handleNormalButton = () => {
        dispatch({ type: ACTIONS.NORMALMODE });
        setMainArea(FRAMES.CHANGINGDIFFICULTY);
        setTimeout(()=>{
            setMainArea(FRAMES.TYPINGFRAME);
        }, 1500);
    }
    const handleHardButton = () => {
        dispatch({ type: ACTIONS.HARDMODE });
        setMainArea(FRAMES.CHANGINGDIFFICULTY);
        setTimeout(()=>{
            setMainArea(FRAMES.TYPINGFRAME);
        }, 1500);
    }

    const determinePopupBubble = () => {
        if(mainArea === FRAMES.TYPINGFRAME && state.timeLeft === state.timeLimit) {
            setPopupBubble(
                <motion.div
                transition={bounceTransition}
                animate={{
                    y: ["10%", "20%"],
                    backgroundColor: ["#ff6699", "#6666ff"],
                    backgroundSize: {width: '25rem'},
                    borderRadius: "15px",
                }}
                >
                    <p style={{width: '30rem'}} class="nes-balloon from-right">
                        Just start typing anywhere
                        to start the timer!
                    </p>
                </motion.div>
            )
        }
        if(mainArea === FRAMES.TYPINGFRAME && state.isTimerOn){
            setPopupBubble(
                <motion.div
                transition={bounceTransition}
                animate={{
                    y: ["40%", "30%"],
                    backgroundColor: ["#ff6699", "#6666ff"],
                    borderRadius: "15px",
                }}
                >
                    <p style={{width: '30rem'}} class="nes-balloon from-left">
                        Good luck out there!
                    </p>
                </motion.div>
            )
        }
        if(mainArea === FRAMES.GAMEOVERFRAME) {
            setPopupBubble (
                <motion.div
                transition={bounceTransition}
                animate={{
                    y: ["5%", "0%"],
                    backgroundColor: ["#ff6699", "#6666ff"],
                    borderRadius: "15px",
                    // width: "12rem",
                }}
                >
                    <h2 class="nes-balloon from-left">
                        Game Over
                    </h2>
                </motion.div>
            )
        }
    };
    
    const handleTimeExpire = () => {
        setMainArea(FRAMES.LOADINGSCREEN);
        setTimeout(()=>{
            setMainArea(FRAMES.GAMEOVERFRAME);
        }, 2000);
    };

    const handleRestartButton = () => {
        dispatch({ type: ACTIONS.RESET });
        setMainArea(FRAMES.RESETFRAME);
    };
    
    useEffect(() => {
        if(state.timeLeft >= state.timeLimit && mainArea == FRAMES.RESETFRAME){
            setTimeout(()=>{
                setMainArea(FRAMES.TYPINGFRAME);
            }, 700);
        }
        if(state.isTimerOn && state.timeLeft === 0 && mainArea === FRAMES.TYPINGFRAME) {
            handleTimeExpire();
        }
        determinePopupBubble();
        
    }, [mainArea, state.timeLeft]);

    return(
        <>
                
            <img className="background-image" src={backgroundImage} alt="wallpaper" />

                <div className="root">
                    <motion.h1
                        initial={{y: -20}}
                        animate={{y: 20}}
                    >
                        <h1 className="title">Typing Speed Quest</h1>
                    </motion.h1>

                    <div className="popup-bubble">
                        {
                            popupBubble 
                                ?
                                popupBubble 
                                :
                                <motion.div
                                    transition={bounceTransition}
                                    animate={{
                                        y: ["30%", "20%"],
                                        backgroundColor: ["#ff6699", "#6666ff"],
                                        backgroundSize: {width: '25rem'},
                                        borderRadius: "10px",
                                    }}
                                >
                                    <p style={{width: '30rem'}} class="nes-balloon from-right">
                                        Just start typing anywhere
                                        to start the timer!
                                    </p>
                                </motion.div>
                        }
                    </div>

                    <div className="main-area-container">

                    {displayMainArea(mainArea)}

                    </div>
                    {
                        mainArea === FRAMES.TYPINGFRAME || mainArea === FRAMES.RESETFRAME || mainArea === FRAMES.CHANGINGDIFFICULTY
                            ? 
                            <div className="time-bar">
                                <progress class="nes-progress is-primary" value={state.timeLeft} max={state.timeLimit}></progress>
                            </div>
                            :
                            null
                    }

                    <div className="button-container" >
                        <Timer />
                        <motion.div
                            style={{ margin: '1.5rem', marginTop: '2rem',}}
                            animate={{ scale: 1.5 }}
                            transition={{ duration: 0.6 }}
                        >
                            <button className="nes-btn is-success reset-button" onClick={ handleRestartButton }>Restart</button>
                        </motion.div>
                        <motion.div
                            style={{ margin: '1.5rem', marginTop: '2rem',}}
                            animate={{ scale: 1.3 }}
                            transition={{ duration: 0.8 }}
                        >
                            <button className="nes-btn is-primary double-layered-button" ><h5>CPM</h5>{state.correctKeyStrokes}</button>  
                        </motion.div>
                        <div className="btn-difficulty-row">
                            <button className="nes-btn" onClick={ handleEasyButton }>Easy</button>
                            <button className="nes-btn" onClick={ handleNormalButton }>Normal</button>
                            <button className="nes-btn is-error" onClick={ handleHardButton }>Hard</button>
                        </div>
                    </div>
                </div>
        </>
    )
};

export default TypingTest;
