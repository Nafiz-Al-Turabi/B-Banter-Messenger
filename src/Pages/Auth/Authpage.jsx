// AuthPage.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">{isLogin ? 'Login to BBanter' : 'Create an Account'}</h2>

                {/* Login Form */}
                {isLogin && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                {...register('email', { required: 'Email is required' })}
                                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                {...register('password', { required: 'Password is required' })}
                                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>
                        <button type="submit" className="w-full py-3 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">Login</button>
                    </form>
                )}

                {/* Signup Form */}
                {!isLogin && (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                id="username"
                                {...register('username', { required: 'Username is required' })}
                                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                {...register('email', { required: 'Email is required' })}
                                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                {...register('password', { required: 'Password is required' })}
                                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                        </div>
                        <button type="submit" className="w-full py-3 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition">Sign Up</button>
                    </form>
                )}

                <p className="mt-4 text-center text-gray-600">
                    {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
                    <button onClick={toggleForm} className="ml-2 text-blue-500 hover:underline">{isLogin ? 'Sign Up' : 'Login'}</button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;
