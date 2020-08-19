function changePageSize(size) {
  const element = document.getElementsByClassName('po-page-slide-container')[0];

  element.classList.remove('po-page-slide-sm');
  element.classList.remove('po-page-slide-md');
  element.classList.remove('po-page-slide-lg');
  element.classList.remove('po-page-slide-xl');
  element.classList.remove('po-page-slide-auto');
  element.classList.add(`po-page-slide-${size}`);

  document.querySelector('.style-page-size').innerHTML = `Size: ${size}`;
}

function showPageSlide() {
  const pageSlide = document.querySelector('.po-page-slide');
  pageSlide.classList.add('show');
}

function hidePageSlide() {
  const pageSlide = document.querySelector('.po-page-slide');
  pageSlide.classList.remove('show');
}
