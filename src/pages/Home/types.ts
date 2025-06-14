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
