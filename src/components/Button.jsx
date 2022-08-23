import React from "react";

function Button({ type, onClick, children, ...rest }) {
    switch (type) {
        case "primary":
            return (
                <button
                    className="px-4 py-2 bg-myorange hover:bg-myyellow disabled:bg-slate-500 transition-colors duration-100 rounded-full"
                    onClick={onClick}
                    {...rest}
                >
                    {children}
                </button>
            );
        case "warning":
            return <button>{children}</button>;
        case "active":
            return (
                <button
                    className="px-4 py-2 w-full bg-green-400 hover:bg-green-300 disabled:bg-slate-500 transition-colors duration-100"
                    onClick={onClick}
                    {...rest}
                >
                    {children}
                </button>
            );
        case "block":
            return (
                <button
                    className="px-4 py-2 w-full bg-myorange hover:bg-myyellow disabled:bg-slate-500 transition-colors duration-100"
                    onClick={onClick}
                    {...rest}
                >
                    {children}
                </button>
            );
        default:
            return <button>{children}</button>;
    }
}

export default Button;
