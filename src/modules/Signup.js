import React, { useState,useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'
import {useNavigate} from 'react-router-dom'

function Signup(props) {
    const {showAlert} = props
     const context = useContext(NoteContext)
     let navigate = useNavigate()
     const {userSignup} = context
    const [credentials,setCredentials] = useState({name:"",email:"",password:""})

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    const handleSubmit =async (e)=>{
        e.preventDefault()
        const response =  await userSignup(credentials.name,credentials.email,credentials.password)
        if(response.success===true){
            localStorage.setItem('token',response.authtoken)
            navigate('/')
            showAlert("Signed up successfully","success")
        }
        else{
            showAlert("Invalid details","danger")
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control" onChange={onChange} value={credentials.name} id="name" name='name' aria-describedby="emailHelp" placeholder="Enter your name"/>
                    </div>
                    <div class="mb-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" id='email' name='email' className="form-control" onChange={onChange} value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="mb-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"  className="form-control" onChange={onChange} value={credentials.password} id="password" name='password' placeholder="Password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup