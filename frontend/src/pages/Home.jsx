import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/appwriteConfig';
import appwriteAuth from '../appwrite/auth';
import { Container, PostCard } from '../components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([]);
    const userStatus = useSelector(state => state.auth.isLogin);

    useEffect(() => {
        appwriteAuth.currentUser()
        .then((user) => {
            if(user) {
                return appwriteService.getAllPost();
            }
        })
        .then((postItems) => {
            if(postItems) {
                setPosts(postItems.documents);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, []);

    if (!userStatus) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold'>
                                <Link to="/login" className='hover:text-gray-500'>Login to read Posts</Link>
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if(posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                                No Posts yet!!
                            </h1>
                            <Link className='text-2xl font-bold hover:text-gray-500' to="/add-post">Add posts</Link>
                        </div>
                    </div>
                </Container>
            </div>
        )
    } 

    return (
        <div className='w-full py-8'>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div className='p-2 w-1/4' key={post.$id}>
                        {/* <PostCard post={post}/> */}
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home;