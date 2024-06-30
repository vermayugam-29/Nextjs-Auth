import axios from 'axios';
import toast from 'react-hot-toast';

export const submitForm = async (form : any , setLoading : any , router : any) => {
    setLoading(true);
    try {
        const response = await axios.post('/api/users/signup', form);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success('New account created successfully');
        router.push('/login');
    } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(`${error.response.data.message}`);
        }
        else {
            toast.error('Something went wrong while making new account');
        }
    }
    setLoading(false);
}

export const verifyEmail = async(token : any , setLoading : any , router : any) => {
    setLoading(true);
    try {
        const response = await axios.post('/api/users/verifyEmail' , {token});
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success('User verified successfully');
        router.push('/login');
    } catch (error : any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(`${error.response.data.message}`);
        }
        else {
            toast.error('Something went wrong while verifying your account');
        }
    }
    setLoading(false);
}

export const loginForm = async(info : any , setLoading : any , router : any) => {
    setLoading(true);
    try {
        const response = await axios.post('/api/users/login',info);
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        toast.success('Logged in successfully');
        router.push('/profile');
    } catch (error : any) {
        if (error.response && error.response.data && error.response.data.message) {
            toast.error(`${error.response.data.message}`);
        }
        else {
            toast.error('Something went wrong while logging in to your account');
        }
    }
    setLoading(false);
}

export const getUserDetails = async(setData : any , setLoading : any , router : any) => {
    setLoading(true);
    try {
        const response = await axios.get('/api/users/details');
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success('User details fetced successfully');
        router.push(`/profile/${response.data.data._id}`);
        setData(response.data.data);
    } catch (error : any) {
        if(error.response && error.response.data && error.response.data.message){
            toast.error(`${error.response.data.message}`)
        } else {
            toast.error(`Something went wrong while fetchhing user details`)
        }
    }
    setLoading(false);
}

export const logOut = async(setData : any , setLoading  : any , router : any) => {
    setLoading(true);
    try {
        const response = await axios.post('/api/users/logout');
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        
        toast.success('Logged out successfully');
        setData(null);
        router.push('/login');
    } catch (error : any) {
        if(error.response && error.response.data && error.response.data.message) {
            toast.error(`${error.response.data.message}`);
        } else {
            toast.error('Something went wrong while logging out user');
        }
    }
    setLoading(false);
}