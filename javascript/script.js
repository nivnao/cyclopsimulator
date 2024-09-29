document.addEventListener('DOMContentLoaded', function () {
  let index = 0
  let backgrounds = [
    'mask1.svg',
    'mask2.svg',
    'mask3.svg',
    'mask4.svg',
    'mask5.svg',
    'mask6.svg',
    'mask7.svg',
    'mask8.svg',
    'mask9.svg'
  ]

  let modeTitles = ['BASE MODE', 'X-RAY MODE', 'ZOOM MODE', 'LASER MODE']
  let indicatorSteps = ['NO DATA', '1 STEP', '2 STEP', '3 STEP']

  let apple = document.querySelector('.apple')
  let cactus = document.querySelector('.cactus')
  let shell = document.querySelector('.shell')
  let columns = document.querySelectorAll('.columns > div')
  let columnsBox = document.querySelector('.columns')
  let popupHelp = document.querySelector('.helpPopup')
  let laserPopup = document.querySelector('.laserPopup')
  let sunglasses = document.querySelector('.sunglasses')
  let semicircle = document.querySelector('.stepsIndicator')
  let sun = document.querySelector('.sun')
  let sunPercent = document.querySelector('.sunPercent')
  let anglePercent = document.querySelector('.anglePercentage')
  let progressBar2 = document.querySelector('.progressBar2')
  let progressBar1 = document.querySelector('.progressBar1')
  let textElement = document.querySelector('.modeTitle')
  let viewPercent = document.querySelector('.viewPercent')
  let progressBars = document.querySelectorAll('.divInterface')
  let laserButtonInitiation = document.querySelector('.pickMe')
  let laserInterface = document.querySelector('.laserInterface')
  let backgroundCorners = document.querySelectorAll('.backgroundCorner')
  let laserEnergy = document.querySelector('.increase')
  let focusBars = document.querySelectorAll('.rightPartFocus > div')
  let timeBack = document.querySelector('.timeBack')
  let timeToGoBack = document.querySelector('.timeToGoBack')
  let finishPopup = document.querySelector('.finishPopup')
  let finishTimeout = document.querySelector('.finalTimeout')
  let indicatorStepSpan = document.querySelector('.indicatorStep')

  let shiftX = 0
  let shiftY = 0
  let removedCount = 0

  function removeProgressBar() {
    if (removedCount < 4) {
      let divToRemove = progressBars[progressBars.length - 1 - removedCount]
      if (divToRemove) {
        divToRemove.remove()
        removedCount++
      }
    }
  }

  function animatePercentage(startElement, targetValue, specialSymbol = '%') {
    let currentValue = parseInt(startElement.textContent.slice(0, -1), 10) // Extract current value as number

    let interval = setInterval(() => {
      currentValue += currentValue < targetValue ? 1 : -1
      startElement.textContent = currentValue + specialSymbol

      if (currentValue === targetValue) {
        clearInterval(interval)
      }
    }, 10)
  }

  function handleMouseMove(element, e, boundary = {}) {
    element.style.display = 'block'

    let shiftX = element.getBoundingClientRect().width / 2
    let shiftY = element.getBoundingClientRect().height / 2

    let vw = window.innerWidth / 100
    let vh = window.innerHeight / 100

    let newLeft = e.clientX - shiftX
    let newTop = e.clientY - shiftY

    if (boundary.minX !== undefined && newLeft / vw < boundary.minX) {
      newLeft = boundary.minX * vw
    }
    if (
      boundary.maxX !== undefined &&
      (newLeft + element.offsetWidth) / vw > boundary.maxX
    ) {
      newLeft = boundary.maxX * vw - element.offsetWidth
    }
    if (boundary.minY !== undefined && newTop / vh < boundary.minY) {
      newTop = boundary.minY * vh
    }
    if (
      boundary.maxY !== undefined &&
      (newTop + element.offsetHeight) / vh > boundary.maxY
    ) {
      newTop = boundary.maxY * vh - element.offsetHeight
    }

    element.style.left = newLeft + 'px'
    element.style.top = newTop + 'px'
  }

  function changeWidth(element, part) {
    if (part >= 0 && part <= 10) {
      width = `${3.6 * part}%`
    }
    element.style.width = width
  }

  function fillCircle(part, object) {
    let angle = '0deg'

    switch (part) {
      case 0:
        angle = '0deg'
        break
      case 1:
        angle = '50deg'
        break
      case 2:
        angle = '130deg'
        break
      case 3:
        angle = '180deg'
        break
      // ниже для солнышка градусы
      case 4:
        angle = '36deg'
        break
      case 5:
        angle = '72deg'
        break
      case 6:
        angle = '108deg'
        break
      case 7:
        angle = '144deg'
        break
      case 8:
        angle = '180deg'
        break
      case 9:
        angle = '216deg'
        break
      case 10:
        angle = '252deg'
        break
      case 11:
        angle = '288deg'
        break
    }

    object.style.setProperty('--angle', angle) // Update the custom property
  }

  function changeMode(modeIndex) {
    if (modeIndex >= 0 && modeIndex < modeTitles.length) {
      currentModeIndex = modeIndex
      updateInterfaceText()
    }
  }

  function changeIndicator(indicatorStep) {
    if (indicatorStep >= 0 && indicatorStep < indicatorSteps.length) {
      currentModeIndex = indicatorStep
      indicatorStepSpan.textContent = indicatorSteps[currentModeIndex]
    }
  }

  function updateInterfaceText() {
    textElement.style.display = 'block'
    textElement.textContent = modeTitles[currentModeIndex]
  }

  function clickIndicator() {
    let element = document.querySelector('.greenlight3')
    let indicator = document.querySelector('.indicator')

    element.addEventListener('click', () => {
      element.style.pointerEvents = 'none'
      indicator.style.animation = 'none'
      void indicator.offsetWidth
      indicator.style.animation = 'indicatormove 1.8s reverse forwards'
      popupHelp.style.animation = 'indicatormove 2.5s linear forwards'
      let background = document.querySelector('#mask')
      background.classList.add('maskActive')
      sunglasses.style.display = 'block'
      changeMode(0)
      changeBackgroundMainScreen()
    })
  }

  function changeBackgroundMainScreen() {
    let mask = document.querySelector('.maskActive')
    mask.addEventListener('click', () => {
      if (index <= 8) {
        fillCircle(4 + index, sun)
        changeWidth(progressBar2, index + 1)
        index++
        animatePercentage(sunPercent, 10 * index)
        animatePercentage(viewPercent, 10 * index)

        mask.style.backgroundImage = `url('./images/${backgrounds[index]}')`
      }
      if (index == 8) {
        removeProgressBar()
        addBackground()
        mask.remove()
        popupHelp.querySelector('span').innerText =
          'ПЕРЕД ВАМИ ПРЕДМЕТЫ, С ПОМОЩЬЮ КОТОРЫХ ВЫ СМОЖЕТЕ ПРОТЕСТИРОВАТЬ НОВЫЕ ВОЗМОЖНОСТИ ЗРЕНИЯ...'
        popupHelp.style.right = '0'
        popupHelp.style.animation = 'textpulse forwards linear 2s'
        popupHelp.style.animationDelay = '-2s'
        void popupHelp.offsetWidth
        popupHelp.style.animation = 'none'

        setTimeout(() => {
          popupHelp.querySelector('span').innerText =
            'СФОКУСИРУЙТЕСЬ НА КАКОМ-НИБУДЬ ОБЪЕКТЕ.  ВАМ ОТКРОЕТСЯ ОДИН ИЗ МОДОВ СУПЕР-ЗРЕНИЯ.'
          popupHelp.style.animation = 'textpulse forwards linear 2s'
          popupHelp.style.animationDelay = '-2s'
        }, 4000)

        setTimeout(() => {
          popupHelp.style.animation = 'none'
          void popupHelp.offsetWidth
          popupHelp.style.animation =
            'indicatormove 2.5s reverse forwards running'
        }, 6000)
      }
    })
  }

  function bullsEyeCursor(className) {
    let cursorRentgen = document.createElement('div')
    document.body.appendChild(cursorRentgen)
    cursorRentgen.classList.add(className)
    cursorRentgen.style.display = 'none'

    function handleCursorMove(e) {
      handleMouseMove(cursorRentgen, e)
    }

    document.addEventListener('mousemove', handleCursorMove)
    return handleCursorMove
  }

  function addBackground() {
    apple.style.display = 'block'
    cactus.style.display = 'block'
    shell.style.display = 'block'

    columns.forEach((column) => {
      column.style.display = 'block'
    })
    window.bullsEyeCursorMove = bullsEyeCursor('cursorRentgen')
  }

  function setTransparentFilter(minX, maxX, minY, maxY) {
    popupHelp.style.display = 'none'
    let filter = document.createElement('div')
    filter.classList.add('filter')
    document.body.appendChild(filter)

    let hole = document.createElement('div')
    hole.classList.add('hole')
    hole.style.display = 'block'

    hole.style.left = minX + 'vw'
    hole.style.top = minY + 'vw'

    document.addEventListener('mousemove', (e) => {
      handleMouseMove(hole, e, {
        minX: minX,
        maxX: maxX,
        minY: minY,
        maxY: maxY
      })
    })
    document.body.appendChild(hole)
    return hole
  }

  function removeTransparentFilter() {
    let filter = document.querySelector('.filter')
    filter.remove()
    let hole = document.querySelector('.hole')
    hole.remove()

    changeIndicator(0)
    changeMode(0)
    fillCircle(11, sun)
    fillCircle(0, semicircle)
    animatePercentage(sunPercent, 80)
    animatePercentage(anglePercent, 150, '°')
    animatePercentage(viewPercent, 80)
    changeWidth(progressBar2, 7)
    document.addEventListener('mousemove', window.bullsEyeCursorMove)
    let cursor = document.querySelector('.cursorRentgen')
    cursor.style.backgroundColor = 'white'
    cursor.style.animation = 'none'
    cursor.style.transition = 'none'
  }

  function setCursor(x1, y1, h2) {
    let cursor = document.querySelector('.cursorRentgen')
    cursor.style.backgroundColor = '#ABFF00'
    cursor.style.top = `calc(${y1}vh - ${h2}vw - 7.5vw)` //  y1 переносит верхний правый угол курсора в начало колонн, 7.5vw является половиной высоты курсора, чтобы центральная точка находилась в вершине колонны, и оставшиеся h2 - это координаты для выравнивая к самим объектам (в случае ракушки и яблока, просто половина их высоты, в случае кактуса - половина высоты + доп. смещение колонны вниз)
    cursor.style.left = `${x1}vw`
    cursor.style.transition = '0.5s'
    cursor.style.animation = 'scale infinite 1s linear'
  }

  function seePearl() {
    shell.addEventListener('click', () => {
      fillCircle(1, semicircle)
      removeProgressBar()
      changeMode(1)
      changeIndicator(1)
      fillCircle(6, sun)
      animatePercentage(anglePercent, 40, '°')
      animatePercentage(sunPercent, 30)
      animatePercentage(viewPercent, 45)
      changeWidth(progressBar2, 4)
      shell.style.backgroundImage = "url('./images/seashellActive.png')"
      document.removeEventListener('mousemove', window.bullsEyeCursorMove)
      setCursor(67, 60, 5)
      setTransparentFilter(60, 90, 10, 80)
      let element = document.createElement('div')
      element.classList.add('shellInfo')
      document.body.appendChild(element)
      let filter = document.querySelector('.filter')
      filter.addEventListener('click', () => {
        element.remove()
        removeTransparentFilter()
        shell.style.backgroundImage = "url('./images/seashell.png')"
      })
    })
  }

  function zoomCactus() {
    cactus.addEventListener('click', () => {
      changeMode(2)
      changeIndicator(2)
      removeProgressBar()
      fillCircle(6, sun)
      fillCircle(2, semicircle)
      animatePercentage(sunPercent, 30)
      animatePercentage(anglePercent, 40, '°')
      animatePercentage(viewPercent, 45)
      changeWidth(progressBar2, 4)
      cactus.style.backgroundImage = "url('./images/cactusActive.png')"
      document.removeEventListener('mousemove', window.bullsEyeCursorMove)
      setCursor(43, 60, -2.5)
      columns.forEach((column, i) => {
        if (i == 1) {
          column.style.marginBottom = '-5vw'
        }
      })
      cactus.style.bottom = 'calc(38vh - 6vw)'
      setTransparentFilter(35, 65, 10, 80)
      let element = document.createElement('div')
      element.classList.add('cactusInfo')
      document.body.appendChild(element)
      let filter = document.querySelector('.filter')
      filter.addEventListener('click', () => {
        element.remove()

        columns.forEach((column, i) => {
          if (i == 1) {
            column.style.marginBottom = '0vw'
          }
        })
        cactus.style.bottom = '37.5vh'
        cactus.style.backgroundImage = "url('./images/cactus.png')"
        removeTransparentFilter()
      })
    })
  }

  function scanApple() {
    changeMode(3)
    changeIndicator(3)
    removeProgressBar()
    fillCircle(6, sun)
    fillCircle(3, semicircle)
    animatePercentage(sunPercent, 30)
    animatePercentage(anglePercent, 40, '°')
    animatePercentage(viewPercent, 45)
    changeWidth(progressBar2, 4)
    apple.style.backgroundImage = "url('./images/appleActive.png')"
    document.removeEventListener('mousemove', window.bullsEyeCursorMove)
    setCursor(18, 60, 5)
    setTransparentFilter(10, 40, 10, 80)
    laserPopup.style.display = 'block'

    let element = document.createElement('div')
    element.classList.add('appleInfo')

    document.body.appendChild(element)
    let filter = document.querySelector('.filter')
    filter.addEventListener('click', () => {
      element.remove()
      laserPopup.style.display = 'none'
      apple.style.backgroundImage = "url('./images/apple.png')"

      removeTransparentFilter()
    })
  }

  function appleScan() {
    apple.addEventListener('click', scanApple)
  }

  function laserPreset() {
    let filter = document.querySelector('.filter')
    filter.remove()
    let hole = document.querySelector('.hole')
    hole.remove()
    let cursor = document.querySelector('.cursorRentgen')
    cursor.remove()
    let appleInfo = document.querySelector('.appleInfo')
    appleInfo.remove()
    sunglasses.style.display = 'none'
    shell.style.display = 'none'
    cactus.style.display = 'none'
    columnsBox.style.bottom = '-100vh'
    columnsBox.style.animation = 'moveFromBottom 0.5s forwards linear'
    backgroundCorners.forEach((corner) => {
      corner.classList.add('red')
    })
    apple.style.display = 'none'
    apple.style.bottom = '100vh'
    apple.style = ''
    void apple.offsetWidth
    apple.style.display = 'block'
    apple.classList.add('laserApple')
    laserPopup.style.display = 'none'
    columns.forEach((column, index) => {
      if (index < 2) {
        column.style.display = 'none'
      }
      if (index == 2) {
        column.style.width = '28vw'
      }
    })
  }

  function goBack() {
    apple.classList.remove('laserApple')
    apple.style.backgroundImage = "url('./images/apple.png')"
    apple.style.left = '19.5vw'
    cactus.style.display = 'block'
    shell.style.display = 'block'
    timeBack.textContent = '0:05'
    timeToGoBack.style.display = 'none'
    sunglasses.style.display = 'block'
    laserInterface.style.display = 'none'
    textElement.classList.remove('redTitle')
    columnsBox.style = ''
    columns.forEach((column, index) => {
      column.style.display = 'block'
      if (index == 2) {
        column.style.width = '15vw'
      }
    })
    let cursor = document.querySelector('.laserCursor')
    cursor.remove()
    window.bullsEyeCursorMove = bullsEyeCursor('cursorRentgen')
    changeMode(0)
    let laserPopupText = document.querySelector('.laserText')
    laserPopupText.remove()
    fillCircle(11, sun)
    fillCircle(0, semicircle)
    animatePercentage(sunPercent, 80)
    animatePercentage(anglePercent, 150, '°')
    animatePercentage(viewPercent, 80)
    changeWidth(progressBar2, 7)
    appleScan()
    backgroundCorners.forEach((corner) => {
      corner.classList.remove('red')
    })
  }

  function laserMode() {
    laserButtonInitiation.addEventListener('click', () => {
      laserPreset()
      let laserPopupFirst = document.createElement('div')
      let spanText = document.createElement('span')
      spanText.innerText =
        'ВЫ В ПОЛНОЙ ВЕРСИИ РЕЖИМЕ ЛАЗЕРА. ВЫСТРЕЛИТЕ В ОБЪЕКТ, ЧТОБЫ УНИЧТОЖИТЬ ЕГО.'
      document.body.appendChild(laserPopupFirst)
      laserPopupFirst.appendChild(spanText)
      laserPopupFirst.classList.add('text', 'helpPopup', 'laserText')
      laserPopupFirst.style.animation = 'indicatormove 2.5s linear forwards'
      apple.style.left = '23.5vw'
      columnsBox.style.width = '72vw'
      setTimeout(() => {
        laserPopupFirst.style.animation = 'none'
        void laserPopupFirst.offsetWidth
        laserPopupFirst.style.animation =
          'indicatormove 1.8s reverse forwards running'
      }, 4000)
      setTimeout(() => {
        apple.style.left = '37.5vw'
        columnsBox.style.width = '100vw'
      }, 4400)
      textElement.classList.add('redTitle')
      laserInterface.style.display = 'block'
      apple.classList.add('laserAppleHovered')
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          focusBars[focusBars.length - i - 1].style.display = 'block'
        }, i * 100)
      }

      apple.addEventListener('mouseover', () => {
        for (let i = 0; i < 9; i++) {
          setTimeout(() => {
            focusBars[focusBars.length - i - 1].style.display = 'block'
          }, i * 100)
        }
      })
      apple.addEventListener('mouseleave', () => {
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            focusBars[focusBars.length - i - 1].style.display = 'none'
          }, i * 100)
        }
      })
      laserEnergy.style.width = '50%'
      laserInterface.style.backgroundImage = "url('./images/blurRadius.png')"
      apple.removeEventListener('click', scanApple)
      bullsEyeCursor('laserCursor')

      let timeOut = 5

      function firstClickApple() {
        apple.style.left = '37.5vw'
        columnsBox.style.width = '100vw'
        laserPopupFirst.style.display = 'none'
        apple.classList.remove('laserAppleHovered')
        laserEnergy.style.width = '80%'
        apple.style.backgroundImage = "url('./images/appleSecondClick.png')"
        apple.removeEventListener('click', firstClickApple)
        apple.addEventListener('click', secondClickAwait)
        timeToGoBack.style.display = 'block'

        function secondClickAwait() {
          let finalTime = 25
          let cursor = document.querySelector('.laserCursor')
          cursor.remove()
          laserInterface.style.display = 'none'
          sunglasses.style.display = 'block'
          changeMode(0)
          finishPopup.style.display = 'block'
          finishPopup.style.animation = 'indicatormove 2.5s linear forwards'

          textElement.classList.remove('redTitle')
          backgroundCorners.forEach((corner) => {
            corner.classList.remove('red')
          })
          sunglasses.classList.add('finishedUI')
          apple.style.backgroundImage = "url('./images/appleDeleted.png')"
          fillCircle(11, sun)
          fillCircle(3, semicircle)
          for (i = 0; i < 4; i++) {
            progressBars[i].remove()
          }
          animatePercentage(sunPercent, 80)
          animatePercentage(anglePercent, 150, '°')
          animatePercentage(viewPercent, 80)
          changeWidth(progressBar2, 7)
          clearTimeout(resetLaser)
          clearInterval(interval)
          apple.removeEventListener('click', secondClickAwait)

          setInterval(() => {
            finalTime--
            finishTimeout.textContent = `ЗАВЕРШЕНИЕ ЧЕРЕЗ 0:${finalTime}`
          }, 1000)

          finalTimeout = setTimeout(() => {
            location.reload()
          }, 25000)
        }

        let interval = setInterval(() => {
          timeOut--
          timeBack.textContent = `0:0${timeOut}`
        }, 1000)

        let resetLaser = setTimeout(() => {
          clearInterval(interval)
          apple.removeEventListener('click', secondClickAwait)
          goBack()
        }, 5000)
      }

      apple.addEventListener('click', firstClickApple)
    })
  }

  clickIndicator()
  seePearl()
  zoomCactus()
  appleScan()
  laserMode()
})
