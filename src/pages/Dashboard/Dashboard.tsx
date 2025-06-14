import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ApplicationContext } from "../../context/ApplicationContext";
import ClientLayout from "./ClientLayout";
import TrainerLayout from "./TrainerLayout";

function Dashboard()
{
   const {user} = useContext(ApplicationContext)!;
    if (!user) {
        return <Navigate to="/" replace />;
    }
    if(user.userType == "Client")
    {
        return <ClientLayout />;
    }
    if (user.userType === "Trainer") {
        return <TrainerLayout />;
    }

}

export default Dashboard;
