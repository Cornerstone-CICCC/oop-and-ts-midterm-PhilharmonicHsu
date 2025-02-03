import { Component } from "../common/Component.js";

export class CartItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cartItem = document.createElement("li");
    cartItem.className = "mb-4 border-1 border-solid pb-2";
    cartItem.innerHTML = `
      <p class="mx-0 my-[0.3rem]"><strong>${this.props.item.title}</strong></p>
      <p>Price: $${this.props.item.price}</p>
      <p>Quantity: ${this.props.item.quantity}</p>
      <button class="increase bg-[#5A5A5A] px-2 py-0 rounded-md">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 12.998H13V17.998C13 18.2633 12.8946 18.5176 12.7071 18.7052C12.5196 18.8927 12.2652 18.998 12 18.998C11.7348 18.998 11.4804 18.8927 11.2929 18.7052C11.1054 18.5176 11 18.2633 11 17.998V12.998H6C5.73478 12.998 5.48043 12.8927 5.29289 12.7052C5.10536 12.5176 5 12.2633 5 11.998C5 11.7328 5.10536 11.4785 5.29289 11.2909C5.48043 11.1034 5.73478 10.998 6 10.998H11V5.99805C11 5.73283 11.1054 5.47848 11.2929 5.29094C11.4804 5.1034 11.7348 4.99805 12 4.99805C12.2652 4.99805 12.5196 5.1034 12.7071 5.29094C12.8946 5.47848 13 5.73283 13 5.99805V10.998H18C18.2652 10.998 18.5196 11.1034 18.7071 11.2909C18.8946 11.4785 19 11.7328 19 11.998C19 12.2633 18.8946 12.5176 18.7071 12.7052C18.5196 12.8927 18.2652 12.998 18 12.998Z" fill="white"/>
        </svg>
      </button>
      <button class="decrease bg-[#5A5A5A] px-2 py-0 rounded-md">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 11H5V13H19V11Z" fill="white"/>
        </svg>
      </button>
      <button class="remove bg-red-600 px-2 py-0 rounded-md">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 9L17.16 17.398C17.033 18.671 16.97 19.307 16.68 19.788C16.4257 20.2114 16.0516 20.55 15.605 20.761C15.098 21 14.46 21 13.18 21H10.82C9.541 21 8.902 21 8.395 20.76C7.94805 20.5491 7.57361 20.2106 7.319 19.787C7.031 19.307 6.967 18.671 6.839 17.398L6 9M13.5 15.5V10.5M10.5 15.5V10.5M4.5 6.5H9.115M9.115 6.5L9.501 3.828C9.613 3.342 10.017 3 10.481 3H13.519C13.983 3 14.386 3.342 14.499 3.828L14.885 6.5M9.115 6.5H14.885M14.885 6.5H19.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `;

    cartItem.querySelector(".increase").addEventListener(
      "click",
      () => this.props.cartContext.increaseQuantity(this.props.item.id)
    );

    cartItem.querySelector(".decrease").addEventListener(
      "click",
      () => this.props.cartContext.decreaseQuantity(this.props.item.id)
    );

    cartItem.querySelector(".remove").addEventListener("click", () => {
      this.props.cartContext.removeProduct(this.props.item.id);
    })

    return cartItem;
  }
}