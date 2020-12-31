import './App.css';
import React from 'react';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import FormListComponent from "./components/FormListComponent";
import { history } from "./helpers/history";
import _ from "lodash";

class App extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Create your own forms
          </p>
          <Button style={{ "marginBottom": "15px" }} variant="contained" color="primary" onClick={e => { history.push('/createform') }}>
            START A NEW FORM
      </Button>
        </header>
        <FormListComponent formData={_.get(this, ['props', 'FormReducer', 'formData'], [])} />

      </div>
    );
  }
}
const mapStateToProps = state => {
  return state
}
export default connect(mapStateToProps)(App)
