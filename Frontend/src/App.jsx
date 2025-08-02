/* eslint-disable no-unused-vars */
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GraphView from './components/GraphView'
import StatsPanel from './components/StatsPanel'
import Header from './components/Header'
import Footer from './components/Footer'
import Banner from './components/Banner'

function App() {

  return (
    <div className="App">
      <Header />
      <main style={{ paddingTop: '1rem', paddingBottom: '3.5rem', minHeight: 'calc(100vh - 120px)' }}>
        <Banner
          imageUrl="/assets/bglogo.png"
          title="Welcome to the SuperLinked Universe"
          subtitle="Explore your favorite superheroes and their connections!"
          />
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
           <GraphView />
          <StatsPanel />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
