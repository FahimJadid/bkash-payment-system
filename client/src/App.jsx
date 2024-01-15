import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Error from "./components/Error";
import Success from "./components/Success";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/error?" element={<Error />} />
          <Route path="/success?" element={<Success />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
