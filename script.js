let valueDisplay = '0';
let lastDisplay = null;
let operator = null;
let a = null;
let b = null;
let decimal = false;

function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function mul(a, b) {
    return a * b;
}

function div(a, b) {
    return a / b;
}

function operate (a, b, operator) {
    switch(operator) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return sub(a, b);
            break;
        case '*':
            return mul(a, b);
            break;
        case '/':
            return div(a, b);
            break;
    }
}

function clear() {
    clearEntry();
    a = null;
    b = null;
    operator = null;
    currentDisplay = '';
    document.getElementById('last-output').innerHTML = currentDisplay;
}

function clearEntry() {
    valueDisplay = '0';
    popDisplay(valueDisplay);
}

function popDisplay(num) {
    document.getElementById('current-output').innerHTML = num;
}

function input(num) {
    if (valueDisplay === '0') valueDisplay = '';
    if (operator === null) {
        valueDisplay += num;
        a = Number(valueDisplay);
        console.log('a = ', a);
    } else {
        valueDisplay += num;
        b = Number(valueDisplay)
        console.log('b = ', b);
    }
    popDisplay(valueDisplay);
}

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.onclick = () => {
        if (button.dataset.number !== undefined) {
            input(button.dataset.number);
        }

        if (button.dataset.decimal !== undefined && decimal === false) {
            decimal = true;
            input('.')
        }

        if (button.dataset.operator !== undefined) {
                if (button.dataset.operator === '=' && b !== null) {
                currentDisplay = a + ' ' + operator + ' ' + b + ' =';
                document.getElementById('last-output').innerHTML = currentDisplay;
                a = operate(a,b,operator);
                b = null;
                decimal = false;
                popDisplay(a);
                operator = null;
            } else if (button.dataset.operator === 'clear' || button.dataset.operator === 'clear-entry') {
                if (button.dataset.operator === 'clear') {
                    clear();
                } else {
                    clearEntry();
                }
            } else {
                if (b !== null) {
                    a = operate(a,b,operator);
                    b = null;
                    decimal = false;
                    popDisplay(a);
                    valueDisplay = '0';
                } else {
                    operator = button.dataset.operator;
                    decimal = false;
                    currentDisplay = a + ' ' + operator;
                    document.getElementById('last-output').innerHTML = currentDisplay;
                    valueDisplay = '0';
                    
                }
            }
        }
    }
});