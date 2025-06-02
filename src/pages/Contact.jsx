import Formula from "../components/formula/Formula";
import "./_Contact.scss";

export default function Contact() {
    return (
        <>
            <h1>Contact</h1>
            <section className="contact">
                <h2>
                    Hello, thank you for your interest!
                </h2>
                <p>
                    I am currently placed in Nørrebro, Copenhagen where I live.
                </p>
                <p>
                    Get in contact by phone on <a href="tel:+4560615218"
                        className="section__content__text__link">+45 60 61 52 18</a>. If I am unavailable, please leave a message and I will get back to you as soon as possible.
                </p>
                <p>
                    If you are more of a texter, please, send an e-mail to <a href="mailto:emilie.m.thon@gmail.com?subject=Mail%20from%20portfolio&body=Direct%20contact%20"
                        target="_blank">emilie.m.thon@gmail.com</a>, or fill out the formula below.
                </p>
            </section>
            <Formula />
        </>
    )
}
