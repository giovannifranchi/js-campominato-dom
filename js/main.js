'use strict';

// FUNCTIONS

function levelConverterInNumber(input){
    let number;
    switch(input){
        case 'easy':
            number = 10;
            break;
        case 'medium':
            number = 9;
            break;
        case 'hard':
            number = 7;
            break;
    }
    return number;
}

function createHtmlElement(element, className, quantity = 10, container){
    const fragment = document.createDocumentFragment();
    const gameContainer = document.querySelector(container);
    for(let i = 0; i < Math.pow(quantity, 2); i++){
        let newElement = document.createElement(element);
        newElement.classList.add(className);
        // newElement.innerHTML = i;
        switch (quantity){
            case 10:
                newElement.classList.add('easy');
                break;
            case 9:
                newElement.classList.add('medium');
                break;
            case 7:
                newElement.classList.add('hard');
                break;
        }
        fragment.append(newElement);
    }
    gameContainer.append(fragment);
}
function createHtmlElementBasic(element, className, quantity = 10, container){
    const fragment = document.createDocumentFragment();
    const gameContainer = document.querySelector(container);
    for(let i = 0; i < Math.pow(quantity, 2); i++){
        let newElement = document.createElement(element);
        newElement.classList.add(className);
        newElement.innerHTML = i;
        switch (quantity){
            case 10:
                newElement.classList.add('easy');
                break;
            case 9:
                newElement.classList.add('medium');
                break;
            case 7:
                newElement.classList.add('hard');
                break;
        }
        fragment.append(newElement);
    }
    gameContainer.append(fragment);
}

function createLeftBorder(arrayLenght){
    const yRatio = Math.sqrt(arrayLenght);
    let leftBorderArray = [];
    for(let i = 0; i < arrayLenght; i+= yRatio){
        leftBorderArray.push(i);
    }
    return leftBorderArray;
}

function createRightBorder(arrayLenght){
    const yRatio = Math.sqrt(arrayLenght);
    let rightBorderArray = [];
    for(let i = yRatio - 1; i < arrayLenght; i += yRatio){
        rightBorderArray.push(i);
    }
    return rightBorderArray;
}

function createTopBorder(arrayLenght){
    const xRatio = 1;
    const yRatio = Math.sqrt(arrayLenght);
    let topBorderArray = [];
    for(let i = 0; i < yRatio; i += xRatio){
        topBorderArray.push(i);
    }
    return topBorderArray;
}

function createBottomBorder(arrayLenght){
    const xRatio = 1;
    const yRatio = Math.sqrt(arrayLenght);
    let bottomBorderArray = [];
    for(let i = yRatio * (yRatio - xRatio); i < arrayLenght; i += xRatio){
        bottomBorderArray.push(i);
    }
    return bottomBorderArray;
}



function isCoincident(input, controlList){
    if(controlList.includes(input)){
        return true;
    }
    return false;
}

function generateRandomNum(min, max){
    const randomNum = Math.floor(Math.random() * (max - min) + min);
    return randomNum;
}

function createBombsArray(arrayLenght, input){
    const bombsArray = [];
    for(let i = 0; i < Math.floor(arrayLenght / 5); i++){
        const newBomb = generateRandomNum(0, arrayLenght - 1);
        if(bombsArray.includes(newBomb) || newBomb === input){
            i--;
        }else{
            bombsArray.push(newBomb);
        }
    }
    return bombsArray;
}

function draw(input, elementArray, nearBombs, isCoincident, newEmpty){
    const element = elementArray[input];
    if(!isCoincident){
        switch(nearBombs){
            case 0:
                element.classList.add('empty');
                break;
            case 1:
                element.innerHTML = nearBombs;
                element.classList.add('one');
                break;
            case 2:
                element.innerHTML = nearBombs;
                element.classList.add('two');
                break;
            case 3:
                element.innerHTML = nearBombs;
                element.classList.add('three');
                break;
            case 4:
                element.innerHTML = nearBombs;
                element.classList.add('four');
                break;
            case 5:
                element.innerHTML = nearBombs;
                element.classList.add('five');
                break;
            case 6:
                element.innerHTML = nearBombs;
                element.classList.add('six');
                break;
            case 7:
                element.innerHTML = nearBombs;
                element.classList.add('seven');
                break;
            case 8:
                element.innerHTML = nearBombs;
                element.classList.add('eight');
                break;
        }
    }else {
        element.innerHTML = 'BOMB';
    }
    if(newEmpty.length > 0){
        for(let i = 0; i < newEmpty.length; i++){
            elementArray[newEmpty[i]].classList.add('empty');
        }
    }
}
function drawBasic(input, elementArray, isCoincident, bombsArray){
    const element = elementArray[input];
    if(!isCoincident){
        element.classList.add('clicked');
    }else {
        for(let i = 0; i < bombsArray.length; i++){
            elementArray[bombsArray[i]].classList.add('bomb');
        }
    }
}

//Gives the Reference Array to each input in oder to check around

function checkAround(input, borderRight, borderLeft, borderTop, borderBottom){
    const yRatio =  borderBottom.length;
    const xRatio = 1;
    const top = input - yRatio;
    const topRight = input - yRatio;
    const right = input + xRatio;
    const rightBottom = input + yRatio + xRatio;
    const bottom = input + yRatio;
    const bottomLeft = input +yRatio - xRatio;
    const left = input - xRatio;
    const leftTop = input - xRatio - yRatio;
    let referenceArray = [top, topRight, right, rightBottom, bottom, bottomLeft, left, leftTop];
    if(borderLeft.includes(input)){
        if(borderTop.includes(input)){
            const newArray = [right, rightBottom, bottom]
            referenceArray = [...newArray];
        }else if(borderBottom.includes(input)){
            const newArray = [top, topRight, right];
            referenceArray = [...newArray];
        }else {
            const newArray = [top, topRight, right, rightBottom, bottom];
            referenceArray = [...newArray];
        }
    }else if(borderRight.includes(input)){
        if(borderTop.includes(input)){
            const newArray = [left, bottomLeft, bottom];
            referenceArray = [...newArray];
        }else if(borderBottom.includes(input)){
            const newArray = [top, leftTop, left]; 
            referenceArray = [...newArray];
        }else{
            const newArray = [top, leftTop, left, bottomLeft, bottom];
            referenceArray = [...newArray];
        }
    }else if(borderTop.includes(input)){
        const newArray = [left, bottomLeft, bottom, rightBottom, right];
        referenceArray = [...newArray];
    }else if(borderBottom.includes(input)){
        const newArray = [left, leftTop, top, topRight, right];
        referenceArray = [...newArray];
    }
    return referenceArray;
}

function newCheckBombs(input, controlList, borderRight, borderLeft, borderTop, borderBottom){
    let newBombs = 0;
    const referenceArray = checkAround(input,borderRight, borderLeft, borderTop, borderBottom);
    for(let i = 0; i < referenceArray.length; i++){
        if(controlList.includes(referenceArray[i])){
            newBombs++;
        }
    }
    return newBombs;
}

function checkAroundEmpty(input, controlList, borderRight, borderLeft, borderTop, borderBottom){
    let newEmpty = [];
    const referenceArray = checkAround(input,borderRight, borderLeft, borderTop, borderBottom);
    for(let i = 0; i < referenceArray.length; i++){
        if(newCheckBombs(referenceArray[i], controlList, borderRight, borderLeft, borderTop, borderBottom) === 0){
            newEmpty.push(referenceArray[i]);
        }
    }
    return newEmpty;
}

function game(){
    const boxes = document.querySelectorAll('.box');
    const rightBorder = createRightBorder(boxes.length);
    const leftBorder = createLeftBorder(boxes.length);
    const topBorder = createTopBorder(boxes.length);
    const bottomBorder = createBottomBorder(boxes.length);

    for(let i = 0; i < boxes.length; i++){
        boxes[i].addEventListener('click', ()=>{
            let nearBombs = 0;
            let impactedBomb = false;
            let newEmpty = [];
            if(!hasClicked){
                hasClicked = true;
                bombsArray = [...createBombsArray(boxes.length, i)];
                nearBombs = newCheckBombs(i, bombsArray,rightBorder, leftBorder, topBorder, bottomBorder);
                if(nearBombs === 0){
                    newEmpty = [...checkAroundEmpty(i, bombsArray,rightBorder, leftBorder, topBorder, bottomBorder)]
                }
            }else{
                impactedBomb = isCoincident(i, bombsArray);
                nearBombs = newCheckBombs(i, bombsArray,rightBorder, leftBorder, topBorder, bottomBorder);
                if(nearBombs === 0){
                    newEmpty = [...checkAroundEmpty(i, bombsArray,rightBorder, leftBorder, topBorder, bottomBorder)]
                }
            }
            draw(i, boxes, nearBombs, impactedBomb, newEmpty);
        });
    }
}

function drawScore(score, element){
    element.innerHTML = score;
}

function gameAdvancedVersion(){
    const boxes = document.querySelectorAll('.box');
    const rightBorder = createRightBorder(boxes.length);
    const leftBorder = createLeftBorder(boxes.length);
    const topBorder = createTopBorder(boxes.length);
    const bottomBorder = createBottomBorder(boxes.length);
    for(let i = 0; i < boxes.length; i++){
        boxes[i].addEventListener('click', ()=>{
            let nearBombs = 0;
            let impactedBomb = false;
            let newEmpty = [];
            if(!hasClicked){
                hasClicked = true;
                bombsArray = [...createBombsArray(boxes.length, i)];
                nearBombs = newCheckBombs(i, bombsArray,rightBorder, leftBorder, topBorder, bottomBorder);
                if(nearBombs === 0){
                    newEmpty = [...checkAroundEmpty(i, bombsArray,rightBorder, leftBorder, topBorder, bottomBorder)]
                }
            }else{
                impactedBomb = isCoincident(i, bombsArray);
                nearBombs = newCheckBombs(i, bombsArray,rightBorder, leftBorder, topBorder, bottomBorder);
                if(nearBombs === 0){
                    newEmpty = [...checkAroundEmpty(i, bombsArray,rightBorder, leftBorder, topBorder, bottomBorder)]
                }
            }
            draw(i, boxes, nearBombs, impactedBomb, newEmpty);
        });
    }
}


function hasWon(controlList, bombsArrayLength, boxesLength){
    const numberToWin = boxesLength.length - bombsArrayLength.length;
    if(controlList.length === numberToWin){
        return true
    }else{
        return false;
    }
}


function displayText(elementsArray, position, str = ''){
    const elements = document.querySelectorAll(elementsArray);
    elements[position].classList.remove('active');
    if(position === 2){
        position = 0;
    }
    position++
    elements[position].classList.add('active');
    if(str !== ''){
        elements[position].innerHTML = str;
    }
}

function removeListeners(boxes) {
    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      const newBox = box.cloneNode(true);
      box.parentNode.replaceChild(newBox, box);
    }
  }

function gameBasicVersion(){
    const boxes = document.querySelectorAll('.box');
    const scoreText = document.getElementById('score');
    let hasClicked = false;
    let bombsArray = [];
    let impactedBomb = false;
    let score = 0;
    let clickedBoxes = [];
    let hasWonned = false;
    for(let i = 0; i < boxes.length; i++){
        boxes[i].addEventListener('click', ()=>{
            if(!hasClicked){
                hasClicked = true;
                bombsArray = [...createBombsArray(boxes.length, i)];
                if(!clickedBoxes.includes(i)){
                    score++;
                    clickedBoxes.push(i);
                }
            }else {
                impactedBomb = isCoincident(i, bombsArray);
                if(!clickedBoxes.includes(i) && !bombsArray.includes(i)){
                    score++;
                    clickedBoxes.push(i);
                    hasWonned = hasWon(clickedBoxes, bombsArray, boxes);
                }
            }
            console.log(bombsArray);
            drawBasic(i, boxes, impactedBomb, bombsArray);
            if(impactedBomb || hasWonned){
                if(impactedBomb){
                    const loseMessage = `Sorry you lost with a score of: ${score}`;
                    displayText(textElemets, 1, loseMessage);
                    score = 0;
                    removeListeners(boxes);
                }else if(hasWonned){
                    const winMessage = `You Won with a score of: ${score}`;
                    displayText(textElemets, 1, winMessage);
                    score = 0;
                }
            }
            drawScore(score, scoreText);
        });
    }
}

function gameBasic(element, className, quantity = 10, container){
    createHtmlElementBasic(element, className, quantity = 10, container);
    gameBasicVersion();
}

function gameAdvanced(element, className, quantity = 10, container){
    createHtmlElement(element, className, quantity = 10, container);
    gameAdvancedVersion();
}

function game(version, element, className, quantity = 10, container){
    if(version === 'basic'){
        gameBasic(element, className, quantity = 10, container);
    }else {
        gameAdvanced(element, className, quantity = 10, container);
    }
}




// PROGRAM

const element = 'div';
const className = 'box';
const container = '.board';
const textElemets = '.footer-text';
const level = document.getElementById('level');
const playBtn = document.getElementById('play-btn');
const version = document.getElementById('version');
let hasClicked = false;
let bombsArray = [];
let hasPlayed = false;



playBtn.addEventListener('click', ()=>{
    const board = document.querySelector('.board');
    board.innerHTML = '';
    if(hasPlayed === false){
        displayText(textElemets, 0);
    }else {
        displayText(textElemets, 2);
    }
    hasPlayed = true;
    game(version.value, element, className, levelConverterInNumber(level.value),container);
});

// Remove gli event listener;

console.log(version.value);





