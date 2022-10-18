import React from 'react';
import { GlobalStateContext, GlobalDispatchContext } from './global-context-provider';

export function withGlobalState(Component) {
  return function StateComponent(props) {
    return (
      <GlobalStateContext.Consumer>{(contexts) => <Component {...props} {...contexts} />}</GlobalStateContext.Consumer>
    );
  };
}

export function withGlobalDispatch(Component) {
  return function DispatchComponent(props) {
    return (
      <GlobalDispatchContext.Consumer>
        {(contexts) => <Component {...props} {...contexts} />}
      </GlobalDispatchContext.Consumer>
    );
  };
}
