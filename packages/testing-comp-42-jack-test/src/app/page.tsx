'use client';

import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay('0');
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const Button = ({ onClick, className, children, ...props }: any) => (
    <button
      onClick={onClick}
      className={`
        h-12 rounded-lg font-bold text-lg transition-all duration-150
        border-2 border-gray-400 
        shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.3)]
        active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]
        active:translate-y-0.5
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-amber-50 to-amber-100 p-6 rounded-2xl shadow-2xl border-4 border-gray-500">
        {/* Calculator Body */}
        <div className="bg-gradient-to-b from-amber-100 to-amber-200 p-4 rounded-xl border-2 border-gray-400 shadow-inner">
          
          {/* Display */}
          <div className="bg-black p-4 rounded-lg mb-4 border-2 border-gray-600 shadow-inner">
            <div className="text-green-400 font-mono text-right text-2xl font-bold min-h-8 flex items-center justify-end">
              {display}
            </div>
          </div>

          {/* Button Grid */}
          <div className="grid grid-cols-4 gap-2">
            {/* Row 1 */}
            <Button
              onClick={clear}
              className="bg-gradient-to-b from-red-300 to-red-400 hover:from-red-400 hover:to-red-500 text-white"
            >
              AC
            </Button>
            <Button
              onClick={clearEntry}
              className="bg-gradient-to-b from-orange-300 to-orange-400 hover:from-orange-400 hover:to-orange-500 text-white"
            >
              CE
            </Button>
            <Button
              onClick={() => inputOperation('÷')}
              className="bg-gradient-to-b from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white"
            >
              ÷
            </Button>
            <Button
              onClick={() => inputOperation('×')}
              className="bg-gradient-to-b from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white"
            >
              ×
            </Button>

            {/* Row 2 */}
            <Button
              onClick={() => inputNumber('7')}
              className="bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-black"
            >
              7
            </Button>
            <Button
              onClick={() => inputNumber('8')}
              className="bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-black"
            >
              8
            </Button>
            <Button
              onClick={() => inputNumber('9')}
              className="bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-black"
            >
              9
            </Button>
            <Button
              onClick={() => inputOperation('-')}
              className="bg-gradient-to-b from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white"
            >
              -
            </Button>

            {/* Row 3 */}
            <Button
              onClick={() => inputNumber('4')}
              className="bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-black"
            >
              4
            </Button>
            <Button
              onClick={() => inputNumber('5')}
              className="bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-black"
            >
              5
            </Button>
            <Button
              onClick={() => inputNumber('6')}
              className="bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-black"
            >
              6
            </Button>
            <Button
              onClick={() => inputOperation('+')}
              className="bg-gradient-to-b from-blue-300 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white"
            >
              +
            </Button>

            {/* Row 4 */}
            <Button
              onClick={() => inputNumber('1')}
              className="bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-black"
            >
              1
            </Button>
            <Button
              onClick={() => inputNumber('2')}
              className="bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-black"
            >
              2
            </Button>
            <Button
              onClick={() => inputNumber('3')}
              className="bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-black"
            >
              3
            </Button>
            <Button
              onClick={performCalculation}
              className="bg-gradient-to-b from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white row-span-2"
            >
              =
            </Button>

            {/* Row 5 */}
            <Button
              onClick={() => inputNumber('0')}
              className="bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-black col-span-2"
            >
              0
            </Button>
            <Button
              onClick={inputDecimal}
              className="bg-gradient-to-b from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400 text-black"
            >
              .
            </Button>
          </div>
        </div>

        {/* Mac Logo */}
        <div className="text-center mt-4">
          <div className="text-gray-600 text-sm font-bold">Calculator</div>
          <div className="text-gray-500 text-xs">© Apple Computer 1984</div>
        </div>
      </div>
    </div>
  );
}

