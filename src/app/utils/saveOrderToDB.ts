'use client';
import { OrderDataType } from '../types/DataTypes';

//If Payment is successful, then save the order to database
export const saveOrderToDB = async (orderData: OrderDataType | any) => {
    const res = await fetch(`/api/orders`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    const data = await res.json();
    return data;
}