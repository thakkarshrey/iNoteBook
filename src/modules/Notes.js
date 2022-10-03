import React, { useEffect,useState } from 'react'
import { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'

function Notes(props) {
    const navigate = useNavigate()
    const {showAlert} = props
    const context = useContext(NoteContext)
    const { notes, getAllNotes, editNote } = context
    const [data, setData] = useState({id:"",etitle:"",edescription:"",etag:""})

    useEffect(() => {
        if(localStorage.getItem('token')){
            getAllNotes()
        }
        else{
            navigate('/login')
        }
    }, [])

    const reference = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currentNote) => {
        console.log(currentNote)
        setData({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
        reference.current.click()
    }

    const handleChange =(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const handleSubmit=()=>{
        editNote(data.id,data.etitle,data.edescription,data.etag)
        refClose.current.click()
        showAlert("Note updated successfully","success")
    }

    return (
        <>
            <AddNote showAlert={showAlert}/>
            <button ref={reference} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={data.etitle} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                                <input type="text" className="form-control" id="etag" name='etag' value={data.etag} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                <input type="text" className="form-control" id="edescription" name='edescription' value={data.edescription} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={data.etitle.length<5 || data.edescription.length<5} onClick={handleSubmit} className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                
                <h1>Your notes</h1>
                {
                    notes?.map(note => {
                        return <>
                            <NoteItem updateNote={updateNote} note={note} showAlert={showAlert} />
                        </>
                    })
                }
                <div className='container'>
                    {notes.length===0 && "No notes available"}
                </div>
            </div>
        </>
    )
}

export default Notes