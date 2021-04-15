import { useState } from 'react'
import axios from 'axios'

import './App.css'

async function postImage({ image, description }) {
  const formData = new FormData()
  formData.append('image', image)
  formData.append('description', description)

  const result = await axios.post('/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return result.data
}

function App() {
  const [file, setFile] = useState()
  const [description, setDescription] = useState('')
  const [images, setImages] = useState([])

  const submit = async (event) => {
    event.preventDefault()
    const result = await postImage({ image: file, description })
    setImages([result.image, ...images])
    // console.log("result", result)
    // console.log("images", images)
  }

  const fileSelected = (event) => {
    const file = event.target.files[0]
    setFile(file)
  }

  // console.log("images", images)

  return (
    <div className='App'>
      <form onSubmit={submit}>
        <input onChange={fileSelected} type='file' accept='image/*'></input>
        <label>
          Description
          <input
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type='text'></input>
        </label>
        <button type='submit'>Submit</button>
      </form>

      {images.map((image) => (
        <div key={image}>
          <img alt={image} src={image}></img>
        </div>
      ))}
    </div>
  )
}

export default App
