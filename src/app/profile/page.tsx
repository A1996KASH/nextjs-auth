'use client';
import React from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
    const router = useRouter();
    const [data, setData] = React.useState({
        username: '',
        email: ''
    })

    const getUserData = async () => {
        try {
            const response = await axios.post('/api/users/me');
            console.log('response: ', response.data);
            setData(response.data.data);
        } catch (error) {
            console.error('Error in getting user data: ', error);
            toast.error('Error in getting user data');
            onLogout();
            router.push('/login');
        }
    }
    const onLogout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logged out successfully');
            router.push('/login');
        } catch (error) {
            console.error('Error in logging out: ', error);
            toast.error('Error in logging out');
        }
    }
    React.useEffect(() => {
        getUserData();
    }, [])
  return (
    <div>
      <h1>Profile</h1>
        <h2>{data?.username}</h2>
        <h3>{data?.email}</h3>
        <button onClick={onLogout}>Logout</button>

    </div>
  );
};

export default ProfilePage;