import React from "react";

import router from "./Router";
import {RouterProvider} from "react-router";


const App: React.FC = () => {
  return (
   
      <RouterProvider router={router} />
    
  );
};

export default App;