'use client'
import { loginForm } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const loginPage = () => {

    const router = useRouter();

    const [info, setInfo] = useState({
        email: '',
        password: ''
    })

    const [loading, setLoading] = useState(false);



    const changeHandler = (e: any) => {
        const { name, value } = e.target;
        setInfo(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const submitHandler = (e: any) => {
        e.preventDefault();
        loginForm(info, setLoading, router);
    }

    if(loading) {
        return (
            <div>
                loading....
            </div>
        )
    }

    return (
        <div className='flex flex-col justify-center items-center min-w-screen min-h-screen'>
            <form className='flex flex-col justify-center items-center gap-8'
                onSubmit={submitHandler} action="">
                <input required type='text'
                    name='email' value={info.email}
                    onChange={changeHandler}
                    placeholder='Enter email'
                />
                <input required type='text'
                    name='password' value={info.password}
                    onChange={changeHandler}
                    placeholder='Enter password'
                />

                <button className='bg-blue-500 w-full rounded-lg'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default loginPage