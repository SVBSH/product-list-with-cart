import { useState, useEffect } from 'react'
const apiUrl = import.meta.env.VITE_API_URL

const useDessertList = () => {
  const [dessertList, setDessertList] = useState([])
  const [status, setStatus] = useState('unloaded')

  useEffect(() => {
    setDessertList([])
    fetchDesserts()

    async function fetchDesserts() {
      setStatus('loading')
      const apiResponse = await fetch(`${apiUrl}/desserts`)
      if (!apiResponse.ok) {
        throw new Error(`/api/desserts fetch error`)
      }
      const json = await apiResponse.json()
      setStatus('loaded')
      setDessertList(json)
    }
  }, [])
  return [dessertList, status]
}

export default useDessertList
