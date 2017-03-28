import React from 'react'
import { Button, Modal } from 'semantic-ui-react'

const ModalShorthandExample = () => (
  <Modal trigger={<Button>Show Modal</Button>}
    header='Delete Your Account'
    content='Are you sure you want to delete your account'
    actions={[
      { content: 'No', color: 'red', triggerClose: true },
      { content: 'Yes', color: 'green', triggerClose: true },
    ]}
  />
)

export default ModalShorthandExample
