export interface Product {
    id : number;
    name : string;
    detail : string;
    price : number;
    amount : number;
    img : string;
}

export interface Category {
    name: string;
    type: string;
    products: Product[];
}

export interface ProductCreate {
    title : string;
    description : string;
    price : number;
    image : string;
    category : string;
}

export interface ProductResp {
    id : number;
    title : string;
    description : string;
    price : number;
    image : string;
    category : string;
}

export interface ProductUpdate {
    id : number;
    title : string;
    description : string;
    price : number;
    image : string;
    category : string;
}