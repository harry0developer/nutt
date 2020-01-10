export interface User {
    nickname: string;
    gender: string;
    age: string;
    race: string; 
    bodyType: string;
    height: string;
    email: string;
    phone: string;
    password: string;
    uid: string;
    dateCreated: string;
    userType: string;
    location: {
      address: string;
      geo: {
        lat: number;
        lng: number;
      }
    }
};

export interface Location {
    address: string;
    geo: {
        lat: number,
        lng: number;
    }
} 