import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import Nav from './Component/Nav';
import { useState } from 'react';

function App() {
  const [isVisibleState, setIsVisibleState] = useState(false);

  const showMessage = (isvisi) => {
    setIsVisibleState(isvisi);
    setTimeout(() => {
      setIsVisibleState(false);
    }, 3000);
  };
  return (
    <Router>
    <div className="App">
      <Nav visstate = {isVisibleState}/>
      <Routes>
      <Route path='/' element={<Home Showmsg = {showMessage} />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
