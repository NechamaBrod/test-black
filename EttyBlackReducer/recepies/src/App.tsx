import React from "react";

import router from "./Router";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;