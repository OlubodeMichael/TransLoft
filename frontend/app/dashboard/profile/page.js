'use client';

import { useState, useEffect } from 'react';

export default function Profile() {
    const [businessInfo, setBusinessInfo] = useState({
        companyName: 'Acme Logistics Ltd',
        contactName: 'John Smith',
        email: 'john.smith@acmelogistics.com',
        phone: '+1 (555) 123-4567',
        address: '123 Business Ave',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        taxId: 'TAX-123456789'
    });

    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleBusinessInfoChange = (e) => {
        const { name, value } = e.target;
        setBusinessInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswords(prev => ({
            ...prev,
            [name]: value
        }));

        // Calculate password strength if it's the new password field
        if (name === 'newPassword') {
            let strength = 0;
            if (value.length >= 8) strength++;
            if (/[A-Z]/.test(value)) strength++;
            if (/[0-9]/.test(value)) strength++;
            if (/[^A-Za-z0-9]/.test(value)) strength++;
            setPasswordStrength(strength);
        }
    };

    const handleBusinessInfoSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setMessage({ type: 'success', text: 'Business information updated successfully!' });
            setIsEditing(false);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update business information. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            setMessage({ type: 'error', text: 'New passwords do not match!' });
            return;
        }

        if (passwordStrength < 3) {
            setMessage({ type: 'error', text: 'Password is not strong enough. Please follow the requirements below.' });
            return;
        }

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setMessage({ type: 'success', text: 'Password updated successfully!' });
            setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setPasswordStrength(0);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update password. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const getPasswordStrengthColor = () => {
        switch (passwordStrength) {
            case 0: return 'bg-gray-200';
            case 1: return 'bg-red-500';
            case 2: return 'bg-yellow-500';
            case 3: return 'bg-blue-500';
            case 4: return 'bg-green-500';
            default: return 'bg-gray-200';
        }
    };

    // Auto-dismiss messages after 5 seconds
    useEffect(() => {
        if (message.text) {
            const timer = setTimeout(() => {
                setMessage({ type: '', text: '' });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message.text]);

    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900">Profile Settings</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Manage your business information and security settings
                    </p>
                </div>
                
                {/* Message display */}
                {message.text && (
                    <div className="fixed top-4 right-4 z-50 animate-fade-in">
                        <div className={`px-4 py-3 rounded-lg shadow-lg flex items-center ${
                            message.type === 'success' 
                                ? 'bg-green-50 text-green-800 border border-green-100' 
                                : 'bg-red-50 text-red-800 border border-red-100'
                        }`}>
                            {message.type === 'success' ? (
                                <svg className="h-5 w-5 mr-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            )}
                            <p className="text-sm font-medium">{message.text}</p>
                        </div>
                    </div>
                )}

                <div className="space-y-6">
                    {/* Business Information Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-medium text-gray-900">Business Information</h2>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Update your business details and contact information
                                    </p>
                                </div>
                                {!isEditing && (
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(true)}
                                        className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                                    >
                                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                        Edit Information
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="px-6 py-6">
                            <form onSubmit={handleBusinessInfoSubmit}>
                                <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
                                    {/* Company Info Section */}
                                    <div className="sm:col-span-2">
                                        <h3 className="text-sm font-medium text-gray-900 mb-4">Company Details</h3>
                                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                                                    Company Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="companyName"
                                                    id="companyName"
                                                    value={businessInfo.companyName}
                                                    onChange={handleBusinessInfoChange}
                                                    disabled={!isEditing}
                                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-150"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="taxId" className="block text-sm font-medium text-gray-700">
                                                    Tax ID
                                                </label>
                                                <input
                                                    type="text"
                                                    name="taxId"
                                                    id="taxId"
                                                    value={businessInfo.taxId}
                                                    onChange={handleBusinessInfoChange}
                                                    disabled={!isEditing}
                                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-150"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Info Section */}
                                    <div className="sm:col-span-2">
                                        <h3 className="text-sm font-medium text-gray-900 mb-4">Contact Information</h3>
                                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">
                                                    Contact Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="contactName"
                                                    id="contactName"
                                                    value={businessInfo.contactName}
                                                    onChange={handleBusinessInfoChange}
                                                    disabled={!isEditing}
                                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-150"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    id="phone"
                                                    value={businessInfo.phone}
                                                    onChange={handleBusinessInfoChange}
                                                    disabled={!isEditing}
                                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-150"
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                    Email Address
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    value={businessInfo.email}
                                                    onChange={handleBusinessInfoChange}
                                                    disabled={!isEditing}
                                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-150"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address Section */}
                                    <div className="sm:col-span-2">
                                        <h3 className="text-sm font-medium text-gray-900 mb-4">Business Address</h3>
                                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                            <div className="sm:col-span-6">
                                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                                    Street Address
                                                </label>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    id="address"
                                                    value={businessInfo.address}
                                                    onChange={handleBusinessInfoChange}
                                                    disabled={!isEditing}
                                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-150"
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    value={businessInfo.city}
                                                    onChange={handleBusinessInfoChange}
                                                    disabled={!isEditing}
                                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-150"
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                                    State
                                                </label>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    id="state"
                                                    value={businessInfo.state}
                                                    onChange={handleBusinessInfoChange}
                                                    disabled={!isEditing}
                                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-150"
                                                />
                                            </div>
                                            <div className="sm:col-span-2">
                                                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                                                    ZIP Code
                                                </label>
                                                <input
                                                    type="text"
                                                    name="zipCode"
                                                    id="zipCode"
                                                    value={businessInfo.zipCode}
                                                    onChange={handleBusinessInfoChange}
                                                    disabled={!isEditing}
                                                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm disabled:bg-gray-50 disabled:text-gray-500 transition-colors duration-150"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {isEditing && (
                                    <div className="mt-8 flex items-center justify-end space-x-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
                                            disabled={isLoading}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center px-4 py-2 rounded-lg border border-transparent text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-150"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Saving Changes...
                                                </>
                                            ) : 'Save Changes'}
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>

                    {/* Password Change Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-100">
                            <h2 className="text-xl font-medium text-gray-900">Security Settings</h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Update your password and manage account security
                            </p>
                        </div>

                        <div className="px-6 py-6">
                            <form onSubmit={handlePasswordSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                                        Current Password
                                    </label>
                                    <div className="mt-1 relative">
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            id="currentPassword"
                                            value={passwords.currentPassword}
                                            onChange={handlePasswordChange}
                                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-150"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                                        New Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="password"
                                            name="newPassword"
                                            id="newPassword"
                                            value={passwords.newPassword}
                                            onChange={handlePasswordChange}
                                            className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm transition-colors duration-150"
                                            required
                                        />
                                    </div>

                                    {/* Password strength indicator */}
                                    <div className="mt-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700">Password Strength</span>
                                            <span className="text-sm text-gray-500">
                                                {passwordStrength === 0 ? 'None' :
                                                passwordStrength === 1 ? 'Weak' :
                                                passwordStrength === 2 ? 'Fair' :
                                                passwordStrength === 3 ? 'Good' :
                                                'Strong'}
                                            </span>
                                        </div>
                                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                                                style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Password requirements */}
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                        <h4 className="text-sm font-medium text-gray-900 mb-3">Password Requirements</h4>
                                        <ul className="space-y-2">
                                            <li className="flex items-center text-sm">
                                                <span className={`flex-shrink-0 w-5 h-5 mr-2 rounded-full flex items-center justify-center ${
                                                    passwords.newPassword.length >= 8 
                                                        ? 'bg-green-100 text-green-500' 
                                                        : 'bg-gray-100 text-gray-400'
                                                }`}>
                                                    {passwords.newPassword.length >= 8 ? (
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        <span className="w-1.5 h-1.5 bg-current rounded-full"/>
                                                    )}
                                                </span>
                                                At least 8 characters
                                            </li>
                                            <li className="flex items-center text-sm">
                                                <span className={`flex-shrink-0 w-5 h-5 mr-2 rounded-full flex items-center justify-center ${
                                                    /[A-Z]/.test(passwords.newPassword)
                                                        ? 'bg-green-100 text-green-500'
                                                        : 'bg-gray-100 text-gray-400'
                                                }`}>
                                                    {/[A-Z]/.test(passwords.newPassword) ? (
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        <span className="w-1.5 h-1.5 bg-current rounded-full"/>
                                                    )}
                                                </span>
                                                One uppercase letter
                                            </li>
                                            <li className="flex items-center text-sm">
                                                <span className={`flex-shrink-0 w-5 h-5 mr-2 rounded-full flex items-center justify-center ${
                                                    /[0-9]/.test(passwords.newPassword)
                                                        ? 'bg-green-100 text-green-500'
                                                        : 'bg-gray-100 text-gray-400'
                                                }`}>
                                                    {/[0-9]/.test(passwords.newPassword) ? (
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        <span className="w-1.5 h-1.5 bg-current rounded-full"/>
                                                    )}
                                                </span>
                                                One number
                                            </li>
                                            <li className="flex items-center text-sm">
                                                <span className={`flex-shrink-0 w-5 h-5 mr-2 rounded-full flex items-center justify-center ${
                                                    /[^A-Za-z0-9]/.test(passwords.newPassword)
                                                        ? 'bg-green-100 text-green-500'
                                                        : 'bg-gray-100 text-gray-400'
                                                }`}>
                                                    {/[^A-Za-z0-9]/.test(passwords.newPassword) ? (
                                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    ) : (
                                                        <span className="w-1.5 h-1.5 bg-current rounded-full"/>
                                                    )}
                                                </span>
                                                One special character
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        Confirm New Password
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            id="confirmPassword"
                                            value={passwords.confirmPassword}
                                            onChange={handlePasswordChange}
                                            className={`block w-full rounded-lg shadow-sm focus:ring-blue-500 sm:text-sm transition-colors duration-150 ${
                                                passwords.confirmPassword && passwords.confirmPassword !== passwords.newPassword
                                                    ? 'border-red-300 focus:border-red-500'
                                                    : 'border-gray-300 focus:border-blue-500'
                                            }`}
                                            required
                                        />
                                    </div>
                                    {passwords.confirmPassword && passwords.confirmPassword !== passwords.newPassword && (
                                        <p className="mt-2 text-sm text-red-600 flex items-center">
                                            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Passwords do not match
                                        </p>
                                    )}
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-150"
                                        disabled={isLoading || passwordStrength < 3 || passwords.newPassword !== passwords.confirmPassword}
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                Updating Password...
                                            </>
                                        ) : 'Update Password'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}