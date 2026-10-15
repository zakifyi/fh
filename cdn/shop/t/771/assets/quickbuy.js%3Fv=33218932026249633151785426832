if(!customElements.get("quick-buy")){class Quickbuy extends HTMLElement{constructor(){super(),this.isCart=this.dataset.tileType=="cart",this.sizeSyncing=!1}connectedCallback(){if(this.masterVariantSelector=this.querySelector('[action="/cart/add"] select[name="id"]'),this.dataset.products&&(this.products=JSON.parse(this.dataset.products.replaceAll("%27","&apos;").replaceAll("%22","&quot;"))||!1,this.id=this.dataset.id,this.variants=[...new Set(this.products.filter(({tags})=>!tags.find(tag=>tag==="base_product")).map(({variants})=>variants).flat())],this.swatches=Object.assign({},...this.products.map(({swatches})=>swatches)),this.initialProduct=this.products.find(({id})=>id===this.id),this.activeVariant=this.initialProduct.variants.find(({default_selected})=>default_selected)??this.variants.find(({default_selected})=>default_selected),this.colors=[...new Set(this.products.filter(({tags})=>!tags.find(tag=>tag==="newsite-hidden")).map(x=>x.colors).flat())],this.flavors=[...new Set(this.products.filter(({tags})=>!tags.find(tag=>tag==="newsite-hidden")).map(x=>x.flavors).flat())],this.sizes=[...new Set(this.products.map(x=>x.sizes).flat())],this.availableOptions=this.variants.map(variant=>{if(variant.available)return variant.options.map(x=>x)}).filter(x=>x),this.isCart&&!this.variants.some(variant=>variant.available))){this.remove();return}if(this.image=this.querySelector("[data-img]"),this.hoverImage=this.querySelector("[data-img-hover]"),this.urls=[...this.querySelectorAll("[data-url]")],this.productOption=this.querySelector("[data-product-option]"),this.priceMoney=this.querySelector("[data-price-money]"),this.swatchSelectors=this.querySelector("[data-swatch-selectors]"),this.sizeSelectors=this.querySelector("[data-size-selectors]"),this.atcWrap=this.querySelector("[data-atc-wrap]"),this.badgeWrap=this.querySelector("[data-badge-wrap]"),this.form=this.querySelector('[action="/cart/add"]'),!this.products&&!this.isCart){this.dataset.productHandle&&(this.classList.add("aspect-[3/4]","relative","flex","items-center","justify-center","loading"),this.innerHTML=`
            <div class="loader">
              <span class="block w-12 h-12">
                <svg class="animate-spin -ml-1 mr-3 h-full w-full text-accent1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
            </div>
          `,this.observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{entry.isIntersecting&&(this.loadFromAPI(),this.observer.unobserve(this))})},{rootMargin:"0px",threshold:.1}),this.observer.observe(this));return}const selectedOptions=[...this.querySelectorAll('[data-quickbuy-action="option-choice"]:checked')].map(input=>input.value);if(selectedOptions.length){const preSelectedVariant=this.initialProduct.variants.find(variant=>selectedOptions.every(x=>variant.options.find(y=>y===x)));preSelectedVariant&&(this.activeVariant=preSelectedVariant)}this.populateQuickbuyMarkup(),this.setPointsPrice(),this.addEventListener("click",e=>{const clickedElement=e.target.closest("[data-quickbuy-action]");if(!clickedElement)return;const{quickbuyAction:action}=clickedElement.dataset;action==="option-choice"&&(this.chooseOption(),this.setPointsPrice())}),this.addEventListener("change",e=>{const changedEl=e.target.closest("[data-quickbuy-action]");changedEl&&changedEl.dataset.quickbuyAction==="option-choice"&&(this.chooseOption(),this.setPointsPrice())})}getActiveParentProduct(){return this.activeVariant&&this.products?.find(p=>p.variants?.some(v=>v.id===this.activeVariant.id))||null}isSizeAvailableForActive(size){const parent=this.getActiveParentProduct();if(!parent)return!1;const sizeLower=String(size).toLowerCase();return parent.variants?.some(v=>v.available&&v.options?.some(o=>String(o).toLowerCase()===sizeLower))}chooseOption(){const selectedOptions=[...this.querySelectorAll('[data-quickbuy-action="option-choice"]:checked'),...this.querySelectorAll('select[data-quickbuy-action="option-choice"]')].map(el=>el.value).filter(Boolean),flavorOrColor=selectedOptions.filter(x=>this.flavors?.includes(x)||this.colors?.includes(x)),previousParent=this.getActiveParentProduct(),targetParent=flavorOrColor.length?this.products.find(p=>flavorOrColor.every(x=>p.flavors?.includes(x)||p.colors?.includes(x))):previousParent,flavorOrColorChanged=!!targetParent&&!!previousParent&&targetParent.id!==previousParent.id;let newVariant;if(flavorOrColorChanged?newVariant=targetParent.variants.find(v=>v.default_selected)??targetParent.variants.find(v=>v.available)??targetParent.variants[0]:(newVariant=this.variants.find(variant=>selectedOptions.every(x=>variant.options.find(y=>y===x))),newVariant||(newVariant=targetParent?.variants.find(v=>v.default_selected)??targetParent?.variants.find(v=>v.available)??targetParent?.variants[0])),this.isCart||(newVariant?.available?this.form.style.display=null:this.form.style.display="none"),!newVariant)return;const flavorOption=newVariant.options?.find(opt=>this.flavors?.find(x=>x===opt)),colorOption=newVariant.options?.find(opt=>this.colors?.find(x=>x===opt)),parentProduct=this.products.find(product=>product.variants.find(({id})=>id===newVariant.id));if(this.masterVariantSelector.value=newVariant.id,this.urls.forEach(url=>{url.href=newVariant.url}),this.image.setAttribute("alt",newVariant.image.alt),this.image.src=newVariant.image.src,this.image.srcset=`${newVariant.image.src}&width=352 352w, ${newVariant.image.src}&width=832 832w, ${newVariant.image.src}width=1200 1200w`,newVariant&&this.badgeWrap&&(this.badgeWrap.innerHTML="",newVariant.available||(this.badgeWrap.innerHTML+=`
            <div data-out-of-stock class="px-2.5 py-1.5 bg-primaryDark text-primaryLight">
              Out of stock
            </div>
          `),parentProduct.tags.map(tag=>{tag.includes("badge-light")?this.badgeWrap.innerHTML+=`<div class="px-2.5 py-1.5 bg-primaryLight text-primaryDark">${tag.replace("badge-light:","")}</div>`:tag.includes("badge")&&(this.badgeWrap.innerHTML+=`<div class="px-2.5 py-1.5 bg-primaryDark text-primaryLight">${tag.replace("badge:","")}</div>`)})),this.querySelector("[data-product-title]")&&(this.querySelector("[data-product-title]").innerHTML=parentProduct.title?.split("|")?.[0]),this.querySelector("[data-logos-wrap]")&&(parentProduct?.product_features?.length?this.querySelector("[data-logos-wrap]").innerHTML=parentProduct.product_features.map(f=>`<swatch-image data-type="logo" class="block relative min-w-[42px] min-h-[42px] w-10 h-10" data-src="${f.icon}"></swatch-image>`).join(""):this.querySelector("[data-logos-wrap]").innerHTML=`
            <swatch-image data-type="logo" class="block relative min-w-[42px] min-h-[42px] w-10 h-10" data-src="${parentProduct?.logos?.[0]}"></swatch-image>
          `),this.hoverImage){let hoverImage=parentProduct.images[Number(parentProduct.images.findIndex(({src})=>src===newVariant.image.src))+1];hoverImage||(hoverImage=parentProduct.images[0]),this.hoverImage.setAttribute("alt",hoverImage.alt),this.hoverImage.src=hoverImage.src,this.hoverImage.srcset=`${hoverImage.src}&width=352 352w, ${hoverImage.src}&width=832 832w, ${hoverImage.src}width=1200 1200w`}this.isCart||(this.productOption.innerHTML=`${colorOption?`<span class="px-2">&bull;</span>${colorOption}`:""}${flavorOption?`<span class="px-2">&bull;</span>${flavorOption}`:""}`),this.activeVariant=newVariant,this.populateQuickbuyMarkup()}setPointsPrice(){if(!this.activeVariant?.id)return;const pointsPriceWrapper=this.querySelector("[data-price-points]");pointsPriceWrapper&&poll(()=>window.loyaltyApiAuthed,1e4,150).then(()=>{loyaltyApi.getPointCost(this.activeVariant.id,{}).then(res=>{res.point_cost&&(pointsPriceWrapper.innerText=`${res.point_cost} PTS`)}).catch(()=>{})}).catch(()=>{})}populateQuickbuyMarkup(){const isAvailable=swatch=>this.products.some(product=>product.variants.some(variant=>variant.available&&variant.options.includes(swatch)));if(this.swatchSelectors){const existingInputs=this.swatchSelectors.querySelectorAll('input[data-quickbuy-action="option-choice"]');if(existingInputs.length>0)existingInputs.forEach(input=>{input.checked=this.activeVariant.options.includes(input.value)});else if(this.isCart){const availableColors=this.colors.filter(isAvailable),availableFlavors=this.flavors.filter(isAvailable),buildSwatch=(swatch,i,groupName)=>{const swatchUrl=this.swatches[swatch],randomNumber=Math.floor(Math.random()*1e5+1);return`
              <li class="relative rounded-full only:hidden">
                <input
                  ${this.activeVariant.options.includes(swatch)?'checked="true"':""}
                  id="swatch-${swatch}-${i}-${randomNumber}"
                  class="peer absolute cursor-pointer top-0 left-0 w-full h-full opacity-0 z-10"
                  data-quickbuy-action="option-choice"
                  type="radio"
                  value="${swatch}"
                  name="${groupName}-${this.id}"
                >
                <label for="swatch-${swatch}-${i}-${randomNumber}" class="sr-only">Swatch for ${swatch}</label>
                <div
                  data-swatch
                  aria-hidden="true"
                  style="background-image: url('${swatchUrl||""}')"
                  class="w-4 md:w-3 h-4 md:h-3 shadow rounded-full bg-secondaryLight bg-contain bg-center m-0.5"
                ></div>
                <div
                  aria-hidden="true"
                  class="absolute top-0 left-0 w-full h-full rounded-full border border-transparent transition duration-200 peer-checked:border-primaryDark"
                ></div>
              </li>
            `};availableColors.length>1&&(this.swatchSelectors.innerHTML+=availableColors.map((swatch,i)=>buildSwatch(swatch,i,"color-swatch")).join("")),availableFlavors.length>1&&(this.swatchSelectors.innerHTML+=availableFlavors.map((swatch,i)=>buildSwatch(swatch,i,"flavors-swatch")).join(""))}else this.colors.length>1&&(this.swatchSelectors.innerHTML+=this.colors.map((swatch,i)=>{const available=isAvailable(swatch),swatchUrl=this.swatches[swatch],randomNumber=Math.floor(Math.random()*1e5+1);return`
                <li class="relative rounded-full only:hidden ${available?"":"[&_[data-swatch]]:opacity-50"} ">
                  ${available?"":`<div class="absolute inset-0 after:content-[''] after:absolute after:w-[1px] after:bg-[#525252] after:h-[75%] after:text-[#525252] after:rotate-45 after:top-[2px] after:left-1/2 after:-translate-x-1/2"></div>`}
                  <input
                    ${this.activeVariant.options.includes(swatch)?'checked="true"':""}
                    id="swatch-${swatch}-${i}-${randomNumber}"
                    class="peer absolute cursor-pointer disabled:cursor-not-allowed top-0 left-0 w-full h-full opacity-0 z-10"
                    data-quickbuy-action="option-choice"
                    type="radio"
                    value="${swatch}"
                    ${available?"":'tabIndex="0"'}
                    name="color-swatch-${this.id}"
                  >
                  <label for="swatch-${swatch}-${i}-${randomNumber}" class="sr-only">Swatch for ${swatch}</label>
                  <div
                    data-swatch
                    aria-hidden="true"
                    style="background-image: url('${swatchUrl||""}')"
                    class="w-4 md:w-3 h-4 md:h-3 shadow rounded-full bg-secondaryLight bg-contain bg-center m-0.5 peer-disabled:opacity-40"
                  ></div>
                  <div
                    aria-hidden="true"
                    class="absolute top-0 left-0 w-full h-full rounded-full border border-transparent peer-disabled:opacity-40 transition duration-200 peer-checked:border-primaryDark"
                  ></div>
                </li>
              `}).join("")),this.flavors.length>1&&(this.swatchSelectors.innerHTML+=this.flavors.map((swatch,i)=>{const available=isAvailable(swatch),swatchUrl=this.swatches[swatch],randomNumber=Math.floor(Math.random()*1e5+1);return`
                <li class="relative rounded-full only:hidden ${available?"":"[&_[data-swatch]]:opacity-50"} ">
                  ${available?"":`<div class="absolute inset-0 after:content-[''] after:absolute after:w-[1px] after:bg-[#525252] after:h-[75%] after:text-[#525252] after:rotate-45 after:top-[2px] after:left-1/2 after:-translate-x-1/2"></div>`}
                  <input
                    ${this.activeVariant.options.includes(swatch)?'checked="true"':""}
                    id="swatch-${swatch}-${i}-${randomNumber}"
                    class="peer absolute cursor-pointer disabled:cursor-not-allowed top-0 left-0 w-full h-full opacity-0 z-10"
                    data-quickbuy-action="option-choice"
                    type="radio"
                    value="${swatch}"
                    ${available?"":'tabIndex="0"'}
                    name="flavors-swatch-${this.id}"
                  >
                  <label for="swatch-${swatch}-${i}-${randomNumber}" class="sr-only">Swatch for ${swatch}</label>
                  <div
                    data-swatch
                    aria-hidden="true"
                    style="background-image: url('${swatchUrl||""}')"
                    class="w-4 md:w-3 h-4 md:h-3 shadow rounded-full bg-secondaryLight bg-contain bg-center m-0.5 peer-disabled:opacity-40"
                  ></div>
                  <div
                    aria-hidden="true"
                    class="absolute top-0 left-0 w-full h-full rounded-full border border-transparent peer-disabled:opacity-40 transition duration-200 peer-checked:border-primaryDark"
                  ></div>
                </li>
              `}).join(""))}if(this.sizeSelectors&&this.sizes.length>0)if(this.isCart){const parent=this.products?.find(p=>p.variants?.some(v=>v.id===this.activeVariant?.id)),isSizeAvailableForThisProduct=size=>{if(!parent)return!1;const s=String(size).toLowerCase();return parent.variants?.some(v=>v.available&&v.options?.some(o=>String(o).toLowerCase()===s))},activeSize=this.activeVariant?.options?.find(opt=>this.sizes.some(s=>s.toLowerCase()===opt.toLowerCase()));if(this.sizeSelectors.innerHTML=this.sizes.filter(isSizeAvailableForThisProduct).map(size=>{let sizeLabel=size;size.toLowerCase()==="small"?sizeLabel="SM":size.toLowerCase()==="medium"?sizeLabel="MD":size.toLowerCase()==="large"&&(sizeLabel="LG");const isSelected=activeSize&&activeSize.toLowerCase()===size.toLowerCase();return`
							<option
								value="${size}"
								${isSelected?"selected":""}
							>${sizeLabel.toUpperCase()}</option>
						`}).join(""),!this.sizeSyncing){const prevValue=this.sizeSelectors.value,keepActive=activeSize&&isSizeAvailableForThisProduct(activeSize)?activeSize:null,firstAvailable=this.sizes.find(s=>isSizeAvailableForThisProduct(s)),selectedSize=keepActive||firstAvailable||null;selectedSize&&prevValue!==selectedSize&&(this.sizeSyncing=!0,this.sizeSelectors.value=selectedSize,this.chooseOption(),this.setPointsPrice(),this.sizeSyncing=!1)}}else{const activeParent=this.getActiveParentProduct()??this.initialProduct,sizesForActiveFlavor=activeParent?.sizes?.length?activeParent.sizes:this.sizes,isAvailableForActiveFlavor=size=>activeParent?.variants?.some(v=>v.available&&v.options.includes(size));if(this.atcWrap?.classList.add("before:block","before:absolute","before:bg-primaryLight","before:-right-1.5","before:-top-1.5","before:-left-1.5","before:-bottom-1.5"),sizesForActiveFlavor.length===1){const[size]=sizesForActiveFlavor;this.sizeSelectors.classList.remove("grid","grid-cols-6","w-full"),this.sizeSelectors.classList.add("inline-flex","w-max"),this.sizeSelectors.innerHTML=`
              <li class="list-none flex items-center h-full relative">
                <div class="h-full flex items-center justify-center border border-primaryDark px-4 text-small font-bold uppercase">${size}</div>
              </li>
            `;return}this.sizeSelectors.classList.remove("inline-flex","w-max"),this.sizeSelectors.classList.add("grid","grid-cols-6","w-full"),this.sizeSelectors.innerHTML=sizesForActiveFlavor.map((size,i)=>{const available=isAvailableForActiveFlavor(size),randomNumber=Math.floor(Math.random()*1e5+1);let sizeLabel=size;return size.toLowerCase()==="small"?sizeLabel="SM":size.toLowerCase()==="medium"?sizeLabel="MD":size.toLowerCase()==="large"&&(sizeLabel="LG"),`
              <li class="relative list-none">
                <input
                  class="absolute top-0 left-0 h-full w-full opacity-0 peer cursor-pointer z-10 disabled:cursor-not-allowed"
                  data-quickbuy-action="option-choice"
                  id="graphic_swatch_${size}_${i}_${randomNumber}"
                  aria-label="${size}"
                  type="radio"
                  ${available?"":"disabled"}
                  name="graphic_swatch-select"
                  value="${size}"
                  data-option="${size}"
                  ${this.activeVariant.options.some(x=>x.toLowerCase()===size.toLowerCase())?"checked":""}
                />
                <label
                  class="text-tiny border border-secondaryLight peer-focus:outline peer-checked:border-primaryDark block peer-disabled:bg-secondaryLight peer-disabled:text-secondaryDark flex h-full w-full items-center justify-center text-center"
                  for="graphic_swatch_${size}_${i}_${randomNumber}"
                >
                  ${sizeLabel.toUpperCase()}
                </label>
              </li>
            `}).join("")}}loadFromAPI(){fetch(`/products/${this.dataset.productHandle}?section_id=product-tile`).then(response=>response.text()).then(text=>{const html=text,tile=document.createElement("div");tile.innerHTML=html,this.replaceWith(tile)})}}customElements.define("quick-buy",Quickbuy)}
//# sourceMappingURL=/cdn/shop/t/771/assets/quickbuy.js.map?v=33218932026249633151785426832
