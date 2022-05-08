import React, {useState} from "react";

import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
import Navbar from "../Navbar";
import Swal from 'sweetalert';

function AddPost() {

    const history = useNavigate();
    const [postInput, setPost] = useState({
        user_id: '',
        title: '',
        body: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setPost({ ...postInput, [e.target.name]:e.target.value })
    }

    const savePost = (e) => {
        e.preventDefault();

        const data = {
            user_id: localStorage.getItem('auth_user_id'),
            title: postInput.title,
            body: postInput.body
        }

        axios.post(`/api/posts`, data).then(res => {
            if(res.data.status === 200){
                Swal("Success", res.data.message, "success")
                history(`/`);
            }else {
                setPost({...postInput, error_list: res.data.validation_errors})
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
                                <h4>Add Post
                                    <Link to={'/'} className="btn btn-dark btn-sm float-end"> BACK</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={savePost} >
                                    <div className="form-group mb-3">
                                        <label className="float-start">Title</label>
                                        <input type="text" name="title" onChange={handleInput} value={postInput.title} className="form-control" />
                                        <span className="text-danger">{postInput.error_list.title}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label className="float-start">Description</label>
                                        <input type="text" name="body" onChange={handleInput} value={postInput.body}  className="form-control" />
                                        <span className="text-danger">{postInput.error_list.body}</span>
                                    </div>

                                    <div className="form-group mb-3">
                                        <button type="submit" className="btn btn-primary">Save</button>
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

export default AddPost;