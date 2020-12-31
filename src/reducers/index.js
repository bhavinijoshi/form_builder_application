import { combineReducers } from 'redux';
import QuestionReducer from "./QuestionReducer";
import FormReducer from "./FormReducer";

const rootReducer = combineReducers({
    FormReducer,
    QuestionReducer
});

export default rootReducer;