export default function Container({ children, className = "" }) {
    return (
        <div
            className={`max-w-content mx-auto px-6 md:px-8 lg:px-12 ${className}`}
        >
            {children}
        </div>
    );
}