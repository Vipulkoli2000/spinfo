import React from 'react';
import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));
const ToDo = lazy(() => import('../pages/ToDo/Index'));

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
];

export { routes };
