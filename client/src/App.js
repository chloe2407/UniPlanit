import './App.css';
import { Outlet } from "react-router-dom";
import About from './about/About';
// global theme provider here

function App() {
  return (
    <div className='App'>
      <Outlet />
      <About />
    </div>
  );
}

export default App;
