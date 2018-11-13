import * as React from "react";
import { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as autoBind from "react-autobind";
import Loader from "components/Loader";
import * as modalActions from "containers/Modal/actions";
import * as actions from "./actions";
import FormModal from "components/modals/FormModal";
import ClassForm from "components/ClassForm";

import { ClassCollectionType } from "containers/ClassCollections";
import ClassItem from "components/ClassItem";

export interface ClassType {
  id: number,
  name: string,
}

interface StateProps {
  classes: ClassType[],
  classCollections: ClassCollectionType[],
  isLoading: boolean,
}

interface DispatchProps {
  createClass: (Object) => void,
  showModal: (Object) => void,
}

type ClassProps = StateProps & DispatchProps

const Content = styled.div`
  margin: 20px 0;
`;

class Classes extends Component<ClassProps, {}> {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCreate() {
    const { createClass, showModal } = this.props;
    showModal({
      Node: FormModal,
      options: {
        Form: ClassForm,
        onSubmit: createClass,
      },
      title: 'Create class',
    });
  }

  render() {
    const { classes, isLoading, classCollections } = this.props;
    return (
      <div>
        <h3>Classes</h3>
        <button className="btn btn-default" type="button" disabled={isLoading} onClick={this.handleCreate}>New Class</button>
        <Loader isShow={isLoading}>
          <Content>
            {classes.map( classItem => (
              <ClassItem classItem={classItem} key={classItem.id} classCollections={classCollections} />
            ))}
          </Content>
        </Loader>
      </div>
    );
  }
}

export default connect(({ classes, classCollections }: any): StateProps => {
    return {
      classes: classes.items,
      classCollections: classCollections.items,
      isLoading: classes.isLoading && classCollections.isLoading,
    };
  },
  {
    createClass: actions.createClass,
    showModal: modalActions.showModal,
  },
)(Classes);


