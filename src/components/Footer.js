import { Component } from "../common/Component.js";

export class Footer extends Component {
  render() {
    const footer = document.createElement('footer');
    footer.className = 'w-full bg-gray-800 text-white py-4 ';
    footer.innerHTML = `<div class="max-w-6xl mx-auto text-center">
      <p>&copy; 2025 Cartoonist. All rights reserved.</p>
      <p>Powered by Phil</p>
    </div>`

    return footer;
  }
}