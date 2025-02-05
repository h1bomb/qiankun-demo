import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

let root: ReactDOM.Root | null = null;

function render(props: any = {}) {
  const { container } = props;
  const containerElement = container ? container.querySelector('#root') : document.getElementById('root');
  
  if (!containerElement) {
    console.error('Container element not found');
    return;
  }

  try {
    root = ReactDOM.createRoot(containerElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error('Error rendering app:', error);
  }
}

const initQianKun = () => {
  renderWithQiankun({
    mount(props) {
      console.log('Mounting todo app with props:', props);
      render(props);
    },
    bootstrap() {
      console.log('Todo app bootstrapped');
    },
    unmount() {
      console.log('Unmounting todo app');
      root?.unmount();
    },
    update(props) {
      console.log('Updating todo app props:', props);
      render(props);
    },
  });
};

if (qiankunWindow.__POWERED_BY_QIANKUN__) {
  initQianKun();
} else {
  render({});
}