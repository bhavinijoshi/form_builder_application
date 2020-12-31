import userConstants from "../constants/userConstants";

export default function AddQuestionAction(questions) {

    return dispatch => {

        dispatch(
            { type: userConstants.ADD_QUESTIONS, questions}
        );
    }

}