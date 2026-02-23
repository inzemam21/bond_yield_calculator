import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    hint?: string;
}

export function InputField({ label, hint, className = '', ...props }: InputFieldProps) {
    return (
        <div className={`form-group ${className}`}>
            <label className="form-label">{label}</label>
            <input className="form-input" {...props} />
            {hint && <span className="input-hint">{hint}</span>}
        </div>
    );
}
