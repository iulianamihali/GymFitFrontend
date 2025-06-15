import { useContext } from "react";
import { ApplicationContext } from "../../context/ApplicationContext";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { ListItemIcon } from "@mui/material";
import {useNavigate} from "react-router-dom";
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import SettingsIcon from "@mui/icons-material/Settings";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import GroupIcon from "@mui/icons-material/Group";

function Sidebar() {
    const context = useContext(ApplicationContext);
    const user = context?.user;
    const navigate = useNavigate();


    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: 240,
                    boxSizing: "border-box",
                    backgroundColor: "#362f2f",
                    color: "#f2f2f2",
                    // boxShadow: "inset -2px 0 6px rgba(0,0,0,0.5)",
                },
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection:"column",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "1.5rem",
                    borderBottom: "1px solid #ff7a00",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.4rem",
                        padding: "1.5rem 1rem",
                    }}
                >
                    <Avatar sx={{bgcolor: "#ff7a00", width: 48, height: 48}}>
                        <AccountCircleIcon sx={{color: "white", fontSize: 32}}/>
                    </Avatar>

                    <div style={{fontWeight: "bold", fontSize: "1rem", color: "white", textAlign: "center"}}>
                        {user?.userName && user?.userName.replace(",", " ")}
                    </div>

                    <div style={{fontSize: "0.85rem", color: "#888", textAlign: "center"}}>
                        {user?.userType}
                    </div>
                </div>

            </div>



            <List style={{marginTop: "1rem"}}>

                {user?.userType === "Client" && (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => navigate("/dashboard/client")}
                                sx={{
                                    justifyContent: "center",
                                    paddingLeft: 5.5,
                                    gap: 1.5,
                                    color: "white",
                                    transition: "background-color 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "#252223",
                                        color: "white",
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: "white", minWidth: "0" }}>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard"
                                              sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                              }}/>

                            </ListItemButton>


                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => navigate("/dashboard/client/trainers")}
                                sx={{
                                    justifyContent: "center",
                                    paddingLeft: 5.5,
                                    gap: 1.5,
                                    color: "white",
                                    transition: "background-color 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "#252223",
                                        color: "white",
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: "white", minWidth: "0" }}>
                                    <FitnessCenterIcon />
                                </ListItemIcon>
                                <ListItemText primary="Trainers"
                                              sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                              }}/>

                            </ListItemButton>


                        </ListItem>


                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => navigate("/dashboard/client/courses")}
                                sx={{
                                    justifyContent: "center",
                                    paddingLeft: 5.5,
                                    gap: 1.5,
                                    color: "white",
                                    transition: "background-color 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "#252223",
                                        color: "white",
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: "white", minWidth: "0" }}>
                                    <SportsGymnasticsIcon sx={{ color: "white" }} />
                                </ListItemIcon>
                                <ListItemText primary="Courses"
                                              sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                              }}/>

                            </ListItemButton>
                        </ListItem>


                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => navigate("/dashboard/client/profile")}
                                sx={{
                                    justifyContent: "center",
                                    paddingLeft: 5.5,
                                    gap: 1.5,
                                    color: "white",
                                    transition: "background-color 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "#252223",
                                        color: "white",
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: "white", minWidth: "0" }}>
                                    <SettingsIcon sx={{ color: "white" }} />
                                </ListItemIcon>
                                <ListItemText primary="Profile"
                                              sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                              }}/>

                            </ListItemButton>
                        </ListItem>
                    </>
                )}


                {user?.userType === "Trainer" && (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => navigate("/dashboard/trainer")}
                                sx={{
                                    justifyContent: "center",
                                    paddingLeft: 5.5,
                                    gap: 1.5,
                                    color: "white",
                                    transition: "background-color 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "#252223",
                                        color: "white",
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: "white", minWidth: "0" }}>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <ListItemText primary="Dashboard"
                                              sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                              }}/>

                            </ListItemButton>


                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => navigate("/dashboard/trainer/coursesTrainer")}
                                sx={{
                                    justifyContent: "center",
                                    paddingLeft: 5.5,
                                    gap: 1.5,
                                    color: "white",
                                    transition: "background-color 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "#252223",
                                        color: "white",
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: "white", minWidth: "0" }}>
                                    <SportsGymnasticsIcon sx={{ color: "white" }} />
                                </ListItemIcon>
                                <ListItemText primary="Courses"
                                              sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                              }}/>

                            </ListItemButton>


                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => navigate("/dashboard/trainer/clients")}
                                sx={{
                                    justifyContent: "center",
                                    paddingLeft: 5.5,
                                    gap: 1.5,
                                    color: "white",
                                    transition: "background-color 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "#252223",
                                        color: "white",
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: "white", minWidth: "0" }}>
                                    <GroupIcon sx={{ color: "white" }} />
                                </ListItemIcon>
                                <ListItemText primary="Clients"
                                              sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                              }}/>

                            </ListItemButton>
                        </ListItem>

                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={() => navigate("/dashboard/trainer/profileTrainer")}
                                sx={{
                                    justifyContent: "center",
                                    paddingLeft: 5.5,
                                    gap: 1.5,
                                    color: "white",
                                    transition: "background-color 0.3s ease",
                                    "&:hover": {
                                        backgroundColor: "#252223",
                                        color: "white",
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: "white", minWidth: "0" }}>
                                    <SettingsIcon sx={{ color: "white" }} />
                                </ListItemIcon>
                                <ListItemText primary="Profile"
                                              sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                              }}/>

                            </ListItemButton>
                        </ListItem>
                    </>
                )}


            </List>
        </Drawer>
    );
}

export default Sidebar;
