import toast from 'react-hot-toast';
import { OrderDataType } from '../types/DataTypes';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const saveOrderToDB = async (orderData: OrderDataType | any, route: AppRouterInstance) => {
    const res = await fetch(`/api/orders`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(orderData)
    })
    const data = await res.json();
    if (data.status) {
        localStorage.removeItem('favFoodCart');
        toast.success('Order has been placed successfully.');
        route.push('/account');
    }
    return data;
}