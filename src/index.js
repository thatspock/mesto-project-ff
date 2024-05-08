// import { pop } from 'core-js/core/array';
import { initialCards } from './cards.js';
import './pages/index.css';

const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const card = document.querySelector('.card');
const popupNew = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector('.popup_type_image');
const popupClose = document.querySelector('.popup__close');

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

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

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeOnEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeOnEsc);
}

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
});

popupClose.addEventListener('click', () => {
  const openedPopup = document.querySelector('.popup_is-opened');
  closePopup(openedPopup);
})

function closeOnEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
