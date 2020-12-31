import QuestionReducer from './QuestionReducer';
describe('QuestionReducer', () => {
    it('should return the initial state', () => {
      expect(QuestionReducer({},{type:'demo'})).toEqual({});
    });
    it('should return the questions', () => {
        expect(QuestionReducer({},{"type":"ADD_QUESTIONS","questions":[{"question_label":"dsds","question_type":1}]})).toEqual({"questions":{"type":"ADD_QUESTIONS","questions":[{"question_label":"dsds","question_type":1}]}});
    });
    it('should handle CLEAR_QUESTIONS', () => {
      expect(QuestionReducer({},{"type":"CLEAR_QUESTIONS","questions":[]})).toEqual({"questions":{"type":"CLEAR_QUESTIONS","questions":[]}});
  });
});



