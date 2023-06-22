import React from "react";
import "../components/Header.css"
import { Link } from "react-router-dom/cjs/react-router-dom";


export const Header = () => {
    return(
        <div className="Header">
            
             
            
            <Link to="/cart">Sacola de Compras</Link>
        </div>
    )
}