const popupImage = document.querySelector('.popup_type_image');
const caption = popupImage.querySelector('.popup__caption');
const image = popupImage.querySelector(".popup__image");

// Функция откртия модального окна
export function openModal(popup) {
  popup.classList.add('popup_is-animated'); 
  setTimeout(() => {
    popup.classList.add('popup_is-opened');
  }, 0); 
  document.addEventListener('keydown', closeOnEsc);
};

// Функция закрытия модального окна
export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  setTimeout(() => {
    popup.classList.remove('popup_is-animated');
  }, 600);
  document.removeEventListener('keydown', closeOnEsc);
};

function closeOnEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
};

// Функция открытия изображения в модальном окне
export function openImage(evt) {
  const place = evt.currentTarget.closest(".card");
  const cardImage = place.querySelector(".card__image");
  const cardTitle = place.querySelector(".card__title");

  caption.textContent = cardTitle.textContent;
  image.src = cardImage.src;
  image.alt = cardTitle.alt;

  openModal(popupImage);
}
