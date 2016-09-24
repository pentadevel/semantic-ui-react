import React from 'react'
import { Message } from 'stardust'
import ExampleSection from 'docs/app/Components/ComponentDoc/ExampleSection'
import ComponentExample from 'docs/app/Components/ComponentDoc/ComponentExample'

const Variations = () => {
  return (
    <ExampleSection title='Variations'>
      <ComponentExample
        title='Single Line'
        description='A table can specify that its cell contents should remain on a single line, and not wrap'
        examplePath='collections/Table/Variations/TableSingleLine'
      />

      <ComponentExample
        title='Fixed'
        description={
        [
          'A table can use fixed a special faster form of table rendering that does not resize table cells based on',
          'content',
        ].join(' ')
        }
        examplePath='collections/Table/Variations/TableFixed'
      />
      <ComponentExample examplePath='collections/Table/Variations/TableFixedLine'>
        <Message info>
          Fixed "single line" tables will automatically ensure content that does not fit in a single line will receive
          "..." ellipsis
        </Message>
      </ComponentExample>

      <ComponentExample
        title='Stacking'
        description='A table can specify how it stacks table content responsively'
        examplePath='collections/Table/Variations/TableUnstackable'
      />
      <ComponentExample examplePath='collections/Table/Variations/TableStackable' />

      <ComponentExample
        title='Selectable Row'
        description='A table can have its rows appear selectable'
        examplePath='collections/Table/Variations/TableSelectable'
      />
      <ComponentExample examplePath='collections/Table/Variations/TableSelectableInverted' />

      <ComponentExample
        title='Vertical Alignment'
        description='A table header, row or cell can adjust its vertical alignment'
        examplePath='collections/Table/Variations/TableVerticalAlign'
      />

      <ComponentExample
        title='Text Alignment'
        description='A table header, row, or cell can adjust its text alignment'
        examplePath='collections/Table/Variations/TableTextAlign'
      />

      <ComponentExample
        title='Striped'
        description='A table can stripe alternate rows of content with a darker color to increase contrast'
        examplePath='collections/Table/Variations/TableStriped'
      />

      <ComponentExample
        title='Celled'
        description='A table may be divided each row into separate cells'
        examplePath='collections/Table/Variations/TableCelled'
      />

      <ComponentExample
        title='Basic'
        description='A table can reduce its complexity to increase readability'
        examplePath='collections/Table/Variations/TableBasic'
      />
      <ComponentExample examplePath='collections/Table/Variations/TableVeryBasic' />

      <ComponentExample
        title='Collapsing Cell'
        description='A cell can be collapsing so that it only uses as much space as required'
        examplePath='collections/Table/Variations/TableCollapsingCell'
      />

      <ComponentExample
        title='Column Count'
        description='A table can specify its column count to divide its content evenly'
        examplePath='collections/Table/Variations/TableColumnCount'
      />

      <ComponentExample
        title='Column Width'
        description='A table can specify the width of individual columns independently'
        examplePath='collections/Table/Variations/TableColumnWidth'
      />

      <ComponentExample
        title='Collapsing'
        description='A table can be collapsing, taking up only as much space as its rows'
        examplePath='collections/Table/Variations/TableCollapsing'
      />

      <ComponentExample
        title='Colored'
        description='A table can be given a color to distinguish it from other table'
        examplePath='collections/Table/Variations/TableColors'
      />

      <ComponentExample
        title='Inverted'
        description="A table's colors can be inverted"
        examplePath='collections/Table/Variations/TableInverted'
      />
      <ComponentExample examplePath='collections/Table/Variations/TableInvertedColors' />
    </ExampleSection>
  )
}

export default Variations
