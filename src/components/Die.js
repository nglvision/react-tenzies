import React from "react";
import Dots from "./Dots";
import { nanoid } from "nanoid";

export default function Die(props) {
  const [dots, setDots] = React.useState(countDots());
  function countDots() {
    let dot = [];
    for (let i = 0; i < props.value; i++) {
      dot.push(i);
    }
    return dot;
  }
  const dotElements = dots.map(dot => (
    <Dots key={nanoid()} value={props.value} />
  ));
  const styles = {
    backgroundColor: props.isHeld ? "#51d390" : "#fffefe",
    boxShadow: props.isHeld
      ? "inset 1px 1px 4px 2px #2e905d"
      : "2px 3px 4px 2px #dedede",
  };
  return (
    <div className="die" onClick={props.holdDice} style={styles}>
      <div id={props.id} className="die-cell">
        {dotElements}
      </div>
    </div>
  );
}
