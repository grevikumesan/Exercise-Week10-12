export type CreateRestaurantRequest = {
    name        : string;
    description : string;
    isOpen?     : boolean; 
}

export type UpdateRestaurantRequest = {
    id          : number;
    name?       : string;
    description?: string;
    isOpen?     : boolean;
}