import "./Footer.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
    return (<footer>
        {/* Top Shape Divider */}
        <div className="footer-shape-divider">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,0V46.29c47.43,22.11,104.05,35.77,158,36.5C301.81,85.35,355,49.1,410,37.91S517.67,43.78,580,59.67C641.11,75.16,702.38,91,767,85.35c53.12-4.62,104.29-27.49,157-39.64V0Z"
                    opacity="0.25"
                    className="shape-fill"
                ></path>
                <path d="M0,0V15.81C47.42,35.89,104,55.59,158,57.2c58.66,1.78,113.85-16.4,170-26.8,55.58-10.27,117.4-8.39,172,7.91,63.21,18.66,124.85,42.82,189,46.74,57.23,3.5,113.18-12.01,168-35.28V0Z"
                    opacity="0.5"
                    className="shape-fill"
                ></path>
                <path d="M0,0V5.63C47.42,27.17,104,49.59,158,51.78c48.69,1.95,98.67-13.14,145-24.42C408.35,16.28,462.45,7.2,516,12.24c56.25,5.3,111.23,24.84,167,30.52,59.91,6.07,117.42-12.43,176-35.21V0Z"
                    className="shape-fill"
                ></path>
            </svg>
        </div>

        <div className="footer-content container">
            <div className="footer-column">
                <h2>CricInfo</h2>
                <p>Your ultimate cricket hub for live scores, upcoming matches, and player insights.</p>
                <div className="social-icons">
                    <span><FaFacebookF /></span>
                    <span><FaInstagram /></span>
                    <span><FaXTwitter /></span>
                    <span><FaYoutube /></span>

                </div>
            </div>

            <div className="footer-column">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#lm">Live Matches</a></li>
                    <li><a href="/players">Players</a></li>
                    <li><a href="#um">Upcoming Series</a></li>
                </ul>
            </div>

            <div className="footer-column">
                <h3>Contact Us</h3>
                <p>Email: info@cricinfo.com</p>
                <p>Phone: +91 9191919919</p>
                <p>Location: Gujarat, India</p>
            </div>

        </div>

        <div className="footer-bottom">
            <p>© {new Date().getFullYear()} CricInfo. All Rights Reserved.</p>
        </div>
    </footer>);
}

export default Footer;