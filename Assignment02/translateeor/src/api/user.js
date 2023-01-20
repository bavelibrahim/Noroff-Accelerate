const apiURL = process.env.REACT_APP_API_URL

export const checkForUser = async (username) => {
    try {
        const response = await fetch(`${apiURL}?username=${username}`)
        if (!response.ok) {
            throw new error('Request not completable ')
        }
        const data = await response.json()
        return [ null, data ]
    } catch (error) {
        return [ error.message, null]
    }
}  

export const createUser = () => {

}

export const loginUser = async username => {
    const [error, user] = await checkForUser(username)
}