import React, {useState} from "react";
import Navbar from "../Navbar";
import axios from "axios";
import Swal from "sweetalert";
import {useNavigate} from "react-router-dom";

function Login() {

    const history = useNavigate ();
    const [loginInput, setLogin] = useState({
        'email': '',
        'password': '',
        'error_list': []
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name] : e.target.value });
    }

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password
        }

        axios.post(`api/login`, data).then(res => {
            if(res.data.status === 200){
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_user', res.data.email);
                localStorage.setItem('auth_user_id', res.data.userId);
                localStorage.setItem('auth_role_id', res.data.roleId);
                Swal("Success", res.data.message, "success")
                history(`/`);
            }else if(res.data.status === 401){
                Swal("Warning", res.data.message, "warning")
            }else {
                setLogin({ ...loginInput, error_list : res.data.validation_errors})
            }
        })
    }

    return (
        <div>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Login</h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={loginSubmit}>
                                    <div className="form-group mb-3">
                                        <label className="float-start">Email</label>
                                        <input type="email" name="email" onChange={handleInput} value={loginInput.email} className="form-control" />
                                        <span className="text-danger">{loginInput.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="float-start">Password</label>
                                        <input type="password" name="password" onChange={handleInput} value={loginInput.password} className="form-control" />
                                        <span className="text-danger">{loginInput.error_list.password}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Login</button>
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

export default Login;