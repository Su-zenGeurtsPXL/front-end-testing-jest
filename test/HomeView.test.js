/* eslint-disable no-undef */

// Import the necessary modules
import { shallowMount } from '@vue/test-utils'
import Homeview from '@/views/Homeview'

// Test the HomeView component
describe('HomeView', () => {
  // Define business hours
  const businessHourshours = [9, 18]

  // Test the button to display correct text
  it('displays correct text in button to purchase', () => {
    // Mount the HomeView component
    const wrapper = shallowMount(Homeview)

    // Find the button element
    const button = wrapper.find('button')

    // Check the text of the button
    expect(button.text()).toEqual('Purchase')
  })

  // Test the purchase method to allow purchases within business hours
  test('allows purchases within business hours', () => {
    // Mount the HomeView component
    const wrapper = shallowMount(Homeview)

    // Find the button element
    const button = wrapper.find('button')

    // Set the system time to a mock date
    const mockDate = new Date(2024, 6, 5, 13)
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

    // Get the current time (mocked)
    const now = new Date()

    // Trigger the button click event
    button.trigger('click')

    // Check that the date is mocked within business hours
    expect(now.getHours()).toBeGreaterThan(businessHourshours[0])
    expect(now.getHours()).toBeLessThan(businessHourshours[1])
    expect(now.valueOf()).toBe(mockDate.valueOf())

    // Check that the message is correct
    expect(wrapper.vm.message).toEqual('Purchase: Success')

    // Restore the system time
    global.Date.mockRestore()
  })

  // Test the purchase method to disallow purchases after business hours
  test('disallows purchases after business hours', () => {
    // Mount the HomeView component
    const wrapper = shallowMount(Homeview)

    // Find the button element
    const button = wrapper.find('button')

    // Set the system time to a mock date
    const mockDate = new Date(2024, 6, 5, 23)

    // Set the system time to a mock date
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

    // Get the current time (mocked)
    const now = new Date()

    // Trigger a click event on the button
    button.trigger('click')

    // Check that the date is mocked after business hours
    expect(now.getHours()).toBeGreaterThan(businessHourshours[1])

    // Check that the message is correct
    expect(wrapper.vm.message).toEqual('Purchase: Error')

    // Restore the system time
    global.Date.mockRestore()
  })

  // Test the purchase method to disallow purchases before business hours
  test('disallows purchases before business hours', () => {
    // Mount the HomeView component
    const wrapper = shallowMount(Homeview)

    // Find the button element
    const button = wrapper.find('button')

    // Set the system time to a mock date
    const mockDate = new Date(2024, 6, 5, 5)

    // Set the system time to a mock date
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate)

    // Get the current time (mocked)
    const now = new Date()

    // Trigger a click event on the button
    button.trigger('click')

     // Check that the date is mocked before business hours
    expect(now.getHours()).toBeLessThan(businessHourshours[0])

    // Check that the message is correct
    expect(wrapper.vm.message).toEqual('Purchase: Error')

    // Restore the system time
    global.Date.mockRestore()
  })
})
