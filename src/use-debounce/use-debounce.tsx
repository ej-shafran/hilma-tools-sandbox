import { useDebounce } from "@hilma/tools";
import React, { useEffect, useState } from "react";

const App: React.FC = () => {
  const [input, setInput] = useState("");
  const debounced = useDebounce(input);

  useEffect(() => {
    if (!debounced) return;

    alert("You finished typing! The value was: " + debounced);
  }, [debounced]);

  return (
    <fieldset name="value">
      <label htmlFor="input">
        Type in this input to see debouncing in action!
      </label>
      <input
        id="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </fieldset>
  );
};

export default App;
