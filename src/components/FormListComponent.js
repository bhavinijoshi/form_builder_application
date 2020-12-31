import React from 'react';
import { connect } from "react-redux";
import PropTypes, { func } from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import _ from "lodash";
import { history } from "../helpers/history";

const styles = theme => ({
  table: {
    minWidth: 650,
  },
 
});
class FormListComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const classes = this.props;
   
    let formData = _.get(this,['props','formData'],[])

    function createData(no, formName, formUrl, createAt, totalResponse) {
      return { no, formName, formUrl, createAt, totalResponse };
    }

    let rows = [];
    if (formData && formData.length) {
      formData.map((value, key) => {
        var result = createData(key + 1, value.formName, value.formUrl, value.createAt, value.totalResponse);
        rows.push(result)
      })
    }

    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="right">Form Name</TableCell>
              <TableCell align="right">Form URL</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Total Responses</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.no}
                </TableCell>
                <TableCell align="right">{row.formName}</TableCell>
                <TableCell align="right"><a onClick={e=>{history.push("/form/"+row.formName)}} className="cursor-pointer">{row.formUrl}</a></TableCell>
                <TableCell align="right">{row.createAt}</TableCell>
                <TableCell align="right">{row.totalResponse}</TableCell>
              </TableRow>
            ))}
            {rows.length ? '' :
              <div className="center-txt">no record found</div>
            }
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
const mapStateToProps = state => {
  return state.FormReducer
}

FormListComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(withStyles(styles)(FormListComponent))
