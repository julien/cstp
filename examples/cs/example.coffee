sayHello = ->
  h = document.createElement 'h1'
  h.innerHTML = 'Hello CoffeeScript'
  document.body.appendChild(document.createDocumentFragment().appendChild h)

window.onload = sayHello
#vim set wrap ts=2 sw=2 invlist

