import { useState } from 'react';
import { commonWords } from './lists/commonWords.json';
import { lessCommonWords } from './lists/lessCommonWords.json';
import { uncommonWords } from './lists/uncommonWords.json';
import windowDimensions from '../tools/WindowDimensions';


export var words = commonWords.split(' ');
export var newList;

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



export const getNewWords = (newWords) => {
    
    const updatedList = newWords.split(' ');

    var temp = updatedList.slice();
    for (let i = temp.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    temp.splice(0,10);
    return temp.join(' ');
}