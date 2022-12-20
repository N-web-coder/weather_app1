import React, { useState } from 'react'
import "./Weather.css"
import axios from "axios"
import {FaTemperatureLow} from 'react-icons/fa'

const Weather = () => {

    const [fetchTemp,setFetchTemp] = useState("0")
    const [country,setCountry] = useState("IN")
    const [pressure,setPressure] = useState("0")
    const [humidity,setHumidity] = useState("0")
    const [cityText, setCityText] = useState("")
    const [data,setData] = useState("")
    const [name,setName] = useState("")
    const [error,setError] = useState(null)
    const [Exceed , setExceed] = useState(null)

    async function fetchWeather(){
        try {
            let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityText}&appid=8da28de9d1b321c273756dc2933797a7`)
            setError(null)
            setFetchTemp(res.data.main.temp)
            setCountry(res.data.sys.country)
            setName(res.data.name)
            setPressure(res.data.main.pressure)
            setHumidity(res.data.main.humidity)
            setData(res.data.weather[0].description)
        } catch (error) {
            console.log(error)
            setError(error.response.data.message)
            setExceed(error.config.message)
        }
    }

  return (
    <>
    <div className='fir'>
        <input type="text" placeholder='City..' value={cityText} onChange={(e)=>{setCityText(e.target.value)}}/>
        <br/>
        <button onClick={fetchWeather}>Submit</button>
        { cityText ? <div className='box'>
            {error ? <div>{error} {Exceed}</div> : 
                <div> <h3><FaTemperatureLow/> : {fetchTemp} <sup>o</sup>F , {data}</h3>
                <h3>Place : {country} , {name}</h3>
                <h3>Pressure : {pressure} hPa</h3>
                <h3> Humidity : {humidity} % </h3>
                </div> }
        </div> : ""}
       
    </div>
        <div className='mee'>Designed By 🤎 N.K</div>
    </>
  )
}

export default Weather
