import {Component} from "../common/Component.js";

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.showModal = this.showModal.bind(this);
    this.props.cartContext.subscribe('modal', this.showModal);
    this.modalElement = null;
  }

  showModal(product) {
    this.modalElement.innerHTML = '';

    const modalContent = document.createElement("div");
    modalContent.id = 'modal-content';
    modalContent.className = 'modal-content bg-white p-8 rounded-xl w-[90%] lg:max-w-[500px] shadow-md flex flex-col justify-center';

    modalContent.innerHTML = `
      <img src="${product.image}"
        alt="${product.title}"
        class="w-auto h-[300px] object-contain rounded-lg mb-4"
      >
      <h2 class="mb-4 text-xl">${product.title}</h2>
      <p class="mx-0 my-2 text-gray-400">${product.description}</p>
      <p class="mx-0 my-2 text-lg font-bold text-green-500">$${product.price}</p>
      <button onclick="document.getElementById('product-modal').style.display='none'"
          class="bg-red-500 hover:bg-red-400 border-none px-4 py-2 rounded-md cursor-pointer text-normal mt-4 text-white"
      >Close</button>
    `;

    this.modalElement.append(modalContent);

    this.modalElement.style.display = "flex";
  }

  render() {
    const modal = document.createElement('div');
    modal.id = 'product-modal';
    modal.className = 'modal fixed top-0 left-0 w-full h-full bg-black/50 justify-center items-center';

    this.modalElement = modal;

    return modal;
  }
}