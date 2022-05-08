import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import swal from "sweetalert";
import Swal from "sweetalert";

function Home() {

    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([])
    const history = useNavigate();
    var loggedUserId = localStorage.getItem('auth_user_id');
    var loggedUserRoleId = localStorage.getItem('auth_role_id');

    useEffect(()=>{
        fetchPosts()
    },[])

    const fetchPosts = async () => {
        axios.get(`/api/posts/roleId/${loggedUserRoleId}/userId/${loggedUserId}`).then(res=>{
            if(res.status === 200)
            {
                setPosts(res.data.posts)
                setLoading(false);
            }
        });
    }

    if(loading)
    {
        return <h4>Loading Student Data...</h4>
    }
    else {
        var postContent = "";
        postContent = posts.map((post, index) => {
            return (
                <div className='col-12' key={index}>
                    <div className="card mt-3">
                        <div className="card-header">
                            <h4 className="float-start">{post.title}</h4>
                            {post.status_id === 2 ? <span className="badge rounded-pill bg-success float-end">Approved</span> : ``}
                            {post.status_id === 3 ? <span className="badge rounded-pill bg-warning float-end">Rejected</span> : ``}
                            {

                                loggedUserRoleId == 1 && post.status_id == 1 ?
                                    <button type="button" onClick={(e) => approvePost(e, post.id)} className="btn btn-success btn-sm float-end m-1">Approve</button>
                                    :
                                    ``
                            }
                            {
                                loggedUserRoleId == 1 && post.status_id == 1 ?
                                    <button type="button" onClick={(e) => rejectPost(e, post.id)} className="btn btn-warning btn-sm float-end m-1">Reject</button>
                                    :
                                    ``
                            }
                            {
                                loggedUserId == post.user_id ?
                                <button type="button" onClick={(e) => deletePost(e, post.id)} className="btn btn-danger btn-sm m-1 float-end">Delete</button>
                                :
                                ``
                            }
                        </div>
                        <div className="card-body">
                            {post.body}
                        </div>
                    </div>
                </div>
            );
        });
    }

    const deletePost = (e, id) => {
        e.preventDefault();

        swal({
            title: "Are you sure?",
            text: "You want to delete this post?",
            icon: "warning",
            dangerMode: true,
        }).then(willDelete => {
                if (willDelete) {
                    axios.delete(`/api/post/${id}`).then(res => {
                        if(res.data.status === 200){
                            swal("Deleted!", res.data.message, "success");
                            history(`/`);
                        }
                    })
                }
        });

    }


    const approvePost = (e, id) => {
        e.preventDefault();
        axios.patch(`/api/approvePost/${id}`).then(res => {
            if(res.data.status === 200){
                Swal("Success", res.data.message, "success");
                history(`/`);
            }else{
                Swal("Warning", res.data.message, "warning");
                history(`/`);
            }
        })
    }

    const rejectPost = (e, id) => {
        e.preventDefault();
        axios.patch(`/api/rejectPost/${id}`).then(res => {
            if(res.data.status === 200){
                Swal("Success", res.data.message, "success")
                history(`/`);
            }else{
                Swal("Warning", res.data.message, "warning");
                history(`/`);
            }
        })
    }

    return (
        <div>
            <Navbar />
            <div className="container">
                <div className="row">
                    <div className='col-12'>
                        <Link className='btn btn-primary mb-2 mt-3 float-end' to={"/post/create"}>
                            Create Post
                        </Link>
                    </div>
                    {postContent}

                </div>

            </div>

        </div>

    );
}

export default Home;