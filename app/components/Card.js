import gsap, { Draggable } from 'gsap/all'
gsap.registerPlugin(Draggable)


// This is a web component, it functions like a React component but it is made using vanilla javascript.
export default class Card extends HTMLElement {

  
  constructor(card){
    super();
    this.attachShadow({ mode: "open"});

    this.card = card
    this.images = card.images
    this.name = card.name
  }
  


  // Renders the card 
 connectedCallback() {
  this.render();
}


  // By it self web components have no styling so we have to use a getter to give them the styling located in the main.css
  get style() {
    return `  
      <style>
      @import url(../../styles/index.scss)
      </style>
    `
  }

  // Navigates to the previous image
  buttonPrev(e){
    e.preventDefault()
    if (this.slides !== 0){
      this.slides--;
      gsap.to(this.carousel, 
        { 
          x: `-${this.slides}00%`, 
          duration: 0.3, 
          ease: 'power2.out', 
          onComplete: () => {
            this.onToggle();
            this.update()
          } 
        });
    }
  }

  // Navigates to the next image
  buttonNext(e){
    // prevents navigating to the <a> href
    e.preventDefault();

    if (this.slides < this.carousel.children.length -1){
      this.slides++;
      gsap.to(this.carousel, 
        { 
          x: `-${this.slides}00%`, 
          duration: 0.3, 
          ease: 'power2.out', 
          onComplete: () => {
            this.onToggle();
            this.update()

          } 
        });
    }
  }

  onHover(){

    // Trigger the previous button animation
      this.prevButton.style.opacity = '1'
      this.prevButton.style.transform = 'translate3d(0px, -20px, 0px)'

      this.nextButton.style.transform = 'translate3d(0px, -20px, 0px)'
      this.nextButton.style.opacity = '1'
  }
  

  onToggle(){
    if(this.slides === 0 ){
      this.prevButton.style.display = 'none'
    }else{
      this.prevButton.style.display = 'flex'
    }

    if (this.slides === this.carousel.children.length -1){
      this.nextButton.style.display = 'none'
    }else{
      this.nextButton.style.display = 'flex'

    }
  }

  onLeave(){
    this.prevButton.style.opacity = '0'
    this.prevButton.style.transform = 'translate3d(0px, 20px, 0px)'

    this.nextButton.style.opacity = '0'
    this.nextButton.style.transform = 'translate3d(0px, 20px, 0px)'
  }

  onDrag(){
    const self =this

    this.slides = 0
    this.prevButton = this.shadowRoot.querySelector('.card__prev')
    this.nextButton = this.shadowRoot.querySelector('.card__next')
    this.gallery = this.shadowRoot.querySelector('.card__media__gallery')
    this.carousel = this.shadowRoot.querySelector('.card__media__carousel')
    this.slideArray  = this.shadowRoot.querySelectorAll('.card__image__wrapper')

    Draggable.create(this.carousel,{
      type: 'x',
      inertia: 'true',
      direction: "right",
      throwProps: true,
      resistance: 1000,
      onDragEnd: function() {
  
        let nearest100 = Math.round(calcPercent(this.x) / 100) * 100;
        function calcPercent(x) {
          const Xpercent = Math.round(x / self.carousel.offsetWidth * 100);
          return Xpercent;
        }
  
        // if you are scrolling to the left on the first card
        if (nearest100 > 0) {
          nearest100 = 0;
        }// if you are scrolling to the right on the last card
        else if (nearest100 <= self.carousel.childElementCount * -100){
          nearest100 = `-${self.carousel.children.length -1}00`
        }
  
        gsap.to(this.target, 
          { 
            x: `${nearest100}%`, 
            duration: 0.3, 
            ease: 'power2.out', 
            onComplete: () => {
            self.slides = Math.abs(nearest100 / 100);
            if (self.slides === 0){
              self.prevButton.style.display = 'none';
            }else{
              self.prevButton.style.display = 'flex';
            }
  
            if (self.slides === self.carousel.childElementCount -1){
              self.nextButton.style.display = 'none';
            }else{
              self.nextButton.style.display = 'flex';
            }

            self.update()
            } 

          })
  
      }
    });
  }
  
  addEventListeners(){
    this.shadowRoot.querySelector('.card__prev').addEventListener('click', (e) => this.buttonPrev(e));
    this.shadowRoot.querySelector('.card__next').addEventListener('click', (e) => this.buttonNext(e));
    this.shadowRoot.querySelector('.card__media').addEventListener('mouseover', () => this.onHover());
    this.shadowRoot.querySelector('.card__media').addEventListener('mouseleave', () => this.onLeave());
    this.onDrag()


  }
  
  update(){

    const slideIndexElement = this.shadowRoot.querySelector('.card__index__span');
    slideIndexElement.innerHTML = `${this.slides+ 1} / ${this.carousel.childElementCount}`;
  }

  render() { 
    

    this.shadowRoot.innerHTML = (`

    ${this.style}

    <a href="/committee/" class= "card">
      <div class="card__wrapper">
        <div class="card__media">
          <button class="card__prev">
            <svg class="card__prev__icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 13L1 7L7 1" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>
          <button class="card__next">
            <svg class="card__next__icon" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 13L1 7L7 1" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </button>
          <div class="card__media__gallery">
            <div class="card__media__carousel">
            ${this.images.map(image => `
            <div class="card__image__wrapper">
              <img class="card__image" src = ${image.src} alt=${image.alt} onmousedown="event.preventDefault()">
            </div>
            `).join('')}

            </div>
          </div>
        </div>
        <div class="card__description">
          <header class="card__description__header">
            <p class="card__title">${this.name}</p>
            <div class="card__index">
              <span class="card__index__span">
               1 / ${this.images.length}
              </span>
            </div>
          </header>
        </div>
      </div>
    </a>
  `
  )
    this.addEventListeners()
  }

}


    
if ('customElements' in window) {
	window.customElements.define('home-card', Card);
}


// ${this.images.map(image => `
// <div class="card__image__wrapper">
//   <img class="card__image" src = ${image.url} alt=${image.alt} onmousedown="event.preventDefault()">
// </div>
// `).join('')}