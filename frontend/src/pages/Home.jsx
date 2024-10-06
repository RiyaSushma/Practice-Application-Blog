import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/appwriteConfig";
import appwriteAuth from "../appwrite/auth";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Home() {
    const [posts, setPosts] = useState([]);
    const userStatus = useSelector((state) => state.auth.isLogin);
    const navigate = useNavigate();

    useEffect(() => {
        appwriteAuth
            .currentUser()
            .then((user) => {
                if (user) {
                    return appwriteService.getAllPost();
                }
            })
            .then((postItems) => {
                if (postItems) {
                    setPosts(postItems.documents);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    if (!userStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-col">
                        <div className="p-2 w-full">
                            <div className="flex flex-col justify-center">
                                <h1 className="text-2xl font-bold mb-10">
                                    Hello Users👋
                                </h1>
                                <h3 className="text-xl font-bold">
                                    Please Login or Signup to create and view
                                    posts
                                </h3>
                                <div className="mt-10">
                                    <button
                                        className="rounded-lg bg-violet-600 px-5 py-2 text-white font-medium hover:bg-violet-500 mr-3"
                                        onClick={() => navigate("/login")}
                                    >
                                        Login
                                    </button>
                                    <button
                                        className="rounded-lg bg-violet-600 px-5 py-2 text-white font-medium hover:bg-violet-500"
                                        onClick={() => navigate("/signup")}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No Posts yet!!
                            </h1>
                            <Link
                                className="text-2xl font-bold hover:text-gray-500"
                                to="/add-post"
                            >
                                Add posts
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <div className="flex flex-wrap">
                {posts.map((post) => (
                    <div className="p-2 w-1/4" key={post.$id}>
                        {/* <PostCard post={post}/> */}
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
