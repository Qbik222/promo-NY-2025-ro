"use strict";

var body = document.querySelector('body');
var textBtn = document.querySelector('.test-btn');
textBtn.addEventListener('click', function () {
  if (body.classList.contains('light')) {
    body.classList.remove('light');
    body.classList.add('dark');
    textBtn.innerHTML = 'light';
    return;
  }
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    body.classList.add('light');
    textBtn.innerHTML = 'dark';
  }
});

//code
// function pauseRandomly(element) {
//     setTimeout(function () {
//         element.classList.add('pause');
//         setTimeout(function () {
//             element.classList.remove('pause');
//         }, Math.random() * 8000);
//     }, Math.random() * 5000);
// }
//
// const prizes = document.querySelectorAll('.prize__item-img img');
//
// prizes.forEach(pauseRandomly);
"use strict";
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZWNvbmQuanMiXSwibmFtZXMiOlsiYm9keSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInRleHRCdG4iLCJhZGRFdmVudExpc3RlbmVyIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJyZW1vdmUiLCJhZGQiLCJpbm5lckhUTUwiXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTUEsSUFBSSxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxNQUFNLENBQUM7QUFDM0MsSUFBTUMsT0FBTyxHQUFHRixRQUFRLENBQUNDLGFBQWEsQ0FBQyxXQUFXLENBQUM7QUFFbkRDLE9BQU8sQ0FBQ0MsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07RUFDcEMsSUFBSUosSUFBSSxDQUFDSyxTQUFTLENBQUNDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBQztJQUNqQ04sSUFBSSxDQUFDSyxTQUFTLENBQUNFLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDOUJQLElBQUksQ0FBQ0ssU0FBUyxDQUFDRyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBQzFCTCxPQUFPLENBQUNNLFNBQVMsR0FBRyxPQUFPO0lBQzNCO0VBQ0o7RUFDQSxJQUFJVCxJQUFJLENBQUNLLFNBQVMsQ0FBQ0MsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFDO0lBQ2hDTixJQUFJLENBQUNLLFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUM3QlAsSUFBSSxDQUFDSyxTQUFTLENBQUNHLEdBQUcsQ0FBQyxPQUFPLENBQUM7SUFDM0JMLE9BQU8sQ0FBQ00sU0FBUyxHQUFHLE1BQU07RUFDOUI7QUFDSixDQUFDLENBQUM7O0FBR0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5QkEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcbmNvbnN0IHRleHRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVzdC1idG4nKVxuXG50ZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGlmIChib2R5LmNsYXNzTGlzdC5jb250YWlucygnbGlnaHQnKSl7XG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbGlnaHQnKTtcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdkYXJrJyk7XG4gICAgICAgIHRleHRCdG4uaW5uZXJIVE1MID0gJ2xpZ2h0J1xuICAgICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdkYXJrJykpe1xuICAgICAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2RhcmsnKTtcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdsaWdodCcpO1xuICAgICAgICB0ZXh0QnRuLmlubmVySFRNTCA9ICdkYXJrJ1xuICAgIH1cbn0pXG5cblxuLy9jb2RlXG4vLyBmdW5jdGlvbiBwYXVzZVJhbmRvbWx5KGVsZW1lbnQpIHtcbi8vICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwYXVzZScpO1xuLy8gICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgncGF1c2UnKTtcbi8vICAgICAgICAgfSwgTWF0aC5yYW5kb20oKSAqIDgwMDApO1xuLy8gICAgIH0sIE1hdGgucmFuZG9tKCkgKiA1MDAwKTtcbi8vIH1cbi8vXG4vLyBjb25zdCBwcml6ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJpemVfX2l0ZW0taW1nIGltZycpO1xuLy9cbi8vIHByaXplcy5mb3JFYWNoKHBhdXNlUmFuZG9tbHkpO1xuXG4iLCIiXX0=
