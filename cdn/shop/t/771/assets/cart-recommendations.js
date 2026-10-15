if(!customElements.get("cart-recommendations")){class CartRecommendations extends HTMLElement{constructor(){super(),this.productId=this.dataset.productId,this.excludedIds=this.dataset.excludeProducts.split(",")}connectedCallback(){this.productId&&fetch(window.Shopify.routes.root+`recommendations/products.json?product_id=${this.productId}&limit=4`).then(response=>response.json()).then(({products})=>{products.length<0||this.renderResults(products)})}renderResults(products){const filteredProducts=products.filter(product=>product.inventory_available!==!1&&!product.tags.find(tag=>tag==="base-product"||tag==="hide-product")&&!this.excludedIds.find(id=>id===product.id));if(filteredProducts.length<1||!filteredProducts){this.closest("[cart-recommendations]").classList.add("hidden");return}this.innerHTML=`
        ${filteredProducts.map(product=>`
            <intersection-loader 
              data-url="/products/${product.handle}" 
              data-section-id="product-tile-cart"
              class="!aspect-[6/1]"
            ></intersection-loader>                    
        `).join("")}
      `}}customElements.define("cart-recommendations",CartRecommendations)}
//# sourceMappingURL=/cdn/shop/t/771/assets/cart-recommendations.js.map?v=91615909458984286341756832316
