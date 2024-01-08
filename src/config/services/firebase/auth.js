import { auth } from "../../firebaseConfig"

const authLogout = () => {
    return auth.signOut()
}

export { authLogout }