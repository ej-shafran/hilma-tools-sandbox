import React from "react";
import { provide } from "@hilma/tools";

// read the `export default` statement at the bottom of this file
// to see `provide` in action!

// you can also check out a common TypeScript error that can
// happen when using provide in the `common-errors.tsx` file

const App: React.FC = () => {
  return (
    <div>
      <b>Inner App!</b> You might want to look at the code, as this won't tell
      you much...
    </div>
  );
};

interface ChildrenProps {
  children?: React.ReactNode;
}

const WrapperWithJustChildren: React.FC<ChildrenProps> = (props) => {
  return (
    <div>
      <div>Wrapper</div>
      <div>{props.children}</div>
    </div>
  );
};

interface OptionalProps extends ChildrenProps {
  text?: string;
}

const WrapperWithOptionalProps: React.FC<OptionalProps> = (props) => {
  return (
    <div>
      <div>{props.children}</div>
      <div>
        WrapperWithProps -{" "}
        {props.text ?? (
          <>
            No <code>text</code> Passed.
          </>
        )}
      </div>
    </div>
  );
};

interface RequiredProps extends Required<OptionalProps> { }

const WrapperWithRequiredProps: React.FC<RequiredProps> = (props) => {
  return (
    <div>
      <div>WrapperWithRequiredProps - {props.text}</div>
      <div>{props.children}</div>
    </div>
  );
};

export default provide(
  /**
   * a component that only takes children can be passed as
   * `Component`
   * or
   * `[Component, {}]`
   */
  WrapperWithJustChildren,
  [WrapperWithJustChildren, {}],
  /**
   * a component that has no required props can be passed as
   * `Component`
   * or
   * `[Component, props]`
   */
  WrapperWithOptionalProps,
  [WrapperWithOptionalProps, {}], // the props can be an empty object, since none of them are required
  /**
   * a component that has required props **must** be passed as
   * `[Component, props]`
   */
  [WrapperWithOptionalProps, { text: "TEXT B" }],
  /**
   * a component that has no required props can be passed as
   * `Component`
   * or
   * `[Component, props]`
   */
  [WrapperWithRequiredProps, { text: "TEXT A" }]
)(App);
