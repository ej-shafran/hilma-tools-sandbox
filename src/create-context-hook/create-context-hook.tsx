import React, { createContext, useState } from "react";
import { createContextHook } from "@hilma/tools";

type Theme = {
  color: string;
  fontSize: number;
};

const ThemeContext = createContext<Theme | null>(null);
ThemeContext.displayName = "Theme";
const useTheme = createContextHook(ThemeContext);

const App: React.FC = () => {
  const [showError, setShowError] = useState(false);

  return (
    <div>
      <button onClick={() => setShowError(true)}>Show Error In Console</button>

      {!showError && (
        <ThemeContext.Provider value={{ fontSize: 24, color: "purple" }}>
          <Display />
        </ThemeContext.Provider>
      )}

      {showError && <Display />}
    </div>
  );
};

const Display: React.FC = () => {
  const theme = useTheme();

  return (
    <div>
      <p style={{ color: theme.color, fontSize: theme.fontSize }}>
        Rendering the theme!
      </p>
    </div>
  );
};

export default App;
