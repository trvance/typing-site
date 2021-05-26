import { useState, useEffect, useContext } from "react";
import useKeyPress from '../../hooks/useKeyPress';
import { commonWords } from '../../listOfWords/lists/commonWords.json';
import { lessCommonWords } from '../../listOfWords/lists/lessCommonWords.json';
import windowDimensions from '../../tools/WindowDimensions';
import { words, randomStringWords, getNewWords } from '../../listOfWords/ListOfWords';
import './TypingArea.css';
import { motion } from "framer-motion";
import { ACTIONS, GameContext } from '../../context/GameContext';



const TypingArea = () => {
    
    const { state, dispatch } = useContext(GameContext);
    const [whichWords, setWhichWords] = useState(state.wordList);
    const [words, setWords] = useState(getNewWords(whichWords));

    const [leftPadding, setLeftPadding] = useState(
        new Array(20).fill(' ').join(''),
    );
    const [outgoingChars, setOutgoingChars] = useState('');
    const [currentChar, setCurrentChar] = useState(words.charAt(0));
    const [incomingChars, setIncomingChars] = useState(words.substr(1));


    useKeyPress(key => {
 
        if (!state.isTimerOn) {
            dispatch({type: ACTIONS.STARTTIMER});
        }
        
        let updatedOutgoingChars = outgoingChars;
        let updatedIncomingChars = incomingChars;
        
        if (key === currentChar) {

            dispatch({type: ACTIONS.INCREASEKEYCOUNT});

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

    useEffect(() => {
        setWords(getNewWords(state.wordList));
    }, [state.wordList]);

    useEffect(() => {
        setWords(randomStringWords);
    }, [state.isTimerOn])

    return (
        <div className="typing-area">
            <p className="Character">
                <span className="Character-out">
                    {(leftPadding + outgoingChars).slice(-20)}
                </span>
                <motion.button
                    style={{backgroundColor: 'lightblue', size: '110%', border: 1}}
                    animate={{scale: 1.1, }}
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
