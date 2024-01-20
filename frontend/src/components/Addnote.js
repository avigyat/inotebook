import React, { useState } from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

export const Addnote = () => {
    const context = useContext(noteContext);
    const {  addNote } = context;

    const [note, setNote] = useState({title:"",description:"",tag:""})
    const onChange =(e)=>{
        setNote({...note,[e.target.name]: e.target.value} )
    }

    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
    }
    return (
        <div>
            <h1>Enter your note here</h1>
            <form className='my-3'>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name='title' placeholder="Enter Title" required onChange={onChange} />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" minLength={5} required name='description' placeholder="description" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' placeholder="Enter Tag" onChange={onChange} />
                    
                </div>
                <button type="submit" className="btn btn-primary" disabled={note.description.length<5 || note.title.length<3} onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}
