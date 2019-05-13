export interface User {
    nickname: string;
    avatar: string;
    email?: string;
    phone?: string;
    password?: string;
    uid?: string;
    dateCreated: string;
    dob: string;
    gender: string;
    race: string;
    bodyType: string;
    userType: string;
    location: Location;
};

export interface Location {
    address: string;
    geo: {
        lat: string,
        lng: string;
    }
}