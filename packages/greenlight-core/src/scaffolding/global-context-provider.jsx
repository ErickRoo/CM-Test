/* eslint-disable react/jsx-no-constructed-context-values */
import React from 'react';

let initialState = {};

export const GlobalStateContext = React.createContext();
export const GlobalDispatchContext = React.createContext();

export const initializeStore = (state) => {
  initialState = state;
};

/*
function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME': {
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      }
    }
    default:
      throw new Error('Invalid action type. See `src/context/global-context-provider.js` for valid types.');
  }
}
*/

function GlobalContextProvider({ children }) {
  const [state, globalDispatch] = React.useState(initialState);
  // const [state, globalDispatch] = React.useReducer(reducer, initialState);
  return (
    <GlobalStateContext.Provider value={{ globalState: { ...state } }}>
      <GlobalDispatchContext.Provider value={{ globalDispatch }}>{children}</GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
}

export default GlobalContextProvider;
