import Reac, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { setPageTitle } from '../../store/themeConfigSlice';
import axios from 'axios';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';

const Contacts = () => {
    const { id, refid } = useParams();
    const [Profiles, setProfiles] = useState([]);
    const User = JSON.parse(localStorage.getItem('user') as string);
    useEffect(() => {
        const response = async () => {
            const response = await axios
                .get(`/api/profiles/${id}/get_profiles`, {
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
    return (
        <div>
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
                                        <tr className="hover:bg-[#e0e6ed] dark:hover:bg-[#1a2941] cursor-pointer" onClick={() => window.open(`http://localhost:8000/register/${data?.profile_no}/${User?.profile?.profile_no}`, '_blank')} key={data?.id}>
                                            <td>{data?.profile_no}</td>
                                            <td>{data?.name}</td>
                                            <td>
                                                <button
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
    );
};

export default Contacts;
