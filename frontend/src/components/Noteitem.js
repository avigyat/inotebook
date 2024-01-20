import React from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

export const Noteitem = (props) => {
    const { note, updateNote, showAlert } = props;
    const context = useContext(noteContext);
    const { deleteNote } = context;

    return (
        <>
            <div className="card my-3" >
                <div className="card my-3">
                    <div className="d-flex bg-light align-item-center">
                        <h4>{note.title} </h4>

                        <i className="fa-solid fa-trash mx-3 " onClick={() => {
                            {
                                console.log(note._id);
                            }
                            deleteNote(note._id);
                            showAlert("Noted deleted", "deleted")
                        }}>

                        </i>
                        <i className="fa-solid fa-pen-to-square mx-3 " onClick={() => { updateNote(note) }}></i>
                    </div>
                    <div className="card-body">

                        <p className="card-text">{note.description}</p>

                        <p className="card-text">{note.tag}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
