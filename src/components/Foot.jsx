import "./Footer.css";
import YouTubeIcon from '../assets/youtube-app-white-icon.png';
import twitterIcon from '../assets/twitter-32.png';
import FacebookIcon from '../assets/facebook-app-round-white-icon.png';
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div>
                    <p>©2022 All Rights Reserved.</p>
                </div>
                
                <div className="footer-icons">
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                        <img src={YouTubeIcon} alt="YouTube" className="footer-icon" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src={twitterIcon} alt="twitter" className="footer-icon" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={FacebookIcon} alt="Facebook" className="footer-icon" />
                    </a>
                </div>
                <div className="footer-links">
                    <a href="#contact">Contact us</a>
                    <a href="#privacy">Privacy Policies</a>
                    <a href="#help">Help</a>
                </div>
            </div>       
        </footer>
    )
};

export default Footer;