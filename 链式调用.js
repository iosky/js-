// 首先介绍一下链式调用的特点和优点： 代码简洁易懂，减少了多次重复使用同一个变量
// 最常见的就是jquery库，例如$('#id').show().hide().show();这样的代码。
// 如果想上面这样去调用，我们需要这样做，首先我们需要新建一个对象，然后包装这个对象，把方法都挂载在上面，
// 所有方法放回this

window.$ = function () {
  'use strict';
  return new _$(id);

function _$(id) {
  this.element = document.querySelector(id);
  _$.prototype = {
    constructor: _$,
    hide: function() {
      console.log('hide');
      return this;
    },
    show: function() {
      consoloe.log('show');
      return this;
    },
    getName: function(callback) {
      if(callback) {
        callback.call(this, this.name);
      }
      return this;
    },
    setName: function(name) {
      this.name = name;
      return this;
    }
  }
  $('#id').setName('xesam').getName(function(name) {
    console.log(name);
  }).show().hide().show().hide().show();
}
}