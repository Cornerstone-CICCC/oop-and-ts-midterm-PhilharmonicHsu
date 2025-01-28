import { Component } from "../common/Component.js";
import {Header} from "./Header.js";
import {MenuList} from "./MenuList.js";

export class App extends Component {
  render() {
    const container = document.createElement('div');
    container.className = 'container';

    const header = new Header({
      cartContext: this.props.cartContext
    }).render();

    const menuList = new MenuList({
      cartContext: this.props.cartContext
    }).render();

    container.append(header)
    container.append(menuList);

    const menuIcon = container.querySelector('#menu-icon');

    // Toggle menu visibility
    menuIcon.addEventListener("click", () => {
      container.querySelector('#menu').classList.toggle("open");
    });

    return container;
  }
}