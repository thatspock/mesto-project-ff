import { initialCards } from './cards.js';
import { createCard, toggleLike, deleteCard } from './card.js';
import { openModal, closeModal, openImage } from './modal.js';
import '../pages/index.css';

const cardsContainer = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupNew = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');
const popupClose = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const formNewCard = popupNew.querySelector('.popup__form[name="new-place"]');
const cardNameInput = formNewCard.querySelector('.popup__input[name="place-name"]');
const cardLinkInput = formNewCard.querySelector('.popup__input[name="link"]');

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileName.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closeModal(popupEdit);
}

function fillFormWithCurrentValues() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

// Прикрепляем обработчик к форме
formElement.addEventListener('submit', handleFormSubmit); 

function handleNewCardSubmit(evt) {
  evt.preventDefault();

  const cardName = cardNameInput.value;
  const cardLink = cardLinkInput.value;

  const cardElement = createCard({ name: cardName, link: cardLink }, deleteCard, toggleLike, openImage);
  cardsContainer.prepend(cardElement);

  closeModal(popupNew);
  formNewCard.reset();
}

formNewCard.addEventListener('submit', handleNewCardSubmit);

// Вывести карточки на страницу
initialCards.forEach(card => {
  const cardElement = createCard(card, deleteCard, toggleLike, openImage);
  cardsContainer.append(cardElement); 
});

editButton.addEventListener('click', () => {
  fillFormWithCurrentValues();
  openModal(popupEdit);
});

addButton.addEventListener('click', () => {
  openModal(popupNew);
});

popupClose.forEach(button => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closeModal(popup));
});

popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closeModal(popup);
    }
  })
});
