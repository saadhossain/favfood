'use client'
import { Dispatch, FormEvent, SetStateAction } from 'react';

const AddAddressModal = ({ openModal, setOpenModal }: { openModal: boolean, setOpenModal: Dispatch<SetStateAction<boolean>> }) => {
    const handleAddAddress = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        console.log(e.target)
    }
    const inputStyle = 'w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none';
    return (
        <>
            {
                openModal && <div className={`w-full min-h-screen flex items-center justify-center fixed left-0 top-0 z-50 bg-gray-900 bg-opacity-40`}>
                    <div className='w-11/12 md:w-2/5  flex items-center bg-gray-700 text-white p-5 rounded-md relative'>
                        <button
                            onClick={() => setOpenModal(false)}
                            className='font-bold text-xl absolute top-1 right-2 bg-gray-900 bg-opacity-60 py-1 px-3 rounded-full'>X</button>
                        <form
                            onSubmit={(e) => handleAddAddress(e)} className="w-full space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm">Street Address</label>
                                    <input type="email" name="email" id="email" className={`${inputStyle}`} />
                                </div>
                                {/* //City and State */}
                                <div className='flex gap-2'>
                                    <div>
                                        <label htmlFor="fullname" className="block mb-2 text-sm">City</label>
                                        <input type="text" name="fullname" id="fullname" className={`${inputStyle}`} />
                                    </div>
                                    <div>
                                        <label htmlFor="fullname" className="block mb-2 text-sm">State/Division</label>
                                        <input type="text" name="fullname" id="fullname" className={`${inputStyle}`} />
                                    </div>
                                </div>
                                {/* //Zipcode and country */}
                                <div className='flex gap-2'>
                                    <div>
                                        <label htmlFor="fullname" className="block mb-2 text-sm">ZIP Code</label>
                                        <input type="text" name="fullname" id="fullname" className={`${inputStyle}`} />
                                    </div>
                                    <div>
                                        <label htmlFor="fullname" className="block mb-2 text-sm">Country</label>
                                        <input type="text" name="fullname" id="fullname" className={`${inputStyle}`} />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <button type="submit" className="w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md bg-primary text-white">
                                        {/* {processing ? <Processing title={'Processing'} /> : 'Register'} */}
                                        Add Address
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default AddAddressModal