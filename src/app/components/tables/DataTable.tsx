import { flexRender } from '@tanstack/react-table';
import Pagination from './Pagination';

const DataTable = ({ table }: any) => {

    return (
        <div>
            <div className="overflow-x-auto">
                <table className='min-w-full'>
                    <thead className={`bg-primary text-white`}>
                        {table.getHeaderGroups().map((headerGroup: any) => <tr key={headerGroup.id}
                        >
                            {headerGroup.headers.map((header: any) => <th
                                className={`py-2 w-${header.column.columnDef.size}`}
                                key={header.id}
                                style={{ width: header.column.getSize() }}
                            >
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </th>)}
                        </tr>)}
                    </thead>
                    {/* table body */}
                    <tbody className='bg-gray-100 text-gray-900 divide-y divide-gray-300'>
                        {
                            table.getRowModel().rows.map((row: any) => <tr
                                key={row.id}
                                className='hover:bg-gray-300'
                            >
                                {row.getVisibleCells().map((cell: any) => <td
                                    key={cell.id}
                                    className='px-6 py-4 whitespace-nowrap text-sm'
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>)}
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <Pagination table={table} />
        </div>
    )
}

export default DataTable;