import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
}

export function Button({ children, isLoading, className = '', ...props }: ButtonProps) {
    return (
        <button
            className={`btn ${isLoading ? 'btn-loading' : ''} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? 'Calculating...' : children}
        </button>
    );
}
