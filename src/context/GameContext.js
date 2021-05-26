import { createContext, useReducer, useMemo } from 'react';
import { commonWords } from '../listOfWords/lists/commonWords.json';
import { lessCommonWords } from '../listOfWords/lists/lessCommonWords.json';
import { uncommonWords } from '../listOfWords/lists/uncommonWords.json';


export const GameContext = createContext();

const DURATION = 60;

export const ACTIONS = {
    STARTTIMER : 'startTimer',
    DECREASETIME : 'decreaseTime',
    INCREASETIME : 'increaseTime',
    DECREASEKEYCOUNT : 'decreaseKeyCount',
    INCREASEKEYCOUNT : 'increaseKeyCount',
    EASYMODE : 'easy',
    NORMALMODE : 'normal',
    HARDMODE : 'hard',
    RESET : 'reset',
};

const initialState = {
    wordList: commonWords,
    timeLimit: DURATION,
    timeLeft: DURATION,
    correctKeyStrokes: 0,
    isTimerOn: false,
};


const reducer = (state, action) => {
    switch(action.type) {
        case ACTIONS.STARTTIMER:
            return { ...state, isTimerOn : true };
        case ACTIONS.STOPTIMER:
            return { ...state, isTimerOn : false };

        case ACTIONS.DECREASETIME:
            return { ...state, timeLeft : state.timeLeft - 1 };
        case ACTIONS.INCREASETIME:
            return { ...state, timeLeft : state.timeLeft + 1 };

        case ACTIONS.DECREASEKEYCOUNT:
            return { ...state, correctKeyStrokes : state.correctKeyStrokes - 1 };
        case ACTIONS.INCREASEKEYCOUNT:
            return { ...state, correctKeyStrokes : state.correctKeyStrokes + 1 };

        case ACTIONS.EASYMODE:
            return { ...initialState, timeLeft : state.timeLeft, wordList : commonWords };
        case ACTIONS.NORMALMODE:
            return { ...initialState, timeLeft : state.timeLeft, wordList : lessCommonWords };
        case ACTIONS.HARDMODE:
            return { ...initialState, timeLeft : state.timeLeft, wordList : uncommonWords };

        case ACTIONS.RESET:
            return {...initialState, timeLeft : state.timeLeft};
        default:
            return state;
    };
};

export const GameProvider = ( { children } ) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const contextValue = useMemo(() => {
        return { state, dispatch };
    }, [state, dispatch]);
  
    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
};