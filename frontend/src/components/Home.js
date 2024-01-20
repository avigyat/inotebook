import React from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import { Notes } from './Notes';
import { Addnote } from './Addnote';



const Home = (props) => {
  const { showAlert } = props;
  
  return (
    <>
      <div className="container mx-5">

       
          <Notes showAlert={showAlert} ></Notes>
        

      </div>
    </>

  )
}

export default Home