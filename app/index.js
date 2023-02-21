import '../styles/index.scss'

// Navigate through each file by pressing CTRL + T and deleting the hashtag

import Home from  './pages/Home/index.js'

import { each } from 'lodash'


class App {
  constructor() {
    // Only initializes a page when you are in that specific page
    this.createContent() 

    // Map of different pages which we will need to initialize
    this.createPages() 

    // Goes through all the links in the website
    this.addLinkListeners()

  }

  createContent() {
    // Select the 'content' div from each page
    this.content = document.querySelector('.content')

    // Finds the attribute of the page (look at line 46 in the base.pug file for more context)
    this.template = this.content.getAttribute('data-template')
    console.log(this.template) // if its on the home page it will console log 'home'
  }
    
  createPages() {
    // Map of templates
    this.pages = {
      home: new Home(),

    };
    
    console.log(this.pages)
    // this property holds all the elements and methods within a specific page
    this.page = this.pages[this.template]
    this.page.create()
    this.page.show() 
  }

    // Requests other page without having to refresh the url
  async onChange(url) {
    await this.page.hide();

    const res = await window.fetch(url)
    if (res.status === 200) {
      const html = await res.text()

      const div = document.createElement('div')
      div.innerHTML = html;

      const divContent = div.querySelector('.content')
      this.content.innerHTML = divContent.innerHTML

      this.template = divContent.getAttribute('data-template')
      this.content.setAttribute('data-template', this.template)

      this.page = this.pages[this.template]
      this.page.create()
      this.page.show()

      this.addLinkListeners()
    } else {
      console.error(`response status: ${res.status}`)
    }
  }
    
  addLinkListeners(){
    const links = document.querySelectorAll('a')

    // its like forEach()
    each(links, link =>{
      link.onclick = event => {
        const { href } = link
        event.preventDefault()

        this.onChange(href)
        // console.log(event)
      }
    })
  }
}

new App();

