import React, { Component } from 'react'
import { Button, Icon, Modal } from 'stardust'

class ModalSizeExample extends Component {
  state = { open: false }

  show = (size) => () => this.setState({ size, open: true })
  hide = () => this.setState({ open: false })

  render() {
    const { open, size } = this.state

    return (
      <div>
        <Button onClick={this.show('small')}>Small</Button>
        <Button onClick={this.show('large')}>Large</Button>
        <Button onClick={this.show('fullscreen')}>Fullscreen</Button>

        <Modal size={size} portal={{ open }} onHide={this.hide}>
          <Modal.Header>
            Delete Your Account
          </Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative>
              No
            </Button>
            <Button positive icon labeled='right'>
              Yes <Icon name='checkmark' />
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default ModalSizeExample
