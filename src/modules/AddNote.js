import React,{useState} from 'react'
import {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'

function AddNote(props) {
    const context = useContext(NoteContext)
    const {addNote} = context
    const [data, setData] = useState({title:"",description:"",tag:""})

    const handleChange =(e)=>{
        setData({...data,[e.target.name]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        addNote(data.title,data.description,data.tag)
        setData({title:"",description:"",tag:""})
        props.showAlert("Note added successfully","success")
    }

  return (
    <div>
        <h1>Add a note</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input type="text" className="form-control" value={data.title} id="title" name='title' aria-describedby="emailHelp" onChange={handleChange} />
               </div>
               <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                    <input type="text" className="form-control" value={data.tag} id="tag" name='tag' onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                    <input type="text" className="form-control" value={data.description} id="description" name='description' onChange={handleChange} />
                </div>
                
                <button type="submit" disabled={data.title.length<5 || data.description.length<5}  className="btn btn-primary">Add</button>
            </form>
    </div>
  )
}

export default AddNote