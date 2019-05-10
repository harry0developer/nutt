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
};

export interface Location {
    address: string;
    geo: {
        lat: string,
        lng: string;
    }
}