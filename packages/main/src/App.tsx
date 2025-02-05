import { start, registerMicroApps } from 'qiankun';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    const isDev = process.env.NODE_ENV === 'development';
    const apps = [
      {
        name: 'todo-app',
        entry: isDev ? '//localhost:5174' : '/todo/',
        container: '#todo-container',
        activeRule: '/todo'
      },
      {
        name: 'counter-app',
        entry: isDev ? '//localhost:5175' : '/counter/',
        container: '#counter-container',
        activeRule: '/counter'
      }
    ];

    registerMicroApps(apps);
    start();
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <BrowserRouter>
        <div>
          <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
            微前端示例
          </h1>
          <nav style={{
            marginBottom: '30px',
            padding: '15px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            display: 'flex',
            gap: '20px',
            justifyContent: 'center'
          }}>
            <Link to="/" className="nav-link">首页</Link>
            <Link to="/todo" className="nav-link">Todo List</Link>
            <Link to="/counter" className="nav-link">Counter</Link>
          </nav>
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            minHeight: '400px'
          }} role="main">
            <Routes>
              <Route path="/" element={
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <h2 style={{ color: '#333', marginBottom: '20px' }}>欢迎使用微前端示例</h2>
                  <p style={{ color: '#666' }}>这是一个使用 qiankun 实现的微前端示例项目</p>
                </div>
              } />
              <Route path="/todo" element={<div id="todo-container"></div>} />
              <Route path="/counter" element={<div id="counter-container"></div>} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;