import Sidebar from "../../components/Sidebar/Sidebar";
import {Outlet} from "react-router-dom";

function ClientLayout()
{
    return(
        <div style={{display: "flex",height: "100vh",   overflow: "hidden" ,backgroundColor: "#252223" }}>
            <Sidebar/>
            <main style={{flex: 1, padding: "0rem"}}>
                <Outlet/>
            </main>
        </div>
    )
}

export default ClientLayout;