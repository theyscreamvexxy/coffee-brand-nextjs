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
            className={`py-section relative ${className}`}
            style={style}
            {...rest}
        >
            <Container className={containerClassName}>
                {children}
            </Container>
        </section>
    );
}