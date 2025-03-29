import blogFetch from "../axios/confg";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import "./Admin.css";

function Admin() {

    const [posts, setPost] = useState([]);

    const getPost = async () => {
        try {
            const response = await blogFetch.get("/posts");
            const data = response.data;

            setPost(data);
            
        } catch (error) {
            console.log(error);
            
        }
    }

    const deletePost = async (id) => {
        await blogFetch.delete(`/posts/${id}`);

        const filterPosts = posts.filter((post) => post.id !== id);
        setPost(filterPosts);
    }


    useEffect(() => {
        getPost();
    },[]);


    return (
        <div className="admin">
            <h1>Gerenciar Posts</h1>
            {posts.length === 0 ? (<p>Carregando...</p>) : (
                posts.map((post) => (
                    <div className="post" key={post.id}>
                        <h2>{post.title}</h2>
                        <div className="actions">
                            <Link to={`/post/edit/${post.id}`} className="btn edit-btn">Editar</Link>
                            <button className="btn delete-btn" onClick={() => deletePost(post.id)}>Excluir</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default Admin
