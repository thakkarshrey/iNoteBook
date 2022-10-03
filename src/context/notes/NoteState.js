
import React,{useState} from 'react'
import NoteContext from "./NoteContext";

const host = "http://localhost:8000"

const NoteState = (props) => {
  const [notes, setNotes] = useState([])

  const getAllNotes = async() => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
    })
    const data = await response.json()
    console.log(data)
    setNotes(data)
  }


  // Adding a note on the client side
  const addNote =async(title,description,tag)=>{
    const response = await fetch(`${host}/api/notes/addnote`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    })
    const data = await response.json()
    console.log(data)
    setNotes(notes.concat(data))
  }


  const deleteNote=async(id)=>{
    const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
      method:'DELETE',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      }
    })
    const data = await response.json()
    console.log(data)
    const deleteNote = notes.filter(note=>{
      return note._id!==id
    })
    setNotes(deleteNote)
  }


  const editNote = async(id,title,description,tag) =>{
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json',
        'auth-token':localStorage.getItem('token')
      },
      body:JSON.stringify({title,description,tag})
    })
    const data = await response.json()
    console.log(data)

    let newNotes = JSON.parse(JSON.stringify(notes))

    for(let i = 0; i<newNotes.length;i++){
      const element = newNotes[i]
      if(element._id === id){
        newNotes[i].title = title
        newNotes[i].description = description
        newNotes[i].tag = tag 
        break;
      }
    }
    setNotes(newNotes)
  }


  const userLogin =async(email,password)=>{
    const response = await fetch(`${host}/api/auth/login`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({email,password})
    })
    const data = await response.json()
    return data
  }

  const userSignup =async(name,email,password)=>{
    const response = await fetch(`${host}/api/auth/createuser`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({name,email,password})
    })
    const data = await response.json()
    return data
  }

  return (
    <NoteContext.Provider value={{notes,getAllNotes,addNote,deleteNote,editNote,userLogin,userSignup}}>
        {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState