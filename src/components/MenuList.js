import { Component } from "../common/Component.js";
import {MenuItem} from "./MenuItem.js";

export class MenuList extends Component {
  constructor(props) {
    super(props);
    this.reRender = this.reRender.bind(this);
    this.props.cartContext.subscribe("menu", this.reRender)
    this.menuListElement = null;
  }

  reRender(menu) {
    this.menuListElement.innerHTML = '';

    const menuItems = new MenuItem({
      cartContext: this.props.cartContext
    }).render();

    this.menuListElement.append(menuItems);
  }

  render() {
    const menuListElement = document.createElement('div')
    menuListElement.id = 'menu';
    menuListElement.className = "mt-[80px] fixed top-0 left-[-250px] w-[250px] h-full bg-gradient-to-b from-[#836953] to-[#5A5A5A] text-[#ecf0f1] p-8 overflow-y-auto shadow-md transition-all duration-300 ease-linear z-[5]"
    menuListElement.innerHTML = `<h2 class="text-center mb-4">Categories</h2>`

    const menuItem = new MenuItem({
      cartContext: this.props.cartContext
    }).render();

    menuListElement.append(menuItem);

    this.menuListElement = menuListElement;

    return menuListElement;
  }
}