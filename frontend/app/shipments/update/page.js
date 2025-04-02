"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useShipments } from "@/context/ShipmentProvider";
import { Suspense } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function UpdatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shipmentId = searchParams.get("id");
  const { getShipment, updateShipment } = useShipments();

  const [formData, setFormData] = useState({
    status: "",
    currentLocation: "",
    note: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [shipmentDetails, setShipmentDetails] = useState(null);

  useEffect(() => {
    const loadShipment = async () => {
      if (!shipmentId) {
        toast.error("No shipment ID provided");
        router.push("/shipments");
        return;
      }

      const shipmentData = await getShipment(shipmentId);
      if (shipmentData) {
        setShipmentDetails(shipmentData);
        setFormData((prev) => ({
          ...prev,
          status: shipmentData.status || "",
          currentLocation: shipmentData.tracking?.currentLocation || "",
        }));
      }
    };

    loadShipment();
  }, [shipmentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateShipment(shipmentId, {
        status: formData.status,
        tracking: {
          currentLocation: formData.currentLocation,
          updates: [
            {
              location: formData.currentLocation,
              note: formData.note,
              timestamp: new Date(),
            },
          ],
        },
      });

      toast.success("Shipment updated successfully");
      router.push(`/shipments/${shipmentId}`);
    } catch (error) {
      toast.error("Failed to update shipment");
      console.error("Update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-50 text-yellow-800 border-yellow-200",
      "in-transit": "bg-blue-50 text-blue-800 border-blue-200",
      delivered: "bg-green-50 text-green-800 border-green-200",
      cancelled: "bg-red-50 text-red-800 border-red-200",
    };
    return colors[status] || "bg-gray-50 text-gray-800 border-gray-200";
  };

  return (
    <Suspense>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />

        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => router.back()}
                  className="inline-flex items-center text-gray-500 hover:text-gray-700">
                  <svg
                    className="w-5 h-5 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span>Back</span>
                </button>
                <h1 className="text-xl font-bold text-gray-900">
                  Update Shipment
                </h1>
              </div>
              {shipmentDetails && (
                <div
                  className={`px-3 py-1 rounded-full border ${getStatusColor(
                    shipmentDetails.status
                  )}`}>
                  <span className="text-sm font-medium capitalize">
                    {shipmentDetails.status?.replace("-", " ")}
                  </span>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {shipmentDetails && (
            <div className="bg-white shadow sm:rounded-lg mb-6">
              <div className="px-4 py-5 sm:p-6 border-b">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-xs font-medium text-gray-500">
                      Shipment ID
                    </h3>
                    <p className="mt-1 text-sm text-gray-900">
                      {shipmentDetails._id}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-medium text-gray-500">
                      Current Status
                    </h3>
                    <p className="mt-1 text-sm text-gray-900 capitalize">
                      {shipmentDetails.status?.replace("-", " ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Status Update Section */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Update Status
                  </h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700">
                        New Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        required>
                        <option value="">Select status</option>
                        <option value="pending">Pending</option>
                        <option value="in-transit">In Transit</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Location Update Section */}
                <div className="border-b border-gray-200 pb-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Location Details
                  </h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label
                        htmlFor="currentLocation"
                        className="block text-sm font-medium text-gray-700">
                        Current Location
                      </label>
                      <input
                        type="text"
                        id="currentLocation"
                        name="currentLocation"
                        value={formData.currentLocation}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter current location"
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="note"
                        className="block text-sm font-medium text-gray-700">
                        Update Note
                        <span className="text-gray-500 text-xs ml-1">
                          (Required)
                        </span>
                      </label>
                      <textarea
                        id="note"
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Describe the update (e.g., 'Package arrived at sorting facility')"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Updating...
                      </>
                    ) : (
                      "Update Shipment"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
