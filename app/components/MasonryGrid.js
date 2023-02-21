import Component from "../classes/Component.js"



export default class MasonryGrid extends Component {
  constructor(){
    super({
      element: `.masonry__grid`,
      elements: {

      }
    })
    // This element will check the screen width and change the grid based on it.
    this.previousScreenSize = window.innerWidth;
  }


  render(cards){

    this.generateMasonryGrid(1, cards)
    let previousScreenSize = window.innerWidth


    

    // Inital page load
    if (previousScreenSize < 600){
        this.generateMasonryGrid(1, cards)
    }else if(previousScreenSize >= 600 && previousScreenSize < 776){
        this.generateMasonryGrid(2, cards)

    }else{
        this.generateMasonryGrid(4, cards)
    }


  // When the browser renders to another viewport width
  window.addEventListener('resize', () => {
    if(window.innerWidth < 600 && previousScreenSize >= 600){
        this.generateMasonryGrid(1, cards);
        
    }else if(window.innerWidth >= 600 && window.innerWidth < 776 && (previousScreenSize < 600 || previousScreenSize >= 776)){
        this.generateMasonryGrid(2, cards);

    }else if(window.innerWidth >= 776 && previousScreenSize < 776){
        this.generateMasonryGrid(4, cards)
    }
    previousScreenSize = window.innerWidth;
  })

  this.resizeMasonryGrid()

}


  generateMasonryGrid(columns, cards){
    this.element.innerHTML = ''
  
    // Stores all of our column arrays which contain relevant cards
    const columnWrappers = {};
  
    // Create column item array and add this column wrapper object
    for(let i = 0; i< columns; i++){
      columnWrappers[`column${i}`] = []
    }
  
    // Creates a column and pushes a card into it
    for(let i = 0; i < cards.length; i++){

      // mod picks the column the card will reside in
      const column = i % columns;

      // now push it in there
      console.log(cards)
      columnWrappers[`column${column}`].push(cards[i])
    }
  
    // render loop
    for (let i = 0; i< columns; i++){
      const columnCards = columnWrappers[`column${i}`];
      const column = document.createElement('div');
      column.classList.add('column')

      console.log(columnCards)
      
      columnCards.forEach(card => {
        column.append(card)
      });
      this.element.appendChild(column)
    }
  }


  resizeMasonryGrid(){
    let previousScreenSize = window.innerWidth
    
    // When the browser renders to another viewport width
    window.addEventListener('resize', () => {
      if(window.innerWidth < 600 && previousScreenSize >= 600){
        

      }else if(window.innerWidth >= 600 && window.innerWidth < 776 && (previousScreenSize < 600 || previousScreenSize >= 776)){
        //

      }else if(window.innerWidth >= 776 && previousScreenSize < 776){
        //

      }

      previousScreenSize = window.innerWidth;
    })
  }

  addEventListeners(){
        // this.elements is null because it hasnt been rendered on the page yet sadly
        
  } 

}
