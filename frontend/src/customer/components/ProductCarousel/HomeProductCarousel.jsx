import React from 'react'
import ProductCarouselCard from './ProductCarouselCard';
import { productdata } from './ProductCarouselData'
import AliceCarousel from 'react-alice-carousel';

const HomeProductCarousel = () => {


    const items = productdata.slice(0, 10).map((item) => <ProductCarouselCard product={item} />)

    const responsive = {
        0: {
            items: 1,
        },
        520: {
            items: 3
        },
        1024: {
            items: 5,
            itemsFit: 'contain',
        }
    }

    console.log(items)
    return (
        <div>
            <AliceCarousel
                items={items}
                responsive={responsive}
                disableDotsControls
            />
        </div>
        
    )
}

export default HomeProductCarousel;
