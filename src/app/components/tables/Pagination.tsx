import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({ table }: any) => {
    return (
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 my-2'>
                <div className='flex items-center gap-2'>
                    <button
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}
                        className={`py-1 px-2 ${table.getCanPreviousPage() ? 'bg-gray-500 text-gray-300' : 'bg-gray-100 text-gray-600'} rounded-md`}
                    ><ChevronsLeft size={16} /></button>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className={`py-1 px-2 ${table.getCanPreviousPage() ? 'bg-gray-500 text-gray-300' : 'bg-gray-100 text-gray-600'} rounded-md`}
                    ><ChevronLeft size={16} /></button>
                </div>
                <p>Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</p>
                <div className='flex items-center gap-2'>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className={`py-1 px-2 ${table.getCanNextPage() ? 'bg-gray-500 text-gray-300' : 'bg-gray-100 text-gray-600'} rounded-md`}
                    ><ChevronRight size={16} /></button>
                    <button
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                        className={`py-1 px-2 ${table.getCanNextPage() ? 'bg-gray-500 text-gray-300' : 'bg-gray-100 text-gray-600'} rounded-md`}
                    ><ChevronsRight size={16} /></button>
                </div>
            </div>
            {/* Set Items per page */}
            <span>
                <label>Show: </label>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value));
                    }}
                    className='bg-gray-500 text-white py-1 px-2 rounded-md'
                >
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>
            </span>
        </div>
    );
};

export default Pagination;