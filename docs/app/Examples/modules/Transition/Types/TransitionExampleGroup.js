import _ from 'lodash'
import React, { Component } from 'react'
import { Button, Image, List, Transition } from 'semantic-ui-react'

const users = ['ade', 'chris', 'christian', 'daniel', 'elliot', 'helen']

export default class TransitionExampleGroup extends Component {
  state = { items: users.slice(0, 3) }

  handleAdd = () => this.setState({ items: users.slice(0, this.state.items.length + 1) })

  handleRemove = () => this.setState({ items: this.state.items.slice(0, -1) })

  render() {
    const { items } = this.state

    return (
      <div>
        <Button.Group>
          <Button icon='minus' onClick={this.handleRemove} disabled={items.length === 0} />
          <Button icon='plus' onClick={this.handleAdd} disabled={items.length === users.length} />
        </Button.Group>

        <Transition.Group
          as={List}
          duration={200}
          divided
          size='huge'
          verticalAlign='middle'
        >
          {items.map(item => (
            <List.Item key={item}>
              <Image avatar src={`/assets/images/avatar/small/${item}.jpg`} />
              <List.Content header={_.startCase(item)} />
            </List.Item>
          ))}
        </Transition.Group>
      </div>
    )
  }
}
