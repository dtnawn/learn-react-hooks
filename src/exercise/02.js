// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React from 'react'

function useLocalStorageState(key) {  
  return {
    getItem: () => {
      const obj = window.localStorage.getItem(key);
      return obj ? JSON.parse(obj)?.item : undefined
    },
    setItem: (value) => window.localStorage.setItem(key, JSON.stringify({ item: value }))
  }
}

function Greeting({initialName = ''}) {
  const lsName = useLocalStorageState('name');
  const [name, setName] = React.useState(() => lsName.getItem() || initialName)

  React.useEffect(() => {
    lsName.setItem(name)
  }, [lsName, name]);

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name || ''} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
