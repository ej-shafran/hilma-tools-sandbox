import React from "react";
import { provide } from "@hilma/tools";

const App: React.FC = () => {
  return <div>Inner App!</div>;
};

// using this component with `provide` causes a TypeScript error,
// since `WrapperWithNoChildren` does not specify that it can take children
const WrapperWithNoChildren: React.FC = () => <div>Hello, world!</div>;

// you can delete this next comment to read the error:
// @ts-expect-error
export default provide(WrapperWithNoChildren)(App);
