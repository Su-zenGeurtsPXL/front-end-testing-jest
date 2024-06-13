import { afterEach, describe, expect, it, vi } from 'vitest'

function getCheapest() {
const index = basket.items.reduce((lowestIndex, currentItem, currentIndex) => {
    if (currentItem.price < basket.items[lowestIndex].price) {
        return currentIndex;
    } else {
        return lowestIndex;
    }
}, 0);
return basket.items[index];
}

const basket = {
  items: [
    { product: 'Maxi Dress', price: 170.00 },
    { product: 'Ball Gown', price: 975.00 },
    { product: 'Prom Dress', price: 450.00 },
    // ...
  ],
  getCheapest,
}

describe('reading basket', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should get the latest basket item with a spy', () => {
    const spy = vi.spyOn(basket, 'getCheapest')
    expect(spy.getMockName()).toEqual('getCheapest')

    expect(basket.getCheapest()).toEqual(
      basket.items[0],
    )

    expect(spy).toHaveBeenCalledTimes(1)

    spy.mockImplementationOnce(() => 'There ar no dresses in the basket')
    expect(basket.getCheapest()).toEqual('There ar no dresses in the basket')

    expect(spy).toHaveBeenCalledTimes(2)
  })

  it('should get with a mock', () => {
    const mock = vi.fn().mockImplementation(getCheapest)

    expect(mock()).toEqual(basket.items[0])
    expect(mock).toHaveBeenCalledTimes(1)

    mock.mockImplementationOnce(() => 'There ar no dresses in the basket')
    expect(mock()).toEqual('There ar no dresses in the basket')

    expect(mock).toHaveBeenCalledTimes(2)

    expect(mock()).toEqual(basket.items[0])
    expect(mock).toHaveBeenCalledTimes(3)
  })
})