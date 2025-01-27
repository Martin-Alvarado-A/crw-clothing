import React from "react";
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import {ReactComponent as Logo} from '../../assets/crown.svg';
import { auth } from "../../firebase/firebase.utils";
import CartIcon  from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component"
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from "../../redux/user/user.selectors";

import "./header.styles.scss";


const Header = ({currentUser, hidden}) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link to="/shop" className="option"> SHOP </Link>
      <Link to="/shop" className="option"> CONTACT </Link>
      {
        currentUser ? 
        (<div onClick={()=> auth.signOut()} className="option" > SIGN OUT</div> ) 
        : 
        (<Link to="/signin" className="option" >SIGN IN</Link>)
      }
      <CartIcon />
    </div>
    {
      hidden ? null : <CartDropdown />
    }
  </div>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);