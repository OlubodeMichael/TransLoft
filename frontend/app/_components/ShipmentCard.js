import { useRouter } from "next/navigation";

export default function ShipmentCard({ shipment }) {
  const router = useRouter();

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-700",
      "in-transit": "bg-blue-100 text-blue-700",
      delivered: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  if (!shipment) return null;

  return (
    <div
      onClick={() => router.push(`/shipments/${shipment._id}`)}
      className="group cursor-pointer bg-white rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all duration-200">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`px-2.5 py-1 rounded-md text-xs font-medium ${getStatusColor(
              shipment.status
            )}`}>
            {shipment.status?.replace("-", " ").charAt(0).toUpperCase() +
              shipment.status?.slice(1)}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(shipment.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        {/* Locations */}
        <div className="space-y-3">
          {/* From */}
          <div className="flex items-start gap-3">
            <svg
              className="w-4 h-4 mt-0.5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <circle cx="12" cy="12" r="8" strokeWidth="2" />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">From</p>
              <p className="text-sm text-gray-900 truncate">
                {shipment.pickUpLocation}
              </p>
            </div>
          </div>

          {/* To */}
          <div className="flex items-start gap-3">
            <svg
              className="w-4 h-4 mt-0.5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">To</p>
              <p className="text-sm text-gray-900 truncate">
                {shipment.destination}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {shipment.cargoDetails?.type && (
              <span className="text-xs text-gray-600">
                {shipment.cargoDetails.type}
              </span>
            )}
            {shipment.cargoDetails?.weight && (
              <span className="text-xs text-gray-600">
                • {shipment.cargoDetails.weight} kg
              </span>
            )}
          </div>

          <div className="flex items-center text-blue-600 text-sm font-medium">
            Track
            <svg
              className="ml-1 w-4 h-4 transform transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
