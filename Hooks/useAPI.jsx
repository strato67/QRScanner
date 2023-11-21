import { useState } from "react";

const useAPI = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const scanStudent = async (seatNumber) =>{
        setLoading(true);
        setError(null);

        const response = await fetch('http://192.168.2.167:3000/api/studentScan/', {
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                "studentID":100701820,
                "seatNumber": 1,
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
