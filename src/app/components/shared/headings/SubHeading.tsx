const SubHeading = ({ heading }: { heading: string }) => {
    return (
        <h3 className='text-lg mt-3 md:mt-0 md:text-xl font-semibold text-primary border-l-4 border-primary pl-2 mb-5'>{heading}</h3>
    )
}

export default SubHeading