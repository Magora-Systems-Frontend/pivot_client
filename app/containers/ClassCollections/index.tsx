import * as React from "react";
import { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as autoBind from "react-autobind";
import * as actions from "./actions";
import Loader from "components/Loader";
import { ClassType } from 'containers/Classes';

interface ClassCollectionType {
  id: number,
  name: string,
  classes: ClassType[],
}

interface StateProps {
  classCollections: ClassCollectionType[],
  isLoading: boolean,
}

interface DispatchProps {
  loadClassCollections: () => void,
  createClassCollection: (Object) => void,
}

type ClassCollectionProps = StateProps & DispatchProps

const ClassCollection = styled.div`
  display: inline-block;
  width: 200px;
  text-align: center;
  border: 1px solid;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 20px;
`;

const CollectionItem = styled.div`
  height: 30px;
  border: 1px solid;
  width: 100%;
  margin: 10px 0;
`;

const Content = styled.div`
  margin: 20px 0;
`;

class ClassCollections extends Component<ClassCollectionProps, {}> {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    const { loadClassCollections } = this.props;
    loadClassCollections();
  }

  handleCreate() {
    const { createClassCollection } = this.props;
    createClassCollection({
      name: 'test',
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
                <h3>
                  {collection.name}
                </h3>
                {collection.classes.map(classItem => (
                  <CollectionItem>
                    {classItem.name}
                  </CollectionItem>
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
    loadClassCollections: actions.loadClassCollections,
    createClassCollection: actions.createClassCollection,
  },
)(ClassCollections);


