import { OrderDataType } from '@/app/types/DataTypes';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { Activity, CreditCard, HandPlatter, PackageSearch, Receipt } from 'lucide-react';
import DeleteBtn from '../../ui/buttons/DeleteBtn';
import EditBtn from '../../ui/buttons/EditBtn';
import OrderProdCol from '../OrderProdCol';

const columnHelper = createColumnHelper<OrderDataType>();
export const orderTableColumns: ColumnDef<OrderDataType, any>[] = [
    columnHelper.display({
        id: 'products',
        cell: (info) => <>
            {
                info?.row?.original?.products?.map((prod) => <OrderProdCol prod={prod} />)
            }
        </>,
        header: () => <p className='flex items-center gap-2 pl-5'><HandPlatter size={18} />Product</p>,
    }),
    columnHelper.accessor('orderAmount', {
        cell: (info) => <p className='font-semibold'>${info.getValue()}</p>,
        header: () => <p className='flex items-center gap-2'><Receipt size={18} />Total</p>
    }),
    columnHelper.accessor('paymentStatus', {
        cell: (info) => info.getValue(),
        header: () => <p className='flex items-center gap-2'><CreditCard size={18} />Payment</p>
    }),
    columnHelper.accessor('orderStatus', {
        cell: (info) => info.getValue(),
        header: () => <p className='flex items-center gap-2'><PackageSearch size={18} />Status</p>
    }),
    columnHelper.display({
        id: 'actions',
        cell: (info) => (
            <div className='flex gap-1 items-center justify-center'>
                <DeleteBtn
                    apiEndpoint={`/api/orders?orderId=${info.row.original._id}`}
                    dataEndpoint='/orders'
                />
                <EditBtn
                    id={info.row.original._id}
                    modalType='order'
                />
            </div>
        ),
        header: () => <p className='flex items-center gap-2 pr-5'><Activity size={18} />Actions</p>
    })
]