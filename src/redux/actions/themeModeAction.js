import { THEMEMODE } from "../types/themeModeType"

const isDarkModeAction = () => {
    return {
        type: THEMEMODE,
    }
}

export default isDarkModeAction