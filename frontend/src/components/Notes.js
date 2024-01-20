import React from 'react'
import { useContext, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import { Noteitem } from './Noteitem';
import { useEffect } from 'react';
import { Addnote } from './Addnote';
import { useNavigate } from 'react-router-dom';

export const Notes = (props) => {
    const showAlert = props.showAlert;
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    let navigate = useNavigate();
    
    

    useEffect(() => {
        
       
       console.log(localStorage.getItem('token'),"from token check")
       if (localStorage.getItem('token') ==='undefined'||localStorage.getItem('token') ===null||localStorage.getItem('token') ==='null'||localStorage.getItem('token') ===null){
        navigate('/login')
        console.log('no token')
       }else{
            console.log('token')
          getNotes()
          
       }

    }, [])

    const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {

        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    }
    
    const onChange =(e)=>{
        setNote({...note,[e.target.name]: e.target.value} )
    }

    const handleUpdateClick=(e)=>{
        e.preventDefault();
        console.log(note);
        refClose.current.click()//closes modal on update click
        console.log(note._id,note.etitle,note.edescription,note.etag,"from handleUpdate");
        editNote(note.id,note.etitle,note.edescription,note.etag)//using contextAPI for backend changes
        showAlert("Note updated successfully","Updated")
    }

    return (
        <>

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="form-group">
                                    <label htmlFor="etitle">Title</label>
                                    <input type="text" className="form-control" required value={note.etitle} id="etitle" name='etitle' aria-describedby="emailHelp" placeholder="Enter Title" onChange={onChange} />

                                </div>
                                <div className="form-group">
                                    <label htmlFor="edescription">Description</label>
                                    <input type="text" className="form-control" value={note.edescription}  minLength={5} required id="edescription" name='edescription' placeholder="description" onChange={onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="etag">Tag</label>
                                    <input type="text" className="form-control" value={note.etag} id="etag" name='etag' aria-describedby="emailHelp" placeholder="Enter Tag" onChange={onChange} />

                                </div>
                                
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.edescription.length<5 || note.etitle.length<3} className="btn btn-primary" onClick={handleUpdateClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <Addnote />
            <div className="container">
                <div className='row'>
                    
                    <div className="container"><h2>{notes.length===0 ? 'No notes to display': 'Your notes'}</h2></div>
                
                    
                    {notes.map((note) => {
                        return <Noteitem key={note._id} note={note} showAlert={showAlert} updateNote={updateNote} />
                    })}
                </div>
            </div>
        </>
    )
}
