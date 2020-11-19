import {createAppContainer, createSwitchNavigator} from 'react-navigation'

import Home from './pages/home';
import Login from './pages/login';
import Dashboard from './pages/dashboard';

const Routes = createAppContainer(
    createSwitchNavigator({
        Home,
        Login,
        Dashboard
    })
);

export default Routes;