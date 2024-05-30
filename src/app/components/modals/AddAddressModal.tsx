'use client'
import { DataContext } from '@/app/context/DataContext';
import { DataContextType } from '@/app/types/DataContextTypes';
import { updateUserProfile } from '@/app/utils/updateUserProfile';
import { useSession } from 'next-auth/react';
import { FormEvent, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Processing from '../spinner/Processing';

interface CountryPros {
    _id: string;
    name: string;
}

const AddAddressModal = () => {
    const { loading, setLoading, openAddressBoxModal, setOpenAddressBoxModal } = useContext(DataContext) as DataContextType;
    const inputStyle = 'w-full px-3 py-2 rounded-md text-gray-900 bg-gray-300 focus:outline-none';
    //Get the logged in user from the session
    const { data: session } = useSession();
    //Get the countries from the database
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        const getCountries = async () => {
            const res = await fetch('/api/countries');
            const data = await res.json();
            setCountries(data);
        }
        getCountries();
    }, [openAddressBoxModal]);
    //Set the selected country to the state
    const [selectedCountry, setSelectedCountry] = useState('Bangladesh');
    const handleAddAddress = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target as HTMLFormElement;
        const streetAddress = form.streetAddress.value;
        const city = form.city.value;
        const state = form.state.value;
        const zipCode = form.zipCode.value;
        const address = {
            streetAddress,
            city,
            state,
            zipCode,
            country: selectedCountry
        };
        const data = await updateUserProfile(session?.user._id, { address });
        if (data.acknowledged) {
            toast.success('New Address added successfully');
            form.reset();
            setLoading(false);
            setOpenAddressBoxModal(false);
        }
    }
    return (
        <>
            {
                openAddressBoxModal && <div className={`w-full min-h-screen flex items-center justify-center fixed left-0 top-0 z-50 bg-gray-900 bg-opacity-60`}>
                    <div className='w-11/12 md:w-2/5  flex items-center bg-gray-700 text-white p-5 rounded-md relative'>
                        <button
                            onClick={() => setOpenAddressBoxModal(false)}
                            className='font-bold text-xl absolute top-1 right-2 bg-gray-900 bg-opacity-60 py-1 px-3 rounded-full'>X</button>
                        <form
                            onSubmit={handleAddAddress} className="w-full space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="streetAddress" className="block mb-2 text-sm">Street Address</label>
                                    <input type="text" name="streetAddress" id="streetAddress" className={`${inputStyle}`} placeholder='Enter Your Address' />
                                </div>
                                {/* //City and State */}
                                <div className='flex gap-2'>
                                    <div>
                                        <label htmlFor="city" className="block mb-2 text-sm">City</label>
                                        <input type="text" name="city" id="city" className={`${inputStyle}`} placeholder='City' />
                                    </div>
                                    <div>
                                        <label htmlFor="state" className="block mb-2 text-sm">State/Division</label>
                                        <input type="text" name="state" id="state" className={`${inputStyle}`} placeholder='State' />
                                    </div>
                                </div>
                                {/* //Zipcode and country */}
                                <div className='flex gap-2'>
                                    <div>
                                        <label htmlFor="zipCode" className="block mb-2 text-sm">ZIP Code</label>
                                        <input type="text" name="zipCode" id="zipCode" className={`${inputStyle}`} placeholder='ZIP' />
                                    </div>
                                    <div>
                                        <label htmlFor="country" className="block mb-2 text-sm">Country</label>
                                        <select
                                            className={`${inputStyle}`}
                                            value={selectedCountry}
                                            onChange={(e)=> setSelectedCountry(e.target.value)}
                                            name="country"
                                            id="country"
                                        >
                                            <option value="">Select Country</option>
                                            {
                                                countries.map((country: CountryPros) => <option
                                                    key={country._id}
                                                    value={country.name}
                                                >{country.name}</option>)
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <button type="submit" className="w-full flex items-center justify-center px-8 py-3 font-semibold rounded-md bg-primary text-white">
                                        {loading ? <Processing title={'Processing'} /> : 'Add Address'}
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