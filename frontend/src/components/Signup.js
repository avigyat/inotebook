import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Signup = (props) => {
    let navigate = useNavigate();
    const host = "http://localhost:5000/";
    const [passwordDetails, setpasswordDetails] = useState({ email: "", password: "",name:"" })
    const onChange = (e) => {
        setpasswordDetails({ ...passwordDetails,[e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = passwordDetails.name;
        const email = passwordDetails.email;
        const password = passwordDetails.password;
        console.log(passwordDetails);
        const response = await fetch(`${host}api/auth/createUser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.

            headers: {
                "Content-Type": "application/json"
                
            },body: JSON.stringify({name,email,password})
        });
        const json = await response.json()
        console.log(json);
        if(json.success){
            //saving auth token in local storage and redirect
            
            props.showAlert("welcome to inotebook, account has been created","success")
            navigate('/login')
        }else{
            props.showAlert(json.error,"Failed")
        }
    }
    return (
        <div>
            <form className='mx-8' onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={passwordDetails.name} id="name" aria-describedby="emailHelp" name='name' onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={passwordDetails.email} required  id="email" aria-describedby="emailHelp" name='email' onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' required minLength={5} value={passwordDetails.password} onChange={onChange} />
                </div>
                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}
