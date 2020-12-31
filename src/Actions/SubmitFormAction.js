import userConstants from "../constants/userConstants";

export const SubmitFormAction=(formData)=> {
    return{
        type: userConstants.SUBMIT_FORM, formData
    }
}