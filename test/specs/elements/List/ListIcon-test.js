import React from 'react'

import Icon from 'src/elements/Icon/Icon'
import ListIcon from 'src/elements/List/ListIcon'
import * as common from 'test/specs/commonTests'

describe('ListIcon', () => {
  common.isConformant(ListIcon)
  common.implementsVerticalAlignProp(ListIcon)

  describe('children', () => {
    it('returns an Icon', () => {
      expect(shallow(<ListIcon />).find(Icon)).toHaveLength(1)
    })
  })
})
