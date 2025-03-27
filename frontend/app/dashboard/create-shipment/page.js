'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateShipment() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [shipmentData, setShipmentData] = useState({
        // Cargo Details
        cargoType: '',
        weight: '',
        dimensions: {
            length: '',
            width: '',
            height: ''
        },
        description: '',
        
        // Pickup Details
        pickupAddress: '',
        pickupCity: '',
        pickupState: '',
        pickupZip: '',
        pickupDate: '',
        pickupInstructions: '',
        
        // Delivery Details
        deliveryAddress: '',
        deliveryCity: '',
        deliveryState: '',
        deliveryZip: '',
        expectedDeliveryDate: '',
        deliveryInstructions: '',
    });

    const [costEstimate, setCostEstimate] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setShipmentData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setShipmentData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const calculateCost = () => {
        // Simplified cost calculation
        const baseRate = 100;
        const weightRate = parseFloat(shipmentData.weight) * 0.5;
        const volume = 
            (parseFloat(shipmentData.dimensions.length) || 0) *
            (parseFloat(shipmentData.dimensions.width) || 0) *
            (parseFloat(shipmentData.dimensions.height) || 0) * 0.01;
        
        return baseRate + weightRate + volume;
    };

    const handleNext = () => {
        if (currentStep === 3) {
            const estimatedCost = calculateCost();
            setCostEstimate(estimatedCost);
        }
        setCurrentStep(prev => Math.min(prev + 1, 4));
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/shipments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shipmentData)
            });

            if (!response.ok) {
                throw new Error('Failed to create shipment');
            }

            const data = await response.json();
            router.push(`/dashboard/payment/${data.shipmentId}`);

        } catch (err) {
            setError(err.message || 'Something went wrong');
            setCurrentStep(1);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Create New Shipment</h1>
                    <p className="mt-2 text-sm text-gray-600">Fill in the details below to create your shipment</p>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {['Cargo Details', 'Pickup', 'Delivery', 'Review'].map((step, index) => (
                            <div key={step} className="flex items-center">
                                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
                                    currentStep > index + 1 ? 'bg-green-500' :
                                    currentStep === index + 1 ? 'bg-blue-600' :
                                    'bg-gray-300'
                                } text-white font-medium`}>
                                    {currentStep > index + 1 ? (
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        index + 1
                                    )}
                                </div>
                                <span className={`ml-2 text-sm ${
                                    currentStep === index + 1 ? 'text-blue-600 font-medium' : 'text-gray-500'
                                }`}>
                                    {step}
                                </span>
                                {index < 3 && (
                                    <div className="ml-4 flex-1 border-t border-gray-300" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center">
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {error}
                    </div>
                )}

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    {/* Step 1: Cargo Details */}
                    {currentStep === 1 && (
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-6">Cargo Details</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Cargo Type</label>
                                    <select
                                        name="cargoType"
                                        value={shipmentData.cargoType}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="">Select cargo type</option>
                                        <option value="general">General Cargo</option>
                                        <option value="fragile">Fragile</option>
                                        <option value="perishable">Perishable</option>
                                        <option value="hazardous">Hazardous</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={shipmentData.weight}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Enter weight in kilograms"
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Length (cm)</label>
                                        <input
                                            type="number"
                                            name="dimensions.length"
                                            value={shipmentData.dimensions.length}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Width (cm)</label>
                                        <input
                                            type="number"
                                            name="dimensions.width"
                                            value={shipmentData.dimensions.width}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                                        <input
                                            type="number"
                                            name="dimensions.height"
                                            value={shipmentData.dimensions.height}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        value={shipmentData.description}
                                        onChange={handleChange}
                                        rows={3}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Describe your cargo"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Pickup Details */}
                    {currentStep === 2 && (
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-6">Pickup Details</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Pickup Address</label>
                                    <input
                                        type="text"
                                        name="pickupAddress"
                                        value={shipmentData.pickupAddress}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">City</label>
                                        <input
                                            type="text"
                                            name="pickupCity"
                                            value={shipmentData.pickupCity}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">State</label>
                                        <input
                                            type="text"
                                            name="pickupState"
                                            value={shipmentData.pickupState}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                                        <input
                                            type="text"
                                            name="pickupZip"
                                            value={shipmentData.pickupZip}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Pickup Date</label>
                                    <input
                                        type="date"
                                        name="pickupDate"
                                        value={shipmentData.pickupDate}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Special Instructions</label>
                                    <textarea
                                        name="pickupInstructions"
                                        value={shipmentData.pickupInstructions}
                                        onChange={handleChange}
                                        rows={3}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Any special instructions for pickup"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Delivery Details */}
                    {currentStep === 3 && (
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-6">Delivery Details</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
                                    <input
                                        type="text"
                                        name="deliveryAddress"
                                        value={shipmentData.deliveryAddress}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">City</label>
                                        <input
                                            type="text"
                                            name="deliveryCity"
                                            value={shipmentData.deliveryCity}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">State</label>
                                        <input
                                            type="text"
                                            name="deliveryState"
                                            value={shipmentData.deliveryState}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                                        <input
                                            type="text"
                                            name="deliveryZip"
                                            value={shipmentData.deliveryZip}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Expected Delivery Date</label>
                                    <input
                                        type="date"
                                        name="expectedDeliveryDate"
                                        value={shipmentData.expectedDeliveryDate}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Delivery Instructions</label>
                                    <textarea
                                        name="deliveryInstructions"
                                        value={shipmentData.deliveryInstructions}
                                        onChange={handleChange}
                                        rows={3}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Any special instructions for delivery"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Review */}
                    {currentStep === 4 && (
                        <div className="p-6">
                            <h2 className="text-lg font-medium text-gray-900 mb-6">Review Shipment Details</h2>
                            
                            <div className="space-y-6">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Cargo Details</h3>
                                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                        <div>
                                            <dt className="text-gray-500">Type</dt>
                                            <dd className="font-medium text-gray-900">{shipmentData.cargoType}</dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-500">Weight</dt>
                                            <dd className="font-medium text-gray-900">{shipmentData.weight} kg</dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-500">Dimensions</dt>
                                            <dd className="font-medium text-gray-900">
                                                {shipmentData.dimensions.length} × {shipmentData.dimensions.width} × {shipmentData.dimensions.height} cm
                                            </dd>
                                        </div>
                                    </dl>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Pickup Details</h3>
                                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                        <div className="col-span-2">
                                            <dt className="text-gray-500">Address</dt>
                                            <dd className="font-medium text-gray-900">
                                                {shipmentData.pickupAddress}, {shipmentData.pickupCity}, {shipmentData.pickupState} {shipmentData.pickupZip}
                                            </dd>
                                        </div>
                                        <div>
                                            <dt className="text-gray-500">Date</dt>
                                            <dd className="font-medium text-gray-900">{shipmentData.pickupDate}</dd>
                                        </div>
                                    </dl>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="text-sm font-medium text-gray-700 mb-2">Delivery Details</h3>
                                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                                        <div className="col-span-2">
                                            <dt className="text-gray-500">Address</dt>
                                            <dd className="font-medium text-gray-900">
                                                {shipmentData.deliveryAddress}, {shipmentData.deliveryCity}, {shipmentData.deliveryState} {shipmentData.deliveryZip}
                                            </dd>
                                        </div>
        <div>
                                            <dt className="text-gray-500">Expected Delivery</dt>
                                            <dd className="font-medium text-gray-900">{shipmentData.expectedDeliveryDate}</dd>
                                        </div>
                                    </dl>
                                </div>

                                {costEstimate && (
                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <h3 className="text-sm font-medium text-blue-800 mb-2">Cost Estimate</h3>
                                        <p className="text-2xl font-bold text-blue-900">${costEstimate.toFixed(2)}</p>
                                        <p className="text-sm text-blue-700 mt-1">Final cost may vary based on actual weight and dimensions</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
                        <button
                            type="button"
                            onClick={handleBack}
                            disabled={currentStep === 1}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={currentStep === 4 ? handleSubmit : handleNext}
                            disabled={isLoading}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Processing...
                                </div>
                            ) : currentStep === 4 ? 'Create Shipment' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}