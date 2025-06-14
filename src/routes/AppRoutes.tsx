import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home/Home';
import ClientLayout from '../pages/Dashboard/ClientLayout';
import DashboardContent from '../pages/Dashboard/client/DashboardContent';
import {TrainersDisplay} from "../pages/Dashboard/client/TrainersDisplay";

function AppRoutes()
{
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/dashboard/client" element={<ClientLayout />}>
                <Route index element={<DashboardContent />} />
                <Route path="trainers" element={<TrainersDisplay />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;