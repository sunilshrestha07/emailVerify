// Import necessary dependencies and functions
import { Suspense } from 'react';
import VerifyComponent from '@/components/verifycomponent';

export default function VerifyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyComponent />
        </Suspense>
    );
}
