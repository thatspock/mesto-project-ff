// import { pop } from 'core-js/core/array';
import { initialCards } from './cards.js';
import './pages/index.css';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupNew = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');
const caption = popupImage.querySelector('.popup__caption');
const image = popupImage.querySelector(".popup__image");
const popupClose = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  cardImage.addEventListener('click', openImage);

  cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
    deleteCard(cardElement);
  });

  return cardElement;  
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove(); 
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  const cardElement = createCard(card, deleteCard);
  cardsContainer.append(cardElement); 
});

// Функция откртия модального окна
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeOnEsc);
};


// Функция закрытия модального окна
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeOnEsc);
};

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
});

addButton.addEventListener('click', () => {
  openPopup(popupNew);
});

popupClose.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  })
});

function closeOnEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
};

// Функция открытия изображения в модальном окне
function openImage(evt) {
  const place = evt.currentTarget.closest(".card");
  const cardImage = place.querySelector(".card__image");
  const cardTitle = place.querySelector(".card__title");

  caption.textContent = cardTitle.textContent;
  image.src = cardImage.src;
  image.alt = cardTitle.alt;

  openPopup(popupImage);
}
