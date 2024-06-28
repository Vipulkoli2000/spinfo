import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';

// Define the validation schema using Zod
const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginBoxed = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);

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

    const onSubmit = (data: LoginFormInputs) => {
        // You can handle the form submission here, for example:
        console.log(data);
        navigate('/');
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
