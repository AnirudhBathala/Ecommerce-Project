import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
// import "react-alice-carousel/lib/scss/alice-carousel.scss";
import { homeCarouselData } from './MainCarouselData';
const MainCarousel = () => {



    const items = homeCarouselData.map((item) => <img src={item.image}/>)
    
    return (
        <AliceCarousel
        items={items}
        // disableDotsControls
        autoPlay
        autoPlayInterval = {1500}
        infinite
        disableButtonsControls/>
            
    )
}

export default MainCarousel;
