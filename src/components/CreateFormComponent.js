import React from 'react';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddQuestionModelComponent from "./AddQuestionModelComponent";
import AppBarComponent from "./AppBarComponent";
import DisplayFormComponent from "./DisplayFormComponent";
import _ from "lodash";
import { AddFormAction } from "../Actions/AddFormAction";
import ClearQuestionAction from "../Actions/ClearQuestionAction";
import { history } from "../helpers/history";
import Grid from '@material-ui/core/Grid';
import moment from "moment";

class CreateFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            formName: '',
            open: false,

        }
    }
    // handleClickOpen():This function is used for open question model
    handleClickOpen = () => {
        this.setState({ open: true })
        this.child.resetForm()
    };
    // handleClose():This function is used for close question model
    handleClose = () => {
        this.setState({ open: false })
        this.child.resetForm()
    };
    //handleSave():This function is used for save form in store
     handleSave = () => {

        var formObj = {
            formName: this.state.formName,
            feild: this.props.QuestionReducer.questions.questions,
            createAt: moment().format('DD-MM-YYYY HH:MM'),
            formUrl: 'http://localhost:3000/form/' + this.state.formName,
            totalResponse: 0
        }

        this.setState({ formName: '' })
        this.props.AddFormAction(formObj);
        this.child.clearQuestion()
        this.props.ClearQuestionAction([])
        history.push("/");

    }
    render() {
        let disply_questions = _.get(this, ['props', 'QuestionReducer', 'questions', 'questions'], []);
        return (
            <React.Fragment>
                <AppBarComponent title="Create Form" />
                <Grid className="main-container">
                    <Grid className="form-txt">

                        <TextField
                            id="formName"
                            label="Form Name*"
                            name="formName"
                            value={this.state.formName}
                            placeholder="Enter a form name"
                            onChange={(e) => { this.setState({ formName: e.target.value }) }}
                            autoFocus
                        />

                        <Grid className="row add-ques-btn">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleClickOpen}
                            >
                                Add Question
                                </Button>
                        </Grid>
                    </Grid>
                </Grid>
                {disply_questions.length ?
                    <Grid className="sub-container">
                        <DisplayFormComponent
                            formName={this.state.formName}
                        />

                        <Grid className="row save-btn">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleSave}
                                disabled={this.state.formName ? false : true}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid> : ''}
                <AddQuestionModelComponent
                    open={this.state.open}
                    handleClose={this.handleClose}
                    childRef={ref => (this.child = ref)}
                />

            </React.Fragment>
        )
    }
}
function mapState(state) {
    return state
}
const actionCreators = {
    AddFormAction: AddFormAction,
    ClearQuestionAction: ClearQuestionAction
};

export default connect(mapState, actionCreators)(CreateFormComponent)