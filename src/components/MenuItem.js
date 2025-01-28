import { Component } from "../common/Component.js";

export class MenuItem extends Component {
  render() {
    const categoryList = document.createElement('ul');
    categoryList.id = "category-list";
    categoryList.className = "list-none p-0";

    this.props.cartContext.menuItems.forEach(category => {
      const categoryItem = document.createElement("li");
      categoryItem.className = "mb-4";

      const categoryButton = document.createElement("button");
      categoryButton.className = "bg-transparent border-none text-md cursor-pointer text-left w-full hover:underline hover:z-8"

      categoryButton.textContent = category;
      categoryButton.addEventListener("click", () => {
        this.props.cartContext.filterProductsByCategory(category);
      });
      categoryItem.appendChild(categoryButton);
      categoryList.appendChild(categoryItem);
    });

    return categoryList;
  }
}