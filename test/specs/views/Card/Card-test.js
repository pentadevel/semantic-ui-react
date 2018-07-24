import faker from 'faker'
import React from 'react'

import { SUI } from 'src/lib'
import Card from 'src/views/Card/Card'
import CardContent from 'src/views/Card/CardContent'
import CardDescription from 'src/views/Card/CardDescription'
import CardGroup from 'src/views/Card/CardGroup'
import CardHeader from 'src/views/Card/CardHeader'
import CardMeta from 'src/views/Card/CardMeta'
import * as common from 'test/specs/commonTests'

describe('Card', () => {
  common.isConformant(Card)
  common.hasSubcomponents(Card, [CardContent, CardDescription, CardGroup, CardHeader, CardMeta])
  common.hasUIClassName(Card)
  common.rendersChildren(Card)

  common.propKeyOnlyToClassName(Card, 'centered')
  common.propKeyOnlyToClassName(Card, 'fluid')
  common.propKeyOnlyToClassName(Card, 'link')
  common.propKeyOnlyToClassName(Card, 'raised')

  common.propValueOnlyToClassName(Card, 'color', SUI.COLORS)

  it('renders a <div> by default', () => {
    expect(shallow(<Card />).type()).toBe('div')
  })

  describe('href', () => {
    it('renders an <a> with an href attr', () => {
      const url = faker.internet.url()
      const wrapper = shallow(<Card href={url} />)

      expect(wrapper.type()).toBe('a')
      expect(wrapper.prop('href')).toBe(url)
    })
  })

  describe('onClick', () => {
    it('renders <a> instead of <div>', () => {
      expect(shallow(<Card onClick={() => {}} />).type()).toBe('a')
    })
  })

  describe('extra', () => {
    it('renders a CardContent', () => {
      const wrapper = shallow(<Card extra={faker.hacker.phrase()} />)

      expect(wrapper.find('CardContent')).toHaveLength(1)
    })
  })
})
