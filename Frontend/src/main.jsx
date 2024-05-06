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
import DepressionResult from './components/DepressionResult.jsx'
import AnxietyResult from './components/AnxietyResult.jsx'
import StressTestPss from './components/StressTestPss.jsx'
import StressResult from './components/StressResult.jsx'
import { AuthProvider } from './authContext.jsx'
import ContactUs from './components/ContactUs.jsx'
import AboutUs from './components/AboutUs.jsx'
import SuggestTherapist from './components/SuggestTherapist.jsx'
import ScheduleSession from './components/ScheduleSession.jsx'
import UserProfile from './components/UserProfile.jsx'

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
            path: 'gad7',
            // element: <AnxietyTestGad7 />
            children: [
              {
                path: '',
                element: <AnxietyTestGad7 />
              },
              {
                path: 'AnxietyResult/:score',
                element: <AnxietyResult />
              }
            ]
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
            children: [
              {
                path: 'DepressionResult/:score',
                element: <DepressionResult />
              },
              {
                path: '',
                element: <DepressionTestPhq9 />
              }
            ]
          }
        ]
      },
      {
        path: '/stress-test',
        // element: <DepressionTest />,
        children: [
          {
            path: '',
            element: <StressTest />
          },
          {
            path: 'pss10',
            children: [
              {
                path: 'StressResult/:score',
                element: <StressResult />
              },
              {
                path: '',
                element: <StressTestPss />
              }
            ]
          }
        ]
      },
      {
        path: '/therapy',
        // element: <Therapy />,
        children: [
          {
            path: ':category',
            // element: <SuggestTherapist />,
            children: [
              {
                path: '',
                element: <SuggestTherapist />
              },
              {
                path: ':therapistId',
                element: <ScheduleSession />
              }
            ]
          },
        ]
      },
      {
        path: '/emergency-resources',
        element: <EmergencyResources />
      },
      {
        path: '/aboutus',
        element: <AboutUs />
      },
      {
        path: '/contactus',
        element: <ContactUs />
      },
      {
        path: '/userprofile',
        element: <UserProfile />
      }
    ]
  },
  {
    path: 'login',
    element: <Login />,
    errorElement: <Error />
  },
  {
    path: '/signup',
    element: <SignUp />,
    errorElement: <Error />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  </React.StrictMode>,
)
