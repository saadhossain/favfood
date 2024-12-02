'use client'
import TableSkeletonLoader from '@/app/components/spinner/TableSkeletonLoader';
import { useSetUserData } from '@/app/hooks/useSetUserData';
import { useAppSelector } from '@/app/lib/hooks';
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AddButton from '../../shared/buttons/AddButton';
import SubHeading from '../../shared/headings/SubHeading';
import DataTable from '../../tables/DataTable';
import TableFiltering from '../../tables/TableFiltering';
import { orderTableColumns } from '../../tables/taleColumns/orderTableColumns';


const OrderContent = () => {
    const { data: session } = useSession();
    //Get the Orders from the server
    const { userData: orders } = useAppSelector((state) => state.userData);
    const { isLoading } = useSetUserData('/orders');
    // Set Default Data to this state
    const [data, setData] = useState(() => [...orders]);
    useEffect(() => { setData(orders) }, [orders])
    //Set review columns to this state
    const [columns] = useState(() => [...orderTableColumns])
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
            <div className='flex gap-5 items-center justify-between mb-2'>
                <SubHeading heading={'Orders'} />
                <div className='flex flex-col md:flex-row gap-2 items-center justify-end'>
                    <AddButton endpoint='/orders/create-order' title='Create Order' />
                    <TableFiltering />
                </div>
            </div>
            {
                (isLoading || !session) ? <TableSkeletonLoader /> : <div className='w-full'>
                    {
                        orders?.length <= 0 ? <h1 className='text-lg font-semibold text-gray-800'>No Order Found. <Link href='/' className='text-primary'>Go to Shop</Link></h1> : (
                            <DataTable table={table} />
                        )
                    }
                </div>
            }
        </>
    )
}

export default OrderContent