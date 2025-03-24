'use client' // Error boundaries must be Client Components
 
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
 
export default function Error({ error, reset }) {
  const router = useRouter()
 
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Shipment Error:', error)
  }, [error])
 
  // Extract error message
  const errorMessage = error?.message || 'An unexpected error occurred'
 
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Error Card */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Error Header */}
          <div className="bg-red-50 px-4 py-5 sm:px-6 border-b border-red-100">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="ml-3 text-lg font-medium text-red-800">
                Error Loading Shipment
              </h3>
            </div>
          </div>

          {/* Error Content */}
          <div className="px-4 py-5 sm:px-6">
            {/* Actual Error Message */}
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-md">
              <p className="text-sm font-medium text-red-800">
                {errorMessage}
              </p>
            </div>

            <div className="text-sm text-gray-600 mb-4">
              This might be due to:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Network connectivity issues</li>
                <li>Server unavailability</li>
                <li>Invalid or expired session</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
              <button
                onClick={() => reset()}
                className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
              <button
                onClick={() => router.push('/shipments')}
                className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Shipments
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}