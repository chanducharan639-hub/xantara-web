'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      console.log(data);

      if (res.ok) {
        alert('Signup successful 🚀');

        window.location.href = '/login';
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white p-12 shadow-sm border border-gray-100">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-serif mb-2">Create Account</h1>
          <p className="text-gray-500 text-sm font-light">
            Join the Xantara universe.
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-black transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-black transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 py-2 outline-none focus:border-black transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 text-sm uppercase tracking-widest hover:bg-gray-900 transition-colors mt-8"
          >
            Create Account
          </button>

        </form>

        <div className="mt-8 text-center text-sm text-gray-500 font-light">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-black font-medium underline"
          >
            Sign in here
          </Link>
        </div>

      </div>
    </div>
  );
}