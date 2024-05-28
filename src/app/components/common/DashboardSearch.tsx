'use client'

import { DataContext } from '@/app/context/DataContext'
import { DataContextType } from '@/app/types/DataContextTypes'
import { handleDashboardSearch } from '@/app/utils/handleDashboardSearch'
import { useContext } from 'react'
import { FaSearch } from "react-icons/fa";

const DashboardSearch = () => {
    const { initialData, setAdminData } = useContext(DataContext) as DataContextType;
    return (
        <div className='w-80 bg-gray-200 rounded-md flex items-center'>
            <input type="text" name="search" id="search"
                onChange={(e) => handleDashboardSearch(e.target.value as string, initialData, setAdminData)}
                placeholder='Search Here...'
                className='w-full p-2 bg-gray-200 rounded-md text-gray-900 focus:outline-none'
            />
            <FaSearch className='w-6 h-6 mr-2 text-gray-500'/>
        </div>
    )
}

export default DashboardSearch