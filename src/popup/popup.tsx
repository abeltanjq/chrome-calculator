import React from 'react'
import { createRoot } from 'react-dom/client'
import styled from 'styled-components'
import Calculator from '../components/calculator'

const Main = styled.div`
  width: 400px;
  background: white;
  height: 550px;
`

const App: React.FC<{}> = () => {
  return (
    <Main>
      <Calculator />
    </Main>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container!)
root.render(<App />)
