export interface CreateCustomerRequest {
    name    : string;
    phone   : string;
}
export interface CustomerResponse {
    id      : number;
    name    : string;
    phone   : string;
}

export interface UpdateCustomerRequest {
    id      : number;
    name?   : string;
    phone?  : string;
}