import Container from "./Container";

export default function Section({
    children,
    className = "",
    containerClassName = "",
}) {
    return (
        <section className={`py-section ${className}`}>
            <Container className={containerClassName}>
                {children}
            </Container>
        </section>
    );
}