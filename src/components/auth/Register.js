import React, { useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert';

function Register() {

    const history = useNavigate ();
    const [registerInput, setRegister] = useState({
        email: '',
        password: '',
        error_list: []
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name]: e.target.value});
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: registerInput.email,
            password: registerInput.password
        }

        axios.post(`/api/register`, data).then(res => {
            if (res.data.status === 200){
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_user', res.data.email);
                Swal("Success", res.data.message, "success")
                history(`/`);
            }else {
                setRegister({ ...registerInput, error_list: res.data.validation_errors})
            }
        });
    }

    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Register</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={registerSubmit}>
                                    <div className="form-group mb-3">
                                        <label className="float-left">Email</label>
                                        <input type="email" name="email" onChange={handleInput} value={registerInput.email} className="form-control" />
                                        <span>{registerInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="float-left">Password</label>
                                        <input type="password" name="password" onChange={handleInput} value={registerInput.password} className="form-control" />
                                        <span>{registerInput.error_list.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;