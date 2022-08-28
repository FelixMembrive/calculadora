import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from './src/componentes/Button'
import Display from './src/componentes/Display';

export default function App() {

  const [displayValue, setDisplayValue] = useState("0")
  const [clearDisplay, setClearDisplay] = useState(false)
  const [operations, setOperations] = useState(null)
  const [values, setValues] = useState(["0", "0"])
  const [current, setCurrent] = useState(0)
  const [disableOperations, setDisableOperations] = useState(false)
  const [autoReset, setAutoReset] = useState(false)

  const addDigit = (n) => {
    if (autoReset) {
      clearMemory()
    }

    setDisableOperations(false)
    console.log("valor de current = " + current);

    const ignoreDisplay = displayValue === "0" || clearDisplay

    if (n === "." && displayValue.includes(".") && !ignoreDisplay) {
      return
    }

    let currentValue = (ignoreDisplay ? "" : displayValue)
    currentValue = currentValue + n
    setDisplayValue(currentValue)
    setClearDisplay(false)

    const newArray = values
    newArray[current] = displayValue
    setValues(newArray)
    setAutoReset(false)

  }

  console.log("valor de displayValue = " + displayValue);
  console.log(values);



  const addOperation = operation => {
    setAutoReset(false)
    setOperations(operation)
    setDisableOperations(true)
    if (disableOperations === false) {
      const newArray = values
      newArray[current] = displayValue
      setValues(newArray)
      console.log(values);

      // console.log("valor de displayValue = " + displayValue);
      // console.log("valor de newArray = " + values);


      if (current === 0) {
        setCurrent(1)
        setClearDisplay(true)
        setOperations(operation)

      }

      else {
        const equals = operations === "="
        const actualValues = values
        try {
          const expression = `${actualValues[0]} ${operations} ${actualValues[1]}`
          console.log("valor de expressions = " + expression);
          actualValues[0] =
            eval(expression)
        } catch (e) {
          actualValues[0] = values[0]
        }
        setDisplayValue(`${actualValues[0]}`)
        setOperations(equals ? null : operation)
        setCurrent(equals ? 0 : 1)
        setClearDisplay(true)
        setValues(actualValues)
      }
    }
  }

  // const getResult = (num1, num2, operation) => {
  //   try {
  //     const expression = `${num1} ${operation} ${num2}`
  //     console.log("valor de expressions = " + expression);
  //     actualValues[0] =
  //       eval(expression)
  //   } catch (e) {
  //     actualValues[0] = values
  //   }
  //   eval(expression)
  // }

  const expression = `${values[0]} ${operations} ${values[1]}`
  console.log("valor de expressions = " + expression);
  console.log("valor de operation = " + operations);

  const clearMemory = () => {
    setDisplayValue("0")
    setClearDisplay(false)
    setOperations(null)
    setValues([0, 0])
    setCurrent(0)
  }

  return (
    <View style={styles.container}>
      {/* <Display value={parseFloat(displayValue)} /> */}
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
        <Button label="=" operation click={() => [addOperation("="), setAutoReset(true)]} />
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

