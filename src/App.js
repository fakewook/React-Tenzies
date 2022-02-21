import React from "react"
import Dice from "./Dice"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'


function App() {

  const [diceNumber, setDiceNumber] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allDiceHeld = diceNumber.every((die) => die.isHeld);
    const firstValue = diceNumber[0].value;
    const allSameValues = diceNumber.every((die) => die.value === firstValue);
    if(allDiceHeld && allSameValues) {
      setTenzies(true);
      console.log("You won!")
    }
  }, [diceNumber])

  function allNewDice() {
    let diceArray = [];
    for(let i = 0; i < 10; i++) {
      const randomNum = Math.ceil(Math.random() * 6);
      diceArray.push({ 
        value: randomNum, 
        isHeld: false,
        id: nanoid()
      });
    }
    return diceArray;
  }

  function rollDice() {
    if(!tenzies) { 
      setDiceNumber((prevDice) => prevDice.map((die) => {
      return die.isHeld ? die : { 
        value: Math.ceil(Math.random() * 6), 
        isHeld: false, 
        id: nanoid()
      }
    }))
    } else {
      setDiceNumber(allNewDice());
      setTenzies(false);
    }
  }

  function holdDice(id) {
    setDiceNumber((prevDice) => prevDice.map((die) => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))

  }

  const diceElements = diceNumber.map((die) => {
    return <Dice key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)}/>
  })


  return (
  <main className="pageContainer">
    {tenzies && <Confetti />}
    <h1 className="title">Tenzies</h1>
    <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    <div className="diceContainer">
      {diceElements}
    </div>
    <button className="roll-dice" onClick={rollDice}>{tenzies ? "Restart" : "Roll"}</button>

  </main>
  );
}

export default App;
