export interface User {
    nickname: string;
    email: string;
    phone: string;
    password?: string;
    uid?: string;
    dateCreated?: string;
    dob: string;
    gender: string;
    race: string;
    bodytype: string;
    type: string;
    location: Location;
    userType: string; //buyer or seller
};

export interface Location {
    address: string;
    geo: {
        lat: number,
        lng: number;
    }
}