import { start, registerMicroApps, setDefaultMountApp } from 'qiankun';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>微前端示例</h1>
        <nav style={{
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          display: 'flex',
          gap: '20px',
          justifyContent: 'center'
        }}>
          <Link to="/todo" style={{
            textDecoration: 'none',
            color: '#333',
            padding: '8px 16px',
            borderRadius: '4px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>TodoList</Link>
          <Link to="/counter" style={{
            textDecoration: 'none',
            color: '#333',
            padding: '8px 16px',
            borderRadius: '4px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>Counter</Link>
        </nav>
        <div style={{ 
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div id="subapp-viewport" data-testid="subapp-viewport">
            <Routes>
              <Route path="/todo" element={<div id="todo-container" />} />
              <Route path="/counter" element={<div id="counter-container" />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

// Qiankun配置
const isDev = process.env.NODE_ENV === 'development';

registerMicroApps([
  {
    name: 'todo-app',
    entry: isDev ? '//localhost:5174' : '/todo/',
    container: '#todo-container',
    activeRule: '/todo',
  },
  {
    name: 'counter-app',
    entry: isDev ? '//localhost:5175' : '/counter/',
    container: '#counter-container',
    activeRule: '/counter',
  },
]);

start();
setDefaultMountApp('/todo');
