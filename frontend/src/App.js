
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
// eslint-disable-next-line 
import  Navbar  from './components/Navbar';
// eslint-disable-next-line 
import  Home   from './components/Home';
import  About  from './components/About';
import  NoteState  from './context/notes/NoteState';
import { Alert } from './components/Alert';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { useState } from 'react';
function App() {
  const [alert, setalert] = useState(null);
  const showAlert=(message,type)=>{
    setalert(
     {msg: message,
     type: type}
     )
     console.log("showAlert",alert);
     setTimeout(() => {
       setalert(null)
     }, 3000);
   }
  return (
    <>

    <NoteState>    {/* //imported context */}
    <Router>
      <Navbar />
      <Alert alert={alert}/>
      <div className="container">{/*container for remaining elements */}
      
        <Routes>

          <Route  path="/" exact element={<Home showAlert={showAlert}/>} />
          <Route  path="/about" exact element={<About/>} />
          <Route  path="/login" exact element={<Login showAlert={showAlert}/>} />
          <Route  path="/signUp" exact element={<Signup showAlert={showAlert}/>} />

        </Routes>
      </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
