const Heading = ({ heading }: { heading: string }) => {
    return (
        <h2 className='text-xl md:text-2xl font-semibold text-primary border-l-4 border-primary pl-2 mb-5'>{heading}</h2>
    )
}

export default Heading