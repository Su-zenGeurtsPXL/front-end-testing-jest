import { mount } from '@vue/test-utils';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  toHaveBeenCalled,
} from 'vitest';
import HomeView from '@/views/HomeView.vue';

describe('purchasing flow', () => {
  const businessHourshours = [9, 18];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('displays correct text in button to purchase', () => {
    const wrapper = mount(HomeView);
    const button = wrapper.find('button');

    expect(button.text()).toEqual('Purchase');
  });

  it('allows purchases within business hours', () => {
    const wrapper = mount(HomeView);
    const button = wrapper.find('button');
    const mockDate = new Date(2024, 6, 5, 13);

    vi.setSystemTime(mockDate);
    const now = new Date();
    button.trigger('click');

    expect(now.getHours())
      .toBeGreaterThan(9)
      .toBeLessThan(businessHourshours[1]);
    expect(now.valueOf()).toBe(mockDate.valueOf());

    expect(wrapper.vm.message).toEqual('Purchase: Success');
  });

  it('disallows purchases after business hours', () => {
    const wrapper = mount(HomeView);
    const button = wrapper.find('button');
    const mockDate = new Date(2024, 6, 5, 23);

    vi.setSystemTime(mockDate);
    const now = new Date();
    button.trigger('click');

    expect(now.getHours()).toBeGreaterThan(businessHourshours[1]);
    expect(wrapper.vm.message).toEqual('Purchase: Error');

    vi.useRealTimers();
  });

  it('disallows purchases before business hours', () => {
    const wrapper = mount(HomeView);
    const button = wrapper.find('button');
    const mockDate = new Date(2024, 6, 5, 5);

    vi.setSystemTime(mockDate);
    const now = new Date();
    button.trigger('click');

    expect(now.getHours()).toBeLessThan(businessHourshours[0]);
    expect(wrapper.vm.message).toEqual('Purchase: Error');
  });
});
