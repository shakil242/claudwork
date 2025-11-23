/**
 * Shopify Post-Cart Upsell System
 * Displays upsell products after items are added to cart
 * Version: 1.0.0
 */

class ShopifyCartUpsell {
  constructor(config = {}) {
    this.config = {
      enabled: true,
      modalDelay: 300,
      autoCloseDelay: 0, // 0 means no auto-close
      showOnAllProducts: false,
      maxUpsellProducts: 4,
      upsellProducts: [], // Array of product handles or IDs
      recommendations: 'manual', // 'manual', 'related', 'collection'
      collectionHandle: '',
      excludeCurrentProduct: true,
      animations: true,
      ...config
    };

    this.isOpen = false;
    this.currentProduct = null;
    this.init();
  }

  init() {
    if (!this.config.enabled) return;

    // Intercept add to cart actions
    this.interceptAddToCart();

    // Create modal HTML
    this.createModal();

    // Setup event listeners
    this.setupEventListeners();
  }

  interceptAddToCart() {
    // Override form submissions for add to cart
    document.addEventListener('submit', (e) => {
      const form = e.target;

      // Check if it's an add to cart form
      if (form.getAttribute('action') === '/cart/add' ||
          form.querySelector('[name="id"]')) {
        e.preventDefault();
        this.handleAddToCart(form);
      }
    });

    // Intercept AJAX add to cart (common in modern themes)
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const response = await originalFetch(...args);
      const url = args[0];

      if (typeof url === 'string' && url.includes('/cart/add')) {
        const clonedResponse = response.clone();
        clonedResponse.json().then(data => {
          if (data.id) {
            this.currentProduct = data;
            this.showUpsellModal();
          }
        }).catch(() => {});
      }

      return response;
    };
  }

  async handleAddToCart(form) {
    try {
      const formData = new FormData(form);

      const response = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.id) {
        this.currentProduct = data;

        // Update cart count/drawer if exists
        this.updateCartUI();

        // Show upsell modal
        setTimeout(() => {
          this.showUpsellModal();
        }, this.config.modalDelay);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  async showUpsellModal() {
    if (this.isOpen) return;

    const modal = document.getElementById('cart-upsell-modal');
    if (!modal) return;

    // Load upsell products
    const products = await this.loadUpsellProducts();

    if (products.length === 0) {
      // No upsells, redirect to cart
      this.goToCart();
      return;
    }

    // Populate modal with products
    this.populateUpsellProducts(products);

    // Show modal
    modal.classList.add('active');
    document.body.classList.add('upsell-modal-open');
    this.isOpen = true;

    // Auto-close if configured
    if (this.config.autoCloseDelay > 0) {
      setTimeout(() => {
        this.closeModal();
      }, this.config.autoCloseDelay);
    }
  }

  async loadUpsellProducts() {
    let products = [];

    if (this.config.recommendations === 'manual' && this.config.upsellProducts.length > 0) {
      // Load manually specified products
      products = await this.fetchProductsByHandles(this.config.upsellProducts);
    } else if (this.config.recommendations === 'collection' && this.config.collectionHandle) {
      // Load from collection
      products = await this.fetchCollectionProducts(this.config.collectionHandle);
    } else if (this.config.recommendations === 'related') {
      // Load related products (requires product recommendations API)
      products = await this.fetchRelatedProducts();
    }

    // Filter out current product if configured
    if (this.config.excludeCurrentProduct && this.currentProduct) {
      products = products.filter(p => p.id !== this.currentProduct.product_id);
    }

    // Limit number of products
    return products.slice(0, this.config.maxUpsellProducts);
  }

  async fetchProductsByHandles(handles) {
    const products = [];

    for (const handle of handles) {
      try {
        const response = await fetch(`/products/${handle}.js`);
        const product = await response.json();
        products.push(product);
      } catch (error) {
        console.error(`Error fetching product ${handle}:`, error);
      }
    }

    return products;
  }

  async fetchCollectionProducts(collectionHandle) {
    try {
      const response = await fetch(`/collections/${collectionHandle}/products.json`);
      const data = await response.json();
      return data.products || [];
    } catch (error) {
      console.error('Error fetching collection products:', error);
      return [];
    }
  }

  async fetchRelatedProducts() {
    // This would use Shopify's product recommendations API
    // Requires product ID from current item
    if (!this.currentProduct || !this.currentProduct.product_id) {
      return [];
    }

    try {
      const response = await fetch(
        `/recommendations/products.json?product_id=${this.currentProduct.product_id}&limit=${this.config.maxUpsellProducts}`
      );
      const data = await response.json();
      return data.products || [];
    } catch (error) {
      console.error('Error fetching related products:', error);
      return [];
    }
  }

  populateUpsellProducts(products) {
    const container = document.querySelector('.upsell-products-grid');
    if (!container) return;

    container.innerHTML = products.map(product => {
      const variant = product.variants[0];
      const price = this.formatMoney(variant.price);
      const comparePrice = variant.compare_at_price > variant.price
        ? this.formatMoney(variant.compare_at_price)
        : null;

      return `
        <div class="upsell-product-card" data-product-id="${product.id}">
          <div class="upsell-product-image">
            ${product.featured_image ?
              `<img src="${product.featured_image}" alt="${product.title}" loading="lazy">` :
              '<div class="no-image">No image</div>'
            }
          </div>
          <div class="upsell-product-info">
            <h3 class="upsell-product-title">${product.title}</h3>
            <div class="upsell-product-price">
              ${comparePrice ? `<span class="compare-price">${comparePrice}</span>` : ''}
              <span class="price">${price}</span>
            </div>
            <button class="upsell-add-btn" data-variant-id="${variant.id}">
              Add to Cart
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Add click handlers for add to cart buttons
    container.querySelectorAll('.upsell-add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const variantId = btn.getAttribute('data-variant-id');
        this.addUpsellToCart(variantId, btn);
      });
    });
  }

  async addUpsellToCart(variantId, button) {
    const originalText = button.textContent;
    button.textContent = 'Adding...';
    button.disabled = true;

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: variantId,
          quantity: 1
        })
      });

      if (response.ok) {
        button.textContent = '✓ Added';
        this.updateCartUI();

        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
        }, 2000);
      } else {
        throw new Error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding upsell to cart:', error);
      button.textContent = 'Error';
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 2000);
    }
  }

  createModal() {
    const modal = document.createElement('div');
    modal.id = 'cart-upsell-modal';
    modal.className = 'cart-upsell-modal';

    modal.innerHTML = `
      <div class="upsell-overlay"></div>
      <div class="upsell-content">
        <button class="upsell-close" aria-label="Close">&times;</button>
        <div class="upsell-header">
          <h2>You might also like...</h2>
          <p>Complete your purchase with these recommendations</p>
        </div>
        <div class="upsell-products-grid"></div>
        <div class="upsell-footer">
          <button class="upsell-continue-btn">Continue Shopping</button>
          <button class="upsell-checkout-btn">View Cart & Checkout</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  setupEventListeners() {
    const modal = document.getElementById('cart-upsell-modal');
    if (!modal) return;

    // Close button
    modal.querySelector('.upsell-close').addEventListener('click', () => {
      this.closeModal();
    });

    // Overlay click
    modal.querySelector('.upsell-overlay').addEventListener('click', () => {
      this.closeModal();
    });

    // Continue shopping
    modal.querySelector('.upsell-continue-btn').addEventListener('click', () => {
      this.closeModal();
    });

    // Go to cart/checkout
    modal.querySelector('.upsell-checkout-btn').addEventListener('click', () => {
      this.goToCart();
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeModal();
      }
    });
  }

  closeModal() {
    const modal = document.getElementById('cart-upsell-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.classList.remove('upsell-modal-open');
    }
    this.isOpen = false;
  }

  goToCart() {
    this.closeModal();
    window.location.href = '/cart';
  }

  updateCartUI() {
    // Trigger cart update event for theme to handle
    fetch('/cart.js')
      .then(response => response.json())
      .then(cart => {
        // Dispatch custom event with cart data
        document.dispatchEvent(new CustomEvent('cart:updated', {
          detail: cart
        }));

        // Update cart count if element exists
        const cartCount = document.querySelector('[data-cart-count]');
        if (cartCount) {
          cartCount.textContent = cart.item_count;
        }
      });
  }

  formatMoney(cents) {
    // Basic money formatting - adjust for your currency
    return `$${(cents / 100).toFixed(2)}`;
  }

  destroy() {
    const modal = document.getElementById('cart-upsell-modal');
    if (modal) {
      modal.remove();
    }
    this.config.enabled = false;
  }
}

// Auto-initialize if config exists
document.addEventListener('DOMContentLoaded', () => {
  if (window.cartUpsellConfig) {
    window.cartUpsell = new ShopifyCartUpsell(window.cartUpsellConfig);
  }
});
