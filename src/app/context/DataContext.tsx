'use client';
import { ReactNode, createContext, useState } from 'react';
import { DataContextType } from '../types/DataContextTypes';

export const DataContext = createContext<DataContextType | null>(null);
const DataProvider = ({ children }: { children: ReactNode }) => {
    //Loading state
    const [loading, setLoading] = useState(false);
    //Set fetched food data to the state
    const [foods, setFoods] = useState([]);
    const [tabQuery, setTabQuery] = useState('all-food');

    //Set the FormData to the State as object when input changes
    const [formData, setFormData] = useState<any>({});

    const allData = { loading, setLoading, foods, setFoods, tabQuery, setTabQuery, formData, setFormData, };
    return (
        <div>
            <DataContext.Provider value={allData}>
                {children}
            </DataContext.Provider>
        </div>
    );
};

export default DataProvider;