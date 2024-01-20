import React from 'react';
import { useContext, useEffect } from 'react';
import noteContext from '../context/notes/noteContext';

const About = () => {
  const a = useContext(noteContext)
  useEffect(() => {
    a.update()
    // eslint-disable-next-line
  }, [])
  
  return (
    
    <>
      about  is in 
    </>
  )
}
export default About