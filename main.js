let canvas = document.querySelector('#canvas')
let context = canvas.getContext('2d')
let isUsing = false  // 状态锁
let lastPoint = { x: undefined, y: undefined }
let eraserEnabled = false

let actions = document.querySelector('.actions')
let eraser = document.querySelector('#eraser')
let clear = document.querySelector('#clear')
let download = document.querySelector('#download')
let colors = document.querySelector('.colors')

let thin = document.querySelector('#thin')
let thick = document.querySelector('#thick')
let lineWidth = 5

thin.addEventListener('click', function() {
  thin.classList.add('active')
  thick.classList.remove('active')
  lineWidth = 5
})

thick.addEventListener('click', function() {
  thin.classList.remove('active')
  thick.classList.add('active')
  lineWidth = 10
})

clear.addEventListener('click', function() {
  context.clearRect(0, 0, canvas.width, canvas.height)
})

download.addEventListener('click', function() {
  let url = canvas.toDataURL('images/png', 1.0)
  let a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = "我的画"
  a.click()
})

eraser.addEventListener('click', function () {
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')
})

pen.addEventListener('click', function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')
})

colors.addEventListener('click', function (event) {
  switch (event.target.id ) {
    case "black":
    removeClass()
    event.target.classList.add('active')
    context.strokeStyle = "black"
    break

    case "red" :
    removeClass()
    event.target.classList.add('active')
    context.strokeStyle = "red"
    break

    case "green" :
    removeClass()
    event.target.classList.add('active')
    context.strokeStyle = "green"
    break

    case "blue" :
    removeClass()
    event.target.classList.add('active')
    context.strokeStyle = "blue"
    break
  }
    
})

function removeClass () {
  for (let i = 0; i < colors.children.length; i++) {
    colors.children[i].classList.remove('active')
  }
}

setCanvasSize()

if ('ontouchstart' in document.documentElement) {
  canvas.addEventListener('touchstart', function (event) {
    let x = event.touches[0].clientX
    let y = event.touches[0].clientY
    isUsing = true
    if (eraserEnabled) {
      context.clearRect(x - 10, y - 10, 20, 20)
    } else {
      lastPoint.x = x
      lastPoint.y = y
    }
  })

  canvas.addEventListener('touchmove', function (event) {
    event.preventDefault()
    let x = event.touches[0].clientX
    let y = event.touches[0].clientY
    if (!isUsing) { return }
    if (eraserEnabled) {
      if (isUsing) {
        context.clearRect(x - 10, y - 10, 20, 20)
      }
    } else {
      let newPoint = { x: undefined, y: undefined }
      newPoint.x = x
      newPoint.y = y
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }
  }, false)
  
  canvas.addEventListener('touchend', function () {
    isUsing = false
  })


} else {
  canvas.addEventListener('mousedown', function (event) {
    let x = event.clientX
    let y = event.clientY
    isUsing = true
    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 10, 10)
    } else {
      lastPoint.x = x
      lastPoint.y = y
    }
  })
  
  canvas.addEventListener('mousemove', function () {
    let x = event.clientX
    let y = event.clientY
    if (!isUsing) { return }
    if (eraserEnabled) {
      if (isUsing) {
        context.clearRect(x - 5, y - 5, 10, 10)
      }
    } else {
      let newPoint = { x: undefined, y: undefined }
      newPoint.x = x
      newPoint.y = y
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
      lastPoint = newPoint
    }
  })
  
  canvas.addEventListener('mouseup', function () {
    isUsing = false
  })
}

function setCanvasSize() {
  autoSize()
  window.addEventListener('resize', function () {
    autoSize()
  })
  function autoSize() {
    canvas.height = document.documentElement.clientHeight
    canvas.width = document.documentElement.clientWidth
  }
}


function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x1, y1)
  context.lineWidth = lineWidth
  context.lineTo(x2, y2)
  context.closePath()
  context.stroke()
}



