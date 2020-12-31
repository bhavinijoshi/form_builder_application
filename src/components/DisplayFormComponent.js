import React from 'react';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import PropTypes, { func } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import enums from "../constants/enums";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import _ from "lodash";

class DisplayFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
    }

    render() {

        let disply_questions = _.get(this, ['props', 'questions', 'questions'], []);

        return (
            <React.Fragment>

                <div className="row">

                    <div className="col-12 col-lg-4 login-card mt-2 hv-center">
                        <form>
                            {disply_questions.length ?
                                disply_questions.map((value, key) => {
                                    return (

                                        (value.question_type == enums.answerType[0].id ?
                                            <Grid className="form-group text-left question-section">
                                                <TextField
                                                    className="input-control"
                                                    id={"text-" + key}
                                                    label={value.question_label}
                                                    name={"text-" + key}
                                                />
                                            </Grid>
                                            :
                                            (value.question_type == enums.answerType[1].id ?
                                                <Grid className="form-group text-left question-section" >
                                                    <FormGroup className="multichoice-control">
                                                        <FormLabel component="legend"  >{value.question_label}</FormLabel>
                                                        <Grid >
                                                            {value.options.map((value1, key1) => {
                                                                return (

                                                                    <FormControlLabel

                                                                        control={
                                                                            <Checkbox
                                                                                //   checked={state.checkedB}
                                                                                //   onChange={handleChange}
                                                                                name="checkedB"
                                                                                color="primary"
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
                                                    <Grid className="form-group text-left question-section">
                                                        <FormGroup className="multichoice-control">
                                                            <FormLabel style={{ "display": "inline" }} component="legend">{value.question_label}</FormLabel>
                                                            <RadioGroup aria-label="gender" name="gender1"
                                                            //  value={value} onChange={handleChange}
                                                            >

                                                                {value.options.map((value1, key1) => {
                                                                    return (
                                                                        <FormControlLabel value={value1.value} control={<Radio color="primary" />} label={value1.value} />

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
                        </form>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return state.QuestionReducer
}
export default connect(mapStateToProps)(DisplayFormComponent)