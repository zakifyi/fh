if(!customElements.get("swatch-image")){class SwatchImage extends HTMLElement{constructor(){super(),this.id=uuidv4()}connectedCallback(){this.fallback=this.dataset.fallback||!1,this.noImage=this.dataset.noImage||!1,this.imgSrc=this.dataset.src||!1,this.imgSrc&&(this.observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{entry.isIntersecting&&(this.init(),this.observer.unobserve(this))})},{rootMargin:"0px",threshold:.1}),this.observer.observe(this))}init(){this.image=new Image,this.image.src=this.imgSrc,this.image.complete?this.populateImage():(this.image.onload=()=>{this.populateImage()},this.image.onerror=()=>{if(this.fallback&&this.imgSrc!==this.fallback){this.imgSrc=this.fallback,this.init();return}if(this.noImage&&this.imgSrc!==this.noImage){this.imgSrc=this.noImage,this.init();return}})}populateImage(){this.imgSrc.toLowerCase().includes("logo")&&this.classList.remove("rounded-full"),this.imgSrc.toLowerCase().includes("swatch")&&this.classList.add("rounded-full","overflow-hidden"),this.innerHTML=`
        <img 
          class="absolute top-0 left-0 w-full h-full object-contain object-center" 
          width="150" 
          height="150"
          alt=""
          src="${this.imgSrc}"
        >
      `}}customElements.define("swatch-image",SwatchImage)}
//# sourceMappingURL=/cdn/shop/t/771/assets/swatch-image.js.map?v=161655543004484497881712686572
