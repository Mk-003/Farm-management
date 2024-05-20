// import './navbar.css'
import { NavLink } from "react-router-dom"
// import { BiAlignRight } from 'react-icons/bi'
import { useContext } from 'react'
import { cartContext } from "../context/Context"
import { basketContext } from "../context/ServiceContext";



function ClientNavbar() {
    
    c

    return (
        <section className='h-wrapper'>
            <div className="h-container">
                <NavLink to="/ccomponent">
                    <img src="/e-hub logo.png" alt="logo" width={70} height={70} />
                </NavLink>
                <div className="h-menu">
                    <NavLink className="component-nav-link" to='/component/products'>Products</NavLink>
                    <Navlink className='component-nav-link' to='/component/itemslists'>ItemsList</Navlink>
                    <NavLink className="component-nav-link" to="/ccomponent/order">Orders</NavLink>
                    <NavLink className="component-nav-link" to="/component/cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-handbag-fill" viewBox="0 0 16 16">
                            <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2M5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0z" />
                        </svg>
                    </NavLink>
                    <NavLink className="client-nav-link"></NavLink>
                    <span className='bag-quantity'>
                        {totalQuantity}
                    </span>
                    
                    <button className='button'><NavLink to="/component/logout">Logout</NavLink></button>
                </div>
            </div>
        </section>
    )
}

export default ClientNavbar
