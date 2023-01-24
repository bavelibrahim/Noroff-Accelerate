import { json } from "react-router-dom"

const apiKey = process.env.REACT_APP_API_KEY

export const createHeaders = () => {
    return {
        'Content-type': 'application/json',
        'x-api-key': apiKey
    }
}

