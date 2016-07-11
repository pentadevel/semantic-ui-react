import React from 'react'
import Progress from 'src/modules/Progress/Progress'
import * as common from 'test/specs/commonTests'

describe('Progress', () => {
  common.isConformant(Progress)
  common.hasUIClassName(Progress)
  common.rendersChildren(Progress)

  common.propValueOnlyToClassName(Progress, 'size')
  common.propValueOnlyToClassName(Progress, 'color')

  common.propKeyOnlyToClassName(Progress, 'active')
  common.propKeyOnlyToClassName(Progress, 'success')
  common.propKeyOnlyToClassName(Progress, 'warning')
  common.propKeyOnlyToClassName(Progress, 'error')
  common.propKeyOnlyToClassName(Progress, 'disabled')
  common.propKeyOnlyToClassName(Progress, 'indicating')
  common.propKeyOnlyToClassName(Progress, 'inverted')

  common.propKeyAndValueToClassName(Progress, 'attached')

  it('contains div with className bar', () => {
    shallow(<Progress />)
      .should.have.descendants('.bar')
  })

  describe('autoSuccess', () => {
    it('applies the success class when percent >= 100%', () => {
      const wrapper = shallow(<Progress autoSuccess />)

      wrapper
        .setProps({ percent: 100, autoSuccess: true })
        .should.have.have.className('success')

      wrapper
        .setProps({ percent: 99, autoSuccess: true })
        .should.not.have.have.className('success')

      wrapper
        .setProps({ percent: 101, autoSuccess: true })
        .should.have.have.className('success')
    })
    it('applies the success class when value >= total', () => {
      const wrapper = shallow(<Progress autoSuccess />)

      wrapper
        .setProps({ total: 1, value: 1, autoSuccess: true })
        .should.have.have.className('success')

      wrapper
        .setProps({ total: 1, value: 0, autoSuccess: true })
        .should.not.have.have.className('success')

      wrapper
        .setProps({ total: 1, value: 2, autoSuccess: true })
        .should.have.have.className('success')
    })
  })

  describe('label', () => {
    it('displays the progress as a percentage by default', () => {
      shallow(<Progress percent={20} label />)
        .children()
        .should.have.descendants('.progress')
        .and.contain.text('20%')
    })
    it('displays the progress as a ratio when set to "ratio"', () => {
      shallow(<Progress label='ratio' value={1} total={2} />)
        .children()
        .find('.progress')
        .should.contain.text('1/2')
    })
    it('displays the progress as a percentage when set to "percent"', () => {
      shallow(<Progress label='percent' value={1} total={2} />)
        .children()
        .find('.progress')
        .should.contain.text('50%')
    })
  })

  describe('percent', () => {
    it('sets the bar width', () => {
      shallow(<Progress percent={33.333} />)
        .find('.bar')
        .should.have.style('width', '33.333%')
    })
    it('sets the progress label with a decimal', () => {
      shallow(<Progress percent={10.12345} label='percent' />)
        .children()
        .find('.progress')
        .should.contain.text('10.12345%')
    })
    it('sets the progress label without a decimal', () => {
      shallow(<Progress percent={35} label='percent' />)
        .children()
        .find('.progress')
        .should.contain.text('35%')
    })
  })

  describe('progress', () => {
    it('hides the progress text by default', () => {
      shallow(<Progress />)
        .children()
        .should.not.have.descendants('.progress')
    })
    it('shows the progress text when true', () => {
      shallow(<Progress progress />)
        .children()
        .should.have.descendants('.progress')
    })
    it('hides the progress text when false', () => {
      shallow(<Progress progress={false} />)
        .children()
        .should.not.have.descendants('.progress')
    })
  })

  describe('precision', () => {
    it('rounds the progress label to 0 decimal places by default', () => {
      shallow(<Progress percent={10.12345} precision={0} />)
        .children()
        .find('.progress')
        .should.contain.text('10%')
    })
    it('removes the decimal from progress label when set to 0', () => {
      shallow(<Progress percent={10.12345} precision={0} />)
        .children()
        .find('.progress')
        .should.contain.text('10%')
    })
    it('rounds the decimal in the progress label to the number of digits', () => {
      shallow(<Progress percent={10.12345} precision={1} />)
        .children()
        .find('.progress')
        .should.contain.text('10.1%')

      shallow(<Progress percent={10.12345} precision={4} />)
        .children()
        .find('.progress')
        .should.contain.text('10.1235%')
    })
  })

  describe('total/value', () => {
    it('calculates the percent complete', () => {
      shallow(<Progress value={1} total={2} />)
        .children()
        .find('.progress')
        .should.contain.text('50%')
    })
  })
})
