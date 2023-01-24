import { createHeaders } from "./index"
const apiURL = process.env.REACT_APP_API_URL

const checkForUser = async (username) => {
    try {
        const response = await fetch(`${apiURL}?username=${username}`)
        if (!response.ok) {
            throw new Error('Request not completable ')
        }
        const data = await response.json()
        return [ null, data ]
    } catch (error) {
        return [ error.message, []]
    }
}  

const createUser = async (username) => {
 
    try { 
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: createHeaders(),
            body: JSON.stringify({
                username,
                translations: []
            })
        })

        if (!response.ok) {
            throw new Error('User could not be created with username: ' + username)
        }
        const data = await response.json()
        return [ null, data ]
    } catch (error) {
        return [ error.message, []]
    }
}

export const loginUser = async username => {
    const [checkError, user] = await checkForUser(username)
    
    if (checkError !== null){
        return [checkError, null]
    }
    
    if (user.length > 0) {
        return [ null, user.pop() ]
    }

    return await createUser(username)

}