const body = document.querySelector('body')

/**
    * @param {Object} initialPosition
    * @param {number} initialPosition.x
    * @param {number} initialPosition.y
    * @param {number} size
    *
    * @returns {HTMLDivElement}
    */
function createCircle({ x, y }, size) {
    const circle = document.createElement('div')

    circle.style.position = 'fixed'

    circle.style.left = `${x}px`
    circle.style.top = `${y}px`
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.borderRadius = `${size / 2}px`
    circle.style.zIndex = -99
    circle.style.backgroundColor = 'var(--circle-color)'

    return circle
}

body.style.backdropFilter = 'blur(10px)'

const circleSize = 100

let center = {
    x: window.visualViewport.width / 2 - circleSize / 2,
    y: window.visualViewport.height / 2 - circleSize / 2,
}

const updateCenter = () => {
    center = {
        x: window.visualViewport.width / 2 - circleSize / 2,
        y: window.visualViewport.height / 2 - circleSize / 2,
    }
}

const circle = createCircle(center, circleSize)

window.visualViewport.addEventListener('resize', () => {
    updateCenter()
    circle.style.left = `${center.x}px`
    circle.style.top = `${center.y}px`
})

const html = document.querySelector('html')
html.appendChild(circle)

let currentX = center.x
let currentY = center.y
let targetX = center.x
let targetY = center.y

function lerpCircleToTargetPosition() {
    currentX += (targetX - currentX) * 0.05
    currentY += (targetY - currentY) * 0.05

    circle.style.left = `${currentX}px`
    circle.style.top = `${currentY}px`

    requestAnimationFrame(lerpCircleToTargetPosition)
}

lerpCircleToTargetPosition()

if (navigator.userAgent.includes('Mobile')) {
    navigator.permissions.query({ name: 'accelerometer' }).then(result => {
        body.prepend(result.state)

        let accelerometer = null
        accelerometer = new Accelerometer({ frequency: 60 })

        accelerometer.addEventListener('reading', (e) => {
            // weighted average
            targetX = center.x - e.target.x * 20
            targetY = center.y + e.target.y * 20
        })
        accelerometer.start()
    }).catch(() => {
        // fallback to mouse position
        window.addEventListener('mousemove', (e) => {
            targetX = e.clientX
            targetY = e.clientY
        })
    })
} else {
    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX - circleSize / 2
        targetY = e.clientY - circleSize / 2
    })
}
