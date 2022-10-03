
import './App.css';
import Navbar from './modules/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './modules/Home';
import About from './modules/About';
import NoteState from './context/notes/NoteState';
import Alert from './modules/Alert';
import Login from './modules/Login';
import Signup from './modules/Signup';
import { useState } from 'react';

function App() {
  const [alert,setAlert] = useState(null)

  const showAlert = (message,type)=>{
    setAlert({
      message:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert alert = {alert}/>
      <div className='container'>
    <Routes>
      <Route exact path="/" element={<Home showAlert={showAlert} />} />
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login showAlert={showAlert} />} />
      <Route exact path="/sign-up" element={<Signup showAlert={showAlert} />} />
    </Routes>
  </div>
  </BrowserRouter>
  </NoteState>
  );
}

export default App;
