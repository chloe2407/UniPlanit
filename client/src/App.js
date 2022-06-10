import { Outlet } from "react-router-dom";
import './App.css'
import SignUp from "./home/SignUp";

function App() {
  return (
    <div className='App'>
      <Outlet />
    </div>
  );
}

export default App;
