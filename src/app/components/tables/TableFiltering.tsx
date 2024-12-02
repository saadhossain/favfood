import { FaSearch } from "react-icons/fa"

const TableFiltering = ({ table }: any) => {
    return (
        <div className='w-60 md:w-80 bg-gray-200 rounded-md flex items-center'>
            <input type="text" name="search" id="search"
                onChange={(e) => table.setGlobalFilter(e.target.value as string)}
                placeholder='Search Here...'
                className='w-full p-2 bg-gray-200 rounded-md text-gray-900 focus:outline-none'
            />
            <FaSearch className='w-6 h-6 mr-2 text-gray-500' />
        </div>
    )
}

export default TableFiltering