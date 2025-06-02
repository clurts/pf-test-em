// import "./_ExampleCard.scss";

export default function ExampleCard({imageSrc, url, imageAlt}) {
    return (
        <article className="project__card">
            <a href={url} target="_blank">
                <img src={imageSrc} alt={imageAlt} />
            </a>
        </article>
    )
}