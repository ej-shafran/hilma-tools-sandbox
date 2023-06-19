import React from "react";
import { wrap } from "@hilma/tools";

// `wrap` is a function that works very similarly to `provide`,
// in that it wraps a certain component with a bunch of providers.
// however, `wrap` returns **an element**, while `provide` returns **a component**.

const App: React.FC = () => {
  return (
    <div>
      {wrap([Wrapper, { text: "Hello, world!" }])(
        <div>This is the inner element!</div>
      )}
    </div>
  );
};

const Wrapper: React.FC<{ children?: React.ReactNode; text?: string }> = ({
  text,
  children,
}) => (
  <div>
    <h1>This is the wrapper in action!</h1>
    <div>{children}</div>
    <p>{text}</p>
  </div>
);

export default App;
