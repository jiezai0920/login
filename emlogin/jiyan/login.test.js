import { mount } from 'vue-test-utils';
import JiYan from './JiYan';

describe('JiYan.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount(JiYan);
  });

  it("updates the .textContent to '这是一个极验组件。'", (done) => {
    wrapper.vm.$nextTick(() => {
      try {
        expect(wrapper.text()).toBe('这是一个极验组件。');
        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });

  it('检测快照是否一样。', (done) => {
    wrapper.vm.$nextTick(() => {
      try {
        expect(wrapper.text()).toMatchSnapshot();
        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
