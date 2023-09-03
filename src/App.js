import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App(props) {
  const [mode, setMode] = React.useState("");
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  function rollDice() {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice());
    }
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.isHeld
          ? die
          : {
              value: Math.ceil(Math.random() * 6),
              isHeld: false,
              id: nanoid(),
            };
      });
    });
  }

  function holdDice(currentId) {
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.id === currentId ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  React.useEffect(() => {
    // Check the dice array for these winning conditions:
    //   1. All dice are held, and
    //  2. all dice have the same value
    const allHeld = dice.every(die => die.isHeld);
    const firstDie = dice[0].value;
    const allSameDice = dice.every(die => die.value === firstDie);
    if (allHeld && allSameDice) {
      setTenzies(true);
    }
  }, [dice]);
  // React.useEffect(() => {
  //   // Check the dice array for these winning conditions:
  //   //   1. All dice are held, and
  //   //  2. all dice have the same value
  //   let i = 0;
  //   let sum = 0;
  //   const heldDice = dice.map(die => {
  //     if (die.isHeld) {
  //       i++;
  //       sum += die.value;
  //     }
  //     return die.value;
  //   });
  //   if (i === 10 && sum / 10 === heldDice[0]) {
  //     setTenzies(true);
  //     console.log("You won!");
  //   }
  // }, [dice]);

  function toggleDarkMode() {
    setMode(prevMode => !prevMode);
  }
  return (
    <div className={mode ? "container" : "light-container"}>
      <NavBar darkMode={mode} toggleDarkMode={toggleDarkMode} />
      <main>
        {tenzies && <Confetti />}
        <div className="box">
          <h1 className="title">주사위 게임</h1>
          <p className="instructions">
            같은 주사위 숫자가 될 때 까지 돌려보세요. 원하는 숫자를 클릭해
            잡으세요.
            {/* <br /> Roll until all dice are the same. Click each die to
            freeze it at its current value between rolls. */}
          </p>
          <div className="inner-box">{diceElements}</div>
          <button className="roll" onClick={rollDice}>
            {tenzies ? "새로운 게임" : "돌리기"}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;

//node -v
// npm -v
//npx create-react-app my-app
