import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './components/Error.jsx'
import Home from './components/Home.jsx'
import AwarenessPortal from './components/AwarenessPortal.jsx'
import AnxietyTest from './components/AnxietyTest.jsx'
import DepressionTest from './components/DepressionTest.jsx'
import StressTest from './components/StressTest.jsx'
import Therapy from './components/Therapy.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import DepressionTestPhq9 from './components/DepressionTestPhq9.jsx'
import EmergencyResources from './components/EmergencyResources.jsx'
import AnxietyTestGad7 from './components/AnxietyTestGad7.jsx'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/awareness-portal',
        element: <AwarenessPortal />
      },
      {
        path: '/anxiety-test',
        // element: <AnxietyTest />
        children: [
          {
            path: '',
            element: <AnxietyTest />
          },
          {
            path: 'phq9',
            element: <AnxietyTestGad7 />
          }
        ]
      },
      {
        path: '/depression-test',
        // element: <DepressionTest />,
        children: [
          {
            path: '',
            element: <DepressionTest />
          },
          {
            path: 'phq9',
            element: <DepressionTestPhq9 />
          }
        ]
      },
      {
        path: '/stress-test',
        element: <StressTest />
      },
      {
        path: '/therapy',
        element: <Therapy />
      },
      {
        path: '/emergency-resources',
        element: <EmergencyResources />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={appRouter} />
  </React.StrictMode>,
)
