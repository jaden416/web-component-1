// This is the parent class for the all of the components in the 'component' folder
import EventEmitter from 'events'
import each from 'lodash/each'

export default class Component extends EventEmitter {
  constructor ({ 
    element,
    elements, 
  })  {
    super()
    
    // Selects elements on the page
    this.selector = element

    // Selects the elements children
    this.selectorChildren = {
      ...elements
    }

    // creates the intial elements
    this.create()

    // Updates the event listeners


    // Add the event listeners automatically
    this.addEventListeners()
  }

  create(){
    this.element = document.querySelector(this.selector)
    this.elements = {}

    // lodash each() is better at working with objects than a regular forEach()

    // The each function from the lodash library is used to loop through the children elements, 
    // it retrieves the corresponding elements from the DOM, and store them in the elements property.

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
          // EXPERIMENTAL: it originally was 'this.elements[key] = null'
          // EXPERIMENTAL: this.element = this.selector
          
          this.elements[key] = null // the NodeList will return null instead of an empty array []

        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry); // the NodeList will return us a node element
        }
      }

    });
  }

  // Animations

  addEventListeners(){

  }

  removeEventListeners(){

  }
}