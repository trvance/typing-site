import 'nes.css/css/nes.min.css';
import TypingTest from './components/TypingTest';
import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { GameProvider, GameContext } from './context/GameContext';

function App() {

    return (
        <div>
            <GameProvider>
                <TypingTest />
            </GameProvider>
        </div>
    );
}

export default App;
