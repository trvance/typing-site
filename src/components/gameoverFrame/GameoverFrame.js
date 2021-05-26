import { useState, useContext } from 'react';
import { GameContext } from '../../context/GameContext';
import { motion } from 'framer-motion';
import './GameoverFrame.css';


// const animateStars = (image) => {
//     return (
//         <motion.i 
//             initial={{ scale: .2, opacity: .3 }}
//             animate={{ scale: 1, opacity: 1}} 
//             transition={{ ease: 'easeIn', duration: .1 }}
//         >
//             {image}
//         </motion.i>
//     )
// };

// const displayStars = ({wpm}) => {
//     let numOfStars;
//     let display = new Array(5);

//     if(wpm >= 100) { numOfStars=5 };
//     if(90 <= wpm && wpm < 100) { numOfStars=4.5 };
//     if(80 <= wpm && wpm < 90) { numOfStars=4 };
//     if(70 <= wpm && wpm < 80) { numOfStars=3.5 };
//     if(60 <= wpm && wpm < 70) { numOfStars=3 };
//     if(50 <= wpm && wpm < 60) { numOfStars=2.5 };
//     if(40 <= wpm && wpm < 50) { numOfStars=2 };
//     if(30 <= wpm && wpm < 40) { numOfStars=1.5 };
//     if(20 <= wpm && wpm < 30) { numOfStars=1 };
//     if(10 <= wpm && wpm < 20) { numOfStars=.5 };
//     if(0 <= wpm && wpm < 10) { numOfStars=0 };

//     for(let count = 1; count <= display.length; count++) {
//         if(count <= numOfStars) {
//             display.push(animateStars(<i class="nes-icon is-medium star"></i>));
//         }
//         else if(numOfStars % 1 != 0){
//             display.push(animateStars(<i class="nes-icon is-medium star is-half"></i>));
//         }
//         else {
//             display.push(animateStars(<i class="nes-icon is-medium star is-transparent"></i>));
//         }
//     }

//     return display;
// };


const GameoverFrame = () => {
    const { state } = useContext(GameContext);

    const computeWPM = () => {
        const duration = state.timeLimit;
        const correctKeyStrokes = state.correctKeyStrokes;
        const lengthOfWord = 5;
        const multiplier = 60/duration;

        return (Math.floor(multiplier * (correctKeyStrokes/lengthOfWord)));
    };

    const displayStars = () => {

        const wpm = computeWPM();

            if(wpm >= 100){

                return (
                    <div class="star-container">
                        <motion.i 
                            initial={{scale: .5}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, }}
                        >
                            <i class="nes-icon is-medium star"></i>
                        </motion.i>
                        <motion.i 
                            initial={{scale: .5}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .1 }}
                        >
                            <i class="nes-icon is-medium star"></i>
                        </motion.i>
                        <motion.i 
                            initial={{scale: .4}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .2}}
                        >
                            <i class="nes-icon is-medium star"></i>
                        </motion.i>
                        <motion.i 
                            initial={{scale: .3}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .3}}
                        >
                            <i class="nes-icon is-medium star"></i>
                        </motion.i>
                        <motion.i 
                            initial={{scale: .3}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .4}}
                        >
                            <i class="nes-icon is-medium star"></i>
                        </motion.i>
                    </div>
                )
            };

            if(80 <= wpm && wpm < 100){

                return (
                    <div class="star-container">
                        <motion.i 
                            initial={{scale: .5}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, }}
                        >
                            <i class="nes-icon is-medium star"></i>
                        </motion.i>
                        <motion.i 
                            initial={{scale: .5}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .1 }}
                        >
                            <i class="nes-icon is-medium star"></i>
                        </motion.i>
                        <motion.i 
                            initial={{scale: .4}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .2}}
                        >
                            <i class="nes-icon is-medium star"></i>
                        </motion.i>
                        <motion.i 
                            initial={{scale: .3}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .3}}
                        >
                            <i class="nes-icon is-medium star"></i>
                        </motion.i>
                        <motion.i 
                            initial={{scale: .3}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .4}}
                        >
                        {
                            wpm > 90 
                            ?
                            <i class="nes-icon is-medium star is-half"></i>
                            :
                            <i class="nes-icon is-medium star is-transparent"></i>
                        }
                        </motion.i>
                    </div>
                )
            };

            if(60 <= wpm && wpm < 80){

                return (
                    <div class="star-container">
                        <motion.i 
                            initial={{scale: .5}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, }}
                        >
                            <i class="nes-icon is-medium star"></i>
                        </motion.i>
                        <motion.i 
                            initial={{scale: .5}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .1 }}
                        >
                            <i class="nes-icon is-medium star"></i>
                        </motion.i>
                        <motion.i 
                            initial={{scale: .4}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .2}}
                        >
                            <i class="nes-icon is-medium star"></i>
                        </motion.i>
                        <motion.i 
                            initial={{scale: .3}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .3}}
                        >
                        {
                            wpm > 70 
                            ?
                            <i class="nes-icon is-medium star is-half"></i>
                            :
                            <i class="nes-icon is-medium star is-transparent"></i>
                        }
                        </motion.i>
                        <motion.i 
                            initial={{scale: .3}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .4}}
                        >
                            <i class="nes-icon is-medium star is-transparent"></i>
                        </motion.i>
                    </div>
                )
            };

            if(40 <= wpm && wpm < 60){

                return (
                    <div class="star-container">
                        <motion.i 
                            initial={{scale: .5}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, }}
                        >
                            <i class="nes-icon is-medium star"></i>
                        </motion.i>
                        <motion.i 
                            initial={{scale: .5}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .1 }}
                        >
                            <i class="nes-icon is-medium star"></i>
                        </motion.i>
                        <motion.i 
                            initial={{scale: .4}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .2}}
                        >
                        {
                            wpm > 50 
                            ?
                            <i class="nes-icon is-medium star is-half"></i>
                            :
                            <i class="nes-icon is-medium star is-transparent"></i>
                        }
                        </motion.i>
                        <motion.i 
                            initial={{scale: .3}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .3}}
                        >
                            <i class="nes-icon is-medium star is-transparent"></i>
                        </motion.i>
                        <motion.i 
                            initial={{scale: .3}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .4}}
                        >
                            <i class="nes-icon is-medium star is-transparent"></i>
                        </motion.i>
                    </div>
                )
            };

            if(20 <= wpm && wpm < 40){

                return (
                    <div class="star-container">
                        <motion.i 
                            initial={{scale: .5}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, }}
                        >
                            <i class="nes-icon is-medium star"></i>
                        </motion.i>
                        <motion.i 
                            initial={{scale: .5}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .1 }}
                        >
                        {
                            wpm > 30 
                            ?
                            <i class="nes-icon is-medium star is-half"></i>
                            :
                            <i class="nes-icon is-medium star is-transparent"></i>
                        }
                        </motion.i>
                        <motion.i 
                            initial={{scale: .4}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .2}}
                        >
                            <i class="nes-icon is-medium star is-transparent"></i>
                        </motion.i>
                        <motion.i 
                            initial={{scale: .3}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .3}}
                        >
                            <i class="nes-icon is-medium star is-transparent"></i>
                        </motion.i>
                        <motion.i 
                            initial={{scale: .3}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .4}}
                        >
                            <i class="nes-icon is-medium star is-transparent"></i>
                        </motion.i>
                    </div>
                )
            };
            
            if(0 <= wpm && wpm < 20){

                return (
                    <div class="star-container">
                        <motion.i 
                            initial={{scale: .5}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, }}
                        >
                        {
                            wpm > 10 
                            ?
                            <i class="nes-icon is-medium star is-half"></i>
                            :
                            <i class="nes-icon is-medium star is-transparent"></i>
                        }
                        </motion.i>
                        <motion.i 
                            initial={{scale: .5}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .1 }}
                        >
                            <i class="nes-icon is-medium star is-transparent"></i>
                        </motion.i>
                        <motion.i 
                            initial={{scale: .4}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .2}}
                        >
                            <i class="nes-icon is-medium star is-transparent"></i>
                        </motion.i>
                        <motion.i 
                            initial={{scale: .3}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .3}}
                        >
                            <i class="nes-icon is-medium star is-transparent"></i>
                        </motion.i>
                        <motion.i 
                            initial={{scale: .3}}
                            animate={{ scale: 1 }} 
                            transition={{ ease: 'easeIn', duration: .3, delay: .4}}
                        >
                            <i class="nes-icon is-medium star is-transparent"></i>
                        </motion.i>
                    </div>
                )
            };

    };




    return (
        <div className="root">
            <motion.h3
                initial={{y: -20}}
                animate={{y: 0}}
                transition={{duration: .4}}
            >
                <h3>You conquered {Math.floor(state.correctKeyStrokes/5)} words in {state.timeLimit} seconds!</h3>

            </motion.h3>
            <h1>{computeWPM()} WPM</h1>
            <div class="star-container">
                {displayStars({wpm: computeWPM()})}
            </div>
        </div>
    )
}

export default GameoverFrame;
