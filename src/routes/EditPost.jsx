import blogFetch from "../axios/confg";

import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import "./EditPost.css";

function EditPost() {
    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const navigate = useNavigate();

    const {id} = useParams();

    const getPost = async () => {
        try {
            
            const response = await blogFetch.get(`/posts/${id}`);
            const data = response.data;
            setTitle(data.title);
            setBody(data.body);

        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        getPost();
    },[]);

    const editPost = async (e) => {
        e.preventDefault();
        try {
            const post = {title, body, userId: 1}; 
            await blogFetch.put(`/posts/${id}`, post);
            navigate(`/posts/${id}`);

        } catch (error) {
            console.log(error);
            
        }
    }


    return (
        <div className="new-post">
        <h2>Editando: {title}</h2>
        <form onSubmit={(e) => editPost(e)}>
            <div className="form-control">
                <label htmlFor="title">Título</label>
                <input type="text" id="title" name="title" placeholder="Digite o título" onChange={(e) => setTitle(e.target.value)} value={title || ""}/>
            </div>
            <div className="form-control">
                <label htmlFor="body">Conteúdo:</label>
                <textarea type="text" id="body" name="body" placeholder="Digite o contéudo" onChange={(e) => setBody(e.target.value)} value={body || ""} ></textarea>
            </div>
            <input type="submit" value="Editar Post" className="btn"/>
        </form>
    </div>
    )
}

export default EditPost
