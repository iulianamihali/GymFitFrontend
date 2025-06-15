import { useContext, useState } from "react";
import { ApplicationContext } from "../../context/ApplicationContext";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Box, ListItemIcon, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import SettingsIcon from "@mui/icons-material/Settings";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from '@mui/icons-material/Menu';
import Cookies from 'js-cookie';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from "@mui/material/styles";

function Sidebar() {
    const context = useContext(ApplicationContext);
    const user = context?.user;
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        Cookies.remove('user');
        context?.updateUser(null);
        navigate("/");
    };

    const drawerContent = (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.5rem",
                padding: "1.5rem",
                borderBottom: "1px solid #ff7a00",
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "1.5rem 1rem",
                }}>
                    <Avatar sx={{ bgcolor: "#ff7a00", width: 48, height: 48 }}>
                        <AccountCircleIcon sx={{ color: "white", fontSize: 32 }} />
                    </Avatar>
                    <div style={{ fontWeight: "bold", fontSize: "1rem", color: "white", textAlign: "center" }}>
                        {user?.userName && user?.userName.replace(",", " ")}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#888", textAlign: "center" }}>
                        {user?.userType}
                    </div>
                </div>
            </div>

            <Box sx={{ display: "flex", flexDirection: "column", flex: 1, mt: 2, gap: 2}}>
                {user?.userType === "Client" && (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate("/dashboard/client")} sx={btnStyle}>
                                <ListItemIcon sx={iconStyle}><DashboardIcon /></ListItemIcon>
                                <ListItemText primary="Dashboard" sx={textStyle} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate("/dashboard/client/trainers")} sx={btnStyle}>
                                <ListItemIcon sx={iconStyle}><FitnessCenterIcon /></ListItemIcon>
                                <ListItemText primary="Trainers" sx={textStyle} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate("/dashboard/client/courses")} sx={btnStyle}>
                                <ListItemIcon sx={iconStyle}><SportsGymnasticsIcon /></ListItemIcon>
                                <ListItemText primary="Courses" sx={textStyle} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate("/dashboard/client/profile")} sx={btnStyle}>
                                <ListItemIcon sx={iconStyle}><SettingsIcon /></ListItemIcon>
                                <ListItemText primary="Profile" sx={textStyle} />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
                {user?.userType === "Trainer" && (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate("/dashboard/trainer")} sx={btnStyle}>
                                <ListItemIcon sx={iconStyle}><DashboardIcon /></ListItemIcon>
                                <ListItemText primary="Dashboard" sx={textStyle} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate("/dashboard/trainer/coursesTrainer")} sx={btnStyle}>
                                <ListItemIcon sx={iconStyle}><SportsGymnasticsIcon /></ListItemIcon>
                                <ListItemText primary="Courses" sx={textStyle} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate("/dashboard/trainer/clients")} sx={btnStyle}>
                                <ListItemIcon sx={iconStyle}><GroupIcon /></ListItemIcon>
                                <ListItemText primary="Clients" sx={textStyle} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate("/dashboard/trainer/profileTrainer")} sx={btnStyle}>
                                <ListItemIcon sx={iconStyle}><SettingsIcon /></ListItemIcon>
                                <ListItemText primary="Profile" sx={textStyle} />
                            </ListItemButton>
                        </ListItem>
                    </>
                )}
                <ListItem disablePadding sx={{ marginTop: "auto" }}>
                    <ListItemButton onClick={handleLogout} sx={btnStyle}>
                        <ListItemIcon sx={iconStyle}><LogoutIcon /></ListItemIcon>
                        <ListItemText primary="Log Out" sx={textStyle} />
                    </ListItemButton>
                </ListItem>
            </Box>
        </>
    );

    return (
        <>
            {isMobile ? (
                <>
                    <IconButton onClick={() => setMobileOpen(true)} sx={{ position: "fixed", top: 16, left: 16, zIndex: 1300, color: "white" }}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                        variant="temporary"
                        anchor="left"
                        open={mobileOpen}
                        onClose={() => setMobileOpen(false)}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                            [`& .MuiDrawer-paper`]: {
                                width: 240,
                                backgroundColor: "#362f2f",
                                color: "#f2f2f2",
                            },
                        }}
                    >
                        {drawerContent}
                    </Drawer>
                </>
            ) : (
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
                            display: "flex",
                            flexDirection: "column",
                        },
                    }}
                >
                    {drawerContent}
                </Drawer>
            )}
        </>
    );
}

const btnStyle = {
    justifyContent: "center",
    paddingLeft: 5.5,
    gap: 1.5,
    color: "white",
    transition: "background-color 0.3s ease",
    "&:hover": {
        backgroundColor: "#252223",
        color: "white",
    },
};

const iconStyle = {
    color: "white",
    minWidth: "0",
};

const textStyle = {
    display: "flex",
    alignItems: "center",
};

export default Sidebar;
