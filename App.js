
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Pastes from './components/Pastes';
import ViewPate from './components/ViewPate';

function App() {
  const router= createBrowserRouter(
    [
      {
        path:'/',
        element:
        <div>
          <Navbar/>
          <Home/>
        </div>
      },
      {
        path:'/pastes',
        element:
        <div>
            <Navbar/>
            <Pastes/>
          
        </div>
      },
      {
        path:'/pastes/:id',
        element:
        <div>
          <Navbar/>
          <ViewPate/>
        </div>
      },
    ]
  )
  return (
    <div className="App ">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
