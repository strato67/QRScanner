import { useState } from "react";
import {API_SERVER} from '@env'

const useAPI = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const scanStudent = async (seatNumber) =>{
        setLoading(true);
        setError(null);

        console.log(` seat number: ${seatNumber}`)
        const response = await fetch(`${API_SERVER}/api/studentScan/`, {
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "studentID":100701820,
                "seatNumber": seatNumber,
                "roomNumber": "UA1350"
            })
        })

        const json = await response.json();

        if(!response.ok){
            setLoading(false)
            setError(json.error)
        }
        setLoading(false)

    }



    return { scanStudent, loading, error };
};

export default useAPI;
