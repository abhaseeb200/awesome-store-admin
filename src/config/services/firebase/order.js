import { db } from "../../firebaseConfig"

const getOrders = () => {
    return db.collection("orders").orderBy("timeStamp", "desc").get()
}

export { getOrders }