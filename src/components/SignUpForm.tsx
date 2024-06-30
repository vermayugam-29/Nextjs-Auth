'use client'

import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { submitForm } from '@/utils/auth';


const SignUpForm = () => {

    const router = useRouter();

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [btnDisabled, setBtnDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    

    useEffect(() => {
        if (form.email != '' && form.username != '' && form.password != '') {
            setBtnDisabled(false);
        } else {
            setBtnDisabled(true)
        }
    }, [form])

    const changeHandler = (e: any) => {
        const { name, value } = e.target;
        setForm(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const submitHandler = (e: any) => {
        e.preventDefault();
        if (!btnDisabled) {
            submitForm(form,setLoading,router);
        } else {
            toast.error('Please fill all the details to submit form')
        }
    }

    if (loading) {
        return (
            <div className='flex justify-center items-center'>
                loading...
            </div>
        )
    }

    return (
        <div className='flex flex-col justify-center items-center py-2 min-h-screen'>
            <form onSubmit={submitHandler}
                className='flex flex-col justify-center items-center w-screen gap-2' action="">
                <h1 className='text-3xl'>Sign Up Form</h1>

                <input type="text"
                    onChange={changeHandler}
                    className='w-1/4 text-black'
                    value={form.username} name='username'
                    placeholder='Enter username'
                />

                <input type="text"
                    onChange={changeHandler}
                    className='w-1/4 text-black'
                    value={form.email} name='email'
                    placeholder='Enter email'
                />

                <input type="text"
                    onChange={changeHandler}
                    className='w-1/4 text-black'
                    value={form.password} name='password'
                    placeholder='Enter password'
                />


                <button className='w-1/4 mt-[10px] bg-blue-600 rounded-lg'>
                    {
                        btnDisabled ? `Please fill the form first` : `SignUp`
                    }
                </button>
            </form>

            <button className='w-1/4 mt-[10px] bg-blue-600 rounded-lg'
                onClick={() => router.push('/login')}>
                login
            </button>
        </div>
    )
}

export default SignUpForm