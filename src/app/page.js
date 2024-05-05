import HomeSlider from './components/ui/homecomp/HomeSlider';
import HorizontalTab from './components/ui/homecomp/HorizontalTab';

const HomePage = () => {
  return (
    <div className='w-11/12 md:w-10/12 mx-auto my-2 md:my-5'>
      <HomeSlider />
      <HorizontalTab />
      {/* <ProductLoader /> */}
    </div>
  );
};

export default HomePage;