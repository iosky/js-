var circle = document.getElementById('container').getElementsByTagName('div')

//隐藏背景颜色
function hiddenimg() {
  for (var j = 0; j < 4; j++) {
    circle[j].style.backgroundColor = 'white'
  }
}
for (var i = 0; i < 4; i++) {
  circle[i].onclick = (function(n) {
    return function() {
      hiddenimg()
      circle[n].style.backgroundColor = 'red'
    }
  })(i)
}
