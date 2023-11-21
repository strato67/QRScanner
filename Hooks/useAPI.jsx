import { useState } from "react";
import { Linking } from "react-native";

const useAPI = () => {
    const [data, setData] = useState(null);
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
                "studentID": 100701820,
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



    return { scanStudent, loading, error };
};

export default useAPI;
