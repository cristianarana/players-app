import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled rejection:', event.reason);
});

ReactDOM.createRoot(
  document.getElementById('root')!,
).render(
  <App />
);