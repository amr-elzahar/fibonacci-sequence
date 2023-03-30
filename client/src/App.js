import { useState } from "react";
import axios from "axios";

function App() {
  const [index, setIndex] = useState("");
  const [value, setValue] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:4000/fibonacci/${index}`
      );

      const { index: responseIndex, value: responseValue } = response.data;
      setIndex("");
      setValue(responseValue);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="form-wrapper">
      <form method="POST" onSubmit={submitHandler}>
        <label>Pick up an index</label>
        <input
          required
          type="number"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
        />
        <button type="submit">Calculate</button>
      </form>
      {value && <h1>The value for this index is {value}</h1>}
    </div>
  );
}

export default App;
