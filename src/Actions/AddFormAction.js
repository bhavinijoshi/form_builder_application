import userConstants from "../constants/userConstants";

export const AddFormAction=(formData)=> {
    return{
        type: userConstants.ADD_FORM, formData
    }
}