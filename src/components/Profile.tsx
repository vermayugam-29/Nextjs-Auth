'use client'
import { getUserDetails, logOut } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

const Profile = () => {

    const router = useRouter();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (!data) {
            getUserDetails(setData,setLoading,router);
        }
    }, [data])

    if(loading) {
        return (
            <div>
                loading....
            </div>
        )
    }

    return (
        <div>
            <h1>data</h1>
            <Link href={`/profile/${data}`} >Visit User</Link>
            <button onClick={() => logOut(setData , setLoading , router)}>LogOut</button>
        </div>
    )
}

export default Profile
