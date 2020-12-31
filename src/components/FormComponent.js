import React from 'react';
import { connect } from "react-redux";
import enums from "../constants/enums";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Grid from '@material-ui/core/Grid';
import AppBarComponent from "./AppBarComponent";
import _ from "lodash";
import { history } from "../helpers/history";
import { SubmitFormAction } from "../Actions/SubmitFormAction";

class FormComponent extends React.Component {
    constructor(props) {
        super(props);
        let formData = _.get(this, ['props', 'formData'], []);
        let formName = this.props.match.params.formName;
        var form = formData.filter(x => x.formName == formName);
        form = form[0];
        this.state = {
            submitFormData: {},
            formData: formData,
            form: form,
        }
    }

    componentDidMount() {
    }
    // handleOnChange(): This function is handle feild change
    handleOnChange(e) {
        let { submitFormData } = this.state;
        if (e.target.type == 'checkbox') {
            submitFormData[e.target.name] = e.target.checked
        } else {
            submitFormData[e.target.name] = e.target.value
        }
        this.setState({ submitFormData });
    }
    // handleSubmit(): This function is store form data into localstorage
    handleSubmit(obj) {
        localStorage.setItem(this.state.form.formName, JSON.stringify(this.state.submitFormData))
        let { formData, form } = this.state
        let index = formData.findIndex(x => x.formName == obj.formName);

        form = formData.filter(x => x.formName == obj.formName);
        form = form[0];

        form.totalResponse = form.totalResponse + 1;

        formData[index] = form;

        this.props.SubmitFormAction(formData);
        history.push("/")
    }

    render() {

        const { formData, form } = this.state

        return (
            <React.Fragment>
                <AppBarComponent title={form.formName} />
                <div className="row mr-l-24">

                    <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
                        <form>
                            {form.feild.length ?
                                form.feild.map((value, key) => {
                                    return (

                                        (value.question_type == enums.answerType[0].id ?
                                            <Grid className="form-group text-left">
                                                <TextField
                                                    className="form-control"
                                                    id={"text-" + key}
                                                    label={value.question_label}
                                                    name={"text-" + key}
                                                    onChange={e => { this.handleOnChange(e) }}
                                                />
                                            </Grid>
                                            :
                                            (value.question_type == enums.answerType[1].id ?
                                                <Grid className="form-group text-left" >
                                                    <FormGroup className="">
                                                        <FormLabel component="legend"  >{value.question_label}</FormLabel>
                                                        <Grid >
                                                            {value.options.map((value1, key1) => {
                                                                return (

                                                                    <FormControlLabel

                                                                        control={
                                                                            <Checkbox
                                                                                name={value1.value}
                                                                                color="primary"
                                                                                onChange={e => { this.handleOnChange(e) }}
                                                                            />
                                                                        }
                                                                        label={value1.value}
                                                                    />

                                                                )
                                                            })}
                                                        </Grid>
                                                    </FormGroup>
                                                </Grid>
                                                :
                                                (value.question_type == enums.answerType[2].id ?
                                                    <Grid className="form-group text-left">
                                                        <FormGroup className="">
                                                            <FormLabel style={{ "display": "inline" }} component="legend">{value.question_label}</FormLabel>
                                                            <RadioGroup aria-label="gender" name="gender1"
                                                                onChange={e => { this.handleOnChange(e) }}
                                                            >

                                                                {value.options.map((value1, key1) => {
                                                                    return (
                                                                        <FormControlLabel value={value1.value}
                                                                            control={<Radio color="primary" />} label={value1.value} />

                                                                    )
                                                                })}
                                                            </RadioGroup>
                                                        </FormGroup>
                                                    </Grid>
                                                    :
                                                    ''))
                                        )

                                    )
                                })

                                : ''}
                            <Grid className="form-group text-left">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={(e) => { this.handleSubmit(form) }}
                                >
                                    Submit
                                 </Button>
                            </Grid>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
function mapStateToProps(state) {
    return state.FormReducer
}
const actionCreators = {
    SubmitFormAction: SubmitFormAction
};

export default connect(mapStateToProps, actionCreators)(FormComponent)