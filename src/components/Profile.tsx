'use client'
import { getUserDetails, logOut } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

const Profile = () => {

    const router = useRouter();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasBeenCalled , setCalled] = useState(false);


    useEffect(() => {
        if(!hasBeenCalled){
            if(data === null) {
                getUserDetails(setData,setLoading);
                setCalled(true);
            }
            setCalled(true);
        }
    }, [])

    if(loading && data === null) {
        return (
            <div>
                loading....
            </div>
        )
    }

    return (
        <div>
            {
                data !== null && 
                    <Link href={`/profile/${data}`}>
                    Visit user
                    </Link>
            }
            <button onClick={() => logOut(setData , setLoading , router)}>LogOut</button>
        </div>
    )
}

export default Profile
