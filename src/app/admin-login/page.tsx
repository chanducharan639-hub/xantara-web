'use client';

import { useState } from 'react';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (password === 'Xantara@67') {
            document.cookie =
                'xantara-admin=Xantara@67; path=/';

            window.location.href = '/admin';
        } else {
            alert('Wrong Password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="bg-[#111] p-10 rounded-xl w-[400px]">
                <h1 className="text-4xl mb-6 font-serif">
                    XANTARA ADMIN
                </h1>

                <input
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    className="w-full p-4 bg-black border border-gray-700 mb-4"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-white text-black py-4"
                >
                    LOGIN
                </button>
            </div>
        </div>
    );
}