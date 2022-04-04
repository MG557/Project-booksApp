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
  
  };
  const className = {
    bookClassImage: 'favorite'
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
  
    for(const book of dataSource.books) {
  
      
      //renderInMenu(){
      const thisBook = this;
  
      /* generate HTML based on template */
      const generatedHTML = templates.menuProduct(book);
        
      /* create element using utilis.createElementFromHTML */
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
       
      /* find menu container */
      const menuContainer = document.querySelector(select.containerOf.bookList);
  
      /* add element to manu */
      menuContainer.appendChild(thisBook.element);
      console.log('menuContainer', menuContainer);
    }
  }
  const favoriteBooks = [];
  console.log('favBooks', favoriteBooks);
  function initAction(){
    
    const thisBook = this;

    thisBook.container = document.querySelector(select.containerOf.bookList);
    console.log('book1', thisBook.container);
    thisBook.bookImages = thisBook.querySelectorAll(select.books.bookCard);
    console.log('book1', thisBook.bookImages);

    for( const bookIm of thisBook.bookImages){

      bookIm.addEventListener('dblclick', function(event){
        event.preventDefault();
        bookIm.classList.toggle(className.bookClassImage);
        const bookImId = bookIm.getAttribute(select.books.imageLink);
        
        favoriteBooks.push(bookImId);
        console.log('fbooks', favoriteBooks);
      });

    }

    /*
    thisBook.container.addEventListener('dblclick', function(event){
      event.preventDefault();
      
      const book = event.target.offsetParent;
      
      if(book.classList.contains(select.books.bookImage)){

        book.classList.toggle(className.bookClassImage);
        const bookImageId = book.getAttribute(select.books.imageLink);

        if(favoriteBooks.includes(bookImageId)){
          
          const idIndex = favoriteBooks.indexOf(bookImageId);
          favoriteBooks.splice(idIndex, 1);
        }
        else{
          favoriteBooks.push(bookImageId);
        }

        console.log('tabela',favoriteBooks);


      }
      

    });*/
    
  }  
  
  
  

  render();
  initAction();
    
}