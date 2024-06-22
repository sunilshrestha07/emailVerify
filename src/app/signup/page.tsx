"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Signup() {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            console.log(email,password)
            if (res.ok) {
                // Redirect to verification page with email as query parameter
                router.push(`/verify?email=${email}`);
            } else {
                // Handle error
                console.error('Signup failed');
            }
        } catch (error) {
            console.log("Error during signup", error);
        }
    };

    return (
        <div>
            <div>
                <p className='font-serif text-3xl font-semibold text-blue-700'>Signup page</p>
            </div>
            <div className="flex justify-center items-center">
                <div className="w-1/3">
                    <form onSubmit={handleFormSubmit} className='flex gap-6 flex-col'>
                        <input className='py-1 px-4' type="text" id="name" placeholder='Name' onChange={(e) => setName(e.target.value)} />
                        <input className='py-1 px-4' type="email" id="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                        <input className='py-1 px-4' type="password" id="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                        <button type='submit' className='bg-blue-300 rounded-md px-5 py-1'>Signup</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
