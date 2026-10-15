if(!customElements.get("predictive-search")){let currency="$";window.location.href.includes("uk")?currency="\xA3":window.location.href.includes("eu")&&(currency="\u20AC");const generateProducTileMarkup=product=>`
    <intersection-loader 
			data-url="${product.url}"
			data-section-id="product-tile"
            data-class="swiper-slide"
			class="block w-fullcol-span-2 lg:col-span-3 2xl:col-span-4 loading relative swiper-slide"
    >
			<div class="h-full flex flex-col gap-4">
				<div class="aspect-[4/5] bg-secondaryLight"></div>
				<div class="bg-secondaryLight h-4 w-40 pt-5"></div>
				<div class="bg-secondaryLight h-2 w-80"></div>
				<div class="bg-secondaryLight h-3 w-20"></div>
				<div class="bg-secondaryLight h-5 w-40 mt-2"></div>
			</div>
    </intersection-loader>
  `;class PredictiveSearch extends HTMLElement{constructor(){super(),this.autofillValue="",this.searchModalOpen=!1,this.searchUrl=this.dataset.searchUrl,this.searchQuery=""}connectedCallback(){window.addEventListener("load",()=>{this.trendingSearchWrapper=this.querySelector("[data-trending-search-wrapper]"),this.predictiveSearchWrapper=this.querySelector("[data-predictive-search-wrapper]"),this.predictiveCount=this.querySelector("[data-count]"),this.searchInput=this.querySelector("[data-search-input]"),this.searchQuery=this.searchInput.value,this.autosuggestField=this.querySelector("[data-auto-suggest]"),this.addKeydownListener()}),this.addDelegatedClickListeners()}addDelegatedClickListeners(){window.addEventListener("click",e=>{if(e.target.closest(`[href="${this.searchUrl}"]`)){e.preventDefault(),this.open();return}if(e.target.closest("[data-close-search]")&&this.searchModalOpen){this.close();return}if(!e.target.closest("predictive-search")&&!e.target.closest("[data-quickbuy-action]")&&this.searchModalOpen){this.close();return}})}addKeydownListener(){this.searchInput.addEventListener("keydown",e=>{e.key==="ArrowRight"&&(this.searchInput.value=this.autofillValue)}),this.searchInput.addEventListener("input",e=>{if(this.searchQuery=encodeURIComponent(this.searchInput.value),!e.target.value){this.searchInput.value="",this.updateAutoSuggest(),this.updateSearchResults();return}this.fetchPredictiveResults()})}close(){const fadeOut=function(){this.classList.replace("fixed","hidden"),this.removeEventListener("transitionend",fadeOut)};if(document.body.classList.remove("overlay","offset"),this.searchModalOpen=!1,this.classList.add("opacity-0"),this.addEventListener("transitionend",fadeOut,!1),this.setPageInert(!1),this.setAttribute("aria-hidden","true"),this.focusinHandler&&(document.removeEventListener("focusin",this.focusinHandler),this.focusinHandler=null),this.keydownHandler&&(document.removeEventListener("keydown",this.keydownHandler,!0),this.keydownHandler=null),window.matchMedia("(max-width: 767px)").matches){document.querySelector('[data-mobile-drawer] [href="/search"]')?.focus();return}window.innerWidth>1024?document.querySelector("[data-search-desk]")?.focus():document.querySelector("[data-search-mobile]")?.focus()}open(){this.searchModalOpen=!0,this.classList.replace("hidden","fixed"),this.setAttribute("aria-hidden","false"),this.setAttribute("aria-modal","true"),this.setPageInert(!0),this.querySelector("[data-search-input]")?.focus(),setTimeout(()=>{this.classList.remove("opacity-0")},10),setTimeout(()=>{document.body.classList.add("overlay","offset")},200),this.focusinHandler=e=>{if(!this.searchModalOpen||this.contains(e.target))return;(this.getFocusableElements()[0]||this.querySelector("[data-search-input]"))?.focus()},document.addEventListener("focusin",this.focusinHandler),this.keydownHandler=e=>{this.searchModalOpen&&e.key==="Escape"&&(e.preventDefault(),this.close())},document.addEventListener("keydown",this.keydownHandler,!0)}updateAutoSuggest(results){if(!results){this.autofillValue="",this.autosuggestField.placeholder=this.autofillValue;return}const autofill=this.allTitles?.split(" ").find(string=>string.substring(0,this.searchQuery.length).includes(this.searchQuery.toUpperCase()))||"";this.autofillValue=autofill,this.autosuggestField.placeholder=this.autofillValue}updateSearchResults(results){const liveAria=this.querySelector("[data-results-aria]");if(!results?.length){this.autofillValue="",this.predictiveSearchWrapper.style.display="none",this.trendingSearchWrapper.style.removeProperty("display"),liveAria.innerHTML="No Results Found";return}this.predictiveCount.innerHTML=results?.length;const filteredResults=results.filter(product=>!(product.tags.find(tag=>tag==="newsite-hidden")||product.tags.find(tag=>tag==="base_product")||product.tags.find(tag=>tag==="hide_product")));this.trendingSearchWrapper.style.display="none",this.predictiveSearchWrapper.style.removeProperty("display"),results?.length>2?liveAria.innerHTML="More than 3 Results Found":liveAria.innerHTML=`${results?.length} Results Found`,this.predictiveSearchWrapper.innerHTML=`
              <div class="flex flex-col">
                  <strong class="text-xl pb-7">Top Suggestions</strong>
                  <ul class="flex flex-col pt-0.5 pb-6 gap-3.5 ">
                      ${[...new Set(this.allTitles.split(" "))].filter(x=>x.toLowerCase().includes(this.searchQuery.toLowerCase())).slice(0,10).map(word=>word&&`
                          <li>
                              <a href="/search?q=${word}">${word}</a>
                          </li>
                      `).join("")}
                  </ul>
              </div>
              <swiper-carousel
                  data-space-between="4"
                  data-slides-per-scroll="1"
                  data-slides-per-view="1"
                  data-centered="true"
                  data-centered-bounds="true"
                  class="w-screen block md:hidden -mx-8 px-8 mt-auto min-h-[414px] overflow-hidden"
              >
                  <a href="#search-end-of-carousel" tabindex="0" class="skip-carousel">Skip carousel</a>
                  <div class="swiper-wrapper">
                    ${filteredResults.slice(0,4).map(product=>product&&generateProducTileMarkup(product)).join("")}
                  </div>
              </swiper-carousel>
              <span id="search-end-of-carousel" class="md:hidden"></span>
              ${filteredResults.slice(0,4).map(product=>product&&`
                <div class='hidden md:block'>
                  ${generateProducTileMarkup(product)}
                </div>
              `).join("")}
          `}async fetchPredictiveResults(){await fetch(`${window.Shopify.routes.root}search/suggest.json?q=${this.searchQuery}&limit=5&resources[type]=product&resources[options][unavailable_products]=hide&resources[options][fields]=title,product_type,variants.title`).then(response=>response.json()).then(suggestions=>{const productSuggestions=suggestions?.resources?.results?.products.filter(product=>!(product.tags.find(tag=>tag==="newsite-hidden")||product.tags.find(tag=>tag==="base_product")));this.allTitles=`${productSuggestions.map(({title})=>title).join(" ").split(" ").filter(x=>x.length>1).filter(title=>!title.toLowerCase().includes("base")).map(x=>x).join(" ")}`,this.updateAutoSuggest(productSuggestions),this.updateSearchResults(productSuggestions)})}setPageInert(isInert){const keepInteractive=this;[document.querySelector("header"),document.querySelector("main"),document.querySelector("footer")].filter(Boolean).forEach(el=>{isInert?(el.setAttribute("inert",""),el.setAttribute("aria-hidden","true")):(el.removeAttribute("inert"),el.removeAttribute("aria-hidden"))}),isInert&&(keepInteractive.removeAttribute("inert"),keepInteractive.removeAttribute("aria-hidden"))}getFocusableElements(){return[...this.querySelectorAll(`
          a[href],
          button:not([disabled]),
          input:not([disabled]):not([type="hidden"]),
          textarea:not([disabled]),
          select:not([disabled]),
          [tabindex]:not([tabindex="-1"])
      `)].filter(el=>{const style=window.getComputedStyle(el);return!(style.display==="none"||style.visibility==="hidden"||el.closest(".hidden")||el.offsetParent===null&&style.position!=="fixed")})}}customElements.define("predictive-search",PredictiveSearch)}
//# sourceMappingURL=/cdn/shop/t/771/assets/predictive-search.js.map?v=182909019826779017851784845731
