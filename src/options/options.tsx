import React from 'react'
import ReactDOM from 'react-dom'
import './options.css'
import Calculator from '../components/calculator'

const App: React.FC<{}> = () => {
  return (
    <div>
      <Calculator />
    </div>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
