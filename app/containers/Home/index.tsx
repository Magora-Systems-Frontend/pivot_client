import * as React from "react";
import { Component } from "react";
import Classes from "../Classes";
import ClassCollections from "../ClassCollections";
import * as actions from '../Classes/actions';
import * as collectionsActions from '../ClassCollections/actions';
import { connect } from 'react-redux';

interface DispatchProps {
  loadClasses: () => void,
  loadClassCollections: () => void,
}

class Home extends Component<DispatchProps, {}> {

  componentDidMount() {
    const { loadClasses, loadClassCollections } = this.props;
    loadClasses();
    loadClassCollections();
  }

  render() {
    return (
      <div>
        <h1>Home page</h1>
        <div className="row">
          <div className="col-xs-12 col-md-3">
            <Classes />
          </div>
          <div className="col-xs-12 col-md-9">
            <ClassCollections />
          </div>
        </div>
      </div>
    );
  }
}
export default connect(null,{
    loadClasses: actions.loadClasses,
    loadClassCollections: collectionsActions.loadClassCollections,
  },
)(Home);
