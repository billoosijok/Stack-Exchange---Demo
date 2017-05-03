
var template = document.getElementById('template');
var wrapper = document.createElement("div");
wrapper.setAttribute('class', 'main');

document.body.appendChild(wrapper);

wrapper.innerHTML = Mustache.to_html(template.innerHTML, response);
