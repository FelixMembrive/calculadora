import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from './src/componentes/Button'
import Display from './src/componentes/Display';

export default function App() {

  const [displayValue, setDisplayValue] = useState("0")
  const [clearDisplay, setClearDisplay] = useState(true)
  const [operation, setOperation] = useState(null)
  const [values, setValues] = useState([0, 0])
  const [current, setCurrent] = useState(0)

  const addDigit = (n) => {
    setClearDisplay(false)
    if (n === "." && displayValue.includes(".")) {
      return
    }

    if (n === "0") {
      setClearDisplay(true)
    }

    const currentValue = (clearDisplay ? "" : displayValue)
    console.log(currentValue);
    setDisplayValue(currentValue + n)
    console.log("valor de n = " + n);
    console.log("valor de displayValue = " + displayValue);


    // if (n !== ".") {
      const newValue = parseFloat(displayValue)
      const newArray = values
      newArray[current] = newValue
      setValues(newArray)
      console.log(values);
    // }
  }

  
  const addOperation = operation => {
    
    
    const newValue = parseFloat(displayValue)
    const newArray = values
    newArray[current] = newValue
    setValues(newArray)
    console.log(values);
    
    console.log("valor de displayValue = " + displayValue);
    console.log("valor de newArray = " + values);


    if (current === 0) {
      setCurrent(1)
      setClearDisplay(true)
      setOperation(operation)
    } else {
      const equals = operation === "="
      //   const values = [...values]
      try {
        const expression = `${values[0]} ${operation} ${values[1]}`
        console.log("valor de expressions = " + expression);
        values[0] =
        eval(expression)
      } catch (e) {
        setValues(0)
        setOperation(equals ? null : operation)
        
      }
      values[1] = 0
      setDisplayValue(values[0])
      setCurrent(equals ? 0 : 1)
      setClearDisplay(true)
      setValues(values)
    }
  }

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

