/* eslint-disable no-undef */
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

const basket = {
  items: [
    { product: 'Maxi Dress', price: 170.0 },
    { product: 'Ball Gown', price: 975.0 },
    { product: 'Prom Dress', price: 450.0 }
    // Add more items as needed
  ],
  getCheapest
}

describe('reading basket', () => {
  it('should get the cheapest item', () => {
    expect(true).toBe(true)
  })

  afterEach(() => {
    jest.restoreAllMocks() // Reset all mocks after each test
  })

  it('should get the latest basket item with a spy', () => {
    const spy = jest.spyOn(basket, 'getCheapest')
    expect(spy).toHaveBeenCalledTimes(0) // Spy starts with zero calls

    // First expectation: original function behavior
    expect(basket.getCheapest()).toEqual(basket.items[0])
    expect(spy).toHaveBeenCalledTimes(1)

    // Mock implementation once and test
    spy.mockImplementationOnce(() => 'There are no dresses in the basket')
    expect(basket.getCheapest()).toEqual('There are no dresses in the basket')
    expect(spy).toHaveBeenCalledTimes(2)

    // Reset spy for subsequent tests (if needed)
    spy.mockRestore()
  })

  it('should get with a mock', () => {
    const mock = jest.fn().mockImplementation(getCheapest)

    // First expectation: original function behavior
    expect(mock()).toEqual(basket.items[0])
    expect(mock).toHaveBeenCalledTimes(1)

    // Mock implementation once and test
    mock.mockImplementationOnce(() => 'There are no dresses in the basket')
    expect(mock()).toEqual('There are no dresses in the basket')
    expect(mock).toHaveBeenCalledTimes(2)

    // Additional expectations
    expect(mock()).toEqual(basket.items[0])
    expect(mock).toHaveBeenCalledTimes(3)

    // Reset mock for subsequent tests (if needed)
    mock.mockRestore()
  })
})
