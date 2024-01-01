import { db } from "../../firebaseConfig"

const getOrders = () => {
    return db.collection("orders").orderBy("timeStamp", "desc").get()
}

const getOrderDetails = (docID) => {
    return db.collection("orders").doc(docID).get()
}

const setOrderDetails = (docID,status) => {
    return db.collection("orders").doc(docID).update({
        status:status,
    })
}


export { getOrders, getOrderDetails, setOrderDetails }