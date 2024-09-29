import React, { useState } from 'react';
import authService from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login, logout } from '../store/authSlice';
import { Input, Button, Logo } from './index';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';


function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        console.log("creating account...");
        try {
            const session = await authService.createAccount(data);
            if(session) {
                const userData = await authService.currentUser();
                if(userData) dispatch(login(userData));
                console.log("created account...");
                navigate("/");  
            }
        } catch(error) {
            setError(error.message);
        }
    }

    return (
        <div className='flex items-center justify-center'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className='mb-2 flex justify-center'>
                    <span className='inline-block w-full max-w-[100px]'>
                        <Logo width='100%'/>
                    </span>
                </div>
                <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create an account</h2>
                <p className='mt-2 text-center text-base text-black/60'>
                    Already have an account?&nbsp;
                    <Link to="/login" className='font-medium text-primary transition-all duration-200 hover:underline'>Sign In</Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label="Full Name: "
                            placeholder="Enter full name..."
                            {...register("name", {
                                required: true
                            })}
                        />
                        <Input
                            label="Email Id"
                            type="email"
                            placeholder="Enter Email id"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder="Enter Password..."
                            {...register("password", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^(?=.*[A-Za-z]{5,})(?=.*\d)(?=.*[!@#$%^&*()_\-+=])[A-Za-z\d!@#$%^&*()_\-+=]{8,}$/.test(value) || "Password must have more than 5 alphabets, at least 1 digit and symbol"
                                }
                            })}
                        />
                        <Button type="submit" className="w-full">Create Account</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;