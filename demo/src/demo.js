import Pointer from '../../src/Pointer.js'

const handler = function (entry) {
  if (entry.isIntersecting) {
    if (entry.intersectionRatio > 0.75) {
      entry.target.classList.add('card-viewed')
    } else {
      if (entry.target.classList.contains('card-viewed')) {
        entry.target.classList.remove('card-viewed')
      }
    }
  }
}

const waypoints = document.querySelectorAll('.js-waypoint')
const activeWaypoints = []
waypoints.forEach((waypoint) => {
  const active = new Pointer({
    element: waypoint,
    handler: handler
  })
  activeWaypoints.push(active)
})
