import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import Loader from 'components/Loader';
import Classes from "../Classes";
import ClassCollections from "../ClassCollections";
import * as actions from "../Classes/actions";
import * as collectionsActions from "../ClassCollections/actions";

interface StateProps {
  isLoading: boolean,
}

interface DispatchProps {
  loadClasses: () => void,
  loadClassCollections: () => void,
}

class Home extends Component<StateProps & DispatchProps, {}> {

  componentDidMount() {
    const { loadClasses, loadClassCollections } = this.props;
    loadClasses();
    loadClassCollections();
  }

  render() {
    const { isLoading } = this.props;
    return (
      <div>
        <h1>Home page</h1>
        <div className="row">
          <Loader isShow={isLoading}>
            <div className="col-xs-12 col-md-3">
              <Classes />
            </div>
            <div className="col-xs-12 col-md-9">
              <ClassCollections />
            </div>
          </Loader>
        </div>
      </div>
    );
  }
}
export default connect(({ classes, classCollections }: any): StateProps => ({
      isLoading: classes.isLoading && classCollections.isLoading,
  }),{
    loadClasses: actions.loadClasses,
    loadClassCollections: collectionsActions.loadClassCollections,
  },
)(Home);
