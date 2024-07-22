document.addEventListener('DOMContentLoaded', function() {
    const calculator = document.getElementById('calculator');
    const display = document.getElementById('display');
    const buttons = document.getElementById('buttons');

    const buttonValues = [
        '7', '8', '9', '+',
        '4', '5', '6', '-',
        '1', '2', '3', '*',
        '0', '.', '=', '/',
        'C', 'M+', 'M-', 'MC'
    ];

    const operators = ['+', '-', '*', '/', '%'];
    let currentInput = '';
    let memory = 0;

    buttonValues.forEach(value => {
        const button = document.createElement('button');
        button.textContent = value;
        button.classList.add('btn', 'btn-secondary', 'number');
        if (operators.includes(value) || value === '=') {
            button.classList.add('operator');
        }
        button.addEventListener('click', () => onButtonClick(value));
        buttons.appendChild(button);
    });

    function onButtonClick(value) {
        if (value === 'C') {
            currentInput = '';
            display.value = '';
        } else if (value === '=') {
            try {
                display.value = eval(currentInput);
                currentInput = display.value;
            } catch (e) {
                display.value = 'Error';
                currentInput = '';
            }
        } else if (value === 'M+') {
            memory += parseFloat(display.value) || 0;
            localStorage.setItem('memory', memory);
        } else if (value === 'M-') {
            memory -= parseFloat(display.value) || 0;
            localStorage.setItem('memory', memory);
        } else if (value === 'MC') {
            memory = 0;
            localStorage.removeItem('memory');
        } else {
            currentInput += value;
            display.value = currentInput;
        }
    }

    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (!isNaN(key) || operators.includes(key)) {
            onButtonClick(key);
        } else {
            alert('Only numbers are allowed');
        }
    });
});
