import Container from "./Container";

export default function Section({
    children,
    className = "",
    containerClassName = "",
    style = {},
    ...rest
}) {
    return (
        <section
            className={`py-16 md:py-24 lg:py-section relative ${className}`}
            style={style}
            {...rest}
        >
            <Container className={containerClassName}>
                {children}
            </Container>
        </section>
    );
}