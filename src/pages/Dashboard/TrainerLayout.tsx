import Sidebar from "../../components/Sidebar/Sidebar";
import {Outlet} from "react-router-dom";

function TrainerLayout()
{
    return(
        <div style={{display: "flex", height: "100vh", overflowY:"auto", backgroundColor: "#252223"}}>
            <Sidebar/>
            <main style={{flex: 1, padding: "0rem"}}>
                <Outlet/>
            </main>
        </div>
    )
}

export default TrainerLayout;