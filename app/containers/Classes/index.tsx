import * as React from "react";
import { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import * as autoBind from "react-autobind";
import * as actions from "./actions";
import Loader from "components/Loader";

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
}

type ClassProps = StateProps & DispatchProps

const ClassItem = styled.div`
  display: inline-block;
  width: 200px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  border: 1px solid;
  margin-right: 10px;
  margin-bottom: 10px;
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
    const { createClass } = this.props;
    createClass({
      name: 'test',
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
              <ClassItem key={classItem.id}>
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
  },
)(Classes);


