import React from "react";
import { Provider } from "react-redux";
import NavContainer from "./screens/NavContainer";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <NavContainer />
    </Provider>
  );
}
