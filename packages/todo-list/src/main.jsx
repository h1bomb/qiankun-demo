import React from 'react';
import ReactDOM from 'react-dom/client';
import { qiankunWindow, renderWithQiankun } from 'vite-plugin-qiankun/dist/helper';
import App from './App';

const initQianKun = () => {
  renderWithQiankun({
    mount(props) {
      const { container } = props;
      const root = ReactDOM.createRoot(container || document.getElementById('root'));
      root.render(<App />);
    },
    bootstrap() {},
    unmount() {},
  });
};

qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : ReactDOM.createRoot(document.getElementById('root')).render(<App />);
