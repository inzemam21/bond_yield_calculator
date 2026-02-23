
interface AlertProps {
    errors: string[];
}

export function Alert({ errors }: AlertProps) {
    if (!errors || errors.length === 0) return null;

    return (
        <div className="alert-box">
            <h4>There was a problem with your input:</h4>
            <ul>
                {errors.map((err, i) => (
                    <li key={i}>{err}</li>
                ))}
            </ul>
        </div>
    );
}
