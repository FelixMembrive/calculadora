import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from './src/componentes/Button'
import Display from './src/componentes/Display';

export default function App() {

  const [displayValue, setDisplayValue] = useState("0");
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operation, setOperation] = useState(null);
  const [values, setValues] = useState([0, 0]);
  const [current, setCurrent] = useState(0);

  const addDigit = (n) => {
    if (n === "." && !clearDisplay && displayValue.includes(".")) {
      return;
    }
    
    const clearDisplayValue = displayValue === "0" || clearDisplay;
    const currentValue = clearDisplayValue ? "" : displayValue;
    const valueOfDisplay = currentValue + n;
    setDisplayValue(valueOfDisplay);
    setClearDisplay(false);
 
    if (n !== ".") {
      const newValue = parseFloat(displayValue);
      const valuesArr = [values];
      valuesArr[current] = newValue;
      setValues(valuesArr);
    }
  };

  
  const addOperation = operation => {
    if (current === 0) {
      setOperation(operation);
      setCurrent(1);
      setClearDisplay(true);
    } else {
      const values = [...values];
    }
    const equals = operation === "=";
    try {
      values[0] = eval(`${values[0]} ${operation} ${values[1]}`);
    } catch (e) {
      values[0] = values[0];
    }
    values[1] = 0;
    setDisplayValue(String(values[0]));
    setOperation(equals ? null : operation);
    setCurrent(equals ? 0 : 1);
    setClearDisplay(true);
    setValues(values);
  };

  const resolution = () => {

  }

  const expression = `${values[0]} ${operation} ${values[1]}`
  console.log("valor de expressions = " + expression);

  const clearMemory = () => {
    setDisplayValue("0")
    setClearDisplay(true)
    setOperation(null)
    setValues([0, 0])
    setCurrent(0)
  }

  return (
    <View style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" triple click={() => clearMemory()} />
        <Button label="/" operation click={() => addOperation("/")} />
        <Button label="7" click={() => { addDigit("7") }} />
        <Button label="8" click={() => { addDigit("8") }} />
        <Button label="9" click={() => { addDigit("9") }} />
        <Button label="*" operation click={() => addOperation("*")} />
        <Button label="4" click={() => { addDigit("4") }} />
        <Button label="5" click={() => { addDigit("5") }} />
        <Button label="6" click={() => { addDigit("6") }} />
        <Button label="-" operation click={() => addOperation("-")} />
        <Button label="1" click={() => { addDigit("1") }} />
        <Button label="2" click={() => { addDigit("2") }} />
        <Button label="3" click={() => { addDigit("3") }} />
        <Button label="+" operation click={() => addOperation("+")} />
        <Button label="0" double click={() => { addDigit("0") }} />
        <Button label="." click={() => { addDigit(".") }} />
        <Button label="=" operation click={() => addOperation("=")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});

