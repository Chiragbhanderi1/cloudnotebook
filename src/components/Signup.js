import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
const Signup = (props) => {
  const [credentails,setCredentails] = useState({name:'',email:'',password:'',cpassword:''})
  let navigate = useNavigate();
  const host ='http://localhost:5000'
  const handleSubmit=async(e)=>{
    e.preventDefault()
        if( credentails.cpassword === credentails.password){const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:credentails.name,email:credentails.email,password:credentails.password,}) 
          })
          const json = await response.json()
          console.log(json)
          if(json.success){
            navigate("/login") 
            props.showAlert("Account created successfully","success")
          }
          else{
            props.showAlert("Invalid Details","danger")
            setCredentails({name:credentails.name,email:credentails.email,password:'',cpassword:''})
          }
        }else{
          setCredentails({name:credentails.name,email:credentails.email,password:'',cpassword:''})
          props.showAlert("Passwords don't matches","danger")
        }
    }
  const onchange =(e)=>{
    setCredentails({...credentails,[e.target.name]:e.target.value})
  }
  
  return (
    <div className='container mt-3'>
      <h2 >Create an account to use  CloudNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name"  className="form-label">Name </label>
          <input type="text" name='name' value={credentails.name} required  onChange={onchange} className="form-control" id="name"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" name='email' value={credentails.email} required  onChange={onchange} className="form-control" id="email" aria-describedby="emailHelp0"/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name='password' value={credentails.password} required  onChange={onchange} className="form-control" id="password"/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" name='cpassword' value={credentails.cpassword} required  onChange={onchange} className="form-control" id="cpassword"/>
        </div>
        <button type="submit" disabled={credentails.name.length < 3 || credentails.password.length<6} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
