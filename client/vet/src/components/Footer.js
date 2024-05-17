import './Footer.css'
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <h2>PETOPIA</h2>
                    <p>PET STORE</p>
                </div>
                <div className="footer-content">
                    <h4>About Us</h4>
                    <NavLink className="nav-link" to="/">Home</NavLink> <br/>
                    <NavLink className="nav-link" to="About">product</NavLink><br/>
                    <NavLink className="nav-link" to="Contact">service</NavLink>
                </div>
                <div className="footer-content">
                    <h4>Shop</h4>
                    <NavLink className="nav-link" to="Cat Food">Cat Food</NavLink><br/>
                    <NavLink className="nav-link" to="Dog Food">Dog Food</NavLink><br/>
                    <NavLink className="nav-link" to="Pet Treats">Pet Treats</NavLink><br/> 
                </div>
                <div className="footer-content">
                    <h4>NEED HELP?</h4>
                    <p>MY ACCOUNT</p>
                </div>
                
            </div>
            <div className="footer-copyright">
                 <p>
                    @{new Date().getFullYear()} Group5. Pet Store|| Powered By Pet_Store 
                 </p>
            </div>  

        </div>

    
    );
}

export default Footer;