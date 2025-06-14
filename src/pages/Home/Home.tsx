import './Home.css';
import {useContext, useEffect} from "react";
import {ApplicationContext} from "../../context/ApplicationContext";

import {Box, Modal, TextField, Button, Typography, Card, CardContent, MenuItem} from '@mui/material';
import Grid from '@mui/material/Grid';

import { useState } from 'react';
import axios from 'axios';
import {API_URL} from "../../authorization/config";
import {LoginRequest, LoginResponse, RegisterRequest} from "./types";
import Cookies from 'js-cookie'
import {useNavigate} from "react-router-dom";
function Home(){
    const navigate = useNavigate();
    const auth=useContext(ApplicationContext);
    const [openLogin, setOpenLogin] = useState(false);
    //states for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [errorEmail, setErrorEmail] = useState(true);
    const [errorPassword, setErrorPassword] = useState(true);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail);
    const isPhoneValid = /^[0-9]{10}$/.test(phoneNumber);
    const [phoneTouched, setPhoneTouched] = useState(false);
    const [userType, setUserType] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [yearsOfExperience, setYearsOfExperience] = useState<number>(0);
    const [certification, setCertification] = useState('');
    const [pricePerHour, setPricePerHour] = useState<number>(0);
    const [startInterval, setStartInterval] = useState('');
    const [endInterval, setEndInterval] = useState('');

    useEffect(() => {
        if(openLogin===false)
        {
            setEmail('');
            setPassword('');
            setLoginError('');
        }
        if(openSignUp===false)
        {
            setFirstName('');
            setLastName('');
            setSignupEmail('');
            setSignupPassword('');
            setGender('');
            setDateOfBirth('');
            setPhoneNumber('');
            setAddress('');
            setPhoneTouched(false);
        }

    },[openLogin,openSignUp])
    useEffect(() => {
        if(email.length !== 0)
            setErrorEmail(false);
        else
            setErrorEmail(true);
        if(password.length !== 0)
            setErrorPassword(false);
        else
            setErrorPassword(true);


    },[email,password])

    useEffect(() => {
        if(loginError !== '' && (email.length !== 0 || password.length !== 0))
        {
            setLoginError('');
        }

    }, [email,password])


    const handleLogin = () => {
            const loginRequest = {
                email: email,
                password: password
            } as LoginRequest;
            axios.post<LoginResponse>(`${API_URL}/auth/login`, loginRequest)
                .then(({data}) => {
                    console.log(data);
                    if (auth) {
                        auth.updateUser(data);
                        Cookies.set('user', JSON.stringify(data), { expires: 7 });

                        if (data.userType === "Client") {
                            navigate("/dashboard/client");
                        } else if (data.userType === "Trainer") {
                            navigate("/dashboard/trainer");
                        } else {
                            navigate("/");
                        }
                    }

                })
                .catch((err) => {

                });

    }


    const handleSignUp = () => {
        const registerRequest = {
            firstName,
            lastName,
            email: signupEmail,
            password: signupPassword,
            gender,
            dateOfBirth,
            phoneNumber,
            address,
            userType,
            ...(userType === "Trainer" && {
                specialization,
                yearsOfExperience,
                certification,
                pricePerHour,
                startInterval,
                endInterval,
            }),
        } as RegisterRequest;

        axios.post<LoginResponse>(`${API_URL}/auth/register`, registerRequest)
            .then(({data}) => {
                console.log(data);
                if (auth) {
                    auth.updateUser(data);
                    Cookies.set('user', JSON.stringify(data), { expires: 7 });

                    if (data.userType === "Client") {
                        navigate("/dashboard/client");
                    } else if (data.userType === "Trainer") {
                        navigate("/dashboard/trainer");
                    } else {
                        navigate("/");
                    }
                }

            })
            .catch((err) => {

            });

    }


    return (
        <div className="wrapper">
            <div className="container">
                <div className="left">
                    <h1 className="title">GymFit</h1>
                </div>
                <p className="subtitle"> Are you ready to train with discipline and perform at your highest level?</p>
                <p className="subtext">Sign up today and start getting in shape!</p>
                <div className="buttons" style={{display: 'flex', gap: '1rem', marginTop: '1.5rem'}}>
                    <Button variant="outlined" color="warning" onClick={() => setOpenLogin(true)}>Login</Button>
                    <Button variant="contained" color="warning" onClick={() => setOpenSignUp(true)}>Signup</Button>
                </div>
                <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
                    <Box className="login-modal">
                        <Typography variant="h5" align="center"  sx={{ marginBottom: '0.5rem' ,fontFamily: 'Poppins, sans-serif',fontWeight:600}}>Welcome Back!</Typography>

                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            error={errorEmail}
                            fullWidth
                            margin="normal"
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            error={errorPassword}
                            fullWidth
                            margin="normal"
                            sx={{ mb: 2 }}
                        />


                        <Button onClick={handleLogin}
                                className="login-button"
                                variant="contained"
                                disabled={errorEmail || errorPassword}
                                color="primary" >
                            Login
                        </Button>
                        <Typography variant="body2" align="center" sx={{ marginTop: '1rem' ,fontFamily: 'Poppins, sans-serif'}}>
                            Don't have an account? <span className="signup-link" >Register</span>
                        </Typography>

                        {(loginError !== '' ? (
                            <Typography variant="body2" color="error" align="center" sx={{ marginTop: '0.5rem' }}>
                                {loginError}
                            </Typography>
                        ) : null) as React.ReactNode}



                    </Box>
                </Modal>

                <Modal open={openSignUp} onClose={() => setOpenSignUp(false)}>
                    <Box className="signup-modal"   sx={{
                        maxHeight: "76vh",
                        overflowY: "auto",
                        padding: 3,
                        borderRadius: 2,
                        backgroundColor: "white",
                    }}>
                        <Typography variant="h5" align="center" sx={{ fontWeight:600,marginBottom: '0.5rem', fontFamily: 'Poppins, sans-serif',mb:3 }} >
                            Create your account
                        </Typography>

                        <Grid container spacing={2} sx={{ mb: 4 }}>
                            <Grid item xs={6}>
                                <TextField
                                    label="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>


                        <Grid container spacing={2} sx={{ mb: 4 }}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Email"
                                    type="email"
                                    value={signupEmail}
                                    onChange={(e) => setSignupEmail(e.target.value)}
                                    required
                                    fullWidth
                                    error={!isEmailValid && signupEmail.length > 0}
                                    helperText={!isEmailValid && signupEmail.length > 0 ? "Invalid email format" : ""}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    value={signupPassword}
                                    onChange={(e) => setSignupPassword(e.target.value)}
                                    required
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} sx={{ mb: 4 }}>
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    label="Gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                    fullWidth
                                >
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Male">Male</MenuItem>
                                </TextField>
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Date of Birth"
                                    type="date"
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    required
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                        </Grid>


                        <Grid container spacing={2} sx={{mb:4}}>
                            <Grid item xs={6}>
                                <TextField
                                    label="Phone Number"
                                    type="tel"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                    fullWidth
                                    onBlur={() => setPhoneTouched(true)}
                                    error={phoneTouched && !isPhoneValid}
                                    helperText={phoneTouched && !isPhoneValid ? "Phone must have 10 digits" : ""}

                                />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField
                                    label="Address"
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <TextField
                            select
                            label="User Type"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            fullWidth
                            margin="normal"
                        >
                            <MenuItem value="Client">Client</MenuItem>
                            <MenuItem value="Trainer">Trainer</MenuItem>
                        </TextField>

                        {userType === "Trainer" && (
                            <>
                                <Grid container spacing={2} sx={{ mb: 4 }}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Specialization"
                                            value={specialization}
                                            onChange={(e) => setSpecialization(e.target.value)}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Years of Experience"
                                            type="number"
                                            value={yearsOfExperience}
                                            onChange={(e) => setYearsOfExperience(Number(e.target.value))}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} sx={{ mb: 4 }}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Certification"
                                            value={certification}
                                            onChange={(e) => setCertification(e.target.value)}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Price per Hour"
                                            type="number"
                                            value={pricePerHour}
                                            onChange={(e) => setPricePerHour(Number(e.target.value))}
                                            fullWidth
                                            required
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2} sx={{ mb: 4 }}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Start Interval"
                                            type="time"
                                            value={startInterval}
                                            onChange={(e) => setStartInterval(e.target.value)}
                                            fullWidth
                                            required
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="End Interval"
                                            type="time"
                                            value={endInterval}
                                            onChange={(e) => setEndInterval(e.target.value)}
                                            fullWidth
                                            required
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Grid>
                                </Grid>
                            </>
                        )}


                        <Button onClick={handleSignUp}
                                className="signup-button"
                                variant="contained"
                                color="primary"
                                disabled={firstName==='' || lastName==='' || signupEmail==='' || signupPassword==='' || gender==='' || dateOfBirth==='' || phoneNumber==='' || address===''}>
                            Sign Up
                        </Button>


                    </Box>
                </Modal>


            </div>

            {/*<div className="img-login">*/}
            {/*<img src="/assets/imgs/login_img.jpg" alt="Fitness Hero"/>*/}
            {/*</div>*/}
        </div>


    );

}

export default Home;