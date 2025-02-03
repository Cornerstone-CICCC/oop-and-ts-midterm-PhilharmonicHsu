import { Component } from "../common/Component.js";

export class ProductItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const productItem = document.createElement("div");
    productItem.className = "product bg-white rounded-lg lg:m-4 p-6 w-full shadow-md transition-transform duration-300 ease-linear hover:shadow-lg hover:scale-105 cursor-pointer hover:-translate-y-2 hover:shadow-lg"
    productItem.innerHTML = `
        <img src="${this.props.product.image}"
          alt="${this.props.product.title}"
          class="w-full h-[600px] lg:h-[300px] rounded-lg mb-4 object-contain"
        >
        <h2 class="text-xl md:truncate">${this.props.product.title}</h2>
        <p class="text-normal font-bold text-green-500 mb-3">$${this.props.product.price}</p>
        <button class="add-to-cart bg-[#836953] px-4 py-2 w-full border-1 border-black border-solid rounded-md hover:bg-amber-400 text-xl text-white">
            Add to Cart
        </button>
      `;

    productItem.querySelector(".add-to-cart").addEventListener("click", () => {
      this.props.cartContext.addProduct(this.props.product);
    });

    productItem.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") {
        this.props.cartContext.product = this.props.product
        this.props.cartContext.showModal();
      }
    });

    return productItem;
  }
}