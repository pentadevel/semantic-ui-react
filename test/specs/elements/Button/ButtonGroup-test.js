import React from 'react'

import ButtonGroup from 'src/elements/Button/ButtonGroup'
import { SUI } from 'src/lib'
import * as common from 'test/specs/commonTests'

describe('ButtonGroup', () => {
  common.isConformant(ButtonGroup)
  common.hasUIClassName(ButtonGroup)
  common.rendersChildren(ButtonGroup)

  common.implementsWidthProp(ButtonGroup, SUI.WIDTHS, {
    canEqual: false,
    propKey: 'widths',
    widthClass: 'buttons',
  })

  common.propKeyAndValueToClassName(ButtonGroup, 'floated', SUI.FLOATS)

  common.propKeyOnlyToClassName(ButtonGroup, 'basic')
  common.propKeyOnlyToClassName(ButtonGroup, 'compact')
  common.propKeyOnlyToClassName(ButtonGroup, 'fluid')
  common.propKeyOnlyToClassName(ButtonGroup, 'icon')
  common.propKeyOnlyToClassName(ButtonGroup, 'inverted')
  common.propKeyOnlyToClassName(ButtonGroup, 'labeled')
  common.propKeyOnlyToClassName(ButtonGroup, 'negative')
  common.propKeyOnlyToClassName(ButtonGroup, 'positive')
  common.propKeyOnlyToClassName(ButtonGroup, 'primary')
  common.propKeyOnlyToClassName(ButtonGroup, 'secondary')
  common.propKeyOnlyToClassName(ButtonGroup, 'toggle')
  common.propKeyOnlyToClassName(ButtonGroup, 'vertical')

  common.propKeyOrValueAndKeyToClassName(ButtonGroup, 'attached', [
    'left',
    'right',
    'top',
    'bottom',
  ])

  common.propValueOnlyToClassName(ButtonGroup, 'color', SUI.COLORS)
  common.propValueOnlyToClassName(ButtonGroup, 'size', SUI.SIZES)

  describe('buttons', () => {
    it('renders shorthand collection', () => {
      const wrapper = shallow(<ButtonGroup buttons={['one', 'two']} />)
      const buttons = wrapper.children()

      expect(wrapper.find('Button')).toHaveLength(2)
      expect(buttons.at(0).prop('content')).toBe('one')
      expect(buttons.at(1).prop('content')).toBe('two')
    })
  })
})
