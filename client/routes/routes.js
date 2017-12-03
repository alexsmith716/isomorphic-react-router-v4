
import About from '../modules/About/About';
import Home from '../modules/Home/Home';
import Login from '../modules/Login/Login';
import Signup from '../modules/Signup/Signup';


export default {
  routes: [
    {
      path: '/',
      component: Home,
      exact: true
    },
    {
      path: '/about',
      component: About,
      exact: true
    },
    {
      path: '/login',
      component: Login,
      exact: true
    },
    {
      path: '/signup',
      component: Signup,
      exact: true
    }
  ]
} 

/*
,
  redirects: [

    {
      from: '/here',
      to: '/there',
      status: 301
    }
  ]
} 
*/