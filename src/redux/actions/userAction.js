import { USER } from "../types/userType"

const userAction = (currentUser) => {
    return {
        type: USER,
        payload: currentUser
    }
}

export default userAction