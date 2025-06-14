export interface RegisterRequest{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: string;
    dateOfBirth: string;
    phoneNumber: string;
    address: string;
    userType: string;
    specialization: string;
    yearsOfExperience: number;
    certification: string;
    pricePerHour: number;
    startInterval: string;
    endInterval: string;
}
export interface LoginRequest{
    email: string;
    password: string;
}
export interface LoginResponse {
    token: string;
    userId: string;
    userName: string;
    email: string;
    userType: string;
}
