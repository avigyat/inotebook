import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props)=>{
   
    const host ="http://localhost:5000/";
    const notesInitial =[]
    const [notes, setNotes] = useState(notesInitial)
    //API call to fetch all initial notes
    const getNotes =async()=>{
      const  response = await fetch(`${host}api/notes/fetchNotes`, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
      
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        }  
      });
      const responseJSON= await response.json();
      console.log(responseJSON);
      setNotes(responseJSON)
    }
    
    
    
    
    //add note API Call
    
    //add a note
    const addNote =async(title,description,tag)=>{
      const newNote={title:title,description:description,tag:tag}
      //setNotes(notes.concat(newNote));
      //add note API
      const  response = await fetch(`${host}api/notes/addNotes/`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
      
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      });
      const note = await response.json();
      setNotes(notes.concat(note))
      console.log(response,"is responsed");
      
    }
    //delete a note
    const deleteNote =async(id)=>{
      console.log("dleting note"+id);
      const newNotes = notes.filter((note)=>{return note._id!==id});
      setNotes(newNotes);
      //at backend
      const  response = await fetch(`${host}api/notes/deleteNotes/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        }
        
        
      });
      

      console.log("deleted on backend");
    }
    //edit a note
    //fRONTEND PENDING
    const editNote =async(id, title, tag, description)=>{
      //fetch API call
     console.log(id);
      const  response = await fetch(`${host}api/notes/updateNotes/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
      
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      });


      let updatedNote = JSON.parse(JSON.stringify(notes));

      for (let index = 0; index < updatedNote.length; index++) {
        const element = updatedNote[index];
        if(element._id === id){
          updatedNote[index].title = title;
          updatedNote[index].description = description;
          updatedNote[index].tag = tag;
          
          break;
        } 
      }
      setNotes(updatedNote)
      
    }
    return(
      // providing values from context
        <noteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;