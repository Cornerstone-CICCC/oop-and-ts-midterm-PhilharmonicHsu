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

  addProduct(product) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    console.log(existingProduct)
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }

    this.notifyListeners('cart')
  }

  removeProduct(id) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== id);
    this.notifyListeners('cart')
  }

  increaseQuantity(id) {
    const item = this.cartItems.find(cartItem => cartItem.id === id)

    item.quantity += 1;

    this.notifyListeners('cart')
  }

  decreaseQuantity(id) {
    const item = this.cartItems.find(cartItem => cartItem.id === id)

    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== id);
    }

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