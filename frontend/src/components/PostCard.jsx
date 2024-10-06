import React from 'react';
import appwriteService from '../appwrite/appwriteConfig';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {



    return (
        <Link to={`/post/${$id}`}>
            <div className='flex flex-col w-8/12 bg-gray-100 rounded-xl p-4 ml-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.filePreview(featuredImage)} alt={title} className='rounded-xl'/>
                </div>
                <h3 className='text-center text-xl font-bold'>{title}</h3>
            </div>
        </Link>
    )
}

export default PostCard