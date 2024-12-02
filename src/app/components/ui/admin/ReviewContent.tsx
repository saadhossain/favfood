'use client'
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader'
import { useSetUserData } from '@/app/hooks/useSetUserData'
import { useAppSelector } from '@/app/lib/hooks'
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import SubHeading from '../../shared/headings/SubHeading'
import DataTable from '../../tables/DataTable'
import TableFiltering from '../../tables/TableFiltering'
import { reviewTableColumns } from '../../tables/tableColumns/reviewTableColumns'

const ReviewContent = () => {
    const { data: session } = useSession();
    //Get the Reviews from the server
    const { isLoading } = useSetUserData('/reviews');
    const { userData } = useAppSelector((state) => state.userData);
    // Enable Search Functionality
    // Set Default Data to this state
    const [data, setData] = useState(() => [...userData]);
    useEffect(() => { setData(userData) }, [userData])
    //Set review columns to this state
    const [columns] = useState(() => [...reviewTableColumns])
    const [globalFilter, setGlobalFilter] = useState([])

    //Declare the table here.
    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter
        },
        initialState: {
            pagination: {
                pageSize: 5
            }
        },
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });
    return (
        <>
            <div className='flex gap-5 items-center justify-between'>
                <SubHeading heading={'Reviews'} />
                <TableFiltering table={table} />
            </div>
            {
                (isLoading || !session) ? <TableSkeletonLoader /> : <div className='w-full'>
                    {
                        userData?.length <= 0 ? <h1 className='text-lg font-semibold text-gray-800'>No Review Found. <Link href='/' className='text-primary'>Go to Shop</Link></h1> : (
                            // Table Starts Here
                            <DataTable table={table} />
                        )
                    }
                </div>
            }
        </>
    )
}

export default ReviewContent;