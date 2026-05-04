import './App.css'
import { GlobalProvider } from './context/GlobalContext'
import { AddItem } from './components/AddItem'
import { ItemList } from './components/ItemList'

function App() {
  return (
    <GlobalProvider>
      <main className="app-container">
        <header className="app-header">
          <h1>Sistema de Gestión de Elementos</h1>
          <p>Implementación con Context API y useReducer</p>
        </header>

        <div className="app-content">
          <AddItem />
          <ItemList />
        </div>
      </main>
    </GlobalProvider>
  )
}

export default App
