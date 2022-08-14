import './App.css';
import Index from "./pages/Index"
import Detail from "./pages/Detail"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Index/>}/>
          <Route path="/breeds/:id/" element={<Detail/>}/>
        </Routes>
      </div>
  );
}

export default App;
