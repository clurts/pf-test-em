import "./_Projects.scss";
import ProjectCards from "../components/cards/ProjectCards";
import { useLoaderData } from "react-router";

export default function Projects() {
    const {cards} = useLoaderData();

    return (
        <>
            <section className="projects">
                <h1>
                    projects
                </h1>
                <div className="projects__cards">
                    {cards.map((card) => (
                        <ProjectCards
                            key={card.id}
                            title={card.title ? card.title : ''}
                            url={card.url}
                            imageSrc={card.imageSrc && card.imageSrc.length > 0 ? card.imageSrc[0] : ''}
                            imageAlt={card.imageAlt ? card.imageAlt : ''}
                            technologies={card.technologies ? card.technologies : ''}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}