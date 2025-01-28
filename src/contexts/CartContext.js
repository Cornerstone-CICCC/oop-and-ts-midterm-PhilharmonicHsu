export class CartContext {
  constructor() {
    this.cartItems = [];
    this.menuItems = [];
    this.products = [];

    this.cartListeners = [];
    this.menuListeners = [];
    this.productListeners = [];


    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(products => {
        this.products = products;
        this.menuItems = [...new Set(products.map(product => product.category))];

        this.notifyListeners("menu")
      });
  }

  subscribe(type, listener) {
    switch (type) {
      case "cart":
        this.cartListeners.push(listener);
        break;
      case "menu":
        this.menuListeners.push(listener);
        break;
      case "product":
        this.products.push(listener);
        break;
    }
  }

  notifyListeners(type) {
    switch (type) {
      case "cart":
        this.cartListeners.forEach(listener => {
          listener(this.cartItems)
        })
        break;
      case "menu":
        this.menuListeners.forEach(listener => {
          listener(this.menuItems)
        })
        break;
      case "product":
        this.productListeners.forEach(listener => {
          listener(this.products)
        })
        break;
    }
  }
}