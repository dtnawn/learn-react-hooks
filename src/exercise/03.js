// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import React from 'react'

function Name({name, onNameChange}) {
  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
    </div>
  )
}

function FavoriteAnimal() {
  const [animal, setAnimal] = React.useState('')
  return (
    <div>
      <label htmlFor="animalInput">Favorite Animal: </label>
      <input id="animalInput" value={animal} onChange={e => setAnimal(e.target.value)} />
    </div>
  )
}

function Display({name}) {
  return <div>{`Hey ${name}, you are great!`}</div>
}

function App() {
  const [name, setName] = React.useState('')
  return (
    <form>
      <Name name={name} onNameChange={event => setName(event.target.value)} />
      <FavoriteAnimal />
      <Display name={name} />
    </form>
  )
}

export default App
