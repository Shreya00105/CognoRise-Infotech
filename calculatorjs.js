// script.js
document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let previousInput = '';
    let operator = '';

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');
            
            if (value === 'C') {
                currentInput = '';
                previousInput = '';
                operator = '';
                display.innerText = '0';
            } else if (value === '=') {
                if (currentInput && previousInput && operator) {
                    currentInput = evaluate(previousInput, currentInput, operator);
                    display.innerText = currentInput;
                    previousInput = '';
                    operator = '';
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                if (currentInput) {
                    previousInput = currentInput;
                    currentInput = '';
                    operator = value;
                }
            } else {
                currentInput += value;
                display.innerText = currentInput;
            }
        });
    });

    function evaluate(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        switch (op) {
            case '+': return (a + b).toString();
            case '-': return (a - b).toString();
            case '*': return (a * b).toString();
            case '/': return (a / b).toString();
            default: return '';
        }
    }
});
