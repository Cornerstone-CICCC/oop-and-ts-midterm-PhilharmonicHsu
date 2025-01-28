export class CartContext {
  constructor() {
    this.cartItems = [];
    this.menuItems = [];
    this.products = [];
    this.product = null;

    this.cartListeners = [];
    this.menuListeners = [];
    this.productListeners = [];
    this.commonListeners = [];

    fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(products => {
        this.products = products;
        this.menuItems = [...new Set(products.map(product => product.category))];

        this.notifyListeners("menu")
        this.notifyListeners("cart")
        this.notifyListeners("product")
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
        this.productListeners.push(listener);
        break;
      default:
        this.commonListeners.push(listener);
        break;
    }
  }

  updateCartList() {
    this.notifyListeners('cart')
  }

  showModal() {
    this.notifyListeners('modal')
  }

  filterProductsByCategory(category) {
    const filteredProducts = this.products.filter(product => product.category === category);

    this.productListeners.forEach(listener => {
      listener(filteredProducts)
    })
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
      default:
        this.commonListeners.forEach(listener => {
          listener(this.product)
        })
        break;
    }
  }
}