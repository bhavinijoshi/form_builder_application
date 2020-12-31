import userConstants from "../constants/userConstants";
export default function QuestionReducer(state = {}, action) {
    switch (action.type) {
        case userConstants.ADD_QUESTIONS:
            return {
                questions: action
            };
            case userConstants.CLEAR_QUESTIONS:
                return {
                    questions: action
                };
        default:
            return state
    }

}