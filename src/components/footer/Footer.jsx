import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./_Footer.scss"

export default function Footer({ img, adress, number, mail }) {
    return (
        <>
            <div className="footer__contact">
                <figure className="footer__portrait">
                    <img src={img} className="portrait" alt="Portrait of Emilie Malene Thon" />
                </figure>
                <address>
                    <p>{adress}</p>
                    <p>Mobile: {number}</p>
                    <p>Mail: {mail}</p>
                </address>
            </div>
            <ul className="footer__somes">
                <li className="footer__some">
                    <a href="https://www.facebook.com/emi.m.thon" target="_blank"><FaFacebook /></a>
                </li>
                <li className="footer__some">
                    <a href="https://www.instagram.com/emi.thon/" target="_blank"><FaInstagram /></a>
                </li>
                <li className="footer__some">
                    <a href="https://www.linkedin.com/in/emilie-thon-257943325/" target="_blank"><FaLinkedin /></a>
                </li>
                <li className="footer__some">
                    <a href="https://github.com/E-Thon" target="_blank"><FaGithub /></a>
                </li>
            </ul>
        </>
    )
}