import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/appwriteConfig';
import {Link, useNavigate, useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Button } from '../components';
import parse from 'html-react-parser';

function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        console.log("parameter is: ", slug);
    }, []);

    useEffect(() => {
        if(slug) {
            appwriteService.getPost(slug).then((postItem) => {
                if(postItem) {
                    setPost(postItem);
                } else {
                    navigate('/');
                }
            });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if(status) {
                appwriteService.fileDelete(post.featuredImage);
                navigate('/');
            }
        });
    }

    useEffect(() => {
        console.log("post data is: ", post);
    }, [post]);

    return post ? (
        <div className='py-8'>
            <Container>
                <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
                    <img
                        src={appwriteService.filePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-1/4 "
                    />

                    {isAuthor && (
                        <div className='absolute right-6 top-6'>
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="mr-3" bgColor="bg-green-500">Edit</Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>Delete</Button>
                        </div>
                    )}
                </div>
                <div className='w-full mb-6'>
                <h1 className='text-2xl font-bold'>{post.title}</h1>
                </div>
                <div className='browser-css'>
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}

export default Post;
