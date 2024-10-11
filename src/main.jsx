import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Route.jsx';
import ChatInterface from './Pages/ChatInterface/ChatInterface.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChatInterface />
  </StrictMode>,
)
