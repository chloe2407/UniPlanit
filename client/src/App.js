import './App.css';
import { Outlet } from "react-router-dom";

// global theme provider here

function App() {
  return (
    <div className='App'>
      <Outlet />
    </div>
  );
}

export default App;
