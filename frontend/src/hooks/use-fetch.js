import { useEffect, useState } from "react";

function useFetch(url, options={method:"GET"}) {

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    
    useEffect(() => {
        fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch(url, {...options})
                if (!response.ok){
                    throw new Error("Error while connecting to the API")
                }
                const result = await response.json()
                setData(result)
            }
            catch(error){
                setError(error)
            }
            finally{
                setLoading(false)
            }

            if(url){
                fetchData()
            }
        }
    }, [url])
}

export default useFetch