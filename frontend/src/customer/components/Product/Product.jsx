
'use client'

import { useEffect, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductCard from '../ProductCard/ProductCard'
import { filters, singleFilter, sortOptions } from "./FilterData";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { findProducts } from '../../../Redux/Product/Action'
// import Pagination from "@mui/material/Pagination";
const products = [
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/h/y/g/34-jeans-bt008-laheja-original-imagqqbsfgmdhcvn.jpeg?q=70",
        "brand": "LAHEJA",
        "title": "Men Regular Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 599,
        "price": 1999,
        "discountPersent": 70,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/kmns7m80/jean/9/5/o/36-black-36-coper-buck-original-imagfg9edbsneu2s.jpeg?q=70",
        "brand": "COPER BUCK",
        "title": "Men Regular Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 898,
        "price": 2399,
        "discountPersent": 62,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/z/n/u/32-ecskn-01bb-002-spykar-original-imaghxqwuw67ywfy.jpeg?q=70",
        "brand": "Spykar",
        "title": "Men Skinny Low Rise Black Jeans",
        "color": "black",
        "discountedPrice": 1099,
        "price": 2799,
        "discountPersent": 62,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/a/w/t/30-ud0030-united-denim-original-imagf9n9efexz68u-bb.jpeg?q=70",
        "brand": "UNITED DENIM",
        "title": "Men Slim Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 429,
        "price": 1749,
        "discountPersent": 75,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/ky0g58w0/shopsy-jean/8/p/y/28-black-knee-cut-jeans-comfits-original-imagaccjjya9gqzn.jpeg?q=70",
        "brand": "comfits",
        "title": "Men Slim Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 399,
        "price": 1299,
        "discountPersent": 69,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/kwfaj680/jean/3/c/s/38-hljn001891-highlander-original-imag93tpnjyyvpkg.jpeg?q=70",
        "brand": "HIGHLANDER",
        "title": "Men Tapered Fit Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 701,
        "price": 1799,
        "discountPersent": 61,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/2/q/g/30-jeans-kneecut-black-crishtaliyo-2fashion-original-imagqy6gzmpwqkge.jpeg?q=70",
        "brand": "Crishtaliyo 2fashion",
        "title": "Men Slim Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 494,
        "price": 1799,
        "discountPersent": 72,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/shopsy-jean/k/v/m/30-shopsy-black-30-coper-buck-original-imag57w8xmhgkhrf.jpeg?q=70",
        "brand": "COPER BUCK",
        "title": "Men Regular Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 898,
        "price": 2399,
        "discountPersent": 62,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/kfoapow0-0/jean/w/o/d/30-000877-highlander-original-imafw2hyqbj3bsph.jpeg?q=70",
        "brand": "HIGHLANDER",
        "title": "Men Tapered Fit Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 610,
        "price": 1299,
        "discountPersent": 53,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/r/a/b/38-eps-black-03-urbano-fashion-original-imaghkgk27whjcej.jpeg?q=70",
        "brand": "Urbano Fashion",
        "title": "Men Slim Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 699,
        "price": 1399,
        "discountPersent": 50,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/h/p/f/30-jk2-mjrp-02-zaysh-original-imagqgf6yh4gtwhx.jpeg?q=70",
        "brand": "ZAYSH",
        "title": "Men Slim Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 380,
        "price": 1299,
        "discountPersent": 70,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/r/3/o/30-black-1-coper-buck-original-imagqtmaknsqh34z.jpeg?q=70",
        "brand": "COPER BUCK",
        "title": "Men Regular Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 799,
        "price": 2499,
        "discountPersent": 68,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/o/s/7/28-pbwc-001-qarsh-original-imagh8cfhc3dreq8.jpeg?q=70",
        "brand": "QARSH",
        "title": "Men Slim Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 410,
        "price": 1799,
        "discountPersent": 77,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/d/s/c/36-mj-bk-pl-48-comfits-original-imagqbrnyjfzhs8v.jpeg?q=70",
        "brand": "linaria",
        "title": "Men Slim Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 349,
        "price": 1099,
        "discountPersent": 68,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/h/0/x/32-lrdncslpw68549-louis-philippe-original-imagkca2jxzmb9ya.jpeg?q=70",
        "brand": "LOUIS PHILIPPE",
        "title": "Men Slim Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 1799,
        "price": 2999,
        "discountPersent": 42,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/6/y/c/30-kcbwc-002-qarsh-original-imagh6fkdxzeaqc8.jpeg?q=70",
        "brand": "QARSH",
        "title": "Men Slim Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 430,
        "price": 1799,
        "discountPersent": 76,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/n/a/k/30-jk-jog02-zaysh-original-imag4bez9hhqvehx-bb.jpeg?q=70",
        "brand": "ZAYSH",
        "title": "Men Jogger Fit Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 400,
        "price": 1299,
        "discountPersent": 69,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/q/i/p/28-beige-jeans-bt008-laheja-original-imagqqbt4kxduwka.jpeg?q=70",
        "brand": "LAHEJA",
        "title": "Men Regular Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 599,
        "price": 1999,
        "discountPersent": 70,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/u/q/f/28-lnbwp006-linaria-original-imagzudybdz3ahm5.jpeg?q=70",
        "brand": "linaria",
        "title": "Men Slim Mid Rise Black, White Jeans",
        "color": "black",
        "discountedPrice": 899,
        "price": 1899,
        "discountPersent": 52,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/kfmv9u80-0/jean/u/v/3/34-hljn000771-highlander-original-imafwfj7yznyezyq.jpeg?q=70",
        "brand": "HIGHLANDER",
        "title": "Men Slim Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 721,
        "price": 1849,
        "discountPersent": 61,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/0/8/j/28-4jk-jog-zaysh-original-imag4fymxqj7x4zf-bb.jpeg?q=70",
        "brand": "ZAYSH",
        "title": "Men Jogger Fit Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 429,
        "price": 1299,
        "discountPersent": 66,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/e/m/o/32-vje0123bkslmh043-veirdo-original-imagnggzasqfhvyg.jpeg?q=70",
        "brand": "Veirdo",
        "title": "Men Slim Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 1399,
        "price": 2999,
        "discountPersent": 55,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/kzd147k0/jean/z/x/c/32-j3198701by-calvin-klein-jeans-original-imagbe438rndmq6x.jpeg?q=70",
        "brand": "Calvin Klein Jeans",
        "title": "Men Regular Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 4399,
        "price": 7999,
        "discountPersent": 45,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/g/q/f/28-7139482-roadster-original-imafgmr5xpgfmjbm-bb.jpeg?q=70",
        "brand": "Roadster",
        "title": "Men Slim Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 660,
        "price": 1999,
        "discountPersent": 66,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/3/e/3/28-r-067-styzon-original-imagggqtnfpaurqf.jpeg?q=70",
        "brand": "Styzon",
        "title": "Men Boyfriend Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 739,
        "price": 1799,
        "discountPersent": 58,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/jsaocy80/jean/3/y/h/36-4451377-roadster-original-imafdwmrjyfghdf5.jpeg?q=70",
        "brand": "Roadster",
        "title": "Men Regular Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 561,
        "price": 1699,
        "discountPersent": 66,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/w/x/e/34-black-00010-stylophile-original-imagpbjm2xhcfyt2.jpeg?q=70",
        "brand": "stylophile",
        "title": "Men Slim Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 899,
        "price": 1499,
        "discountPersent": 40,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/l2p23rk0/jean/c/d/c/32-mdnm00169-black-cantabil-original-imagdzc7puqhsh47.jpeg?q=70",
        "brand": "CANTABIL",
        "title": "Men Regular Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 1399,
        "price": 2999,
        "discountPersent": 55,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/u/q/f/28-lnbwp006-linaria-original-imagzudybdz3ahm5.jpeg?q=70",
        "brand": "linaria",
        "title": "Men Slim Mid Rise Black, White Jeans",
        "color": "black",
        "discountedPrice": 899,
        "price": 1899,
        "discountPersent": 52,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/x/f/x/28-suplpsjeanwhithr-black-supernova-inc-original-imagm6ruxyfaxeef.jpeg?q=70",
        "brand": "Supernova Inc.",
        "title": "Men Slim Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 499,
        "price": 1399,
        "discountPersent": 64,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/j/w/p/38-vje0123bkslmm042-veirdo-original-imagngkdqasgsbjh.jpeg?q=70",
        "brand": "Veirdo",
        "title": "Men Slim Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 1399,
        "price": 2999,
        "discountPersent": 55,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/l55nekw0/jean/h/4/u/36-mdnm00160-black-cantabil-original-imagfw5adg5fq2se.jpeg?q=70",
        "brand": "CANTABIL",
        "title": "Men Regular Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 1149,
        "price": 2499,
        "discountPersent": 55,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/s/a/x/34-suplpsjeanblathr-black-supernova-inc-original-imagm6rsbaghtf5y.jpeg?q=70",
        "brand": "Supernova Inc.",
        "title": "Men Slim Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 499,
        "price": 1399,
        "discountPersent": 64,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/5/r/d/-original-imagq2q3djvzxwzz.jpeg?q=70",
        "brand": "LEVI'S",
        "title": "Men Skinny Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 2099,
        "price": 3999,
        "discountPersent": 48,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/w/b/i/36-lnbwp003-linaria-original-imagzu9bhj98echw.jpeg?q=70",
        "brand": "linaria",
        "title": "Men Slim Mid Rise Black, White Jeans",
        "color": "black",
        "discountedPrice": 899,
        "price": 1899,
        "discountPersent": 52,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/k70spzk0/jean/f/a/g/30-hljn000765-highlander-original-imafpchx9c2gdxks.jpeg?q=70",
        "brand": "HIGHLANDER",
        "title": "Men Slim Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 662,
        "price": 1699,
        "discountPersent": 61,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/l23mhzk0/shopsy-jean/o/b/l/34-0djemay16maglightblue-sk-original-imagdgqb9eswy2ac.jpeg?q=70",
        "brand": "0-DEGREE",
        "title": "Men Slim Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 916,
        "price": 3999,
        "discountPersent": 77,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/z/q/h/42-blaze-black-studio-nexx-original-imafwfj8exeuwsy5-bb.jpeg?q=70",
        "brand": "STUDIO NEXX",
        "title": "Men Regular Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 739,
        "price": 1499,
        "discountPersent": 50,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/xif0q/jean/n/l/c/42-hljn002845-highlander-original-imagz6y7fyaqhgw3.jpeg?q=70",
        "brand": "HIGHLANDER",
        "title": "Plus Size Men Regular Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 697,
        "price": 2249,
        "discountPersent": 69,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    },
    {
        "imageUrl": "https://rukminim1.flixcart.com/image/612/612/kfmv9u80-0/jean/e/9/e/36-hljn000670-highlander-original-imafwfj6zhxw39wg.jpeg?q=70",
        "brand": "HIGHLANDER",
        "title": "Men Slim Mid Rise Black Jeans",
        "color": "black",
        "discountedPrice": 721,
        "price": 1849,
        "discountPersent": 61,
        "size": [
            {
                "name": "S",
                "quantity": 20
            },
            {
                "name": "M",
                "quantity": 30
            },
            {
                "name": "L",
                "quantity": 50
            }
        ],
        "quantity": 100,
        "topLavelCategory": "Men",
        "secondLavelCategory": "Clothing",
        "thirdLavelCategory": "men_jeans",
        "description": "A traditional garment embodying elegance and grace. Crafted from fine fabrics, it features intricate embroidery and a relaxed fit, providing comfort and style."
    }
]
// const sortOptions = [
//     { name: 'Price: Low to High', href: '#', current: false },
//     { name: 'Price: High to Low', href: '#', current: false },
// ]

// const filters = [
//     {
//         id: 'color',
//         name: 'Color',
//         options: [
//             { value: 'white', label: 'White', checked: false },
//             { value: 'beige', label: 'Beige', checked: false },
//             { value: 'blue', label: 'Blue', checked: true },
//             { value: 'brown', label: 'Brown', checked: false },
//             { value: 'green', label: 'Green', checked: false },
//             { value: 'purple', label: 'Purple', checked: false },
//         ],
//     },
//     {
//         id: 'category',
//         name: 'Category',
//         options: [
//             { value: 'new-arrivals', label: 'New Arrivals', checked: false },
//             { value: 'sale', label: 'Sale', checked: false },
//             { value: 'travel', label: 'Travel', checked: true },
//             { value: 'organization', label: 'Organization', checked: false },
//             { value: 'accessories', label: 'Accessories', checked: false },
//         ],
//     },
//     {
//         id: 'size',
//         name: 'Size',
//         options: [
//             { value: '2l', label: '2L', checked: false },
//             { value: '6l', label: '6L', checked: false },
//             { value: '12l', label: '12L', checked: false },
//             { value: '18l', label: '18L', checked: false },
//             { value: '20l', label: '20L', checked: false },
//             { value: '40l', label: '40L', checked: true },
//         ],
//     },
// ]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Product() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const location = useLocation();
    const navigate = useNavigate();
    const param = useParams();
    const dispatch = useDispatch();
    const {customersProduct} = useSelector((store)=>store)
    const handleRadioFilterChange = (e, sectionId) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set(sectionId, e.target.value);
        const query = searchParams.toString();
        navigate({ search: `?${query}` });
    };



    // const filter = decodeURIComponent(location.search);
    const decodedQueryString = decodeURIComponent(location.search);
    const searchParams = new URLSearchParams(decodedQueryString);
    const colorValue = searchParams.get("color");
    const sizeValue = searchParams.get("size");
    const price = searchParams.get("price");
    const discount = searchParams.get("disccout");
    const sortValue = searchParams.get("sort");
    const pageNumber = searchParams.get("page") || 1;
    const stock = searchParams.get("stock");

    // console.log("location - ", colorValue, sizeValue,price,disccount);

    const handleSortChange = (value) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("sort", value);
        const query = searchParams.toString();
        navigate({ search: `?${query}` });
    };
    const handlePaginationChange = (event, value) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("page", value);
        const query = searchParams.toString();
        navigate({ search: `?${query}` });
    };

    useEffect(() => {
        const [minPrice, maxPrice] =
            price === null ? [0, 0] : price.split("-").map(Number);
        const data = {
            category: param.level3,
            colors: colorValue || [],
            sizes: sizeValue || [],
            minPrice: minPrice || 0,
            maxPrice: maxPrice || 100000,
            minDiscount: discount || 0,
            sort: sortValue || "price_low",
            pageNumber: pageNumber - 1,
            pageSize: 10,
            stock: stock,
        };
        console.log("Inside Product Card " + data);
        console.log(data)
        dispatch(findProducts(data));
    }, [
        param.lavelThree,
        colorValue,
        sizeValue,
        price,
        discount,
        sortValue,
        pageNumber,
        stock,
    ]);

    const handleFilter = (value, sectionId) => {
        const searchParams = new URLSearchParams(location.search);

        let filterValues = searchParams.getAll(sectionId);

        if (filterValues.length > 0 && filterValues[0].split(",").includes(value)) {
            filterValues = filterValues[0]
                .split(",")
                .filter((item) => item !== value);
            if (filterValues.length === 0) {
                searchParams.delete(sectionId);
            }
            console.log("includes");
        } else {
            // Remove all values for the current section
            // searchParams.delete(sectionId);
            filterValues.push(value);
        }

        if (filterValues.length > 0)
            searchParams.set(sectionId, filterValues.join(","));

        // history.push({ search: searchParams.toString() });
        const query = searchParams.toString();
        navigate({ search: `?${query}` });
    };

    return (
        <div className="bg-white">
            <div>
                {/* Mobile filter dialog */}
                <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
                    />

                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                        >
                            <div className="flex items-center justify-between px-4">
                                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                                <button
                                    type="button"
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">
                                <h3 className="sr-only">Categories</h3>

                                {filters.map((section) => (
                                    <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                                        <h3 className="-mx-2 -my-3 flow-root">
                                            <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                                <span className="font-medium text-gray-900">{section.name}</span>
                                                <span className="ml-6 flex items-center">
                                                    <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                                    <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                                                </span>
                                            </DisclosureButton>
                                        </h3>
                                        <DisclosurePanel className="pt-6">
                                            <div className="space-y-6">
                                                {section.options.map((option, optionIdx) => (
                                                    <div key={option.value} className="flex items-center">
                                                        <input
                                                            defaultValue={option.value}
                                                            defaultChecked={option.checked}
                                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                                            name={`${section.id}[]`}
                                                            type="checkbox"
                                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                        />
                                                        <label
                                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                                            className="ml-3 min-w-0 flex-1 text-gray-500"
                                                        >
                                                            {option.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </DisclosurePanel>
                                    </Disclosure>
                                ))}

                                {singleFilter.map((section) => (
                                    <Disclosure
                                        // defaultOpen={true}
                                        as="div"
                                        key={section.id}
                                        className="border-b border-gray-200 px-4 py-6"
                                    >
                                        {({ open }) => (
                                            <>
                                                <h3 className="-my-3 flow-root">
                                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                        <span className="font-medium text-gray-900">
                                                            {section.name}
                                                        </span>
                                                        <span className="ml-6 flex items-center">
                                                            {open ? (
                                                                <MinusIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <PlusIcon
                                                                    className="h-5 w-5"
                                                                    aria-hidden="true"
                                                                />
                                                            )}
                                                        </span>
                                                    </Disclosure.Button>
                                                </h3>
                                                <Disclosure.Panel className="pt-6">
                                                    <FormControl>
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            defaultValue="female"
                                                            name="radio-buttons-group"
                                                        >
                                                            {section.options.map((option, optionIdx) => (
                                                                <FormControlLabel
                                                                    value={option.value}
                                                                    control={<Radio />}
                                                                    label={option.label}
                                                                    onChange={(e) =>
                                                                        handleRadioFilterChange(e, section.id)
                                                                    }
                                                                />
                                                            ))}
                                                        </RadioGroup>
                                                    </FormControl>
                                                </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                ))}
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>

                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-2">
                    <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">New Arrivals</h1>

                        <div className="flex items-center">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                                        Sort
                                        <ChevronDownIcon
                                            aria-hidden="true"
                                            className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                        />
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        {sortOptions.map((option) => (
                                            <MenuItem key={option.name}>
                                                <a
                                                    href={option.href}
                                                    className={classNames(
                                                        option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                                        'block px-4 py-2 text-sm data-[focus]:bg-gray-100',
                                                    )}
                                                >
                                                    {option.name}
                                                </a>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </MenuItems>
                            </Menu>

                            <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                                <span className="sr-only">View grid</span>
                                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setMobileFiltersOpen(true)}
                                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                            >
                                <span className="sr-only">Filters</span>
                                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>
                        <div>
                            <h2 className="py-5 font-semibold opacity-60 text-lg text-left">Filters</h2>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                                {/* Filters */}
                                <form className="hidden lg:block lg:col-span-1">

                                    <h3 className="sr-only">Categories</h3>
                                    {filters.map((section) => (
                                        <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-6">
                                            <h3 className="-my-3 flow-root">
                                                <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                    <span className="font-medium text-gray-900">{section.name}</span>
                                                    <span className="ml-6 flex items-center">
                                                        <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                                                        <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                                                    </span>
                                                </DisclosureButton>
                                            </h3>
                                            <DisclosurePanel className="pt-6">
                                                <div className="space-y-4">
                                                    {section.options.map((option, optionIdx) => (
                                                        <div key={option.value} className="flex items-center">
                                                            <input
                                                                defaultValue={option.value}
                                                                defaultChecked={option.checked}
                                                                id={`filter-${section.id}-${optionIdx}`}
                                                                name={`${section.id}[]`}
                                                                type="checkbox"
                                                                onChange={() =>
                                                                    handleFilter(option.value, section.id)
                                                                }
                                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                            />
                                                            <label htmlFor={`filter-${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                                                                {option.label}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </DisclosurePanel>
                                        </Disclosure>
                                    ))}

                                    {singleFilter.map((section) => (
                                        <Disclosure
                                            // defaultOpen={true}
                                            as="div"
                                            key={section.id}
                                            className="border-b border-gray-200 py-6"
                                        >
                                            {({ open }) => (
                                                <>
                                                    <h3 className="-my-3 flow-root">
                                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                                            <span className="font-medium text-gray-900">
                                                                {section.name}
                                                            </span>
                                                            <span className="ml-6 flex items-center">
                                                                {open ? (
                                                                    <MinusIcon
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                ) : (
                                                                    <PlusIcon
                                                                        className="h-5 w-5"
                                                                        aria-hidden="true"
                                                                    />
                                                                )}
                                                            </span>
                                                        </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                        <FormControl>
                                                            <RadioGroup
                                                                aria-labelledby="demo-radio-buttons-group-label"
                                                                defaultValue="female"
                                                                name="radio-buttons-group"
                                                            >
                                                                {section.options.map((option, optionIdx) => (
                                                                    <FormControlLabel
                                                                        value={option.value}
                                                                        control={<Radio />}
                                                                        label={option.label}
                                                                        onChange={(e) =>
                                                                            handleRadioFilterChange(e, section.id)
                                                                        }
                                                                    />
                                                                ))}
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ))}
                                </form>

                                {/* Product grid */}
                                <div className="flex flex-wrap justify-center lg:col-span-4">{
                                    customersProduct.products?.content?.map((item) => <ProductCard product={item} key={item.id}/>)}</div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}
