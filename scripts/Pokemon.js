class Pokemon {
    constructor() {
        this.loader = null;
        this.pokemonCatalog = null;
        this.loadMoreButton = null;
        this.searchPokemonInput = null;
        this.currentCards = null;
        this.page = 1;
        this.pageSize = 2;

        this.UIIdis = {
            cardsCatalogId: "js-cards-catalog",
            loadMoreBtnId: "js-loadMore",
            loaderId: "js-loader",
            searchId: 'js-search',
        };
        this.cardSelector = '[data-pokemon]';


        this.cardsCollection = [];

        this.API = "https://api.pokemontcg.io";
        this.APIversion = "v1";
        this.APIresource = "cards";

        this.APIEndpoint = `${this.API}/${this.APIversion}/${this.APIresource}`;
    }

    initializeApp() {
        this.bindElements();
        this.pullCards();
        this.loadMoreButton.addEventListener("click", () => this.pullCards());
        this.searchPokemonInput.addEventListener('keyup', (e) => this.searchPokemon(e))
    }

    bindElements() {
        this.loader = document.getElementById(this.UIIdis.loaderId);
        this.pokemonCatalog = document.getElementById(this.UIIdis.cardsCatalogId);
        this.loadMoreButton = document.getElementById(this.UIIdis.loadMoreBtnId);
        this.searchPokemonInput = document.getElementById(this.UIIdis.searchId);
    }

    toggleVisibility() {
        this.loadMoreButton.classList.toggle("loader--is-visible");
        this.loader.classList.toggle("loader--is-visible");
    }

    async pullCards() {
        this.toggleVisibility();
        const {
            cards
        } = await this.fetchData(
            `${this.APIEndpoint}?page=${this.page}&pageSize=${this.pageSize}`
        );
        this.cardsCollection = [...cards];
        this.cardsCollection.forEach((card, index) => {
            this.displayPokemon(index);
        });
        this.toggleVisibility();
        this.page++;
    }

    async fetchData(URL) {
        try {
            const response = await fetch(URL);
            const parsedResponse = await response.json();
            return parsedResponse;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    displayPokemon(index) {
        const pokemonCard = document.createElement("div");
        pokemonCard.setAttribute('data-pokemon', `data-pokemon="${this.cardsCollection[index].name}"`)
        pokemonCard.classList.add("card");
        pokemonCard.innerHTML = `
        
        <div class="card__upper-infos">
        <h6 class="card__title" id="js-cardTitle">${this.cardsCollection[index].name}</h6>
        <p class="card__number">Nr: <span class="card__number-id" id="js-cardNumber">${this.cardsCollection[index].number}</span></p>
    </div>
    <div class="card__image-container">
        <img src="${this.cardsCollection[index].imageUrl}" alt="" class="card__image" id="js-cardImage">
    </div>
    <div class="card__bottom-infos">
        <p class="card__supertype" id="js-supertypeInfo">${this.cardsCollection[index].supertype}</p>
        <p class="card__subtype" id="js-subtypeInfo">${this.cardsCollection[index].subtype}</p>
        <p class="card__rarity" id="jsrarityInfo">${this.cardsCollection[index].rarity}</p>
    </div>
        `;
        this.pokemonCatalog.appendChild(pokemonCard);
        this.currentCards = [...document.querySelectorAll(this.cardSelector)];
    }

    searchPokemon(e) {
        console.log(this.currentCards);
        const searchedName = (e.target.value).toLowerCase();
        this.currentCards.filter(card => {
            card.dataset.pokemon.toLowerCase() === searchedName ?
                card.classList.add('loader--is-visible') : card.classList.remove('loader--is-visible')
        })


    }




}

const pokemon = new Pokemon();
pokemon.initializeApp();