// header, footerの色を変える
(function () {
  'use strict';

  var account = document.querySelector("#nav-usernameMenu").textContent;
  var background = account.toRGBCode();

  var selectors = ["#awsc-nav-footer-content"];
  selectors.forEach(function (s) {
    document.querySelector(s).style.background = background;
    document.querySelector(s).style.borderColor = background;
  })

  var selectors = document.querySelectorAll("[class^='globalNav'], div.awsc-top-below-nav");
  for (var i = 0; i < selectors.length; i++) {
    selectors[i].style.background = background;
  }
})();