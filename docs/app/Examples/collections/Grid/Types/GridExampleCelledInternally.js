import React from 'react'
import { Grid, Image } from 'semantic-ui-react'

const GridExampleCelledInternally = () => (
  <Grid celled='internally'>
    <Grid.Row>
      <Grid.Column width='three'>
        <Image src='http://semantic-ui.com/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column width={10}>
        <Image src='http://semantic-ui.com/images/wireframe/centered-paragraph.png' />
      </Grid.Column>
      <Grid.Column width='three'>
        <Image src='http://semantic-ui.com/images/wireframe/image.png' />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column width={3}>
        <Image src='http://semantic-ui.com/images/wireframe/image.png' />
      </Grid.Column>
      <Grid.Column width={10}>
        <Image src='http://semantic-ui.com/images/wireframe/paragraph.png' />
      </Grid.Column>
      <Grid.Column width={3}>
        <Image src='http://semantic-ui.com/images/wireframe/image.png' />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export default GridExampleCelledInternally
