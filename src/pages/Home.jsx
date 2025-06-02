import { Link, useLoaderData } from "react-router"
import Splash from "../components/splash/Splash.jsx"
import "./_Home.scss"
import ExampleCard from "../components/cards/ExampleCard.jsx";

export default function Home() {
    const { cards } = useLoaderData();

    return (
        <>
            <section className="mainSection">
                <h1>
                    Portfolio
                </h1>
                <Splash />
                <Link to="/projects" className="logoLink">
                    <img src="/logo.png" alt="E-Thon full logo" />
                </Link>
                <h2>Emilie Thon</h2>
                <h4>Frontend-Focused Web Developer in Training</h4>
                <p>
                    My name is Emilie, and I am currently in the main course of the Web Development program at Roskilde Technical School. I have a strong interest in frontend development and user experience, and I work purposefully with technologies such as HTML, CSS (Tailwind and SASS), JavaScript, React, Node.js, and Git (GitHub).
                </p>
                <p>
                    My approach to development is characterized by curiosity, structured problem-solving, and a desire for continuous learning. With an academic background in chemistry from the University of Copenhagen and a hands-on approach to coding, I combine analytical thinking with creative work.
                </p>
                <p>
                    I am continuously seeking new opportunities to gain practical experience, preferably in collaboration with experienced developers and in an environment where quality and professional development are highly valued.
                </p>

                <div className="project">
                    {cards.map((card) => (
                        <ExampleCard
                            key={card.id}
                            url={card.url}
                            imageSrc={card.imageSrc && card.imageSrc.length > 0 ? card.imageSrc[1] : ''}
                            imageAlt={card.imageAlt ? card.imageAlt : ''}
                        />
                    ))}

                    <Link key="see-more-link" to="/projects" className="btn">See more</Link>
                </div>

            </section >
        </>
    )
}