import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
  constructor(props) {
    super(props);
    this.updateCart = this.updateCart.bind(this);
    this.props.cartContext.subscribe('cart', this.updateCart);
    this.cartListElement = null;
  }

  updateCart(cartData) {
    this.cartListElement.innerHTML = "";

    this.cartListElement.innerHTML = `<h2 class="text-center mb-4">Shopping Cart</h2>
    <ul id="cart-items" class="list-none p-0"></ul>
    <div id="cart-footer" class="text-center mt-4"></div>`

    const cartItems = this.cartListElement.querySelector('#cart-items');
    const cartFooter = this.cartListElement.querySelector('#cart-footer');

    let total = 0;

    cartData.forEach(item => {
      const cartItem = new CartItem({
        item,
        cartContext: this.props.cartContext
      })
      cartItems.appendChild(cartItem.render());

      total += item.price * item.quantity;
    });

    cartFooter.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
  }

  render() {
    const cartList = document.createElement('div');
    cartList.id = "cart";
    cartList.className = "z-10 mt-[80px] fixed top-0 right-0 w-[300px] h-full bg-gradient-to-b from-[#836953] to-[#5A5A5A] text-[#ecf0f1] p-4 overflow-y-auto shadow-md translate-x-full transition-transform duration-300 ease-linear";

    this.cartListElement = cartList;

    return cartList;
  }
}