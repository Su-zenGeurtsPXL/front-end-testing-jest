/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import Homeview from '@/views/Homeview'

describe('purchasing flow', () => {
  const businessHourshours = [9, 18]

  it('displays correct text in button to purchase', () => {
    const wrapper = shallowMount(Homeview)
    const button = wrapper.find('button')
    expect(button.text()).toEqual('Purchase')
  })

  test('allows purchases within business hours', () => {
    const wrapper = shallowMount(Homeview)
    const button = wrapper.find('button')
    const mockDate = new Date(2024, 6, 5, 13)

    jest.spyOn(global, 'Date').mockImplementation(() => mockDate)
    button.trigger('click')
    const now = new Date()

    expect(now.getHours()).toBeGreaterThan(businessHourshours[0])
    expect(now.getHours()).toBeLessThan(businessHourshours[1])
    expect(now.valueOf()).toBe(mockDate.valueOf())
    expect(wrapper.vm.message).toEqual('Purchase: Success')
    global.Date.mockRestore()
  })

  test('disallows purchases after business hours', () => {
    const wrapper = shallowMount(Homeview)
    const button = wrapper.find('button')
    const mockDate = new Date(2024, 6, 5, 23)

    jest.spyOn(global, 'Date').mockImplementation(() => mockDate)
    button.trigger('click')
    const now = new Date()

    expect(now.getHours()).toBeGreaterThan(businessHourshours[1])
    expect(wrapper.vm.message).toEqual('Purchase: Error')
    global.Date.mockRestore()
  })

  test('disallows purchases before business hours', () => {
    const wrapper = shallowMount(Homeview)
    const button = wrapper.find('button')
    const mockDate = new Date(2024, 6, 5, 5)

    jest.spyOn(global, 'Date').mockImplementation(() => mockDate)
    button.trigger('click')
    const now = new Date()

    expect(now.getHours()).toBeLessThan(businessHourshours[0])
    expect(wrapper.vm.message).toEqual('Purchase: Error')
    global.Date.mockRestore()
  })
})
