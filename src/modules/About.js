import React, { useEffect } from 'react'
import {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'
function About() {
    const first = useContext(NoteContext)
    useEffect(()=>{

        // eslint-disable-next-line
    },[])
  return (
    <div>Ye about page hai </div>
  )
}

export default About