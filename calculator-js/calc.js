const previousOperationText = document.querySelector('.previous-operation')
const currentOperationText = document.querySelector('.current-operation')
const buttons = document.querySelectorAll('#calculator-btn button')

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = '';
    }

    // add digits
    addDigit(digit) {

        // Check if already has a dot
        if (digit === '.' && this.currentOperationText.innerText.includes('.')) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }

    // Processing calculator operations

    processOperation(operation) {
        //Check if current is empty

        if (this.currentOperationText.innerText === "" && operation !== 'C') {
            //Change operation
            if (this.previousOperationText.innerText !== '') {
                this.changeOperation(operation);
            }
            return;
        }

        // Getting the selected previous and current values 
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous);
                break
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous);
                break
            case "DEL":
                this.processDelOperation();
                break
            case "CE":
                this.processClearCurrentOperation();
                break
            case "C":
                this.processClearOperation();
                break
            case "=":
                this.processEqualOperator();
                break
            default:
                return;
        }
    }

    // Function that changes the values ​​on the screen
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null) {

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            //check if value is zero, and it is just add current value
            if (previous === 0) {
                operationValue = current;
            }
            //Add current value to previous
            this.previousOperationText.innerText = `${operationValue} ${operation} `;
            this.currentOperationText.innerText = ``;
        }
    }

    changeOperation(operation) {
        const mathOperations = ['+', '-', '*', '/']

        if (!mathOperations.includes(operation)) {
            return;
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    //Delete the last digit
    processDelOperation() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    //Clear current operation
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    //Clear all operations
    processClearOperation() {
        this.previousOperationText.innerText = "";
        this.currentOperationText.innerText = "";
    }

    //Process an operation
    processEqualOperator() {
        const operation = this.previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}

// Object Calculator type
const calc = new Calculator(previousOperationText, currentOperationText)


// Getting de value of button by click

buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === '.') {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});

