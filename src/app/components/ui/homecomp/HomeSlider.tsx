'use client';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import Burger from '/public/slides/burger-banner.png';
import Chicken from '/public/slides/chicken-banner.png';
import Fries from '/public/slides/fries-banner.png';
import Pizza from '/public/slides/pizza-banner.png';

const HomeSlider = () => {
    const settings = {
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: "linear",
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: true,
    };
    return (
        <div className="slider-container">
            <Slider {...settings}>
                <Link href='/foods/category/burger'>
                    <Image src={Burger} alt='Delicious Burger Menu' width={1140} height={350} />
                </Link>
                <Link href='/foods/category/fries'>
                    <Image src={Fries} alt='Super Special Delux Fries' width={1140} height={350} />
                </Link>
                <Link href='/foods/category/chicken'>
                    <Image src={Chicken} alt='Delicious Chicken Menu' width={1140} height={350} />
                </Link>
                <Link href='/foods/category/pizza'>
                    <Image src={Pizza} alt='Delicios Pizza Offer' width={1140} height={350} />
                </Link>
            </Slider>
        </div>
    );
};

export default HomeSlider;