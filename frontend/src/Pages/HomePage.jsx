import React from 'react'

import Navigation from '../customer/components/Navigation/Navigation'
import MainCarousel from '../customer/components/Carousel/MainCarousel'
import HomeProductCarousel from '../customer/components/ProductCarousel/HomeProductCarousel'
import Footer from '../customer/components/Footer/Footer'
const HomePage = () => {
    return (
        <div>
            {/* <Navigation /> */}
            <MainCarousel/>
            <div>
                <HomeProductCarousel/>
                <HomeProductCarousel/>
                <HomeProductCarousel/>
                <HomeProductCarousel/>
            </div>
            <Footer />
        </div>
    )
}

export default HomePage
