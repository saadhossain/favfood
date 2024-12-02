import { ReviewData } from '@/app/types/DataTypes';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Activity, FileText, HandPlatter, Plus, Star, Store, User } from 'lucide-react';
import Link from 'next/link';
import DeleteBtn from '../../ui/buttons/DeleteBtn';
import EditBtn from '../../ui/buttons/EditBtn';

const columnHelper = createColumnHelper<ReviewData>();
export const reviewTableColumns: ColumnDef<ReviewData, any>[] = [
    columnHelper.accessor('description', {
        cell: (info) => <span className='flex items-center gap-2'>
            <p>{info?.getValue()?.slice(0, 30)}</p>
            <button><Plus size={12} /></button>
        </span>,
        header: () => <p className='flex items-center gap-2 pl-5'><FileText size={18} />Description</p>,
        size: 300,
    }),
    columnHelper.accessor('rating', {
        cell: (info) => info.getValue(),
        header: () => <p className='flex items-center gap-2'><Star size={18} />Rating</p>
    }),
    columnHelper.accessor('foodSlug', {
        cell: (info) => <Link
            href={`/foods/${info.row.original.restaurantName?.toLowerCase()}/${info.row.original.foodSlug}`}
            className='uppercase'
        >{info.getValue()}</Link>,
        header: () => <p className='flex items-center gap-2 ml-5'><HandPlatter size={18} />Food</p>
    }),
    columnHelper.accessor('restaurantName', {
        cell: (info) => <Link
            href={`/restaurants/${info.row.original.restaurantName?.toLowerCase()}`}
            className='capitalize'
        >{info.getValue()}</Link>,
        header: () => <p className='flex items-center gap-2'><Store size={18} />Restaurant</p>
    }),
    columnHelper.accessor('userName', {
        cell: (info) => info.getValue(),
        header: () => <p className='flex items-center gap-2 ml-6'><User size={18} />By</p>
    }),
    columnHelper.display({
        id: 'actions',
        cell: (info) => (
            <div className='flex gap-1 items-center justify-center'>
                <DeleteBtn
                    apiEndpoint={`/api/reviews?id=${info.row.original._id}`}
                    dataEndpoint='/reviews'
                />
                <EditBtn
                    id={info.row.original._id}
                    modalType='review'
                />
            </div>
        ),
        header: () => <p className='flex items-center gap-2 pr-5'><Activity size={18} />Actions</p>
    })
]