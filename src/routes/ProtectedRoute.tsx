import {JSX, useContext} from "react";
import {Navigate, useLocation} from "react-router-dom";
import { ApplicationContext } from "../context/ApplicationContext";

export function ProtectedRoute({ allowedRoles, children }: { allowedRoles: string[], children: JSX.Element }) {
    const context = useContext(ApplicationContext);
    const userType = context?.user?.userType;

    const location = useLocation();

    if (!userType) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(userType)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}
