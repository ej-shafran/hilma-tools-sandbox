import React, { useState } from "react";

function useLocalStorage<T>(key: string, fallback: T) {
  const [state, setState] = useState(() => {
    const value = localStorage.getItem(key);
    if (!value) return fallback;
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      return fallback;
    }
  });

  function setLocalStorage(updater: T | ((prev: T) => T)) {
    setState(updater);
    localStorage.setItem(
      key,
      JSON.stringify(updater instanceof Function ? updater(state) : updater)
    );
  }

  return [state, setLocalStorage] as const;
}

const DEMOS = {
  "use-debounce": "useDebounce",
  "use-async": "useAsyncState & useAsyncEffect",
  "create-mobx-context": "createMobXContext",
  "create-context-hook": "createContextHook",
  provide: "provide",
} as const;

type Demo = keyof typeof DEMOS;

export default function App() {
  const [demo, setDemo] = useLocalStorage<Demo>("demo", "use-debounce");

  return (
    <>
      <main>
        <h1>
          <u>Demo:</u> {DEMOS[demo]}
        </h1>

        <Display demo={demo} />
      </main>

      <footer>
        <fieldset>
          <label htmlFor="demo-select">Select the demo to display:</label>
          <select
            value={demo}
            onChange={(e) => setDemo(e.target.value as Demo)}
          >
            {Object.entries(DEMOS).map(([value, content]) => (
              <option key={value} value={value}>
                {content}
              </option>
            ))}
          </select>
        </fieldset>

        <aside>
          You will note that a few of the functions (namely,{" "}
          <code>isCapacitor</code>, <code>getDisplayName</code>, and{" "}
          <code>isRenderable</code>) do not have demos. These functions are
          simple utilities, and are rather self-explanatory.
        </aside>
      </footer>
    </>
  );
}

import ProvideDemo from "./wrap-and-provide/provide";
import CreateMobXContextDemo from "./create-mobx-context/create-mobx-context";
import CreateContextHookDemo from "./create-context-hook/create-context-hook";
import UseDebounceDemo from "./use-debounce/use-debounce";
import UseAsyncDemo from "./use-async/use-async";

const Display: React.FC<{ demo: Demo }> = ({ demo }) => {
  switch (demo) {
    case "provide":
      return <ProvideDemo />;
    case "create-mobx-context":
      return <CreateMobXContextDemo />;
    case "create-context-hook":
      return <CreateContextHookDemo />;
    case "use-debounce":
      return <UseDebounceDemo />;
    case "use-async":
      return <UseAsyncDemo />;
  }
};
