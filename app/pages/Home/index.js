
import Page from '../../classes/Page.js'

import MasonryGrid from '../../components/MasonryGrid'
import Card from '../../components/Card.js'

import { cards } from '../../data/cards.js'


import { each } from 'lodash'
const CARD_LIST = []




export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      element: '.home',
      elements: {
      }
    })
  }

  createMasonryGrid(){
    this.grid =  new MasonryGrid()
    this.createCards(cards)
    this.grid.render(CARD_LIST)
  }

  createCards(cards){
    // get an array of objects
    each(cards, (card) => {
      const customCard = new Card(card);
      customCard.card = card; // You may pass in any data you want to render in the custom element here.
      CARD_LIST.push(customCard);
    })
  }
    
  create(){
    // Must call super.create() otherwise the above line will overide the method created from the parent class
    super.create()

    // Initialize the MasonryGrid component
    this.createMasonryGrid()

    // Initialize the Card components
    this.createCards()
  }


}
