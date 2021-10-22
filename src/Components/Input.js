import React, {useState} from "react";

function Input() {

    const [value, setValue] = useState('');

    return(
       <div className="input">
          <h1>{value}</h1>
          <input value={value} onChange={e => setValue(e.target.value)} type="text" />
      </div>
    );
}

export default Input;