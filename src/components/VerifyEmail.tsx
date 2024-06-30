'use client'
import { verifyEmail } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import React , {useEffect, useState} from 'react'

const VerifyEmail = () => {

    const[token , setToken] = useState('');
    const[loading , setLoading] = useState(false);
    const router = useRouter();

    const verifyHandler = () => {
        console.log(token)
        verifyEmail(token,setLoading,router);
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
        console.log(urlToken)
    } , [])

    
    if(loading) {
        return (
            <div className='flex justify-center items-center'>
                redirecting to login page...
            </div>
        )
    }


  return (
    <div className='flex justify-center items-start w-scree h-screen'>
      <button className='bg-blue w-1/4' onClick={verifyHandler}>
        Click here to verifyEmail
      </button>
    </div>
  )
}

export default VerifyEmail
