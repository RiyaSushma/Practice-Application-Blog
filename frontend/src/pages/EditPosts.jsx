import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from '../appwrite/appwriteConfig';
import { useNavigate, useParams } from 'react-router-dom';

function EditPosts() {
    const [post, setPost] = useState([]);
    
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(slug) {
            appwriteService.getPost(slug).then((postItem) => {
                if(postItem) {
                    setPost(postItem);
                }
            }).catch((error) => console.log(error));
        } else {
            navigate('/');
        }
    }, [slug, navigate]);
  return ( post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={posts}/>
        </Container>
    </div>
  ) : null);
}

export default EditPosts;