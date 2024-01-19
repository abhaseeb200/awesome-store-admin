import { USER } from "../types/userType"

const initialState = {
    currentUser: "",
}

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case USER:
            return { currentUser: action.payload }
        default:
            return state
    }
}

export default userReducers