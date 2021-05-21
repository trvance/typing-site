import { useState,useEffect } from "react";
import useKeyPress from '../../hooks/useKeyPress';
import { commonWords } from '../../listOfWords/lists/commonWords.json';
import windowDimensions from '../../windowSizeTool/WindowDimensions';
import { words, randomStringWords } from '../../listOfWords/ListOfWords';

import './TypingArea.css';
import { motion } from "framer-motion";



const TypingArea = ({startTimer, setKeyCounter}) => {

    const [words, setWords] = useState(randomStringWords);
    const [numKeys, setNumKeys] = useState(0);

    const [isTimerActivated, setIsTimerActivated] = useState(false);
    const [leftPadding, setLeftPadding] = useState(
        new Array(20).fill(' ').join(''),
    );
    const [outgoingChars, setOutgoingChars] = useState('');
    const [currentChar, setCurrentChar] = useState(words.charAt(0));
    const [incomingChars, setIncomingChars] = useState(words.substr(1));

    useKeyPress(key => {
        if(!isTimerActivated) {
            startTimer(true);
        }
        else {
            setKeyCounter(numKeys);
        }

        let updatedOutgoingChars = outgoingChars;
        let updatedIncomingChars = incomingChars;

        if (key === currentChar) {
            setNumKeys(numKeys + 1);

            if (leftPadding.length > 0) {
                setLeftPadding(leftPadding.substr(1));
            }

            updatedOutgoingChars += currentChar;
            setOutgoingChars(updatedOutgoingChars);

            setCurrentChar(incomingChars.charAt(0));

            updatedIncomingChars = incomingChars.substr(1);
            if (updatedIncomingChars.split(' ').length < 10) {
                updatedIncomingChars += ' ' + randomStringWords();
            }
            setIncomingChars(updatedIncomingChars);
        }
    });

    return (
        <div className="typing-area">
            <p className="Character">
                <span className="Character-out">
                    {(leftPadding + outgoingChars).slice(-20)}
                </span>
                <motion.button
                    style={{backgroundColor: 'lightblue', size: '110%', border: 1}}
                    animate={{scale: 1.1, duration: 1}}
                    transition={{duration: .1}}
                >

                    <span className="Character-current">{currentChar}</span>
                </motion.button>
                <span className="Character-incoming">{incomingChars.substr(0, 20)}</span>
            </p>
        </div>
    )
}

export default TypingArea;
