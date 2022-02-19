import { FaFreeCodeCamp } from 'react-icons/fa'
import * as CONSTANTS from '../CONSTANTS'

const DrumMachine = () => {

  function soundName(audio) {
    return audio?.src.match(/(?!.*\/).*(?=\.mp3)/)[0].replace(/[-_]/g, ' ')
  }

  function playSoundFromMouse(event) {
    const audio = event.target.childNodes[1]
    audio.play()
    updateDisplay(soundName(audio))
  }

  function playSoundFromKey(event) {
    const audio = document.getElementById(event)
    audio?.play()
    updateDisplay(soundName(audio))
  }

  function updateDisplay(text) {
    document.getElementById('display').innerText = text ? text : ''
  }

  function handleOnOff(event) {
    const isPoweredOn = event.target.checked
    const buttons = document.querySelector('.drum-pad-container').childNodes

    if (isPoweredOn) {
      buttons.forEach(button => button.disabled = true)
    } else {
      buttons.forEach(button => button.disabled = false)
    }
    updateDisplay('')
  }

  function setVolume(event) {
    const volume = event.target.value / 100
    const buttons = document.querySelector('.drum-pad-container').childNodes
    
    buttons.forEach(button => button.childNodes[1].volume = volume)
    updateDisplay(`Volume: ${(volume * 100).toFixed(0)} %`)
  }

  function switchBank(event) {
    const isHeater = event.target.checked
    const buttons = document.querySelector('.drum-pad-container').childNodes

    if (isHeater) {
      buttons.forEach((button, i) => {
        button.childNodes[1].src = CONSTANTS.BANK['Piano'][i]
      })
    } else {
      buttons.forEach((button, i) => {
        button.childNodes[1].src = CONSTANTS.BANK['Heater'][i]
      })
    }
    updateDisplay('')
  }

  // Listen for user to click on key
  document.addEventListener('keydown', (event) => {
    playSoundFromKey(event.key.toUpperCase())
  })

  // Drum pad animation
  document.addEventListener('mouseup', (event) => {
    const target = event.target
    if (target.className === 'drum-pad') {
      target.style.backgroundColor = 'orange'
    }
  })

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
          <div className="switch">
            <input type="checkbox" onChange={handleOnOff} />
            <div className="slider"></div>
          </div>
        </div>

        <p id="display"></p>

        <input id="volume" type="range" onChange={setVolume} />

        <div className="control">
          <p>Bank</p>
          <div className="switch">
            <input type="checkbox" onChange={switchBank} />
            <div className="slider"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrumMachine
