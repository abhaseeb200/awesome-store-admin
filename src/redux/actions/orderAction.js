import { GETORDER } from "../types/orderType"

const getOrderAction = (data) => {
    return {
        type: GETORDER,
        data: data
    }
}

export { getOrderAction }