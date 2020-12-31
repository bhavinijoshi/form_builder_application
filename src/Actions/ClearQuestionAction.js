import userConstants from "../constants/userConstants";

export default function ClearQuestionAction(questions) {

    return dispatch => {

        dispatch(
            { type: userConstants.CLEAR_QUESTIONS, questions}
        );
    }

}