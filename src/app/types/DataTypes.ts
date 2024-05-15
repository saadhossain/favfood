export interface FoodData {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    restaurant_Name: string;
    image: string;
    category: string;
    reviewCount: number;
    itemSold: number;
    discountPercentage: number;
    createdAt: string
}

export interface UserData {
    _id: string;
    email: string;
    fullName: string;
    password: string;
    profileImg: string;
    role: string;
}


export interface SessionData {
    expires: string;
    user: {
        _id: string;
        email: string;
        fullName: string;
        image: string;
        password: string;
        role: string;
    }
}

export interface CartDataType {
    productId: string;
    quantity: number;
}

export interface WishlistData {
    productId: string;
}