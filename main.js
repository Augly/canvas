let canvas = document.querySelector('#canvas')
let context = canvas.getContext('2d')
let isUsing = false  // 状态锁
let lastPoint = { x: undefined, y: undefined }
let eraserEnabled = false
let actions = document.querySelector('.actions')
let eraser = document.querySelector('#eraser')
let brush = document.querySelector('#brush')

eraser.addEventListener('click', function () {
  eraserEnabled = true
  actions.classList.add('active')
})
brush.addEventListener('click', function () {
  eraserEnabled = false
  actions.classList.remove('active')
})

setCanvasSize()

if ('ontouchstart' in document.documentElement) {
  canvas.addEventListener('touchstart', function (event) {
    console.log(event)
    let x = event.touches[0].clientX
    let y = event.touches[0].clientY
    isUsing = true
    if (eraserEnabled) {
      context.clearRect(x - 5, y - 5, 10, 10)
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
        context.clearRect(x - 5, y - 5, 10, 10)
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
  context.strokeStyle = "black"
  context.moveTo(x1, y1)
  context.lineWidth = 5
  context.lineTo(x2, y2)
  context.closePath()
  context.stroke()
}



