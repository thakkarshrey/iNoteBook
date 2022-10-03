import React, { useState } from 'react'
import {useContext} from 'react'
import NoteContext from '../context/notes/NoteContext'
import { useNavigate} from 'react-router-dom'

function Login(props) {
    const {showAlert} = props
    let navigate = useNavigate()
    const context = useContext(NoteContext)
    const{userLogin} = context 
    const[credentials,setCredentials] = useState({email:"",password:""})

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    const onSubmit=async(e)=>{
        e.preventDefault()
        const response = await userLogin(credentials.email,credentials.password)
        if(response.success===true){
            localStorage.setItem('token',response.authtoken)
            navigate('/')
            showAlert("Logged in successfully","success")
        }
        else{
            showAlert("Invalid details","danger")
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" name='email' value={credentials.email} id="email" onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password"  class="form-control" value={credentials.password} name='password' id="password" onChange={onChange} />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login