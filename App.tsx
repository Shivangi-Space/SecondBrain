import React from "react";
import { Provider } from "react-redux";
import { store } from "./src/store";

function App(): React.JSX.Element {
  return(
    <Provider store={store} />
  );
}

export default App;