import React from "react";

function Input({ onChange, value, type }) {
    switch (type) {
        case "time":
            return (
                <input
                    className="outline-none px-2 py-1 rounded-full"
                    type="time"
                    onChange={onChange}
                    value={value}
                />
            );
        case "date":
            return (
                <input
                    className="outline-none px-2 py-1 rounded-full"
                    type="date"
                    onChange={onChange}
                    value={value}
                />
            );
        case "number":
            return (
                <input
                    className="outline-none px-2 py-1 rounded-full"
                    type="number"
                    onChange={onChange}
                    value={value}
                />
            );
        default:
            return (
                <input
                    className="outline-none px-2 py-1 rounded-full"
                    type="text"
                    onChange={onChange}
                    value={value}
                />
            );
    }
}

export default Input;
