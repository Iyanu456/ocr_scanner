import { useState } from 'react'
import ImageUpload from './components/ImageUpload'
import './App.css'

function App() {


  return (
    <>
      <header className='px-[1.8em] py-[1.2em] font-semibold bg-black text-white'>
        OCR Scanner
      </header>
      <div className='grid h-[80vh] place-items-center'>
      <ImageUpload />
      </div>
      
    </>
  ) 
}

export default App
