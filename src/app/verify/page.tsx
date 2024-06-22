"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

interface FormDataInterface {
  email: string | null;
  verifyCode: string;
}

export default function Verify() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get('email');
    const [verifycode,setVerifycode]=useState<number | null>( null)
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVerifycode(Number(e.target.value))
    };

    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null); // Reset error state
        try {
            const res = await fetch('/api/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email,verifycode}),
            });

            if (res.ok) {
                // Redirect to dashboard or homepage after successful verification
                router.push('/');
                console.log(email,verifycode)
            } else {
                // Capture and display detailed error message
                const errorData = await res.json();
                console.log(email,verifycode)
                setError(errorData.message || 'Verification failed');
            }
        } catch (error) {
            console.error('Error during verification', error);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <>
            <div>
                <div>
                    <p>Verify your email</p>
                    {email}
                </div>
                <div>
                    <form onSubmit={handleVerify}>
                        <input
                            type="text"
                            id="verifyCode"
                            placeholder='Your code'
                            onChange={handleInputChange}
                        />
                        <button type="submit" className='bg-blue-300 py-2'>Verify</button>
                    </form>
                    {error && <p className='text-red-500'>{error}</p>}
                </div>
            </div>
        </>
    );
}
