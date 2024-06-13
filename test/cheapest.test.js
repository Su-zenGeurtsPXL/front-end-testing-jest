/* eslint-disable no-undef */

// Define a function that returns the cheapest item in the basket
function getCheapest () {
  const index = basket.items.reduce(
    (lowestIndex, currentItem, currentIndex) => {
      if (currentItem.price < basket.items[lowestIndex].price) {
        return currentIndex
      } else {
        return lowestIndex
      }
    },
    0
  )
  return basket.items[index]
}

// Define a basket object with items and a getCheapest method
const basket = {
  items: [
    { product: 'Ball Gown', price: 975.0 },
    { product: 'Maxi Dress', price: 170.0 },
    { product: 'Prom Dress', price: 450.0 }
  ],
  getCheapest
}

// Test the getCheapest function
describe('getCheapest()', () => {
  // Restore all mocks after each test
  afterEach(() => {
    jest.restoreAllMocks()
  })

  // Test the getCheapest function with a spy
  it('should get the cheapest basket item with a spy', () => {
    // Check the name of the spy
    const spy = jest.spyOn(basket, 'getCheapest')
    spy.mockImplementation(() => 'newName')
    spy.getMockImplementation().mockName = 'newName'
    basket.getCheapest()
    expect(spy.getMockImplementation().mockName).toEqual('newName')
    expect(spy).toHaveBeenCalledTimes(1)

    // Check the return value of the spy
    spy.mockImplementation(() => basket.items[1])
    expect(basket.getCheapest()).toEqual(basket.items[1])
    expect(spy).toHaveBeenCalledTimes(2)

    // Mock the return value of the spy
    spy.mockImplementationOnce(() => 'There are no dresses in the basket')
    expect(basket.getCheapest()).toEqual('There are no dresses in the basket')
    expect(spy).toHaveBeenCalledTimes(3)

    // Check that the mocked the return value once
    expect(basket.getCheapest()).toEqual(basket.items[1])
    expect(spy).toHaveBeenCalledTimes(4)
  })

  // Test the getCheapest function with a mock
  it('should get with a mock', () => {
    // Mock the getCheapest function
    const mock = jest.fn().mockImplementation(getCheapest)
    expect(mock()).toEqual(basket.items[1])
    expect(mock).toHaveBeenCalledTimes(1)

    // Mock the getCheapest function with a return value
    mock.mockImplementationOnce(() => 'There are no dresses in the basket')
    expect(mock()).toEqual('There are no dresses in the basket')
    expect(mock).toHaveBeenCalledTimes(2)

    // Check that the mocked the return value once
    expect(mock()).toEqual(basket.items[1])
    expect(mock).toHaveBeenCalledTimes(3)
  })
})
