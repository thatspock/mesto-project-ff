// Функция открытия модального окна
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

export function setupOverlayClose(popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  })
};
