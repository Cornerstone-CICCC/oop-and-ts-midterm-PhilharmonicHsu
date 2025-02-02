import { Component } from "../common/Component.js";
import {Header} from "./Header.js";
import {MenuList} from "./MenuList.js";
import {CartList} from "./CartList.js";
import {ProductList} from "./ProductList.js";
import {Modal} from "./Modal.js";
import {Footer} from "./Footer.js";

export class App extends Component {
  render() {
    const container = document.createElement('div');

    const header = new Header({
      cartContext: this.props.cartContext
    }).render();

    const menuList = new MenuList({
      cartContext: this.props.cartContext
    }).render();

    const cartList = new CartList({
      cartContext: this.props.cartContext
    }).render()

    const productList = new ProductList({
      cartContext: this.props.cartContext
    }).render()

    const modal = new Modal({
      cartContext: this.props.cartContext
    }).render()

    const footer = new Footer().render();

    container.append(header)
    container.append(menuList);
    container.append(cartList);
    container.append(productList);
    container.append(modal);
    container.append(footer);

    const menuIcon = container.querySelector('#menu-icon');
    const cartIcon = container.querySelector('#cart-icon');

    // Toggle menu visibility
    menuIcon.addEventListener("click", () => {
      container.querySelector('#menu').classList.toggle("open");
    });

    cartIcon.addEventListener("click", () => {
      container.querySelector('#cart').classList.toggle("open");
    })

    return container;
  }
}