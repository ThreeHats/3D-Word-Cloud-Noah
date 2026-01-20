import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Viewer } from './pages/Viewer';
import { EmbedDemo } from './pages/EmbedDemo';
import './index.css';

const pathname = window.location.pathname;

let component;
if (pathname === '/viewer') {
  component = <Viewer />;
} else if (pathname === '/demo') {
  component = <EmbedDemo />;
} else {
  component = <App />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {component}
  </React.StrictMode>
);
