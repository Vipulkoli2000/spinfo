import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css'; // Define the validation schema using Zod
import { Toaster, toast } from 'sonner';
const registerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    mobile: z.string().min(1, 'Mobile is required'),
    pan: z
        .string()
        .min(1, 'Pan is required')
        .regex(/^[a-zA-Z]{5}([0-9]){4}([a-zA-Z0-9]){1}?$/),
    address_1: z.string().min(1, 'Address 1 is required'),
    address_2: z.string().min(1, 'Address 2 is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    pincode: z.string().min(1, 'Pincode is required'),
    bank_name: z.string().min(1, 'Bank Name is required'),
    account_name: z.string().min(1, 'Account Name is required'),
    account_no: z.string().min(1, 'Account No is required'),
    ifsc: z.string().min(1, 'Ifsc is required'),
    business_name: z.string().min(1, 'Business Name is required'),
    gstin: z.string().min(1, 'Gstin is required'),
});

type LoginFormInputs = z.infer<typeof registerSchema>;

const UpdateProfile = () => {
    const User = JSON.parse(localStorage.getItem('user') as string);
    console.log(User);
    const [uniqueData, setUniqueData] = useState<any>({});
    const [phone, setPhone] = useState<Number | null>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [defaultData, setDefaultData] = useState<any>({});
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    useEffect(() => {
        dispatch(setPageTitle('Register Boxed'));
    }, [dispatch]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>({
        resolver: zodResolver(registerSchema),
    });
    useEffect(() => {
        const response<{ data: { profile: any } }> = axios.get(`/api/profiles/${User.profile.id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
        });
        setDefaultData(response?.data?.data?.profile);
    }, [User]);

    const CallApi = async (data: LoginFormInputs) => {
        try {
            const response = await axios.put(`/api/profiles/${User.profile.id}`, data);
            console.log(response);
            toast.success('Registration successful');
            navigate('/login');
        } catch (error) {
            console.log(error);

            if (error.response.data.pan) {
                toast.error(error.response.data.data.pan[0]);
            }
            if (error.response.data.mobile) {
                toast.error(error.response.data.data.mobile[0]);
            }
        }
    };

    const onSubmit = (data: LoginFormInputs) => {
        // You can handle the form submission here, for example:

        data.mobile = data.mobile.replace(' ', '');
        data.mobile = data.mobile.replace('-', '');
        console.log(data);
        CallApi(data);
    };

    return (
        <div className="max-h-[100vh] flex justify-center items-center">
            <div className=" h-full w-full mt-[120px]">
                <h2 className="font-bold text-2xl mb-3">Update Profile</h2>
                <p className="mb-7">Enter your details to Update</p>
                <form className="space-y-5 grid grid-cols-2 gap-4 justify-items-center mb-[100px]" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex flex-col justify-end ">
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" {...register('name')} className="form-input self-center" placeholder="Enter Name" />
                        {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                    </div>

                    <div className="w-full flex flex-col justify-center">
                        <label htmlFor="mobile">Mobile</label>
                        <PhoneInput
                            inputStyle={
                                {
                                    width: '100%',
                                    borderRadius: '5px',
                                    padding: '10px',
                                    fontSize: '16px',
                                    color: '#000',
                                } as React.CSSProperties
                            }
                            defaultCountry="in"
                            {...register('mobile')}
                            className=""
                            placeholder="Enter Mobile"
                        />
                        {errors.mobile && <span className="text-red-600">{errors.mobile.message}</span>}
                    </div>
                    <div className="w-full flex flex-col justify-center">
                        <label htmlFor="pan">Pan</label>
                        <input id="pan" type="text" {...register('pan')} className="form-input" placeholder="Enter Pan" />
                        {errors.pan && <span className="text-red-600">{errors.pan.message}</span>}
                    </div>
                    <div className="w-full flex flex-col justify-center">
                        <label htmlFor="address_1">Address 1</label>
                        <input id="address_1" type="text" {...register('address_1')} className="form-input" placeholder="Enter Address 1" />
                        {errors.address_1 && <span className="text-red-600">{errors.address_1.message}</span>}
                    </div>
                    <div className="w-full flex flex-col justify-center">
                        <label htmlFor="address_2">Address 2</label>
                        <input id="address_2" type="text" {...register('address_2')} className="form-input" placeholder="Enter Address 2" />
                        {errors.address_2 && <span className="text-red-600">{errors.address_2.message}</span>}
                    </div>
                    <div className="w-full flex flex-col justify-center">
                        <label htmlFor="city">City</label>
                        <input id="city" type="text" {...register('city')} className="form-input" placeholder="Enter City" />
                        {errors.city && <span className="text-red-600">{errors.city.message}</span>}
                    </div>
                    <div className="w-full flex flex-col justify-center">
                        <label htmlFor="state">State</label>
                        <input id="state" type="text" {...register('state')} className="form-input" placeholder="Enter State" />
                        {errors.state && <span className="text-red-600">{errors.state.message}</span>}
                    </div>
                    <div className="w-full flex flex-col justify-center">
                        <label htmlFor="pincode">Pincode</label>
                        <input id="pincode" type="text" {...register('pincode')} className="form-input" placeholder="Enter Pincode" />
                        {errors.pincode && <span className="text-red-600">{errors.pincode.message}</span>}
                    </div>
                    <div className="w-full flex flex-col justify-center">
                        <label htmlFor="bank_name">Bank Name</label>
                        <input id="bank_name" type="text" {...register('bank_name')} className="form-input" placeholder="Enter Bank Name" />
                        {errors.bank_name && <span className="text-red-600">{errors.bank_name.message}</span>}
                    </div>
                    <div className="w-full flex flex-col justify-center">
                        <label htmlFor="account_name">Account Name</label>
                        <input id="account_name" type="text" {...register('account_name')} className="form-input" placeholder="Enter Account Name" />
                        {errors.account_name && <span className="text-red-600">{errors.account_name.message}</span>}
                    </div>
                    <div className="w-full flex flex-col justify-center">
                        <label htmlFor="account_no">Account No</label>
                        <input id="account_no" type="text" {...register('account_no')} className="form-input" placeholder="Enter Account No" />
                        {errors.account_no && <span className="text-red-600">{errors.account_no.message}</span>}
                    </div>
                    <div className="w-full flex flex-col justify-center">
                        <label htmlFor="ifsc">Ifsc</label>
                        <input id="ifsc" type="text" {...register('ifsc')} className="form-input" placeholder="Enter Ifsc" />
                        {errors.ifsc && <span className="text-red-600">{errors.ifsc.message}</span>}
                    </div>
                    <div className="w-full flex flex-col justify-center">
                        <label htmlFor="business_name">Business Name</label>
                        <input id="business_name" type="text" {...register('business_name')} className="form-input" placeholder="Enter Business Name" />
                        {errors.business_name && <span className="text-red-600">{errors.business_name.message}</span>}
                    </div>
                    <div className="w-full flex flex-col justify-center">
                        <label htmlFor="gstin">Gstin</label>
                        <input id="gstin" type="text" {...register('gstin')} className="form-input" placeholder="Enter Gstin" />
                        {errors.gstin && <span className="text-red-600">{errors.gstin.message}</span>}
                    </div>

                    <button type="submit" className="btn btn-primary w-full col-span-full ">
                        SIGN UP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
