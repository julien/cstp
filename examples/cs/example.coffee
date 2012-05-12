
sayHello = ->
  f = document.createDocumentFragment()
  h = document.createElement 'h1'
  h.innerHTML = 'Hello CoffeeScript'
  f.appendChild h
  b = document.body
  b.appendChild f
  f

window.onload = sayHello


