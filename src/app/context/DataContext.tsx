'use client';
import { ReactNode, createContext, useState } from 'react';
import { DataContextType } from '../types/DataContextTypes';

export const DataContext = createContext<DataContextType | null>(null);
const DataProvider = ({ children }: { children: ReactNode }) => {
    //Loading state
    const [loading, setLoading] = useState(false);

    //Set the FormData to the State as object when input changes
    const [formData, setFormData] = useState<any>({});

    const allData = { loading, setLoading, formData, setFormData, };
    return (
        <div>
            <DataContext.Provider value={allData}>
                {children}
            </DataContext.Provider>
        </div>
    );
};

export default DataProvider;