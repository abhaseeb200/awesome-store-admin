import { db } from "../../firebaseConfig"

const getUserData = (userID) => {
    return db.collection("users").where("userID", "==", userID).get()
}

const getAllUsers = () => {
    return db.collection("users").get()
}


export { getUserData, getAllUsers }