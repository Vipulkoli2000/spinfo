import React from 'react';
import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const ToDo = lazy(() => import('../pages/ToDo/Index'));
const LoginBoxed = lazy(() => import('../pages/Login/Login'));
const Register = lazy(() => import('../pages/Login/Register'));
const AdminProfiles = lazy(() => import('../pages/AdminProfiles/Profiles'));
const UpdateProfile = lazy(() => import('../pages/Profile/UpdateProfile'));
const AdminEditProfile = lazy(() => import('../pages/AdminProfiles/UpdateProfile'));
const Contact = lazy(() => import('../pages/Contactsbelow/Contacts'));
const routes = [
    // dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'default',
    },
    {
        path: '/todo',
        element: <ToDo />,
        layout: 'default',
    },
    {
        path: '/login',
        element: <LoginBoxed />,
        layout: 'default',
    },
    {
        path: '/register/:id/:refid',
        element: <Register />,
        layout: 'default',
    },
    {
        path: 'users/profile',
        element: <UpdateProfile />,
        layout: 'default',
    },
    {
        path: 'profiles',
        element: <AdminProfiles />,
        layout: 'default',
    },
    {
        path: 'profile/:id',
        element: <AdminEditProfile />,
        layout: 'default',
    },
    {
        path: 'contactedit/:id',
        element: <Contact />,
        layout: 'default',
    },
];

export { routes };
