export interface CreateOrderRequest {
    customerId   : number;
    restaurantId : number;
    itemAmount   : number;
}

export interface OrderResponse {
    id           : number;
    customerId   : number;
    restaurantId : number;
    itemAmount   : number;
    eta          : number;
    orderTime    : Date;
    customer?    : { name: string; phone: string };
    restaurant?  : { name: string };
}