import { Suspense } from 'react';

export default function ShipmentLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Suspense fallback={
                <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            }>
                {children}
            </Suspense>
        </div>
    );
}