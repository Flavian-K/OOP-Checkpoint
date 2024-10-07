// Product class to define the product properties
class Product {
	constructor(id, name, price) {
		this.id = id;
		this.name = name;
		this.price = price;
	}
}

// ShoppingCartItem class to handle items in the cart
class ShoppingCartItem {
	constructor(product, quantity) {
		this.product = product;
		this.quantity = quantity;
	}

	calculateTotalPrice() {
		return this.product.price * this.quantity;
	}
}

// ShoppingCart class to manage the cart functionality
class ShoppingCart {
	constructor() {
		this.items = [];
	}

	addItem(product, quantity = 1) {
		const existingItem = this.items.find(
			(item) => item.product.id === product.id
		);
		if (existingItem) {
			existingItem.quantity += quantity;
		} else {
			this.items.push(new ShoppingCartItem(product, quantity));
		}
		this.updateTotalPrice();
	}

	removeItem(productId) {
		this.items = this.items.filter((item) => item.product.id !== productId);
		this.updateTotalPrice();
	}

	updateQuantity(productId, newQuantity) {
		const item = this.items.find((item) => item.product.id === productId);
		if (item) {
			item.quantity = newQuantity;
			if (item.quantity <= 0) {
				this.removeItem(productId);
			}
		}
		this.updateTotalPrice();
	}

	getTotalPrice() {
		return this.items.reduce(
			(total, item) => total + item.calculateTotalPrice(),
			0
		);
	}

	displayCartItems() {
		const totalElement = document.querySelector(".total");
		totalElement.innerText = `${this.getTotalPrice()} $`;

		this.items.forEach((item) => {
			console.log(
				`${item.product.name} - ${
					item.quantity
				} - Total: ${item.calculateTotalPrice()} $`
			);
		});
	}

	updateTotalPrice() {
		const totalElement = document.querySelector(".total");
		totalElement.innerText = `${this.getTotalPrice()} $`;
	}
}

// Setting up the products
const products = [
	new Product(1, "Baskets", 100),
	new Product(2, "Socks", 20),
	new Product(3, "Bag", 50),
];

// Initialize the cart
const cart = new ShoppingCart();

// UI Event listeners for adding, removing, and updating items
document.addEventListener("DOMContentLoaded", function () {
	const addButtons = document.querySelectorAll(".fa-plus-circle");
	const minusButtons = document.querySelectorAll(".fa-minus-circle");
	const trashIcons = document.querySelectorAll(".fa-trash-alt");

	addButtons.forEach((btn, index) => {
		btn.addEventListener("click", () => {
			cart.addItem(products[index]);
			updateQuantityDisplay(index);
		});
	});

	minusButtons.forEach((btn, index) => {
		btn.addEventListener("click", () => {
			const quantityElement = document.querySelectorAll(".quantity")[index];
			const currentQuantity = parseInt(quantityElement.innerText, 10);
			if (currentQuantity > 0) {
				cart.updateQuantity(products[index].id, currentQuantity - 1);
				updateQuantityDisplay(index);
			}
		});
	});

	trashIcons.forEach((icon, index) => {
		icon.addEventListener("click", () => {
			cart.removeItem(products[index].id);
			resetQuantityDisplay(index);
		});
	});
});

// Function to update quantity in the UI
function updateQuantityDisplay(index) {
	const quantityElement = document.querySelectorAll(".quantity")[index];
	const currentQuantity = parseInt(quantityElement.innerText, 10) + 1;
	quantityElement.innerText = currentQuantity;
}

// Function to reset quantity in the UI when an item is removed
function resetQuantityDisplay(index) {
	const quantityElement = document.querySelectorAll(".quantity")[index];
	quantityElement.innerText = "0";
}
