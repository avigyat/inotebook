import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = (props) => {
    let navigate = useNavigate();
    const host = "http://localhost:5000/";
    const [loginDetails, setloginDetails] = useState({ email: "", password: "" })
    const onChange = (e) => {
        setloginDetails({ ...loginDetails,[e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = loginDetails.email
        
        const password = loginDetails.password
        console.log(loginDetails);

        const response = await fetch(`${host}api/auth/loginUser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.

            headers: {
                "Content-Type": "application/json"
                
            },body: JSON.stringify({email, password})
        });
        const json = await response.json()
        console.log(json);
        if(json.success){
            //saving auth token in local storage and redirect
            localStorage.setItem('token',json.authToken);
            console.log(localStorage.getItem('token'),"from login")
            navigate('/')
            props.showAlert("welcome to inotebook","success");
            
        }else{
            props.showAlert("invalid creds","Failed");
            localStorage.removeItem('token',null);
        }

    }
    return (
        <div>
            <form className='mx-8' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control"  value={loginDetails.email} id="email" aria-describedby="emailHelp" name='email' onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control"  id="password" name='password' value={loginDetails.password} onChange={onChange} />
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
