import React, { useEffect } from 'react'
import { Link, useLocation,useNavigate } from 'react-router-dom'

function Navbar() {
    let navigate = useNavigate()
    let location = useLocation()
    useEffect(() => {
        console.log(location.pathname)
    }, [location])
    const handleLogout=()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className={`nav-link ${location.pathname === '/' ? "active" : ''}`} aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ''}`} to="/about">About</Link>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            {!localStorage.getItem('token')?
                            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                <Link class="btn btn-primary me-md-2"to={'/login'} type="button">Login</Link>
                                <Link class="btn btn-primary" to={'/sign-up'} type="button">Signup</Link>
                            </div>:<button class="btn btn-primary me-md-2" onClick={handleLogout} type="button">Logout</button>
                            }

                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar