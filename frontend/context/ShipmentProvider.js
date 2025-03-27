import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";

const ShipmentContext = createContext();

function ShipmentProvider({children}) {
    const { user } = useAuth()
    const [shipments, setShipments] = useState([]);
    const [shipment, setShipment] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if(user ) fetchShipments()
        
    }, [user])

   

   const fetchShipments = async () => {
    try {
        setIsLoading(true)
        const shipmentRes = await fetch('http://localhost:8000/api/shipments', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',

        });

        if (!shipmentRes.ok) throw new Error('Failed to fetch shipments');
        const data = await shipmentRes.json()
        setShipments(data?.data?.shipments || [])
        setError[null]

    } catch (err) {
        console.error("Error fetching shipments:", err);
        setError(err.message)
        setShipments([])
    } finally {
        setIsLoading(false)
    }
}


   const createShipment = async (data) => {
        try {
            const response = await fetch('http://localhost:8000/api/shipments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data)
            }) 

            if(!response.ok) throw new Error("Failed to create Shipment")
            const res = await response.json()
            await fetchShipments()
            return res?.data?.shipment;
        } catch(err) {
            console.error("Error creating shipment:", err)
            setError(err.message)
        }
   }

   const getShipment = async (shipment_id) => {
        try {
            setIsLoading(true);
            
            const response = await fetch(`http://localhost:8000/api/shipments/${shipment_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
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
   

   const updateShipments = async (shipment_id) => {
    
   }
   
   const deleteShipment = async (shipment_id) => {
        try {
            const res = await fetch(`http://localhost:8000/api/shipments/${shipment_id}`, {
                method: 'DELETE',
                credentials: 'include'
            })

            if (!res.ok) {
                throw new Error('Failed to delete shipment');
              }
          
            // Optionally re-fetch the updated list
            await fetchShipments();
        } catch (err) {
            console.error('Error deleting shipment:', err);
            setError(err.message);
        }
   }

   return (
        <ShipmentContext.Provider value={{
            shipment,
            shipments,
            isLoading,
            error,
            fetchShipments,
            createShipment, 
            getShipment,   // once implemented
            //updateShipment,    // once implemented
            deleteShipment     // once implemented
        }}>
            {children}
        </ShipmentContext.Provider>
   )
}

export const useShipments = () => {
    const context = useContext(ShipmentContext)
    return context;
}

export default ShipmentProvider;