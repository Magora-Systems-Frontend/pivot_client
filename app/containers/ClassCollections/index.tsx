import * as React from "react";
import { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as autoBind from "react-autobind";
import Loader from "components/Loader";
import { ClassType } from "containers/Classes";
import FormModal from "components/modals/FormModal";
import ClassCollectionForm from "components/ClassCollectionForm";
import * as modalActions from "containers/Modal/actions";
import * as actions from "./actions";
import ClassItem from "components/ClassItem";

export interface ClassCollectionType {
  id: number,
  name: string,
  classes: ClassType[],
}

interface StateProps {
  classCollections: ClassCollectionType[],
  isLoading: boolean,
}

interface DispatchProps {
  createClassCollection: (data: object) => void,
  updateClassCollection: (id: number|string, data: object) => void,
  showModal: (config: object) => void,
}

const ClassCollection = styled.div`
  display: inline-block;
  width: 250px;
  text-align: center;
  border: 1px solid;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 20px;
`;

const Content = styled.div`
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.h3`
  cursor: pointer;
`;

class ClassCollections extends Component<StateProps & DispatchProps, {}> {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleCreate() {
    const { createClassCollection, showModal } = this.props;
    showModal({
      Node: FormModal,
      options: {
        Form: ClassCollectionForm,
        onSubmit: createClassCollection,
      },
      title: 'Create class collection',
    });
  }

  handleEdit(classCollection) {
    const { updateClassCollection, showModal } = this.props;
    showModal({
      Node: FormModal,
      options: {
        Form: ClassCollectionForm,
        onSubmit: (data) => updateClassCollection(classCollection.id, data),
        initialValues: classCollection,
      },
      title: 'Update class',
    });
  }

  render() {
    const { classCollections, isLoading } = this.props;
    return (
      <div>
        <h3>Collections</h3>
        <button className="btn btn-default" type="button" disabled={isLoading} onClick={this.handleCreate}>New Collection</button>
        <Loader isShow={isLoading}>
          <Content>
            {classCollections.map( collection => (
              <ClassCollection key={collection.id}>
                <Title onClick={() => this.handleEdit(collection)}>
                  {collection.name}
                </Title>
                {collection.classes.map(classItem => (
                  <ClassItem classItem={classItem} disableEdit key={classItem.id} classCollections={classCollections} selectedCollectionId={collection.id} />
                ))}
              </ClassCollection>
            ))}
          </Content>
        </Loader>
      </div>
    );
  }
}

export default connect(({ classCollections }: any): StateProps => {
    return {
      classCollections: classCollections.items,
      isLoading: classCollections.isLoading,
    };
  },
  {
    createClassCollection: actions.createClassCollection,
    updateClassCollection: actions.updateClassCollection,
    showModal: modalActions.showModal,
  },
)(ClassCollections);


