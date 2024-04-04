'use client';
import React, {useEffect, useState} from "react";
import axios from "axios";
import {toast} from 'react-hot-toast';
import { useRouter } from "next/navigation";
import Link from "next/link";
const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: '',
        password: ''
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onLogin = async () => {
        try{
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log('response: ', response.data);
            router.push('/profile');
        }catch(err: any){
            toast.error(err.message)
        }
    }
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing": "Login"}</h1>
        <label htmlFor="email">Email</label>
        <input  id="email" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
        <label htmlFor="password">Password</label>
        <input id="password" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"  type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})}/>
        <button className=" p-5 bg-red-500" onClick={onLogin} disabled={buttonDisabled || loading}>{buttonDisabled ? 'No Login' : 'Login'}</button>
        <Link href="/signup">
          Dont  have an account? Signup
        </Link>
    </div>
  );
};

export default LoginPage;