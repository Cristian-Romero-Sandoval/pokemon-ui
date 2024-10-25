import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './pokemon-ui.css.js';
import '@bbva-web-components/bbva-button-default/bbva-button-default.js';





export class PokemonUi extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      pokemon: { type: Array },
      selectedPokemon: { type: Object },
    };
  }

  constructor() {
    super();
    this.name = 'Cells';
    this.pokemon = [];
    this.selectedEvolutionIndex = 0; 
    this.selectedPokemon = null; 

  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('pokemon-ui-shared-styles'),
    ];
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.fetchPokemon();
  }

  async fetchPokemon() {
    const promises = Array.from({ length: 30 }, (_, i) =>fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`).then(res => res.json()))

    const pokemonData = await Promise.all(promises);
    this.pokemon = await Promise.all(
      pokemonData.map(pokemon => this.fetchEvolution(pokemon))
    );
    console.log("pokemosnes", this.pokemon)
  }

  async fetchEvolution(pokemon) {
    const speciesResponse = await fetch(pokemon.species.url);
    const speciesData = await speciesResponse.json();
    
    // Maneja el caso en que no se encuentre la cadena de evolución
    if (!speciesData.evolution_chain) {
        return {
            ...pokemon,
            evolution: [], // Sin evoluciones
            imageUrl: pokemon.sprites.other['official-artwork'].front_default,
            showEvolutions: false,
            currentEvolutionIndex: 0,
        };
    }

    const evolutionChainResponse = await fetch(speciesData.evolution_chain.url);
    
    // Verifica si la respuesta fue exitosa
    if (!evolutionChainResponse.ok) {
        return {
            ...pokemon,
            evolution: [], // Sin evoluciones
            imageUrl: pokemon.sprites.other['official-artwork'].front_default,
            showEvolutions: false,
            currentEvolutionIndex: 0,
        };
    }

    const evolutionChainData = await evolutionChainResponse.json();
    const evolution = await this.getEvolution(evolutionChainData.chain);

    return {
        ...pokemon,
        evolution: Array.isArray(evolution) ? evolution : [],
        imageUrl: pokemon.sprites.other['official-artwork'].front_default,
        showEvolutions: false,
        currentEvolutionIndex: 0,
    };
}

async getEvolution(chain) {
  const evolutions = [];
  let current = chain;

  while (current) {
      const pokemonId = current.species.url.split('/')[6]; // Extraer el ID del Pokémon
      try {
          const evolutionResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
          if (!evolutionResponse.ok) {
              console.error(`Error fetching evolution for Pokémon ID ${pokemonId}: ${evolutionResponse.status}`);
              break; // Sale del bucle si hay un error
          }

          const evolutionData = await evolutionResponse.json();

          evolutions.push({
              name: current.species.name,
              url: current.species.url,
              imageUrl: evolutionData.sprites.other['official-artwork'].front_default,
          });
      } catch (error) {
          console.error(`Error fetching evolution for Pokémon ID ${pokemonId}:`, error);
          break; // Sale del bucle si hay un error
      }

      current = current.evolves_to[0]; // Avanza a la siguiente evolución
  }
  
  return evolutions;
}

changeEvolution(direction) {
  this.selectedEvolutionIndex += direction;

  
  if (this.selectedEvolutionIndex < 0) {
      this.selectedEvolutionIndex = 0; 
  } else if (this.selectedEvolutionIndex >= this.selectedPokemon.evolution.length) {
      this.selectedEvolutionIndex = this.selectedPokemon.evolution.length - 1; 
  }

  this.requestUpdate(); 
}


toggleEvolutions(pokemon) {
  this.selectedPokemon = pokemon; // Establecer el Pokémon seleccionado
  this.selectedEvolutionIndex = 0; // Reiniciar el índice de evolución
  this.requestUpdate(); 
}


closeModal() {
  this.selectedPokemon = null;
  this.requestUpdate(); 
}


render() {
  return html`
    <div class="container">
      ${this.pokemon.map(p => html`
        <div class="card">
          <img class="img" src="${p.imageUrl}" alt="${p.name}" @click="${() => this.openModal(p)}">
          <h2>${p.name.charAt(0).toUpperCase() + p.name.slice(1)}</h2>
          <bbva-button-default @click="${() => this.toggleEvolutions(p)}">
            Mostrar Evoluciones
          </bbva-button-default>
        </div>
      `)}
    </div>

    <!-- Modal -->
    ${this.selectedPokemon ? this.renderModal(this.selectedPokemon) : ''}
  `;
}



renderModal(pokemon) {
  const currentEvolution = pokemon.evolution[this.selectedEvolutionIndex]; // Obtiene la evolución actual

  return html`
    <div class="modal-overlay" @click="${this.closeModal}">
      <div class="modal-content" @click="${(e) => e.stopPropagation()}">
        <span class="close" @click="${this.closeModal}">&times;</span>
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <img class="img" src="${currentEvolution.imageUrl}" alt="${currentEvolution.name}" class="modal-image">
        <p>${currentEvolution.name.charAt(0).toUpperCase() + currentEvolution.name.slice(1)}</p>
        
        <div>
         <bbva-button-default
            ?disabled="${this.selectedEvolutionIndex === 0}" 
            @click="${() => this.changeEvolution(-1)}">Anterior </bbva-button-default>
          <bbva-button-default
            ?disabled="${this.selectedEvolutionIndex === pokemon.evolution.length - 1}" 
            @click="${() => this.changeEvolution(1)}">Siguiente </bbva-button-default>
        </div>
       <bbva-button-default @click="${this.closeModal}">Cerrar </bbva-button-default>
      </div>
    </div>
  `;
}



}





