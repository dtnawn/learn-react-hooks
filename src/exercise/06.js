// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React from 'react'
import fetchPokemon from '../fetch-pokemon'

function PokemonInfo({pokemonName}) {
  const [pokemon, setPokemon] = React.useState();
  const [error, setError] = React.useState();
  const [loading, setLoading] = React.useState();

  React.useEffect(() => {
    if (!pokemonName) {
      return;
    }

    setLoading(true);
    fetchPokemon(pokemonName).then(
      pokemon => { 
        setPokemon(pokemon);
        setError(undefined);
        setLoading(false);
      },
      error => {
        setPokemon(undefined);
        setError(error);
        setLoading(false);
      },
    );
  }, [pokemonName]);

  return (
    <div
      style={{
        height: 300,
        width: 300,
        overflow: 'auto',
        backgroundColor: '#eee',
        borderRadius: 4,
        padding: 10,
      }}
    >
      {!loading && !error && !pokemon && <div>Submit a pokemon</div>}
      {loading && <div>...</div>}
      {!loading && error && <div>ERROR!</div>}
      {!loading && pokemon && <pre>{JSON.stringify(pokemon, null, 2)}</pre>}
    </div>
  )
}

function InvisibleButton(props) {
  return (
    <button
      type="button"
      style={{
        border: 'none',
        padding: 'inherit',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        cursor: 'pointer',
        fontWeight: 'inherit',
      }}
      {...props}
    />
  )
}

function App() {
  const [{submittedPokemon, pokemonName}, setState] = React.useReducer(
    (state, action) => ({...state, ...action}),
    {submittedPokemon: '', pokemonName: ''},
  )

  function handleChange(e) {
    setState({pokemonName: e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault()
    setState({submittedPokemon: pokemonName.toLowerCase()})
  }

  function handleSelect(pokemonName) {
    setState({pokemonName, submittedPokemon: pokemonName})
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <label htmlFor="pokemonName-input">Pokemon Name</label>
        <small>
          Try{' '}
          <InvisibleButton onClick={() => handleSelect('pikachu')}>
            "pikachu"
          </InvisibleButton>
          {', '}
          <InvisibleButton onClick={() => handleSelect('charizard')}>
            "charizard"
          </InvisibleButton>
          {', or '}
          <InvisibleButton onClick={() => handleSelect('mew')}>
            "mew"
          </InvisibleButton>
        </small>
        <div>
          <input
            id="pokemonName-input"
            name="pokemonName"
            value={pokemonName}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </div>
      </form>
      <hr />
      <div style={{display: 'flex'}}>
        <div style={{marginLeft: 10}} data-testid="pokemon-display">
          <PokemonInfo pokemonName={submittedPokemon} />
        </div>
      </div>
    </div>
  )
}

export default App

/* eslint no-unused-vars:0 */
