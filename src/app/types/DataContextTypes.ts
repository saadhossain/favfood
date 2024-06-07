import { Dispatch, SetStateAction } from 'react';

export interface DataContextType {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}