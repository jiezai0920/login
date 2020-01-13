import { mount } from 'vue-test-utils';
import Login from './Login';

describe('Login.vue', () => {
  let wrapper = null;

  beforeEach(() => {
    wrapper = mount(Login);
  });

  it("updates the .textContent to '这是一个登录弹框组件。'", (done) => {
    wrapper.vm.$nextTick(() => {
      try {
        expect(wrapper.text()).toBe('这是一个登录弹框组件。');
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
