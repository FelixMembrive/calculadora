import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from './src/componentes/Button'
import Display from './src/componentes/Display';

export default function App() {
const [displayValue, setDisplayValue] = useState("0")



const addDigit = n => {
  setDisplayValue(n)
}

const clearMemory = () => {
  setDisplayValue = 0
}

const setOperation = operation => {

}

  return (
    <View style={styles.container}>
      <Display value={displayValue}/>
      <View style={styles.buttons}>
        <Button label="AC" triple click={() => setDisplayValue(0)} />
        <Button label="/" operation click={() => setOperation("/")} />
        <Button label="7" click={() => {addDigit("7")}} />
        <Button label="8" click={() => {addDigit("8")}} />
        <Button label="9" click={() => {addDigit("9")}} />
        <Button label="*" operation click={() => setOperation("*")} />
        <Button label="4" click={() => {addDigit("4")}} />
        <Button label="5" click={() => {addDigit("5")}} />
        <Button label="6" click={() => {addDigit("6")}} />
        <Button label="-" operation click={() => setOperation("-")} />
        <Button label="1" click={() => {addDigit("1")}} />
        <Button label="2" click={() => {addDigit("2")}} />
        <Button label="3" click={() => {addDigit("3")}} />
        <Button label="+" operation click={() => setOperation("+")} />
        <Button label="0" double click={() => {addDigit("0")}} />
        <Button label="." click={() => {addDigit(".")}} />
        <Button label="=" operation />
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

