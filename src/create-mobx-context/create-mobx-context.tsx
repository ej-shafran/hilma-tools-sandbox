import React from "react";
import { makeAutoObservable } from "mobx";
import { createMobXContext } from "@hilma/tools";
import { observer } from "mobx-react";

class ThemeStore {
  color = "red";

  constructor() {
    makeAutoObservable(this);
  }

  setColor = (color: string) => {
    this.color = color;
  };
}

const theme = new ThemeStore();

const [, ThemeStoreProvider, useThemeStore] = createMobXContext(theme);

const App: React.FC = () => {
  return (
    <ThemeStoreProvider>
      <Select />
      <Display />
    </ThemeStoreProvider>
  );
};

const Select: React.FC = observer(() => {
  const theme = useThemeStore();

  return (
    <fieldset>
      <label htmlFor="theme-color">Choose the theme:</label>
      <select
        id="theme-color"
        value={theme.color}
        onChange={(e) => theme.setColor(e.target.value)}
      >
        <option value="red">Red</option>
        <option value="green">Green</option>
        <option value="purple">Purple</option>
      </select>
    </fieldset>
  );
});

const Display: React.FC = observer(() => {
  const theme = useThemeStore();

  return <p style={{ color: theme.color }}>This is some styled text!</p>;
});

export default App;
