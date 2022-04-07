{
  'use strict';
  
  const select = {
    books: {
      bookImage: 'book__image',
      bookCard: '.book a',
      imageLink: 'data-id',
      

    } ,

    templateOf: {
      bookProduct: '#template-book',
    },
      
    containerOf: {
      bookList: '.books-list',
          
    },
    filters:'.filters',
  
  };
  const className = {
    bookClassImage: 'favorite',
    hidden: 'hidden',
  };




  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.bookProduct).innerHTML),
  };

  
  
  /*const templates = {
          menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
          
        };
      const select = {
          templateOf: {
            menuProduct: '#template-menu-product',
           
          },
          containerOf: {
            menu: '#product-list',
            
          },
          all: {
            menuProducts: '#product-list > .product',
            menuProductsActive: '#product-list > .product.active',
            formInputs: 'input, select',
          },
          menuProduct: {
            clickable: '.product__header',
            form: '.product__order',
            priceElem: '.product__total-price .price',
            imageWrapper: '.product__images',
            amountWidget: '.widget-amount',
            cartButton: '[href="#add-to-cart"]',
          },
      }*/
  
  
  /*class Product{
        constructor(id, data){
        const thisProduct = this;
        
        thisProduct.id = id;
        thisProduct.data = data;
        
        thisProduct.renderInMenu();
        thisProduct.getElements();
        thisProduct.initAccordion();
        thisProduct.initOrderForm();
        thisProduct.initAmountWidget();
        thisProduct.processOrder();
        
        
        //console.log('new Product:', thisProduct);
      }*/
  
  function render() {
    const thisBook = this;
    for(const book of dataSource.books) {
  
      thisBook.ratingBgc = determineRatingBgc(book.rating);
      thisBook.ratingWidth = book.rating *10;
      //renderInMenu(){
      
  
      /* generate HTML based on template */
      const generatedHTML = templates.menuProduct(book);
        
      /* create element using utilis.createElementFromHTML */
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
       
      /* find menu container */
      const menuContainer = document.querySelector(select.containerOf.bookList);
  
      /* add element to manu */
      menuContainer.appendChild(thisBook.element);
      console.log('menuContainer:', menuContainer);
    }
  }
  
  const favoriteBooks = [];
  const filters = [];

  console.log('favBooks', favoriteBooks);
  console.log('filters:', filters);
  
  function initAction(){
    
    const thisBook = this;

    thisBook.container = document.querySelector(select.containerOf.bookList);
    console.log('book1', thisBook.container);
    thisBook.bookImages = thisBook.container.querySelectorAll(select.books.bookCard);
    console.log('book2', thisBook.bookImages);
    thisBook.bookFilter = document.querySelector(select.filters);

    /*for( const bookIm of thisBook.bookImages){

      bookIm.addEventListener('dblclick', function(event){
        event.preventDefault();
        bookIm.classList.toggle(className.bookClassImage);
        const bookImId = bookIm.getAttribute(select.books.imageLink);
        
        favoriteBooks.push(bookImId);
        console.log('fbooks', favoriteBooks);
      });

    }*/

    
    thisBook.container.addEventListener('dblclick', function(event){
      event.preventDefault();
      const book = event.target.offsetParent;
      
      if(book.classList.contains(select.books.bookImage)){

        book.classList.toggle(className.bookClassImage);
        const bookImId = book.getAttribute(select.books.imageLink);

        if(favoriteBooks.includes(bookImId)){
          
          const idIndex = favoriteBooks.indexOf(bookImId);
          favoriteBooks.splice(idIndex, 1);
        }
        else{
          favoriteBooks.push(bookImId);
        }

        console.log('tabela',favoriteBooks);
      }
    });
    

    thisBook.bookFilter.addEventListener('click', function(event){
      //event.preventDefault();
      const bookFt = event.target;

      if(bookFt.tagName === 'INPUT' && bookFt.type === 'checkbox' && bookFt.name === 'filter'){

        if(bookFt.checked === true) {

          filters.push(bookFt.value);

        } else if (filters.includes(bookFt.value)){

          const idIndex = filters.indexOf(bookFt.value);
          filters.splice(idIndex, 1);

        }   
        
      }
      console.log('INPUT:', bookFt.input);
      console.log('filter:', bookFt.value);
      console.log('filtersArray:', filters);
      filterBooks();
      
    });
    
  } 
  
  function filterBooks() {
    
    
    for(const book of dataSource.books){
      
      //console.log('bookFilterImg:', bookFilterImg);
      const bookFilterId = [];
      let shouldBeHiddenden = false;
      


      for (const filter of filters){
        

        if(!book.details[filter]){
          shouldBeHiddenden = true;
          bookFilterId.push(book.id);
          break;
        }
      }

      if(shouldBeHiddenden === true){
        
        const bookFilterImg = document.querySelector('[data-id="' + book.id + '"]');
        bookFilterImg.classList.add(className.hidden);
        
        console.log('bookFilterImg1:', bookFilterImg);

      } else if (shouldBeHiddenden === false){
        
        const bookFilterImg = document.querySelector('[data-id="' + book.id + '"]');
        bookFilterImg.classList.remove(className.hidden);

        console.log('bookFilterImg2:',bookFilterImg.classList.remove);

      }
    }
  }
  
  function determineRatingBgc (rating){
    let ratingBgc = '';
    console.log('ratingBgc:', ratingBgc);
    
    if(rating < 6){
      ratingBgc = 'background: linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    

    } else if (rating > 6 && rating <= 8) {
      ratingBgc = 'background: linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    

    } else if ( rating > 8 && rating <= 9) {
      ratingBgc = 'background: linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    
    } else if ( rating > 9) {
      ratingBgc = 'background: linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    
    }
    return ratingBgc();

  }
  
  

  render();
  initAction();
  determineRatingBgc();
    
}