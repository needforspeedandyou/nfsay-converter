import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [convertRates, setConvertRates] = useState()
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("UAH")
  const [amount, setAmount] = useState("")
  const [converted, setConverted] = useState()

  useEffect(() => {
    axios.get("https://v6.exchangerate-api.com/v6/be6ec954d0f4b60b0b1a8093/latest/USD")
      .then(res => setConvertRates(res.data.conversion_rates))
  }, [])

  return (
    <div className='h-screen flex justify-center items-center font-custom'>
      <div className="w-75">
        <h1 className='text-2xl text-center'>Currency converter</h1>
        <p className='text-center'>Enter currency:</p>
        <div className="flex flex-col gap-2 justify-center mt-2">
          <select value={from} onChange={e => setFrom(e.target.value)} className='px-1.5 py-2 border-[#969BFF] border rounded-xl cursor-pointer w-full' name="from" id="from">
            {convertRates && Object.keys(convertRates).map(c => 
              <option>{c}</option>
            )}
          </select>
          <p className='text-center'>to</p>
          <select value={to} onChange={e => setTo(e.target.value)} className='px-1.5 py-2 border-[#969BFF] border rounded-xl cursor-pointer w-full' name="from" id="from">
            {convertRates && Object.keys(convertRates).map(c => 
              <option>{c}</option>
            )}
          </select>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount...' type="text" className='w-full px-3 py-1 border-[#969BFF] border rounded-xl' />
        </div>
        <button onClick={() => {
          let conv = (convertRates[to] / convertRates[from] * [amount]).toFixed(2)
          setConverted(`${conv} ${to}`)
        }} className='mt-3 px-10 py-1 border-[#969BFF] text-[#969BFF] border rounded-xl cursor-pointer w-full'>Exchange</button>
        <p className='mt-3 text-center text-2xl'>{converted}</p>
      </div>
    </div>
  )
}

export default App
