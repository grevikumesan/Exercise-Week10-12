export type CreateCustomerRequest = {
    name    : string;
    phone   : string;
}

export type CustomerResponse = {
    id      : number;
    name    : string;
    phone   : string;
}