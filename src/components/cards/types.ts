export type NextTrainingInfoResponse = {
    title: string,
    startDateTime: string,
    trainerName: string,
    durationInMinutes: number

}

export type ActiveSubscriptionInfoResponse = {
    subscriptionName: string,
    description: string,
    activationDate: string,
    expirationDate: string,
    isActive: boolean
}

export type CourseDetails = {
    title: string,
    description: string,
    price: number,
    maxParticipants: number,
    trainerName: string
}

export type TrainerIntervalResponse = {
    trainerId: string,
    trainerName: string,
    intervals: string[]

}

export type TrainerCardResponse = {
    id: string,
    name: string,
    specialization: string,
    rating: number,
    certification: string,
    pricePerHour: number,
    startInterval: string,
    endInterval: string,
    yearsOfExperience: number

}

export type CourseCardResponse = {
    courseId: string,
    title: string,
    description: string,
    price: number,
    maxParticipants: number,
    trainerName: string,
    active: boolean,
    totalParticipants: number

}

export type SettingsInfoClient = {
    id: string,
    firstName: string,
    lastName: string,
    address: string,
    email: string,
    phoneNumber: string,
    userType: string
}