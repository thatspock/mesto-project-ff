// Функция открытия модального окна
export function openModal(popup) {
  popup.classList.add('popup_is-opened'); 
  document.addEventListener('keydown', closeOnEsc);
};

// Функция закрытия модального окна
export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
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

export function closePopupByOverlay(popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  })
};
