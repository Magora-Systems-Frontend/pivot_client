import * as React from "react";
import { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as autoBind from "react-autobind";
import * as moment from "moment";
import * as modalActions from "containers/Modal/actions";
import * as actions from "containers/Classes/actions";
import FormModal from "components/modals/FormModal";
import ClassForm from "components/ClassForm";
import MoveClassForm from "components/MoveClassForm";

import { ClassCollectionType } from "containers/ClassCollections";
import { ClassType } from "containers/Classes";

interface OwnProps {
  classItem: ClassType,
  classCollections: ClassCollectionType[],
  selectedCollectionId?: number|string,
}

interface DispatchProps {
  updateClass: (id: number|string, data: Object) => void,
  showModal: (Object) => void,
  moveClass: (id: number|string, collectionId: number|string, newCollectionId?: number|string) => void,
}

type ClassProps = OwnProps & DispatchProps

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  min-height: 50px;
  line-height: 50px;
  text-align: center;
  border: 1px solid;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 5px 10px;
`;

const Content = styled.div`
  line-height: 30px;
  font-size: 14px;
`;

const EditButton = styled.div.attrs({
  className: 'fa fa-edit',
})`
  margin-left: 10px;
  cursor: pointer;
`;

class ClassItem extends Component<ClassProps, {}> {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleEdit(classItem) {
    const { updateClass, showModal } = this.props;
    showModal({
      Node: FormModal,
      options: {
        Form: ClassForm,
        onSubmit: (data) => updateClass(classItem.id, data),
        initialValues: classItem,
      },
      title: 'Update class',
    });
  }

  handleMove(classItem) {
    const { moveClass, classCollections, showModal, selectedCollectionId } = this.props;
    showModal({
      Node: FormModal,
      options: {
        Form: MoveClassForm,
        onSubmit: ({ collection }) => moveClass(classItem.id, collection, selectedCollectionId),
        collectionsOptions: classCollections.filter(({id}) => id !== selectedCollectionId).map(collection => ({ value: collection.id, label: collection.name})),
      },
      title: 'Update class',
    });
  }

  render() {
    const { classItem } = this.props;
    return (
      <Wrapper key={classItem.id}>
        <Content>
          <div>
            <span>{classItem.name}</span>
            <EditButton onClick={() => this.handleEdit(classItem)} />
          </div>
          <div>{classItem.date ? moment.unix(classItem.date).format("DD MMM YYYY") : null}</div>
        </Content>
        <button type="button" onClick={() => this.handleMove(classItem)} className="btn btn-sm btn-default">move</button>
      </Wrapper>
    );
  }
}

export default connect(null, {
    updateClass: actions.updateClass,
    moveClass: actions.moveClass,
    showModal: modalActions.showModal,
  },
)(ClassItem);


