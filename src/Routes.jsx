import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

// Views
import Home from './views/Home';
import Entries from './views/Entries';
import Entry from './views/Entry';
import ListHeadwords from './views/Headwords/ListHeadwords';
import ShowHeadword from './views/Headwords/ShowHeadword';
import EditHeadword from './views/Headwords/EditHeadword';
import Citation from './views/Citation';
import Dashboard from './views/Dashboard';
import ProductList from './views/ProductList';
import UserList from './views/UserList';
import EditUser from './views/EditUser';
import Typography from './views/Typography';
import Icons from './views/Icons';
import Account from './views/Account';
import Settings from './views/Settings';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import UnderDevelopment from './views/UnderDevelopment';
import NotFound from './views/NotFound';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/home"/>
        <Route component={Home} exact path="/home"/>
        <Route component={Entries} exact path="/entries"/>
        <Route component={Entry} exact path="/entries/:entryId"/>
        <Route component={ListHeadwords} exact path="/headwords"/>
        <Route component={EditHeadword} exact path="/headwords/new"/>
        <Route component={ShowHeadword} exact path="/headwords/:headwordId"/>
        <Route component={EditHeadword} exact path="/headwords/:headwordId/edit"/>
        <Route component={Citation} exact path="/citations/:citationId"/>
        <Route component={Dashboard} exact path="/dashboard"/>
        <Route component={UserList} exact path="/users"/>
        <Route component={EditUser} exact path="/users/new"/>
        <Route component={ProductList} exact path="/products"/>
        <Route component={Typography} exact path="/typography"/>
        <Route component={Icons} exact path="/icons"/>
        <Route component={Account} exact path="/account"/>
        <Route component={Settings} exact path="/settings"/>
        <Route component={SignUp} exact path="/sign-up"/>
        <Route component={SignIn} exact path="/sign-in"/>
        <Route component={UnderDevelopment} exact path="/under-development"/>
        <Route component={NotFound} exact path="/not-found"/>
        <Redirect to="/not-found"/>
      </Switch>
    );
  }
}
