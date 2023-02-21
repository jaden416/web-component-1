// This is the parent class for the all of the classes in the 'pages' folder
import GSAP from 'gsap'
import each from 'lodash/each'

export default class Page {
  constructor ({ 
    element,
    elements, 
    id 
  })  {
    // Selects elements on the page
    this.selector = element

    // Selects the elements children
    this.selectorChildren = {
      ...elements
    }

    this.id = id
  }

  create(){
    this.element = document.querySelector(this.selector)
    this.elements = {}

    // lodash each() is better at working with objects than a regular forEach()

    // this entire function prevents complex index searching like this: 'this.elements.link[0].addEventListener('click')'
    each(this.selectorChildren, (entry, key) => {
      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry;
      } else {
        this.elements[key] = document.querySelectorAll(entry);

        if (this.elements[key].length === 0) {
          this.elements[key] = null; // the NodeList will return null instead of an empty array []
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry); // the NodeList will return us a node element
        }
      }

    });
    console.log('Create', this.id)
  }

  // Animations

  // creates a fade in animation (will be changed later)
  show(){
    return new Promise(resolve =>{
      GSAP.from(this.element, {
        // autoAlpha: 0,
        // onComplete: resolve
      })
    })
  }

  // creates a fade out animation (will be changed later)
  hide(){
    return new Promise(resolve =>{
      GSAP.to(this.element, {
        // autoAlpha: 0,
        // onComplete: resolve
      })
    })
  }

  // Events

  onResize() {
    if (this.elements.wrapper) {
      this.scroll.limit =
        this.elements.wrapper.clientHeight - window.innerHeight;
    }

    
  }
}