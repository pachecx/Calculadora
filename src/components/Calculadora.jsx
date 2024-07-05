import "./CalculadoraStyle.css";
import { useState } from "react";

export const Calculadora = () => {
  const [currentValue, setCurrentValue] = useState("0");
  const [pedingOperator, setPedingOperator] = useState(null);
  const [pedingValue, setPedingValue] = useState(null);
  const [completeOperation, setCompleteOperation] = useState("");

  const keypadnumbers = ["0","1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const operations = ["+", "-", "*", "/"];

  const handleClick = (val) => {
    setCurrentValue((prevValue) => {
      if (prevValue === "0") {
        return val;
      } else {
        return prevValue + val;
      }
    });
    setCompleteOperation((prevOperation) => prevOperation + val);
  };

  const handleOperation = (operation) => {
    setCompleteOperation(currentValue + " " + operation);
    setPedingOperator(operation);
    setPedingValue(currentValue);
    setCurrentValue("0");
  };

  const handleClear = () => {
    setCurrentValue("0");
    setPedingOperator(null);
    setPedingValue(null);
    setCompleteOperation("");
  };

  const handleCalculate = () => {
    if (!pedingOperator || !pedingValue) {
      return;
    }

    const num1 = parseFloat(pedingValue);
    const num2 = parseFloat(currentValue);

    let result;

    switch (pedingOperator) {
      case "+":
        result = num1 + num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "/":
        if (num2 !== 0) {
          result = num1 / num2;
        } else {
          setCurrentValue("Error");
          setCompleteOperation("Error");
          setPedingOperator(null);
          setPedingValue(null);
          return
        }
        break;

      default:
        break;
    }

    setCompleteOperation(
      pedingValue + " " + pedingOperator + " " + currentValue + "=" + result
    );
    setCurrentValue(result.toString());
    setPedingOperator(null);
    setPedingValue(null);
  };

  return (
    <div className="calculator">
      <div className="complete-operation">{completeOperation}</div>
      <div className="display">{currentValue}</div>
      <div className="buttons">
        <button onClick={handleClear}>AC</button>

        {keypadnumbers.map((num) => (
          <button key={num} onClick={() => handleClick(num)}>
            {num}
          </button>
        ))}
        {operations.map((operation) => (
          <button key={operation} onClick={() => handleOperation(operation)}>
            {operation}
          </button>
        ))}
        <button onClick={handleCalculate}>=</button>
      </div>
    </div>
  );
};
