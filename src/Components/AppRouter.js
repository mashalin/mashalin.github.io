import React, { useContext } from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import { AuthContext } from "../context";
import { pablicRoutes, privateRoutes } from "../router/routes";
import Loader from "./UI/Loader/Loader";

function AppRouter() {
    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <Loader/>
    }

    return(
         isAuth
            ?
            <Switch>
            {privateRoutes.map(route => 
                <Route
                     component={route.component}
                     path={route.path}
                     exact={route.exact}
                     key={route.path}
                />
            )}
             <Redirect to='/posts'/>
         </Switch>

            :
            <Switch>
            {pablicRoutes.map(route => 
                <Route
                     component={route.component}
                     path={route.path}
                     exact={route.exact}
                     key={route.path}
                />
            )}
             <Redirect to='/login'/>
         </Switch>
       
    );
}

export default AppRouter;