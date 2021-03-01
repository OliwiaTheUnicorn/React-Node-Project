import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from "./core/home";
import Signup from "./user/signup";
import Signin from "./user/signin";

const MainRouter = () => (
    <div>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
        </Switch>
    </div>
)

export default MainRouter;