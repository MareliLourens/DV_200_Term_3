import React from "react";
import './footer.css';


function BasicNav() {

    return (
        <div className="footer">
            <div className="about_us">
                <div className="footer_title">About us</div>
                <div className="footer_text">Qingxing Bargains is an online store that sells fantasy game characters, including characters from games such as Genshin Impact,
                    King’s Raid, Scarlet Nexus, Immortals Fenyx Rising and much more. Our store focuses on being the midway between customers and game companies so that users
                    can easily make purchases.</div>
            </div>
            <div className="profile">
                <div className="footer_title"> Profile</div>
                <div className="footer_text">Login/sign up</div>
                <div className="footer_text">Update information</div>
                <div className="footer_text">Wishlist</div>
            </div>
            <div className="products">
                <div className="footer_title">Products</div>
                <div className="footer_text">All characters</div>
                <div className="footer_text">5 star characters</div>
                <div className="footer_text">4 star characters</div>
            </div>
            <div className="social_media">
                <div className="footer_title">Social Media</div>
                <div className="footer_text">Facebook</div>
                <div className="footer_text">Instagram</div>
                <div className="footer_text">Twitter</div>
                <div className="footer_text">Youtube</div>
            </div>
        </div>
    )
}

export default BasicNav;