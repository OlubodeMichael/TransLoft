'use client';

import { useState, useEffect } from 'react';
import { notFound, useRouter } from 'next/navigation';
import { use } from 'react';

// Utility functions
const getStatusColor = (status) => {
    const colors = {
        'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
        'in-transit': 'bg-blue-100 text-blue-800 border-blue-200',
        'delivered': 'bg-green-100 text-green-800 border-green-200',
        'cancelled': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
};

const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Loading component
function LoadingSpinner() {
    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );
}

// Error/Not Found component
function ShipmentNotFound({ router }) {
    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
            <div className="max-w-3xl mx-auto bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-4 sm:px-6 sm:py-5 rounded-lg">
                <h2 className="text-lg font-medium mb-2">Shipment Not Found</h2>
                <p className="text-sm sm:text-base">The requested shipment could not be found or may have been deleted.</p>
                <button 
                    onClick={() => router.push('/shipments')}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                    Return to Shipments
                </button>
            </div>
        </div>
    );
}

// Header component
function ShipmentHeader({ shipment, router }) {
    return (
        <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-3">
                        <button 
                            onClick={() => router.push('/shipments')}
                            className="inline-flex items-center text-gray-500 hover:text-gray-700"
                        >
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="text-sm sm:text-base">Back</span>
                        </button>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 ml-2 sm:ml-4">Shipment Details</h1>
                    </div>
                    <div className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full ${getStatusColor(shipment.status)} border text-xs sm:text-sm font-medium self-start sm:self-auto`}>
                        {shipment.status?.replace('-', ' ').charAt(0).toUpperCase() + shipment.status?.slice(1)}
                    </div>
                </div>
            </div>
        </header>
    );
}

// Shipment ID and Date component
function ShipmentIdAndDate({ shipment }) {
    return (
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
                <div>
                    <h2 className="text-base sm:text-lg font-medium text-gray-900">Shipment ID</h2>
                    <p className="text-xs sm:text-sm font-mono text-gray-600 break-all">{shipment._id}</p>
                </div>
                <div className="mt-2 sm:mt-0">
                    <h2 className="text-xs sm:text-sm font-medium text-gray-900">Created On</h2>
                    <p className="text-xs sm:text-sm text-gray-600">{formatDate(shipment.createdAt)}</p>
                </div>
            </div>
        </div>
    );
}

// Location Card component
function LocationCard({ type, location, bgColor, textColor }) {
    return (
        <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
            <div className="flex items-start space-x-3">
                <div className={`shrink-0 ${bgColor} p-2 rounded-full`}>
                    <svg className={`h-4 w-4 sm:h-5 sm:w-5 ${textColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-500">{type}</h3>
                    <p className="mt-1 text-xs sm:text-sm text-gray-900 break-words">{location}</p>
                </div>
            </div>
        </div>
    );
}

// Additional Details component
function AdditionalDetails({ shipment }) {
    if (!shipment.trackingNumber && !shipment.carrier && !shipment.estimatedDelivery) {
        return null;
    }
    
    return (
        <div className="mt-4 sm:mt-6 border border-gray-200 rounded-lg p-3 sm:p-4">
            <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-3 sm:mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
                {shipment.trackingNumber && (
                    <div>
                        <h4 className="text-xs font-medium text-gray-500">Tracking Number</h4>
                        <p className="mt-1 text-xs sm:text-sm text-gray-900">{shipment.trackingNumber}</p>
                    </div>
                )}
                {shipment.carrier && (
                    <div>
                        <h4 className="text-xs font-medium text-gray-500">Carrier</h4>
                        <p className="mt-1 text-xs sm:text-sm text-gray-900">{shipment.carrier}</p>
                    </div>
                )}
                {shipment.estimatedDelivery && (
                    <div>
                        <h4 className="text-xs font-medium text-gray-500">Estimated Delivery</h4>
                        <p className="mt-1 text-xs sm:text-sm text-gray-900">{formatDate(shipment.estimatedDelivery)}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Timeline Item component
function TimelineItem({ isLast, icon, title, date, description, bgColor = "bg-blue-600" }) {
    return (
        <div className="relative flex items-start">
            {!isLast && (
                <div className="absolute left-4 sm:left-5 top-8 sm:top-10 h-[calc(100%+1.25rem)] sm:h-[calc(100%+1.5rem)] w-0.5 bg-gray-200 z-0"></div>
            )}
            
            <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-full ${bgColor} flex items-center justify-center relative z-10`}>
                {icon}
            </div>
            <div className="ml-3 sm:ml-4">
                <h4 className="text-xs sm:text-sm font-medium text-gray-900">{title}</h4>
                <p className="text-xs sm:text-sm text-gray-500">{date}</p>
                <p className="mt-1 text-xs sm:text-sm text-gray-600">{description}</p>
            </div>
        </div>
    );
}

// Status Timeline component
function StatusTimeline({ shipment }) {
    const checkmarkIcon = (
        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    );
    
    const transitIcon = (
        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
    );
    
    const cancelIcon = (
        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
    
    return (
        <div className="mt-6 sm:mt-8">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Status Timeline</h3>
            <div className="relative">
                <div className="space-y-5 sm:space-y-6">
                    {/* First timeline item - Creation (always shown) */}
                    <TimelineItem 
                        isLast={shipment.status === 'pending'}
                        icon={checkmarkIcon}
                        title="Shipment Created"
                        date={formatDate(shipment.createdAt)}
                        description="Your shipment has been created and is pending pickup."
                    />
                    
                    {/* Second timeline item - In Transit */}
                    {(shipment.status === 'in-transit' || shipment.status === 'delivered') && (
                        <TimelineItem 
                            isLast={shipment.status === 'in-transit'}
                            icon={transitIcon}
                            title="In Transit"
                            date="Shipment is on its way"
                            description="Your shipment has been picked up and is in transit to its destination."
                        />
                    )}
                    
                    {/* Third timeline item - Delivered */}
                    {shipment.status === 'delivered' && (
                        <TimelineItem 
                            isLast={true}
                            icon={checkmarkIcon}
                            title="Delivered"
                            date="Shipment completed"
                            description="Your shipment has been delivered successfully."
                            bgColor="bg-green-600"
                        />
                    )}
                    
                    {/* Alternative third timeline item - Cancelled */}
                    {shipment.status === 'cancelled' && (
                        <TimelineItem 
                            isLast={true}
                            icon={cancelIcon}
                            title="Cancelled"
                            date="Shipment cancelled"
                            description="This shipment has been cancelled."
                            bgColor="bg-red-600"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

// Action Buttons component
function ActionButtons({ shipment, router }) {
    return (
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:justify-between space-y-3 sm:space-y-0">
            <button
                onClick={() => router.push('/shipments')}
                className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
                Back to Shipments
            </button>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                {shipment.status !== 'cancelled' && shipment.status !== 'delivered' && (
                    <button
                        className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                        Cancel Shipment
                    </button>
                )}
                <button
                    className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                    Print Details
                </button>
            </div>
        </div>
    );
}

// Main Shipment Details component
export default function ShipmentDetails({ params }) {
    const router = useRouter();
    const [shipment, setShipment] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Safely access the shipmentId using React.use
    const resolvedParams = use(params);
    const shipmentId = resolvedParams.shipmentId;

    useEffect(() => {
        const fetchShipmentDetails = async () => {
            try {
                setIsLoading(true);
                
                const response = await fetch(`http://localhost:8000/api/shipments/${shipmentId}`, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch shipment: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                const shipmentData = data?.data?.shipment || null;
                console.log("Fetched shipment:", shipmentData);
                setShipment(shipmentData);
            } catch (err) {
                console.error('Error fetching shipment details:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (shipmentId) {
            fetchShipmentDetails();
        }
    }, [shipmentId]);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        notFound();
    }

    if (!shipment) {
        return <ShipmentNotFound router={router} />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <ShipmentHeader shipment={shipment} router={router} />

            {/* Main Content */}
            <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {/* Shipment ID and Date */}
                    <ShipmentIdAndDate shipment={shipment} />

                    {/* Shipment Details */}
                    <div className="px-4 sm:px-6 py-4 sm:py-6">
                        <div className="grid grid-cols-1 gap-4 sm:gap-6">
                            {/* Pickup Location */}
                            <LocationCard 
                                type="Pickup Location" 
                                location={shipment.pickUpLocation} 
                                bgColor="bg-blue-100" 
                                textColor="text-blue-600" 
                            />

                            {/* Destination */}
                            <LocationCard 
                                type="Destination" 
                                location={shipment.destination} 
                                bgColor="bg-red-100" 
                                textColor="text-red-600" 
                            />
                        </div>

                        {/* Additional Details (if available) */}
                        <AdditionalDetails shipment={shipment} />

                        {/* Status Timeline */}
                        <StatusTimeline shipment={shipment} />
                    </div>
                </div>

                {/* Actions */}
                <ActionButtons shipment={shipment} router={router} />
            </main>
        </div>
    );
}
