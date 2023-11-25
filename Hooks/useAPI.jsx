import { useState } from "react";
import { Linking } from "react-native";

const useAPI = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const scanStudent = async (seatNumber) => {
        setLoading(true);
        setError(null);

        const url = await Linking.getInitialURL();
        const ipAddressRegex = /\/\/(.*):/; // Regular expression to extract IP address
        const match = ipAddressRegex.exec(url);
        const ipAddress = match[1];

        console.log(` seat number: ${seatNumber}`)

        const response = await fetch(`http://${ipAddress}:3000/api/studentScan/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "studentID": 100747897,
                "seatNumber": seatNumber,
                "roomNumber": "UA1350"
            })
        })

        const json = await response.json();

        if (!response.ok) {
            setLoading(false)
            setError(json.error)
        }
        setLoading(false)

    }

    const leaveSeat = async (seatNumber) => {
        setLoading(true);
        setError(null);

        const url = await Linking.getInitialURL();
        const ipAddressRegex = /\/\/(.*):/; // Regular expression to extract IP address
        const match = ipAddressRegex.exec(url);
        const ipAddress = match[1];

        console.log(` left seat: ${seatNumber}`)

        const response = await fetch(`http://${ipAddress}:3000/api/studentScan/leave`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "seatNumber": seatNumber,
                "roomNumber": "UA1350"
            })
        })

        const json = await response.json();

        if (!response.ok) {
            setLoading(false)
            setError(json.error)
        }
        setLoading(false)

    }



    return { scanStudent, leaveSeat, loading, error };
};

export default useAPI;
