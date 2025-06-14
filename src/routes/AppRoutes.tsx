import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home/Home';
import ClientLayout from '../pages/Dashboard/ClientLayout';
import DashboardContent from '../pages/Dashboard/client/DashboardContent';
import {TrainersDisplay} from "../pages/Dashboard/client/TrainersDisplay";
import {CoursesDisplay} from "../pages/Dashboard/client/CoursesDisplay";
import ProfileSettings from '../pages/Dashboard/client/ProfileSettings';

function AppRoutes()
{
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/dashboard/client" element={<ClientLayout />}>
                <Route index element={<DashboardContent />} />
                <Route path="trainers" element={<TrainersDisplay />} />
                <Route path="courses" element={<CoursesDisplay />}/>
                <Route path="profile" element={<ProfileSettings />}/>

            </Route>
        </Routes>
    );
}

export default AppRoutes;