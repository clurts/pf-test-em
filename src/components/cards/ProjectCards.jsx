import "./_ProjectCards.scss";

export default function ProjectCards({title,
    url,
    imageSrc,
    imageAlt,
    technologies = []}) {

    return (
        <article className="projects__card">
            <h3>{title}</h3>
            <a href={url} target="_blank" rel="noopener noreferrer">
                <img src={imageSrc} alt={imageAlt} />
            </a>
            <ul>
                <li>Technologies used</li>
                <ul>
                    {technologies.map((tech, index) => (
                        <li key={index}>{tech}</li>
                    ))}
                </ul>
            </ul>
        </article>
    )
}