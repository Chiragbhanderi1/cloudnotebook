import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
const Login = (props) => {
    const [credentails,setCredentails]= useState({email:'',password:''})
    let navigate = useNavigate();
    const host ='http://localhost:5000'
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentails.email,password:credentails.password}) 
          });
          const json = await response.json()
          console.log(json)
          if(json.success){
            // save the auth token and redirect
            localStorage.setItem('token',json.authtoken)
            props.showAlert("Loggedin successfully","success")
            navigate("/") 
          }
          else{
            props.showAlert("Invalid Credentails","danger")
            setCredentails({email:'',password:''})
          }
          
    }
    const onchange =(e)=>{
        setCredentails({...credentails,[e.target.name]:e.target.value})
    }
  return (
    <div className='mt-3'>
      <h2>Login to continue to CloudNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" value={credentails.email} onChange={onchange} name='email' className="form-control" id="email" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" value={credentails.password} onChange={onchange} name='password' className="form-control" id="password"/>
        </div>
        <button type="submit"  className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login
