import { useState } from 'react';
import { commonWords } from './lists/commonWords.json';
import windowDimensions from '../windowSizeTool/WindowDimensions';


export var words = commonWords.split(' ');

export const shuffle = () => {
    var temp = words.slice();
    for (let i = temp.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    return temp;
}
export var shuffledWords = shuffle();

export const randomWords = (count = 10) => {
    var temp = shuffledWords.splice(0, count);
    return temp;
}

export const randomStringWords = (count = 10) => {
    var temp = shuffledWords.splice(0,count);
    return temp.join(' ');
}