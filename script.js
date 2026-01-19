const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('button');
const operators = ['+', '-', 'x', '÷', '%'];
let shouldResetScreen = false;

function handleButtonClick(button) {
  const value = button.textContent;
  const lastChar = screen.textContent.slice(-1);

  if (value === 'AC') {
    screen.textContent = '';
    shouldResetScreen = false;
    return;
  }

  if (value === 'C') {
    screen.textContent = screen.textContent.slice(0, -1);
    shouldResetScreen = false;
    return;
  }

  if (value === '=') {
    screen.textContent = calculateLeftToRight(screen.textContent);
    shouldResetScreen = true;
    return;
  }

  if (operators.includes(value)) {
    if (screen.textContent === '') return;
    if (operators.includes(lastChar)) return;

    shouldResetScreen = false;
    screen.textContent += value;
    return;
  }

  if (value >= '0' && value <= '9') {
    if (shouldResetScreen) {
      screen.textContent = value;
      shouldResetScreen = false;
    } else {
      screen.textContent += value;
    }
  }
}

function calculateLeftToRight(expression) {
  expression = expression.replaceAll(' ', '');

  const last = expression.slice(-1);
  if (operators.includes(last)) return expression;

  const numbers = [];
  const ops = [];
  let current = '';

  for (let i = 0; i < expression.length; i++) {
    const ch = expression[i];

    if (operators.includes(ch)) {
      if (current === '') return expression;
      numbers.push(Number(current));
      ops.push(ch);
      current = '';
    } else {
      current += ch;
    }
  }

  if (current === '') return expression;
  numbers.push(Number(current));

  for (const n of numbers) {
    if (Number.isNaN(n)) return expression;
  }

  let result = numbers[0];

  for (let i = 0; i < ops.length; i++) {
    const op = ops[i];
    const b = numbers[i + 1];

    if (op === '+') result += b;
    if (op === '-') result -= b;
    if (op === 'x') result *= b;
    if (op === '÷') {
      if (b === 0) return 'Error';
      result /= b;
    }
    if (op === '%') result %= b;
  }

  return String(result);
}

buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    handleButtonClick(button);
  });
});
