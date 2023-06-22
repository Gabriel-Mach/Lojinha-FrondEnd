import React, { useEffect, useState } from "react";
import {MdRemoveShoppingCart} from 'react-icons/md'
import {FaCartArrowDown} from 'react-icons/fa'
import {getItem,setItem} from '../services/LocalStorageFuncs';
import {Link} from 'react-router-dom'
import { Header } from "../components/Header";
import "./Store.css";

export const Store = () =>{

    const [data,setData] = useState([]);
    const [cart,setCart] = useState(getItem('carrinhoYT') || []);


    useEffect(() =>{
        const fetchApi = async () =>{
            const url = 'https://api.mercadolibre.com/sites/MLB/search?q=brinquedos#json';
            const response = await fetch(url);
            const objJson = await response.json()
            setData(objJson.results)
        }
        fetchApi();
    },[])

    const handleClick = (obj) => {
        const element = cart.find((e) => e.id === obj.id)
        if (element) {
            const arrFilter = cart.filter((e) => e.id !== obj.id)
            setCart(arrFilter)
            setItem('carrinhoYT', arrFilter)
        } else{
            setCart([...cart,obj])
            setItem('carrinhoYT', [...cart,obj])
        }
    }
    return(
        <div>
          <Header/>
            <div className='productsArea'>
                {
                    data.map((e) => (
                        <div className="Prod" key={e.id}>

                            <h4>{e.title}</h4>
                            <img src={e.thumbnail} alt=''/>
                            <h4>{e.price}</h4>
                            <button className="button"
                              onClick={() => handleClick(e)}
                            >
                                {
                                    cart.some((itemCart) => itemCart.id === e.id ) ?(
                                        <MdRemoveShoppingCart/>
                                    ) : (
                                        <FaCartArrowDown/>
                                    )
                                }
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}