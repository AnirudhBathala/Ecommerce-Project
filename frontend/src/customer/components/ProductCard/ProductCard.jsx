
import React from "react";
import './ProductCard.css'
import { useNavigate } from "react-router-dom";


export default function ProductCard({product}) {

    const navigate = useNavigate();

    const handleNavigate=()=>{
        navigate(`/product/${product?.id || product?._id || 2}`)
      }

    const { title, brand, imageUrl, price ,discountedPrice,color,discountPercentage} = product;
    return (
        <div onClick={handleNavigate} className='productCard w-[15rem] border m-3 transition-all cursor-pointer '>
            <div className='h-[20rem]'>
                <img className='h-full w-full object-cover object-left-top' src={imageUrl} alt="" />
            </div>
            <div className='textPart bg-white p-3 '>
                <div>
                    <p className='font-bold opacity-60'>{brand}</p>
                    <p className=''>{title}</p>

                    <p className='font-semibold opacity-50'>{color}</p>
                </div>

                <div className='flex space-x-2 justify-items-stretch'>
                    <p className='font-semibold'>₹{discountedPrice}</p>
                    <p className='opacity-50 line-through'>₹{price}</p>
                    <p className='text-green-600 font-semibold'>{discountPercentage}% off</p>
                </div>

            </div>
        </div>
    )


}