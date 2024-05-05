'use client';
import Image from 'next/image';
import Slider from 'react-slick';
import FoodBurger from '/public/slides/food-burger-slide.png';
import ItalianPizza from '/public/slides/italian-pizza-slide.png';
import SaleOffer from '/public/slides/sale-offer-slide.png';
import WingsDay from '/public/slides/wings-day-slide.png';

const HomeSlider = () => {
    const settings = {
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow:false,
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                <div>
                    <Image src={ItalianPizza} alt='Hero Banner' width={1140} height={350} />
                </div>
                <div>
                    <Image src={FoodBurger} alt='Hero Banner' width={1140} height={350} />
                </div>
                <div>
                    <Image src={SaleOffer} alt='Hero Banner' width={1140} height={350} />
                </div>
                <div>
                    <Image src={WingsDay} alt='Hero Banner' width={1140} height={350} />
                </div>
            </Slider>
        </div>
    );
};

export default HomeSlider;