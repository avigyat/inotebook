
import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';


const Navbar = () => {

  let location = useLocation();

  React.useEffect(() => {
    console.log(location.pathname);
  }, [location]);
  const logout =()=> {
    localStorage.removeItem('token');
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className={`navbar-brand ${location.pathname === "/" ? "active" : ""}`} to="/">inotebook</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">

              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
            </li>

          </ul>


        </div>
        {(localStorage.getItem('token')===null||localStorage.getItem('token')==='null'||localStorage.getItem('token')==='undefined'||localStorage.getItem('token')===undefined)
        ?<form className='d-flex topnav-right' >
        
          <Link  className='btn mx-2 btn-primary' to='/login'>Login</Link>
          <Link  className='btn mx-2 btn-primary' to='/signUp'>Sign Up</Link>
        </form>
        :<form className='d-flex topnav-right' >
        <button  className='btn mx-2 btn-primary' onClick={logout}>Log out</button>
        </form>}
      </div>

    </nav>
  )

}

export default Navbar