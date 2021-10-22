import React, { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import PostService from "../API/PostService";
import Loader from "../Components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";

function PostIdPage() {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching( async () => {
        const response = await PostService.getById(params.id);
        setPost(response.data);
    })

    const [fetchComments, isComLoading, comError] = useFetching( async () => {
        const response = await PostService.getCommentsByPostId(params.id);
        setComments(response.data);
    })

    useEffect( () => {
        fetchPostById(params.id);
        fetchComments(params.id);
    }, [])
    return(
        <div className='PostIdPage'>
           <h2 className='comm-post'>Вы открыли пост № {params.id}</h2>
           
           {isLoading
           ? <Loader/>
           : <div>{post.id}. {post.title} </div>
           }
           <h2 className='comments'>Комментарии:</h2>
           {isComLoading
           ? <Loader/>
           : <div>
               {comments.map(comm =>
                <div className='comment' key={comm.id} style={{marginTop: '15px'}}>
                    <h5>{comm.email}</h5>
                    <div>{comm.body}</div>
                </div>
                )}
           </div>

           }
        </div>
    );
}

export default PostIdPage;