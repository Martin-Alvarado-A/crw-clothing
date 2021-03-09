import './App.css';

import React from "react";
import {Switch, Route } from "react-router-dom";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUp from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Header from "./components/header/header.component";
import { auth } from "./firebase/firebase.utils";


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  }

  unsibscribeFromAuth = null;

  componentDidMount(){
    this.unsibscribeFromAuth = auth.onAuthStateChanged( user => {
      this.setState({currentUser: user});
    })
  }

  componentWillUnmount(){
    this.unsibscribeFromAuth();
  }

  render(){
    return (
      <div >
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAndSignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
