import { THEMEMODE } from "../types/themeModeType";

const initialState = {
    isDarkMode: false,
};

const themeModeReducer = (state = initialState, action) => {
    switch (action.type) {
        case THEMEMODE:
            return { isDarkMode: !state.isDarkMode }
        default:
            return state;
    }
};

export default themeModeReducer;
