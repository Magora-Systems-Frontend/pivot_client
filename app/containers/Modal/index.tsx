import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import { Modal } from 'react-bootstrap';
import * as modalActions from './actions';

interface ModalProps {
  title?: string,
  hide: () => void,
  options?: object,
}

interface StateProps {
  isShow: boolean,
  title?: string,
  Node: React.ComponentClass<ModalProps>,
  options: object,
}

interface DispatchProps {
  hideModal: () => void,
}

class ModalComponent extends React.Component<StateProps & DispatchProps, {}> {

  render() {
    const {
      Node, options, title, isShow, hideModal,
    } = this.props;
    return (
      <React.Fragment>
        <Modal show={isShow} onHide={hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {Boolean(Node) && (
              <Node
                hide={hideModal}
                title={title}
                options={options}
              />
            )}
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default connect(({ modal }: any): StateProps => modal,
  {
    hideModal: modalActions.hideModal,
  },
)(ModalComponent);
