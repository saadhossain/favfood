import SubHeading from '@/app/components/shared/headings/SubHeading'

const PaymentMethod = () => {
  return (
    <div>
      <SubHeading heading={'Payment Method'} />
      <div className='flex flex-col items-center justify-center h-[50vh]'>
        <h4 className='text-lg font-semibold'>No Saved Payment Method Found!</h4>
        <button className='bg-primary text-white font-semibold py-3 px-5 rounded-md mt-5 hover:bg-secondary duration-300 ease-in-out'>Add Payment Method</button>
      </div>
    </div>
  )
}

export default PaymentMethod