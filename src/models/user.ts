export type User = {
    id: number;
    email: string;
    role: string;
    firstName?: string;
    lastName?: string;
    street?: string;
    suburb? : string;
    postcode? : string;
    country?: string;
    phone?: string;
    dob?: string;
    active: boolean;
    registeredAt?: string;  
    loginTime?: string;   
    logoutTime?: string;   
}
