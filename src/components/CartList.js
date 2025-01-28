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
    <ul id="cart-items" class="list-none p-0">
        <!-- Cart items will be dynamically populated -->
    </ul>
    <div id="cart-footer" class="text-center mt-4">
        <!-- Cart footer content -->
    </div>`

    const cartItems = this.cartListElement.querySelector('#cart-items');
    const cartFooter = this.cartListElement.querySelector('#cart-footer');

    let total = 0;
    this.props.cartContext.cartItems.forEach(item => {
      const cartItem = document.createElement("li");
      cartItem.classList = "mb-4 border-1 border-solid pb-2";
      cartItem.innerHTML = `
        <p class="mx-0 my-[0.3rem]"><strong>${item.title}</strong></p>
        <p>Price: $${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <button class="increase bg-gray-400 px-2 py-0 rounded-md">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="white"/>
          </svg>
        </button>
        <button class="decrease bg-gray-400 px-2 py-0 rounded-md">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 11H5V13H19V11Z" fill="white"/>
          </svg>
        </button>
      `;

      cartItem.querySelector(".increase").addEventListener("click", () => {
        item.quantity += 1;
        this.updateCart();
      });

      cartItem.querySelector(".decrease").addEventListener("click", () => {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          this.props.cartContext.cartItems = this.props.cartContext.cartItems.filter(cartItem => cartItem.id !== item.id);
        }
        this.updateCart();
      });

      cartItems.appendChild(cartItem);
      total += item.price * item.quantity;
    });

    cartFooter.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
  }

  render() {
    const cartList = document.createElement('div');
    cartList.id = "cart";
    cartList.className = "z-10 mt-[80px] fixed top-0 right-0 w-[300px] h-full bg-[#2c3e50] text-[#ecf0f1] p-4 overflow-y-auto shadow-md translate-x-full transition-transform duration-300 ease-linear";


    this.cartListElement = cartList;

    return cartList;
  }
}