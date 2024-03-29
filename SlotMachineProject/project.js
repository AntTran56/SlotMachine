/* Project start Jan. 11, 2024
Learning JavaScript from "Tech with Tim" on YouTube
https://youtu.be/E3XxeE7NF30?si=DLtv0Am94lOF9di-

This Project is a Slot Machine Simulation.
The player will bet some money and guess how many lines will match.
The program will simulate the machine and return/take any winnings/losses.
 */

//uses the prompt-sync package to get user input
const prompt = require("prompt-sync")();

//Defining the Slot Machine Wheels
const ROWS = 3;
const COLS = 3;

        //declaring an Object with {}
        //Items in " " are keys. They are mapped with ":"" to a value
    //Definining how many of each symbols are on each wheel
const SYMBOLS_COUNT = {
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8
}
    //Defining the multiplier value of symbols for winnings payout
const SYMBOLS_VALUES ={
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 2
}

// 1. Deposit some money
//ES6 Style: Arrow Function
const deposit = () => {
    while(true) {
        const depositAmount = prompt("Enter a deposit amount: ");
        //Convert the prompt String into number type (int or double)
        const numberDepositAmount = parseFloat(depositAmount);

        /*Check if the input is a valid number.
        If the input is invalid, rerun the while-loop block
        If the input is valid, return the numberDepositAmount
        */
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {  //deposit has to be a number and has to be positive
            console.log("Invalid deposit amount, try again.");
        } else{
            return numberDepositAmount;
        }
    }
}

// 2. Determine number of lines to bet on
const getNumberOfLines = () =>{
    while(true) {
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        //Convert the prompt String into number type (int or double)
        const numberOfLines = parseFloat(lines);

        /*Check if the input is a valid number.
        If the input is invalid, rerun the while-loop block
        If the input is valid, return the numberOfLines
        */
        if (isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3) {  //number of lines has to be a number between 1 and 3
            console.log("Invalid number of lines, try again.");
        } else{
            return numberOfLines;
        }
    }
}

// 3. Collect a bet amount
const getBet = (balance, lines) =>{
    while(true) {
        const bet = prompt("Enter the bet per line: ");
        //Convert the prompt String into number type (int or double)
        const numberBet = parseFloat(bet);

        /*Check if the input is a valid number.
        If the input is invalid, rerun the while-loop block
        If the input is valid, return the numberOfLines
        */
        if (isNaN(numberBet) || numberBet <= 0 || (numberBet > (balance/lines))) { //number of lines has to be a number less than the total balance divided by the number of lines 
            console.log("Invalid bet, try again.");
        } else{
            return numberBet;
        }
    }
}

// 4. Spin the slot machine
const spin = () => {
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [];
    for(let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
}

// 5. Check if the user won
const transpose = (reels) => {
    const rows = [];
    for(let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j< COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for(const [i, symbol] of row.entries()){
            rowString += symbol;
            if(i != row.length-1){
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for(let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if (allSame){
            winnings += bet * SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
}

// 6. Give the user their winnings

// 7. Play Again

//Main Code

const game = () => {
    let balance = deposit();
    while(true){
        console.log("You have a balance of $" + balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance,numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows, bet, numberOfLines)
        balance += winnings;
        console.log("You won, $" + winnings.toString());

        if(balance <= 0){
            console.log("You ran out of money!");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)?");
        if (playAgain !== "y") break;
    }
}
game();

