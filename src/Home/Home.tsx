import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { RouterProvider } from '@tanstack/react-router';
import {router} from '../router/router';
const Home: React.FC = () => {
    return (
        <div>
           <Header/>
           <RouterProvider router={router}/>
            <Footer/>
        </div>
    );
};

export default Home;