import { createApp, App as VueApp } from 'vue'
import App from './App.vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

let app: VueApp | undefined;

interface RenderProps {
  container?: HTMLElement;
  [key: string]: any;
}

function render(props: RenderProps = {}) {
  const { container } = props;
  app = createApp(App);
  
  const containerElement = container ? container.querySelector('#app') : document.getElementById('app');
  if (containerElement) {
    app.mount(containerElement);
  }
}

renderWithQiankun({
  mount(props: RenderProps) {
    render(props);
  },
  bootstrap() {
    console.log('vue app bootstraped');
  },
  unmount() {
    if (app) {
      app.unmount();
    }
  },
  update(props: RenderProps) {
    console.log('update props', props);
  }
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render();
}
