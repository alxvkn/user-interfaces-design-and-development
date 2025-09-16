const body = document.querySelector('body')

/**
    * @param {Object} initialPosition
    * @param {number} initialPosition.x
    * @param {number} initialPosition.y
    * @param {number} size
    *
    * @returns {SVGElement}
    */
function createCircle({ x, y }, size) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')

    circle.setAttribute('r', (size / 2).toString())
    circle.setAttribute('cx', size / 2)
    circle.setAttribute('cy', size / 2)
    circle.setAttribute('fill', 'var(--circle-color)')

    svg.appendChild(circle)

    svg.setAttribute('width', (size).toString())
    svg.setAttribute('height', (size).toString())

    svg.style.position = 'fixed'

    svg.style.left = `${x}px`
    svg.style.top = `${y}px`
    svg.style.filter = 'blur(10px)'
    svg.style.zIndex = -99

    return svg
}

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
body.appendChild(circle)

window.visualViewport.addEventListener('resize', () => {
    updateCenter()
    circle.style.left = `${center.x}px`
    circle.style.top = `${center.y}px`
})

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
        if (result.state != 'granted') throw new Error()

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
