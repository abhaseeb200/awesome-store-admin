import { db } from "../../firebaseConfig"

const getUserData = (userID) => {
    return db.collection("users").where("userID","==",userID).get()
}


export { getUserData }