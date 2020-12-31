import userConstants from "../constants/userConstants";
import _ from "lodash"
export default function FormReducer(state = {}, action) {

    switch (action.type) {
        case userConstants.ADD_FORM:
            let newState = { ...state }
            let prevFormData = _.get(newState, 'formData', []);

            if (_.isEmpty(prevFormData)) {
                prevFormData.push(action.formData)
            } else {
                prevFormData.push(action.formData)

            }

            return {
                ...state,
                formData: prevFormData,
                isAdded: true,

            };
        case userConstants.SUBMIT_FORM:

            return {
                ...state,
                formData: action.formData

            };
        default:
            return state
    }

}