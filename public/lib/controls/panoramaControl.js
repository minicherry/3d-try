const THREE = window.THREE

const panoramaControl = function (params) {
  const {
    camera, domElement, pointMoveCallBack, whellCallBack, cameraChangeCallback, context
  } = params
  var control = {}

  control.enabled = true
  control.zoomEnabled = true
  control.speed = 0.7
  control.minPolarAngle = THREE.Math.degToRad(-90)
  control.maxPolarAngle = THREE.Math.degToRad(90)
  control.zoomSpeed = 0.8
  control.context = context

  control.enableInertia = true
  control.inertiaMovingFactor = 0.7
  control.inertiaFactor = 0.8 // 0 - 1, 值越大，惯性越大

  control.touchMovingSensitive = 0.01 // 屏幕百分比

  control.maxFovLimit = 115 // 滑动到某个极限值后放大
  control.minFovLimit = 40 // 滑动到某个极限值后放大

  control.hasTriggerOnFovLimitExceed = false

  var _this = control

  control.onFovChanged = function () {}
  control.onFovLimitExceed = function () {}

  control.onCameraRotate = function () {
  }
  control.onTouchOrMouseDown = function () {}
  control.onMinLimitToNormal = function () {}
  control.onMaxLimitToNormal = function () {}

  var isPointDown = false

  var onPointerDownX = 0; var onPointerDownY = 0
  var theta = 0; var onPointerDownTheta = 0
  var phi = 0; var onPointerDownPhi = 0

  var slideAverageHistory = []

  var lastCameraRotation = { theta: 0, phi: 0 }

  var inertialDelta = new THREE.Spherical()
  var EPS = 0.000001

  registEvent(domElement)

  animate()

  function registEvent (domElement) {
    if (domElement === null || domElement === undefined) {
      domElement = document
    }

    domElement.addEventListener('mousedown', onMouseDown, false)
    domElement.addEventListener('mousemove', onMouseMove, false)
    domElement.addEventListener('mouseup', onMouseUp, false)
    domElement.addEventListener('mouseout', onMouseUp, false)
    domElement.addEventListener('wheel', onMouseWheel, false)
  }
  control.registEvent = registEvent

  function unregistEvent (domElement) {
    if (domElement === null || domElement === undefined) {
      domElement = document
    }

    domElement.removeEventListener('mousedown', onMouseDown, false)
    domElement.removeEventListener('mousemove', onMouseMove, false)
    domElement.removeEventListener('mouseup', onMouseUp, false)
    domElement.removeEventListener('mouseout', onMouseUp, false)
    domElement.removeEventListener('wheel', onMouseWheel, false)
  }

  control.unregistEvent = unregistEvent

  function initVars (x, y) {
    onPointerDownX = x
    onPointerDownY = y

    onPointerDownTheta = camera.rotation.y
    onPointerDownPhi = camera.rotation.x

    lastCameraRotation.theta = camera.rotation.y
    lastCameraRotation.phi = camera.rotation.x

    slideAverageHistory.splice(0, slideAverageHistory.length)
    inertialDelta.theta = 0
    inertialDelta.phi = 0
  }

  function onPointDown (x, y) {
    isPointDown = true

    initVars(x, y)

    if (_this.onTouchOrMouseDown) {
      _this.onTouchOrMouseDown()
    }
  }

  function onPointMove (x, y) {
    pointMoveCallBack && pointMoveCallBack()

    if (isPointDown && _this.enabled) {
      var theta = (x - onPointerDownX) * _this.speed * 0.003 + onPointerDownTheta
      var phi = (y - onPointerDownY) * _this.speed * 0.003 + onPointerDownPhi

      phi = Math.max(_this.minPolarAngle, Math.min(_this.maxPolarAngle, phi))

      var factor = 0.6
      inertialDelta.theta += (theta - lastCameraRotation.theta) * factor
      inertialDelta.phi += (phi - lastCameraRotation.phi) * factor

      lastCameraRotation.theta = theta
      lastCameraRotation.phi = phi
      console.log(theta, phi)

      _this.onCameraRotate()
    }
  }

  function onPointUp () {
    isPointDown = false
  }

  // mouse control
  function onMouseDown (event) {
    event.preventDefault()
    onPointDown(event.clientX * getFactor(), event.clientY * getFactor())
    _this.enabled && (_this.context.IS_CAMERA_CHANGING = true)
  }

  function onMouseMove (event) {
    if (!_this.enabled) {
      return
    }

    event.preventDefault()
    onPointMove(event.clientX * getFactor(), event.clientY * getFactor())
  }

  function onMouseUp (event) {
    event.preventDefault()
    onPointUp()
    _this.context.IS_CAMERA_CHANGING = false
  }

  function onMouseWheel (event) {
    if (!_this.enabled || !_this.zoomEnabled) {
      return
    }

    let deltaY = 0
    if (typeof domElement.onmousewheel === 'undefined') {
      deltaY = event.deltaY > 0 ? 120 : -120
    } else {
      deltaY = event.deltaY
    }

    var fov = camera.fov + deltaY * 0.05

    camera.fov = fov
    camera.updateProjectionMatrix()
    whellCallBack && whellCallBack()

    if (_this.onFovChanged) _this.onFovChanged(fov)
  }

  function getFactor () {
    return _this.speed * (camera.fov / 100) * (1000 / domElement.clientWidth)
  }

  function updateCameraRotation (theta, phi) {
    phi = Math.max(_this.minPolarAngle, Math.min(_this.maxPolarAngle, phi))

    camera.rotation.x = phi
    camera.rotation.y = theta
  }

  function updateInertialDelta (inertiaFactor) {
    if (inertialDelta.theta !== 0 || inertialDelta.phi !== 0) {
      inertialDelta.theta *= inertiaFactor
      inertialDelta.phi *= inertiaFactor

      if (Math.abs(inertialDelta.theta) < EPS) inertialDelta.theta = 0
      if (Math.abs(inertialDelta.phi) < EPS) inertialDelta.phi = 0
    }
  }

  function update () {
    if (!_this.enabled) {
      return
    }

    if (_this.enableInertia && (inertialDelta.theta !== 0 || inertialDelta.phi !== 0)) {
      updateInertialDelta(isPointDown ? _this.inertiaMovingFactor : _this.inertiaFactor)
      theta = camera.rotation.y + inertialDelta.theta
      phi = camera.rotation.x + inertialDelta.phi
      updateCameraRotation(theta, phi)
      cameraChangeCallback && cameraChangeCallback()
    }
  }

  function animate () {
    requestAnimationFrame(animate)
    update()
  }

  return control
}

export default panoramaControl
