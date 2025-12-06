export interface CreateRestaurantRequest {
    name        : string;
    description : string;
    isOpen?     : boolean; 
}

export interface RestaurantResponse {
    id          : number;
    name        : string;
    description : string;
    isOpen      : boolean;
}

export interface UpdateRestaurantRequest {
    id          : number;
    name?       : string; 
    description?: string;
    isOpen?     : boolean; 
}