import React, {useState} from "react";

function Counter () {

    const [counter, setCounter] = useState(5);

    function increment() {
        setCounter(counter + 1);
      }
    
      function decrement() {
        setCounter(counter - 1);
      }

    return(
        <div className="counter">
         <div>{counter}</div>
        <button onClick={increment}>increment</button>
        <button onClick={decrement}>decrement</button>
        </div>
    );
}

export default Counter;