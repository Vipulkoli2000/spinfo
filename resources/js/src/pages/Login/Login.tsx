import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';

// Define the validation schema using Zod
const loginSchema = z.object({
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z.string().min(6, 'Password is required'),
    isAdmin: z.boolean().optional(),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginBoxed = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {   
        dispatch(setPageTitle('Login Boxed'));
    }, [dispatch]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(loginSchema),
    });
    const CallApi = async (data: LoginFormInputs) => {
        const response = await axios.post('http://localhost:8000/api/login', data);
        console.log(response);
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
            localStorage.setItem('token', response.data.data.token);

        }
        if(isAdmin){
            navigate('/profiles');
            return
        }
        navigate('/');
    };

    const onSubmit = (data: LoginFormInputs) => {
        if(data.isAdmin === true){
            setIsAdmin(true);
        }
         console.log(data);
        CallApi(data);
    };

    return (
        <div className="max-h-[100vh] flex justify-center items-center bg-cover bg-center bg-[url('/assets/images/map.svg')] dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="flex flex-col items-center justify-center h-full mt-[100px]">
                <div className=" panel sm:w-[450px] min-h-[400px] m-6 max-w-lg w-full">
                    <h2 className="font-bold text-2xl mb-3">Sign In</h2>
                    <p className="mb-7">Enter your email and password to login</p>
                    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" {...register('email')} className="form-input" placeholder="Enter Email" />
                            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" {...register('password')} className="form-input" placeholder="Enter Password" />
                            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                        </div>
                        <div>
                            <label htmlFor="isAdmin">Admin</label>
                            <input id="isAdmin" type="checkbox"  {...register('isAdmin')} className="form-input" value="true" placeholder="Enter Password" />
                            {errors.isAdmin && <span className="text-red-600">{errors.isAdmin.message}</span>}
                        </div>

                        <button type="submit" className="btn btn-primary w-full">
                            SIGN IN
                        </button>
                    </form>

                    <p className="text-center mt-8">
                        Don&apos;t have an account ?
                        <Link to="/register" className="font-bold text-primary hover:underline ltr:ml-1 rtl:mr-1">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginBoxed;
