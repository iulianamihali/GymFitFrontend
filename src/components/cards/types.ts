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