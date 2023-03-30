import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes/Routes";
import 'react-phone-number-input/style.css'


function App() {
  return (
    <div className="" >
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
