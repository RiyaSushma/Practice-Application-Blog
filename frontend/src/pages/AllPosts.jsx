import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/appwriteConfig';
import { Container, PostCard } from '../components';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        appwriteService.getAllPost([]).then((post) => {
            if(post) {
                setPosts(post.documents);
            }
        }).catch(err => console.log(err));
    }, []);

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts && posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard post={post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts;