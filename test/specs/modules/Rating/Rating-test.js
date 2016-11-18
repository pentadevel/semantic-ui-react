import _ from 'lodash'
import React from 'react'

import * as common from 'test/specs/commonTests'
import { sandbox } from 'test/utils'
import Rating from 'src/modules/Rating/Rating'

describe('Rating', () => {
  common.isConformant(Rating)
  common.hasUIClassName(Rating)

  common.propKeyOnlyToClassName(Rating, 'disabled')

  common.propValueOnlyToClassName(Rating, 'size')
  common.propValueOnlyToClassName(Rating, 'icon')

  describe('clicking on icons', () => {
    it('makes icons active up to and including the clicked icon', () => {
      const wrapper = mount(<Rating maxRating={3} />)
      const icons = wrapper.find('RatingIcon')

      icons.at(1).simulate('click')

      icons.at(0).should.have.prop('active', true)
      icons.at(1).should.have.prop('active', true)
      icons.at(2).should.have.prop('active', false)
    })

    it('if no rating selected no icon should have aria-checked', () => {
      const wrapper = mount(<Rating maxRating={3} />)
      const icons = wrapper.find('RatingIcon')

      icons.at(0).should.have.prop('aria-checked', false)
      icons.at(1).should.have.prop('aria-checked', false)
      icons.at(2).should.have.prop('aria-checked', false)
    })

    it('makes the clicked icon aria-checked', () => {
      const wrapper = mount(<Rating maxRating={3} />)
      const icons = wrapper.find('RatingIcon')

      icons.at(1).simulate('click')

      icons.at(0).should.have.prop('aria-checked', false)
      icons.at(1).should.have.prop('aria-checked', true)
      icons.at(2).should.have.prop('aria-checked', false)
    })

    it('set aria-setsize on each rating icon', () => {
      const wrapper = mount(<Rating maxRating={3} />)
      const icons = wrapper.find('RatingIcon')

      icons.at(1).simulate('click')

      icons.at(0).should.have.prop('aria-setsize', 3)
      icons.at(1).should.have.prop('aria-setsize', 3)
      icons.at(2).should.have.prop('aria-setsize', 3)
    })

    it('sets aria-posinset on each rating icon', () => {
      const wrapper = mount(<Rating maxRating={3} />)
      const icons = wrapper.find('RatingIcon')

      icons.at(1).simulate('click')

      icons.at(0).should.have.prop('aria-posinset', 1)
      icons.at(1).should.have.prop('aria-posinset', 2)
      icons.at(2).should.have.prop('aria-posinset', 3)
    })

    it('removes the "selected" prop', () => {
      const wrapper = mount(<Rating maxRating={3} />)
      const icons = wrapper.find('RatingIcon')

      icons.last()
        .simulate('mouseEnter')
        .simulate('click')

      wrapper.should.not.have.className('selected')

      icons.findWhere((i) => i.prop('selected', true))
        .should.have.length(0, 'Some RatingIcons did not remove its "selected" prop')
    })
  })

  describe('hovering on icons', () => {
    it('adds the "selected" className to the Rating', () => {
      const wrapper = mount(<Rating maxRating={3} />)

      wrapper.find('RatingIcon').first()
        .simulate('mouseEnter')

      wrapper.should.have.className('selected')
    })

    it('selects icons up to and including the hovered icon', () => {
      const wrapper = mount(<Rating maxRating={3} />)
      const icons = wrapper.find('RatingIcon')

      icons.at(1).simulate('mouseEnter')

      icons.at(0).should.have.prop('selected', true)
      icons.at(1).should.have.prop('selected', true)
      icons.at(2).should.have.prop('selected', false)
    })

    it('unselects icons on mouse leave', () => {
      const wrapper = mount(<Rating maxRating={3} />)
      const icons = wrapper.find('RatingIcon')

      icons.last().simulate('mouseEnter')
      wrapper.simulate('mouseLeave')

      icons.findWhere(i => i.prop('selected', true))
        .should.have.length(0, 'Some RatingIcons did not remove its "selected" prop')
    })
  })

  describe('clearable', () => {
    it('prevents clearing by default with multiple icons', () => {
      const icons = mount(<Rating defaultRating={5} maxRating={5} />)
        .find('RatingIcon')

      icons.last().simulate('click')

      icons.findWhere((i) => i.prop('active', true))
        .should.have.length(5, 'Some RatingIcons did not retain its "active" prop')
    })

    it('allows toggling when set to "auto" with a single icon', () => {
      const icon = mount(<Rating maxRating={1} clearable='auto' />)
        .find('RatingIcon')
        .at(0)

      icon
        .simulate('click')
        .should.have.prop('active', true)

      icon
        .simulate('click')
        .should.have.prop('active', false)
    })

    it('allows clearing when true with a single icon', () => {
      mount(<Rating defaultRating={1} maxRating={1} clearable />)
        .find('RatingIcon')
        .at(0)
        .simulate('click')
        .should.have.prop('active', false)
    })

    it('allows clearing when true with multiple icons', () => {
      const icons = mount(<Rating defaultRating={4} maxRating={5} clearable />)
        .find('RatingIcon')

      icons.at(3).simulate('click')

      icons.findWhere((i) => i.prop('active', true))
        .should.have.length(0, 'Some RatingIcons did not remove its "active" prop')
    })

    it('prevents clearing when false with a single icon', () => {
      mount(<Rating defaultRating={1} maxRating={1} clearable={false} />)
        .find('RatingIcon')
        .at(0)
        .simulate('click')
        .should.have.prop('active', true)
    })

    it('prevents clearing when false with multiple icons', () => {
      const icons = mount(<Rating defaultRating={5} maxRating={5} clearable={false} />)
        .find('RatingIcon')

      icons.last().simulate('click')

      icons.findWhere((i) => i.prop('active', true))
        .should.have.length(5, 'Some RatingIcons did not retain its "active" prop')
    })
  })

  describe('disabled', () => {
    it('prevents the rating from being toggled', () => {
      mount(<Rating rating={1} maxRating={1} clearable='auto' disabled />)
        .find('RatingIcon')
        .at(0)
        .simulate('click')
        .should.have.prop('active', true)

      mount(<Rating rating={0} maxRating={1} clearable='auto' disabled />)
        .find('RatingIcon')
        .at(0)
        .simulate('click')
        .should.have.prop('active', false)
    })

    it('prevents the rating from being cleared', () => {
      const wrapper = mount(<Rating rating={3} maxRating={3} disabled />)
      const icons = wrapper.find('RatingIcon')

      icons.last().simulate('click')

      icons.findWhere((i) => i.prop('active', true))
        .should.have.length(3, 'Some RatingIcons lost its "active" prop')
    })

    it('prevents icons from becoming selected on mouse enter', () => {
      const wrapper = mount(<Rating maxRating={3} disabled />)
      const icons = wrapper.find('RatingIcon')

      icons.last().simulate('mouseEnter')

      icons.findWhere((i) => i.prop('selected', true))
        .should.have.length(0, 'Some RatingIcons became "selected"')
    })

    it('prevents icons from becoming unselected on mouse leave', () => {
      const wrapper = mount(<Rating maxRating={3} />)
      const icons = wrapper.find('RatingIcon')

      icons.last().simulate('mouseEnter')
      icons.findWhere((i) => i.prop('selected', true))
        .should.have.length(3, 'Not every RatingIcon was selected on mouseEnter')

      wrapper.setProps({ disabled: true })
      wrapper.simulate('mouseLeave')

      icons.findWhere((i) => i.prop('selected', true))
        .should.have.length(3, 'Some RatingIcons lost its "selected" prop')
    })

    it('prevents icons from becoming active on click', () => {
      const wrapper = mount(<Rating maxRating={3} disabled />)
      const icons = wrapper.find('RatingIcon')

      icons.last().simulate('click')

      icons.findWhere((i) => i.prop('active', true))
        .should.have.length(0, 'Some RatingIcons became "active"')
    })
  })

  describe('maxRating', () => {
    it('controls how many icons are displayed', () => {
      _.times(10, (i) => {
        const maxRating = i + 1
        shallow(<Rating maxRating={maxRating} />)
          .should.have.exactly(maxRating).descendants('RatingIcon')
      })
    })
  })

  describe('onRate', () => {
    it('is called with (event, { rating, maxRating } on icon click', () => {
      const spy = sandbox.spy()
      const event = { fake: 'event data' }

      mount(<Rating maxRating={3} onRate={spy} />)
        .find('RatingIcon')
        .last()
        .simulate('click', event)

      spy.should.have.been.calledOnce()
      spy.should.have.been.calledWithMatch(event, { rating: 3, maxRating: 3 })
    })
  })

  describe('rating', () => {
    it('controls how many icons are active', () => {
      const wrapper = mount(<Rating rating={0} maxRating={10} />)
      const icons = wrapper.find('RatingIcon')

      // rating 0

      icons.findWhere((i) => i.prop('active', true))
        .should.have.length(0, 'Some RatingIcons have "active" prop')

      // rating 1 - 10
      _.times(10, (i) => {
        const rating = i + 1

        wrapper.setProps({ rating })
        icons.findWhere((icon) => icon.prop('active', true))
          .should.have.length(rating, 'Some RatingIcons did not have "active" prop')
      })
    })
  })
})
