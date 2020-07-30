
import { SAVE_USER_SETTINGS } from './actions';

const initialState = {
    name: '',
};


export default function userSettingsReducer(state = initialState, action){
    switch (action.type){
        case SAVE_USER_SETTINGS: {
            return {
                name: action.payload.name,
            };
        }
        default:
            return state;
    }
}

export const saveUserSettings = (obj) => {
    return {
        type: SAVE_USER_SETTINGS,
        payload: obj,
    };
};