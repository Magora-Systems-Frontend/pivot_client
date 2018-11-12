import * as React from "react";
import { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as autoBind from "react-autobind";
import Loader from "components/Loader";
import * as modalActions from "containers/Modal/actions";
import * as actions from "./actions";
import FormModal from 'components/modals/FormModal';
import ClassForm from 'components/ClassForm';

export interface ClassType {
  id: number,
  name: string,
}

interface StateProps {
  classes: ClassType[],
  isLoading: boolean,
}

interface DispatchProps {
  loadClasses: () => void,
  createClass: (Object) => void,
  updateClass: (id: number|string, data: Object) => void,
  showModal: (Object) => void,
}

type ClassProps = StateProps & DispatchProps

const ClassItem = styled.div`
  display: block;
  min-width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border: 1px solid;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Content = styled.div`
  margin: 20px 0;
`;

class Classes extends Component<ClassProps, {}> {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    const { loadClasses } = this.props;
    loadClasses();
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

  render() {
    const { classes, isLoading } = this.props;
    return (
      <div>
        <h3>Classes</h3>
        <button className="btn btn-default" type="button" disabled={isLoading} onClick={this.handleCreate}>New Class</button>
        <Loader isShow={isLoading}>
          <Content>
            {classes.map( classItem => (
              <ClassItem key={classItem.id} onClick={() => this.handleEdit(classItem)}>
                {classItem.name}
              </ClassItem>
            ))}
          </Content>
        </Loader>
      </div>
    );
  }
}

export default connect(({ classes }: any): StateProps => {
    return {
      classes: classes.items,
      isLoading: classes.isLoading,
    };
  },
  {
    loadClasses: actions.loadClasses,
    createClass: actions.createClass,
    updateClass: actions.updateClass,
    showModal: modalActions.showModal,
  },
)(Classes);


