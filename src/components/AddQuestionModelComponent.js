import React from 'react';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import PropTypes, { func } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import enums from "../constants/enums";
import _ from "lodash";
import AddQuestionAction from "../Actions/AddQuestionAction";
let classes;
const styles = theme => ({
    title: {
        flexGrow: 1,
    },
    formControl: {
        margin: 8,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: 16,
    },
});
class AddQuestionModelComponent extends React.Component {
    constructor(props) {
        super(props);
        const { childRef } = this.props;
        childRef(this);
        this.state = {
            title: '',
            answerType: '',
            questions: [],
            options: [{ "label": 'option-0', "value": "" }],
            error: {},
            errorMessage: {},
        }
    }
    componentDidMount() {
    }
    // modelValidation(): This function is used for question model validation
    modelValidation() {
        const { title, answerType, options, error, errorMessage } = this.state;
        if (title == '') {
            error['title'] = true;
            errorMessage['title'] = 'Please enter question / title';
        } else {
            delete error['title'];
            delete errorMessage['title'];
        }

        if (answerType == '') {
            error['answerType'] = true;
            errorMessage['answerType'] = 'Please select answerType';
        } else {
            delete error['answerType'];
            delete errorMessage['answerType'];
        }

        if (!_.isEmpty(error)) {
            this.setState({ error, errorMessage });
            return false;
        }
        else {
            return true;
        }

    }
    // handleSave(): This function is used for save model question data
    handleSave = () => {
        let { questions } = this.state;
        let questionObj = {}
        if (this.state.answerType == enums.answerType[0].id) {
            questionObj = {
                question_label: this.state.title,
                question_type: this.state.answerType,

            }
        } else {
            questionObj = {
                question_label: this.state.title,
                question_type: this.state.answerType,
                options: this.state.options
            }
        }

        var ismodelValid = this.modelValidation()
        if (ismodelValid) {
            questions.push(questionObj);
            this.setState({ questions })
            this.props.handleClose()
            this.props.AddQuestionAction(questions);
        }

    }
    handleOnChange = (e) => {
        const { error, errorMessage } = this.state;
        var name = e.target.name;

        delete error[name];
        delete errorMessage[name];

        this.setState({ [name]: e.target.value, error, errorMessage })
    }
    // appendInput():This function is used for add more option in question model when type is chechbox / radio button
    appendInput() {
        var options = this.state.options
        var optionLength = options.length
        var label = 'option-' + (optionLength++)
        options.push({ "label": label })
        this.setState({ options: options })
    }
    handleOptionChanges = (e, label) => {
        let { options } = this.state;

        var index = options.findIndex(x => x.label == label);
        options[index].value = e.target.value

        this.setState({ options: options })
    }
    // clearQuestion()=This function clear all questions
    clearQuestion = () => {
        this.setState({ questions: [] })
    }
    // resetForm():This function is used for reset form
    resetForm() {
        this.setState({
            title: '',
            answerType: '',
            options: [{ "label": 'option-0' }]
        })
    }
    render() {
        const { classes } = this.props;
        const { error, errorMessage } = this.state;
        return (

            <React.Fragment>
                <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title" fullWidth>
                    <DialogTitle id="form-dialog-title">Add Question </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        </DialogContentText>
                        <FormControl fullWidth className={classes.formControl}>
                            <TextField
                                margin="dense"
                                id="question"
                                name="title"
                                label="Question / Title*"
                                fullWidth
                                placeholder="Question / Title"
                                value={this.state.title}
                                onChange={e => { this.handleOnChange(e) }}
                                error={error.title}
                                helperText={errorMessage.title}
                                autoFocus
                            />
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label" error={error.answerType}>Answer Type*</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="answerType"
                                value={this.state.answerType}
                                onChange={e => { this.handleOnChange(e) }}
                                error={error.answerType}
                            >
                                {enums.answerType.map((value, key) => {
                                    return (
                                        <MenuItem value={value.id} key={key}>{value.type}</MenuItem>
                                    )
                                })}
                            </Select>
                            {error.answerType ?
                                <div className="error-validation">{errorMessage.answerType}</div>
                                : ''}

                        </FormControl>

                        {this.state.answerType == enums.answerType[1].id || this.state.answerType == enums.answerType[2].id ?
                            (this.state.options.map((value, key) => {
                                return (
                                    <FormControl fullWidth className={classes.formControl}>
                                        <TextField
                                            key={key}
                                            margin="dense"
                                            id={value.label}
                                            name={value.label}
                                            label={value.label}
                                            fullWidth
                                            onChange={e => { this.handleOptionChanges(e, value.label) }}
                                        />
                                    </FormControl>
                                )
                            }))
                            : ''}

                        {this.state.answerType == enums.answerType[1].id || this.state.answerType == enums.answerType[2].id ?
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => this.appendInput()}
                            >
                                Add other
                        </Button>
                            : ''}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleSave} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        )
    }
}
function mapStateToProps(state) {
    return state
}

const actionCreators = {
    AddQuestionAction: AddQuestionAction,
};

AddQuestionModelComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, actionCreators)(withStyles(styles)(AddQuestionModelComponent))