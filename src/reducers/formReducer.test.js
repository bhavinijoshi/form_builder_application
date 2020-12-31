import FormReducer from "./FormReducer";

describe('FormReducer', () => {
  it('should return the initial state', () => {
    expect(FormReducer({},{type:'demo'})).toEqual({});
  });
  it('should handle ADD_FORM', () => {
    expect(FormReducer({},
      {"type":"ADD_FORM","formData":{"formName":"PersonalDetail","feild":[{"question_label":"Name","question_type":1}],"createAt":"30-12-2020 21:12","formUrl":"http://localhost:3000/form/PersonalDetail","totalResponse":0}})).toEqual({"formData":[{"formName":"PersonalDetail","feild":[{"question_label":"Name","question_type":1}],"createAt":"30-12-2020 21:12","formUrl":"http://localhost:3000/form/PersonalDetail","totalResponse":0}],"isAdded":true});
  });
  it('should handle SUBMIT_FORM', () => {
    expect(FormReducer({},
      {"type":"SUBMIT_FORM",
      "formData":[{"formName":"PersonalDetail",
      "feild":[{"question_label":"Name","question_type":1}],
      "createAt":"30-12-2020 21:12","formUrl":"http://localhost:3000/form/PersonalDetail","totalResponse":0}]})).toEqual({"formData":[{"formName":"PersonalDetail","feild":[{"question_label":"Name","question_type":1}],"createAt":"30-12-2020 21:12","formUrl":"http://localhost:3000/form/PersonalDetail","totalResponse":0}]});
  });
});