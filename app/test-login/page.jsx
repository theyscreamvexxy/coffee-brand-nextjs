"use client";

import { useState } from "react";

export default function TestLogin() {
    const [response, setResponse] = useState(null);

    async function handleLogin() {
        const res = await fetch(
            "/api/admin/login",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify({
                    username: "admin",
                    password: "admin123",
                }),
            }
        );

        const data = await res.json();

        setResponse(data);
    }

    return (
        <div className="p-100">
            <button
                onClick={handleLogin}
                className="border px-6 py-3"
            >
                Test Login
            </button>

            <pre className="mt-6">
                {JSON.stringify(
                    response,
                    null,
                    2
                )}
            </pre>
        </div>
    );
}