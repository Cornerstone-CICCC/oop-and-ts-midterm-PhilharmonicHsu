import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.updateProductList = this.updateProductList.bind(this);
    this.props.cartContext.subscribe('product', this.updateProductList)
    this.productListElement = null;
  }

  updateProductList(products) {
    this.productListElement.innerHTML = "";
    products.forEach(product => {
      const productElement = new ProductItem({
        product,
        cartContext: this.props.cartContext
      });

      this.productListElement.appendChild(productElement.render());
    })
  }

  render() {
    const productList = document.createElement('div');
    productList.id = "product-list";
    productList.className = 'main-content flex-1 lg:w-[97.5%] ml-0 pt-[6rem] grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-between gap-4'

    this.productListElement = productList;

    return productList;
  }
}