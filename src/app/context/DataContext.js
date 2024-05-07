'use client';
import { createContext, useState } from 'react';

export const DataContext = createContext();
const DataProvider = ({ children }) => {
    //Loading state
    const [loading, setLoading] = useState(false);

    const [tabQuery, setTabQuery] = useState('all-food');

    //Set Cart Quantity from localStorage
    const [cartQuantity, setCartQuantity] = useState(0);

    const allData = { loading, setLoading, tabQuery, setTabQuery, cartQuantity, setCartQuantity };
    return (
        <div>
            <DataContext.Provider value={allData}>
                {children}
            </DataContext.Provider>
        </div>
    );
};

export default DataProvider;