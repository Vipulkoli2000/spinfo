import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { toggleRTL, toggleTheme, toggleMenu, toggleLayout, toggleAnimation, toggleNavbar, toggleLocale, toggleSemidark } from '../store/themeConfigSlice';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Formatcurrency } from '../components/CurrencyComponent';

const Index = () => {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    const [showProfileWarning, setShowProfileWarning] = useState(true);
    const [Profiles, setProfiles] = useState([]);
    useEffect(() => {
        dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
        dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
        dispatch(toggleLayout(localStorage.getItem('layout') || themeConfig.layout));
        dispatch(toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
        dispatch(toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
        dispatch(toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar));
        dispatch(toggleLocale(localStorage.getItem('i18nextLng') || themeConfig.locale));
        dispatch(toggleMenu('vertical'));
        dispatch(toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark));
    }, [dispatch, themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar, themeConfig.locale, themeConfig.semidark]);
    const User = JSON.parse(localStorage.getItem('user') as string);
    const Navigate = useNavigate();
    const callapi = async () => {
        try {
            const response = await axios.get(`/api/payment/${User.profile.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        const response = async () => {
            const response = await axios
                .get(`/api/profiles/${User?.profile?.id}/get_profiles`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                })
                .then((response: any) => {
                    setProfiles(response?.data?.data?.Profiles);
                });
            console.log(response);
        };
        response();
    }, [User?.profile?.id]);

    const tableData = [
        {
            level_1: User.profile.level_1,
        },
        {
            level_2: User.profile.level_2,
        },
        {
            level_3: User.profile.level_3,
        },
        {
            level_4: User.profile.level_4,
        },
        {
            level_5: User.profile.level_5,
        },
        {
            level_6: User.profile.level_6,
        },
        {
            level_7: User.profile.level_7,
        },
        {
            level_8: User.profile.level_8,
        },
        {
            direct_count: User.profile.direct_count,
        },
    ];

    return (
        <div>
            <div className="h-full w-full grid grid-cols-2 max-md:grid-cols-1 content-between gap-5">
                {showProfileWarning && (
                    <div className="flex items-center p-3.5 rounded text-white bg-info col-span-2 mt-5 mb-5 max-md:flex-col max-md:items-start">
                        <span className="text-white w-6 h-6 ltr:mr-4 rtl:ml-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19.0001 9.7041V9C19.0001 5.13401 15.8661 2 12.0001 2C8.13407 2 5.00006 5.13401 5.00006 9V9.7041C5.00006 10.5491 4.74995 11.3752 4.28123 12.0783L3.13263 13.8012C2.08349 15.3749 2.88442 17.5139 4.70913 18.0116C9.48258 19.3134 14.5175 19.3134 19.291 18.0116C21.1157 17.5139 21.9166 15.3749 20.8675 13.8012L19.7189 12.0783C19.2502 11.3752 19.0001 10.5491 19.0001 9.7041Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                />
                                <path opacity="0.5" d="M7.5 19C8.15503 20.7478 9.92246 22 12 22C14.0775 22 15.845 20.7478 16.5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </span>
                        <span>
                            <strong className="ltr:mr-1 rtl:ml-1">Warning!</strong>Please Update your profile details.
                        </span>
                        <button
                            onClick={() => {
                                Navigate('users/profile');
                            }}
                            type="button"
                            className="btn btn-sm bg-white text-black ltr:ml-auto rtl:mr-auto max-md:mt-2 max-md: self-start"
                        >
                            Update Profile
                        </button>
                        <button onClick={() => setShowProfileWarning(false)} type="button" className="ltr:ml-4 rtl:mr-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                )}
                <div className="flex flex-wrap w-full h-full justify-center mb-5 max-md:col-span-2">
                    <div className="min-w-full min-h-full border border-gray-500/20 rounded-md shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)] p-6">
                        <div className="text-primary mb-5">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
                                <path
                                    d="M15.5777 3.38197L17.5777 4.43152C19.7294 5.56066 20.8052 6.12523 21.4026 7.13974C22 8.15425 22 9.41667 22 11.9415V12.0585C22 14.5833 22 15.8458 21.4026 16.8603C20.8052 17.8748 19.7294 18.4393 17.5777 19.5685L15.5777 20.618C13.8221 21.5393 12.9443 22 12 22C11.0557 22 10.1779 21.5393 8.42229 20.618L6.42229 19.5685C4.27063 18.4393 3.19479 17.8748 2.5974 16.8603C2 15.8458 2 14.5833 2 12.0585V11.9415C2 9.41667 2 8.15425 2.5974 7.13974C3.19479 6.12523 4.27063 5.56066 6.42229 4.43152L8.42229 3.38197C10.1779 2.46066 11.0557 2 12 2C12.9443 2 13.8221 2.46066 15.5777 3.38197Z"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                                <path opacity="0.5" d="M21 7.5L12 12M12 12L3 7.5M12 12V21.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h5 className="text-lg font-semibold mb-3.5 dark:text-white-light">Make Payment</h5>
                        <p className="text-white-dark text-[15px]  mb-3.5">You have not made any payments yet.</p>
                        <button onClick={callapi} type="button" className="text-primary font-semibold hover:underline group">
                            Make Payment{' '}
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 ltr:ml-1 rtl:mr-1 inline-block relative transition-all duration-300 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 rtl:rotate-180"
                            >
                                <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="max-md:col-span-2">
                    <div
                        className="panel h-full overflow-hidden before:bg-[#1937cc] before:absolute before:-right-44 before:top-0 before:bottom-0 before:m-auto before:rounded-full before:w-96 before:h-96 grid grid-cols-1 content-between"
                        style={{ background: 'linear-gradient(0deg,#00c6fb -227%,#005bea)' }}
                    >
                        <div className="flex items-start justify-between text-white-light mb-16 z-[7]">
                            <h5 className="font-semibold text-lg">Total Balance</h5>

                            <div className="relative text-xl whitespace-nowrap"> {Formatcurrency(User.profile.wallet_balance)} </div>
                        </div>
                        <div className="flex items-center justify-between z-10">
                            {/* <div className="flex items-center justify-between">
                                <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#1937cc] place-content-center ltr:mr-2 rtl:ml-2">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </button>
                                <button type="button" className="shadow-[0_0_2px_0_#bfc9d4] rounded p-1 text-white-light hover:bg-[#1937cc] grid place-content-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        />
                                        <path opacity="0.5" d="M10 16H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path opacity="0.5" d="M14 16H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <path opacity="0.5" d="M2 10L22 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="panel col-span-2">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Levels Table</h5>
                    </div>
                    <div className="table-responsive mb-5">
                        <table>
                            <thead>
                                <tr>
                                    <th>Levels</th>
                                    <th>Count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {User &&
                                    User.profile &&
                                    tableData.map((data, index) => {
                                        if (index === 0) {
                                            return (
                                                <tr key={data.level_1}>
                                                    <td>Level 1</td>
                                                    <td>{data.level_1}</td>
                                                </tr>
                                            );
                                        }
                                        if (index === 1) {
                                            return (
                                                <tr key={data.level_2}>
                                                    <td>Level 2</td>
                                                    <td>{data.level_2}</td>
                                                </tr>
                                            );
                                        }
                                        if (index === 2) {
                                            return (
                                                <tr key={data.level_3}>
                                                    <td>Level 3</td>
                                                    <td>{data.level_3}</td>
                                                </tr>
                                            );
                                        }
                                        if (index === 3) {
                                            return (
                                                <tr key={data.level_4}>
                                                    <td>Level 4</td>
                                                    <td>{data.level_4}</td>
                                                </tr>
                                            );
                                        }
                                        if (index === 4) {
                                            return (
                                                <tr key={data.level_5}>
                                                    <td>Level 5</td>
                                                    <td>{data.level_5}</td>
                                                </tr>
                                            );
                                        }
                                        if (index === 5) {
                                            return (
                                                <tr key={data.level_6}>
                                                    <td>Level 6</td>
                                                    <td>{data.level_6}</td>
                                                </tr>
                                            );
                                        }
                                        if (index === 6) {
                                            return (
                                                <tr key={data.level_7}>
                                                    <td>Level 7</td>
                                                    <td>{data.level_7}</td>
                                                </tr>
                                            );
                                        }
                                        if (index === 7) {
                                            return (
                                                <tr key={data.level_8}>
                                                    <td>Level 8</td>
                                                    <td>{data.level_8}</td>
                                                </tr>
                                            );
                                        }
                                        if (index === 8) {
                                            return (
                                                <tr key={data.direct_count}>
                                                    <td>Direct Count</td>
                                                    <td>{data.direct_count}</td>
                                                </tr>
                                            );
                                        }
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="panel col-span-2">
                    <div className="flex items-center justify-between mb-5">
                        <h5 className="font-semibold text-lg dark:text-white-light">Simple Table</h5>
                    </div>
                    <div className="table-responsive mb-5">
                        <table>
                            <thead>
                                <tr>
                                    <th>Profile Number</th>
                                    <th>Names</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {User &&
                                    User?.profile &&
                                    Profiles?.map((data, index) => {
                                        return (
                                            <tr className="hover:bg-[#e0e6ed] dark:hover:bg-[#1a2941] cursor-pointer" onClick={() => window.open(`/contactedit/${data?.id}`, '_blank')} key={data?.id}>
                                                <td>{data?.profile_no}</td>
                                                <td>{data?.name}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary btn-sm hover:bg-[#1937cc] hover:text-white"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            navigator.clipboard.writeText(`http://localhost:8000/register/${data?.profile_no}/${User?.profile?.profile_no}`);
                                                            toast.success('Copied to clipboard');
                                                        }}
                                                    >
                                                        Copy To Clipboard
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
