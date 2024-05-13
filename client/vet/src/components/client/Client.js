import ClientNavbar from "./ClientNavbar";
// import { Route, Routes } from "react-router-dom"
import { Outlet, useLocation } from "react-router-dom"
import ClientHome from "./ClientHome";




function Client(){
    const location = useLocation();

    const renderHomePage = location.pathname === '/client';

    return(
        <div>
            <ClientNavbar/> 
            {renderHomePage && <ClientHome/>}
            <Outlet />            
        </div>
    )

}

export default Client 