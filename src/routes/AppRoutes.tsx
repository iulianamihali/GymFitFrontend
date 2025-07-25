import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home/Home';
import ClientLayout from '../pages/Dashboard/ClientLayout';
import DashboardContent from '../pages/Dashboard/client/DashboardContent';
import { TrainersDisplay } from "../pages/Dashboard/client/TrainersDisplay";
import { CoursesDisplay } from "../pages/Dashboard/client/CoursesDisplay";
import ProfileSettings from '../pages/Dashboard/client/ProfileSettings';

import TrainerLayout from "../pages/Dashboard/TrainerLayout";
import { DashboardContentTrainer } from "../pages/Dashboard/trainer/DashboardContentTrainer";
import CoursesTrainer from '../pages/Dashboard/trainer/CoursesTrainer';
import { ClientsDisplay } from "../pages/Dashboard/trainer/ClientsDisplay";
import TrainerProfileSettings from "../pages/Dashboard/trainer/TrainerProfileSettings";

import UnauthorizedPage from '../pages/UnauthorizedPage';
import {ProtectedRoute} from "./ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            <Route
                path="/dashboard/client"
                element={
                    <ProtectedRoute allowedRoles={["Client"]}>
                        <ClientLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<DashboardContent />} />
                <Route path="trainers" element={<TrainersDisplay />} />
                <Route path="courses" element={<CoursesDisplay />} />
                <Route path="profile" element={<ProfileSettings />} />
            </Route>

            <Route
                path="/dashboard/trainer"
                element={
                    <ProtectedRoute allowedRoles={["Trainer"]}>
                        <TrainerLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<DashboardContentTrainer />} />
                <Route path="coursesTrainer" element={<CoursesTrainer />} />
                <Route path="clients" element={<ClientsDisplay />} />
                <Route path="profileTrainer" element={<TrainerProfileSettings />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
