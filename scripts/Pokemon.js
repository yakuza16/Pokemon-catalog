
class Pokemon{
  
    constructor(){
        this.loader = null;
        this.pokemonCatalog = null;
        this.loadMoreButton = null;
        this.page = 1;
        this.pageSize = 2;
        this.version = 'v1';

        this.UIIdis = {
        cardsCatalogId: 'js-cards-catalog',
        loadMoreBtnId: 'js-loadMore',
        loaderId: 'js-loader',
        }

        this.cards = [];

       this.API = `https://api.pokemontcg.io/v1/cards/?page=${this.page}&pageSize=${this.pageSize}`;
    }

    initializeApp(){
    this.bindElements();
    this.pullCards()
    }

    bindElements(){
    this.loader = document.getElementById(this.UIIdis.loaderId);
    this.pokemonCatalog = document.getElementById(this.UIIdis.cardsCatalogId);
    this.loadMoreButton = document.getElementById(this.UIIdis.loadMoreBtnId)
    };

    async pullCards(){
        const {cards} = await this.fetchData(this.API);
        console.log(cards)
    }

   async fetchData(URL){
        try {
            const response = await fetch(URL);
            const parsedResponse = await response.json();
            console.log(parsedResponse)
            return parsedResponse;
        } catch (error) {
            console.log(error);
            return;
        }

    }



}


const pokemon = new Pokemon();
pokemon.initializeApp();