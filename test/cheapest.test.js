/* eslint-disable no-undef */
function getCheapest () {
  const index = basket.items.reduce(
    (lowestIndex, currentItem, currentIndex) => {
      console.log('currentItem: ', currentItem.price)
      if (currentItem.price < basket.items[lowestIndex].price) {
        console.log('currentItem.price: ', currentItem.price)
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
    { product: 'Ball Gown', price: 975.0 },
    { product: 'Maxi Dress', price: 170.0 },
    { product: 'Prom Dress', price: 450.0 }
  ],
  getCheapest
}

describe('reading basket', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should get the cheapest basket item with a spy', () => {
    const spy = jest.spyOn(basket, 'getCheapest')
    expect(spy).toHaveBeenCalledTimes(0)

    expect(basket.getCheapest()).toEqual(basket.items[1])
    expect(spy).toHaveBeenCalledTimes(1)

    spy.mockImplementation(() => 'There are no dresses in the basket')
    expect(basket.getCheapest()).toEqual('There are no dresses in the basket')
    expect(spy).toHaveBeenCalledTimes(2)

    spy.mockRestore()

    spy.mockImplementation(getCheapest)
    expect(basket.getCheapest()).toEqual(basket.items[1])
  })

  it('should get with a mock', () => {
    const mock = jest.fn().mockImplementation(getCheapest)

    expect(mock()).toEqual(basket.items[1])
    expect(mock).toHaveBeenCalledTimes(1)

    mock.mockImplementation(() => 'There are no dresses in the basket')
    expect(mock()).toEqual('There are no dresses in the basket')
    expect(mock).toHaveBeenCalledTimes(2)

    mock.mockRestore()

    mock.mockImplementation(getCheapest)
    expect(mock()).toEqual(basket.items[1])
    expect(mock).toHaveBeenCalledTimes(3)
  })
})
