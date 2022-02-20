import { useState } from 'react'
import { FaFreeCodeCamp } from 'react-icons/fa'
import * as CONSTANTS from '../CONSTANTS'

const DrumMachine = () => {

  function soundName(audio) {
    return audio?.src.match(/(?!.*\/).*(?=\.mp3)/)[0].replace(/[-_]/g, ' ')
  }

  function playSoundFromMouse(event) {
    const audio = event.target.childNodes[1]
    if (audio.src.endsWith('.mp3')) {
      audio.play()
      updateDisplay(soundName(audio))
    }
  }

  function playSoundFromKey(audio) {
    if (audio.src.endsWith('.mp3')) {
      audio.play()
      updateDisplay(soundName(audio))
    }
  }

  function updateDisplay(text) {
    document.getElementById('display').innerText = text ? text : ''
  }

  function handleOnOff(event) {
    const buttons = document.querySelector('.drum-pad-container').childNodes

    if (power) {
      document.querySelector('.power').classList.add('power--off')
      buttons.forEach(button => {
        button.classList.add('off')
        button.childNodes[1].src = ""
      })
    } else {
      document.querySelector('.power').classList.remove('power--off')
      buttons.forEach((button, i) => {
        button.classList.remove('off')
        button.childNodes[1].src = CONSTANTS.BANK[bank][i]
      })
    }
    updateDisplay('')
    setPower(!power)
  }

  function setVolume(event) {
    const volume = event.target.value / 100
    const buttons = document.querySelector('.drum-pad-container').childNodes

    buttons.forEach(button => button.childNodes[1].volume = volume)
    updateDisplay(`Volume: ${(volume * 100).toFixed(0)} %`)
  }

  function switchBank(event) {
    const buttons = document.querySelector('.drum-pad-container').childNodes

    if (!power) return

    if (bank === 'Heater') {
      document.querySelector('.bank').classList.add('bank--piano')
      buttons.forEach((button, i) => {
        button.childNodes[1].src = CONSTANTS.BANK['Piano'][i]
      })
      setBank('Piano')
    } else {
      document.querySelector('.bank').classList.remove('bank--piano')
      buttons.forEach((button, i) => {
        button.childNodes[1].src = CONSTANTS.BANK['Heater'][i]
      })
      setBank('Heater')
    }
    updateDisplay('')
  }

  function animatePad(pad) {
    pad.classList.add('active')
    setTimeout(() => pad.classList.remove('active'), 100)
  }

  // States
  const [power, setPower] = useState(true)
  const [bank, setBank] = useState('Heater')

  // Listen for user to press on key
  document.onkeydown = (event) => {
    console.log(event.key)
    const audio = document.getElementById(event.key.toUpperCase())

    if (audio) {
      playSoundFromKey(audio)
      animatePad(audio.parentNode)
    }
  }

  // Listen for user to click on a pad
  document.onmouseup = (event) => {
    const target = event.target
    console.log(target)
    if (target.classList.contains('drum-pad')) {
      animatePad(target)
    }
  }

  // Generate drum pad
  const drumPad = CONSTANTS.BANK['Heater'].map((soundUrl, i) => (
    <button id={`pad-${i}`} className="drum-pad" key={CONSTANTS.KEY[i]} onClick={playSoundFromMouse}>
      {CONSTANTS.KEY[i]}
      <audio id={CONSTANTS.KEY[i]} className='clip' src={soundUrl}></audio>
    </button>
  ))

  return (
    <div id="drum-machine">
      <div className="drum-pad-container">
        {drumPad}
      </div>

      <div id="controls">
        <div className="logo">
          <span>FCC</span>
          <FaFreeCodeCamp />
        </div>
        <div className="control">
          <p>Power</p>
          <div className="switch power">
            <input type="checkbox" onChange={handleOnOff} />
            <div className="slider"></div>
          </div>
        </div>

        <p id="display"></p>

        <input id="volume" type="range" onChange={setVolume} />

        <div className="control">
          <p>Bank</p>
          <div className="switch bank">
            <input type="checkbox" onChange={switchBank} />
            <div className="slider"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrumMachine
