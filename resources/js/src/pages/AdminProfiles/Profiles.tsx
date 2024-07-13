import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import Dropdown from './DropDown';
import axios from 'axios';
import {toggleProfileEdit } from '../../store/themeConfigSlice';

const Profiles = () => {
    const [profileList, setProfileList] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Tables'));
    });
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [tabs, setTabs] = useState<string[]>([]);
    const toggleCode = (name: string) => {
        if (tabs.includes(name)) {
            setTabs((value) => value.filter((d) => d !== name));
        } else {
            setTabs([...tabs, name]);
        }
    };
    // ProfileList
    useEffect(() => {
        axios
            .get('/api/profiles', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
            })
            .then((response: any) => {
                setProfileList(response?.data?.data?.ProfileList);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }, []);

    // const tableData = [
    //     {
    //         id: 1,
    //         name: 'John Doe',
    //         email: 'johndoe@yahoo.com',
    //         date: '10/08/2020',
    //         sale: 120,
    //         status: 'Complete',
    //         register: '5 min ago',
    //         progress: '40%',
    //         position: 'Developer',
    //         office: 'London',
    //     },
    //     {
    //         id: 2,
    //         name: 'Shaun Park',
    //         email: 'shaunpark@gmail.com',
    //         date: '11/08/2020',
    //         sale: 400,
    //         status: 'Pending',
    //         register: '11 min ago',
    //         progress: '23%',
    //         position: 'Designer',
    //         office: 'New York',
    //     },
    //     {
    //         id: 3,
    //         name: 'Alma Clarke',
    //         email: 'alma@gmail.com',
    //         date: '12/02/2020',
    //         sale: 310,
    //         status: 'In Progress',
    //         register: '1 hour ago',
    //         progress: '80%',
    //         position: 'Accountant',
    //         office: 'Amazon',
    //     },
    //     {
    //         id: 4,
    //         name: 'Vincent Carpenter',
    //         email: 'vincent@gmail.com',
    //         date: '13/08/2020',
    //         sale: 100,
    //         status: 'Canceled',
    //         register: '1 day ago',
    //         progress: '60%',
    //         position: 'Data Scientist',
    //         office: 'Canada',
    //     },
    // ];

    return (
        <div>
            <div className="panel">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Dropdown</h5>
                    {/* <button type="button" onClick={() => toggleCode('code8')} className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600">
                        <span className="flex items-center">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ltr:mr-2 rtl:ml-2">
                                <path
                                    d="M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                                <path opacity="0.5" d="M13.9868 5L10.0132 19.8297" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path
                                    d="M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                            Code
                        </span>
                    </button> */}
                </div>
                <div className="table-responsive mb-5">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Profile Number</th>
                                <th>Wallet Balance</th>
                                <th>Status</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profileList.map((data) => {
                                return (
                                    <tr key={data?.id}>
                                        <td>
                                            <div className="whitespace-nowrap">{data?.name}</div>
                                        </td>
                                        <td>{data.profile_no}</td>
                                        <td>{data.wallet_balance}</td>
                                        <td>
                                            <span className={`badge whitespace-nowrap ${data.profile_no ? 'bg-primary   ' : !data.profile_no ? 'bg-secondary' : 'bg-primary'}`}>
                                                {data.profile_no ? 'Payment Done' : 'Not Paid'}
                                            </span>
                                        </td>
                                        <td className="text-center">
                                            <div className="dropdown">
                                                <Dropdown
                                                    offset={[0, 5]}
                                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                                    button={
                                                        <svg className="opacity-70 m-auto w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                                            <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                                            <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                                                        </svg>
                                                    }
                                                >
                                                    <ul>
                                                        <li onClick={()=>{dispatch(toggleProfileEdit(true))}}>
                                                            <button type="button">Edit</button>
                                                        </li>
                                                        <li>
                                                            <button type="button">Delete</button>
                                                        </li>
                                                    </ul>
                                                </Dropdown>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Profiles;
