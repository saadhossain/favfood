export interface FoodData {
    _id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    restaurant: string;
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
    phone?: string;
    isActive?: boolean;
    address?: {
        streetAddress: string,
        city: string,
        state: string,
        zipCode: string,
        country: string
    },
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
        phone?: string;
        isActive?: boolean;
    }
}

export interface CartDataType {
    productId: string;
    quantity: number;
}

export interface WishlistData {
    productId: string;
}
export interface OrderDataType {
    _id?: string;
    products: [
        {
            _id: string,
            name: string,
            slug: string,
            restaurantName: string,
            price: number,
            image: string,
            quantity: number
        }
    ],
    orderAmount: string,
    userInfo: { _id: string, fullName: string },
    paymentMethod: string,
    orderStatus: string,
    deliveryAddress: {
        streetAddress: string,
        city: string,
        state: string,
        zipCode: String | any,
        country: string
    },
    orderDate: string,
    paymentStatus: string
}

export interface RestaurantData {
    _id: string,
    name: string,
    foodCategory: string[],
    minOrderAmount: string,
    location: string,
    deliveryCharge: string,
    profileImage: string,
    offers: [
        {
            name: string,
            discount: string,
            minOrderAmount: string,
            description: string
        }
    ],
    isActive: boolean,
}

export interface ReviewData {
    _id: string,
    title: string,
    description: string,
    rating: number,
    foodId: string,
    foodSlug: string,
    restaurantId: string,
    restaurantName: string,
    userId: string,
    userName: string,
    userProfileImage: string,
    addedOn: string
}

export interface AdminDataType {
   map(arg0: (restaurant: any) => import("react").JSX.Element): import("react").ReactNode;
   data: [] | any
}