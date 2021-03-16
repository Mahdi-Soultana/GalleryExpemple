const mainArea = document.querySelector(".container_gallery");

function ModalContructor(el, currentImg) {
  this.container = el;
  this.modalImgs = [...el.querySelectorAll(".img")];
  this.currentImg = currentImg;
  this.modal = document.querySelector(".container");
  this.modalImgsContainer = this.modal.querySelector("div.modal_imgs");
  this.closeBtn = document.querySelector(".closeBtn");
  this.mainImg = document.querySelector(".main_img img");
  this.prevBtn = document.querySelector(".prevBtn");
  this.nextBtn = document.querySelector(".nextBtn");
  this.prevBtnFn = this.prevBtnFn.bind(this);
  this.nextBtnFn = this.nextBtnFn.bind(this);
  this.closeBtnFn = this.closeBtnFn.bind(this);
  // Calling Fun
  this.openModal();
}
ModalContructor.prototype.openModal = function () {
  this.modal.classList.add("active");
  this.mainImg.src = this.currentImg.src;
  this.modalImgsContainer.innerHTML = this.modalImgs
    .map(
      (img, i) => `
    <img
         
          class="${img.src == this.currentImg.src ? "selected" : "img"}"
          src="${img.src}"
          alt="img-${i}"
          title="image-${i}"
        />
  `
    )
    .join("");
  this.prevBtn.addEventListener("click", this.prevBtnFn);
  this.nextBtn.addEventListener("click", this.nextBtnFn);
  this.closeBtn.addEventListener("click", this.closeBtnFn);
};

ModalContructor.prototype.nextBtnFn = function (e) {
  let selectedImg = this.modalImgsContainer.querySelector(".selected");
  let nextSelectedImg =
    selectedImg.nextElementSibling || this.modalImgsContainer.firstElementChild;
  nextSelectedImg.classList.add("selected");
  this.mainImg.src = nextSelectedImg.src;
  selectedImg.classList.remove("selected");
};
ModalContructor.prototype.prevBtnFn = function (e) {
  let selectedImg = this.modalImgsContainer.querySelector(".selected");
  let prevSelectedImg =
    selectedImg.previousElementSibling ||
    this.modalImgsContainer.firstElementChild;
  prevSelectedImg.classList.add("selected");
  this.mainImg.src = prevSelectedImg.src;
  selectedImg.classList.remove("selected");
};
ModalContructor.prototype.closeBtnFn = function (e) {
  this.modal.classList.remove("active");
  this.nextBtn.removeEventListener("click", this.nextBtnFn);
  this.prevBtn.removeEventListener("click", this.prevBtnFn);
  this.closeBtn.removeEventListener("click", this.closeBtnFn);
};
mainArea.addEventListener("click", function (e) {
  if (e.target.classList.contains("img")) {
    new ModalContructor(e.target.parentElement, e.target);
  }
});
