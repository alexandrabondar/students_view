/**
 * fruits arr is a store of fruits, fill as you wish
 * Example
 * ['banana', 'orange', 'orange']
 */
const fruits = ['banana', 'banana', 'banana', 'banana', 'orange', 'banana', 'orange', 'apple'];


/**
 * fruitsBought arr is a store of bought fruits
 * push fruit here after buying
 */
const fruitsBought = [];

/**
 * logs array is used to store logs on the page.
 * Can be filled with executing log function
 * 
 * Example:
 * log(customerName, fruitName, success)
 * where
 * - customerName is name of customer
 * - fruitName is name of fruit
 * - success is state if customer bought a fruit
 */
const logs = []; 

/**
 * Example of customer
 */
const customers = [{
    name: 'Ivan',
    balance: 46,
    fruitsToBuy: [{
        name: 'banana',
        count: 4,
    }]
}];

/**
 * Function buyFruits is used to iterate over array passes as a param
 * if customer wants to buy 4 banana try to remove banana from fruits array (find it above)
 * and push it to fruitsBought array (find it above)
 * 
 * Push execution result in log
 * function log is written below, you'll find execution example on line 18 of this file
 * 
 * Example:
 * buyFruits(customers)
 */
function buyFruits(customersArr) {
    let buy_fruit = customers[0]['fruitsToBuy'][0]['name'];
    let count = customers[0]['fruitsToBuy'][0]['count'];

    for (let i = 0; i < fruits.length; i++){
        for(let j = 0; j < count; j++){          
            if (buy_fruit === fruits[i]){
            console.log(fruits[i]);
            fruitsBought.push(fruits[i]);
            fruits.splice(i, 1);
            log(customers[0]['name'], customers[0]['fruitsToBuy'][0]['name'], true);
            count -=1;
            console.log(fruits);
            console.log(fruitsBought);
            }
        }
    }
}

// buyFruits(customers)

/**
 * Function getFruitsMap returns map of fruits
 * Example:
 * 
 * const fr = ['banana', 'orange', 'orange']
 * getFruitsMap(fr); -> { banana: 1, orange: 2 }
 * 
 */
 function getFruitsMap(fruitsArr) {
    count = 1
    const myMap = new Map();
    for(let i = 0; i < fruitsArr.length; i++){
        if (fruitsArr[i] == fruitsArr[i+1]){
            count+=1;
        } 
        myMap.set(fruitsArr[i], count);
    }
    let obj = Object.fromEntries(myMap.entries());
    console.log(obj);
    return obj;
 }

// DONT'T EDIT FOLLOWING CODE
buyFruits(customers);
const fruitsLeftMap = getFruitsMap(fruits);
const fruitsBoughtMap = getFruitsMap(fruitsBought);


function log (customerName, fruitName, success) {
    const action = success ? 'bought' : 'faliled to buy';
    const className = success ? 'green' : 'red'
    logs.push(`${customerName} <span class=${className}>${action}</span> ${fruitName}`);
}

function render () {
    renderLog();
    renderFruits('fruits-left', fruitsLeftMap);
    renderFruits('fruits-bought', fruitsBoughtMap);

    function renderLog() {
        let existingLogsContainer = document.getElementById('messages');
        let mainLogsContainer =  document.getElementById('log');
        
        if (existingLogsContainer) {
            mainLogsContainer.removeChild(existingLogsContainer);
        }
        
        const logsContainer = document.createElement('ul');
        logsContainer.id = 'messages';
        
        logs.forEach(log => {
            const logEl = document.createElement('li');
            logEl.innerHTML = log;
            logsContainer.appendChild(logEl);
        });
        
        mainLogsContainer.appendChild(logsContainer);    
    }
    
    function renderFruits (id, mappedData) {
        const mainFruitsContainer = document.getElementsByClassName(id)[0];
        const existingFruitsBoughtContainer = (mainFruitsContainer.getElementsByClassName('fruits-list') || [])[0];
        
        if (existingFruitsBoughtContainer) {
            mainFruitsContainer.removeChild(existingFruitsBoughtContainer);
        }
        
        const fruitsContainer = document.createElement('ul');
        fruitsContainer.classList.add('fruits-list');
        
        for (let key in mappedData) {
            const fruitEl = document.createElement('li');
            const nameEl = document.createElement('span');
            const countEl = document.createElement('span');
            nameEl.innerText = `${key}:`;
            countEl.innerText = mappedData[key];
        
            fruitEl.appendChild(nameEl);
            fruitEl.appendChild(countEl);
            fruitsContainer.appendChild(fruitEl);
        }
        
        mainFruitsContainer.appendChild(fruitsContainer);
    }
}
