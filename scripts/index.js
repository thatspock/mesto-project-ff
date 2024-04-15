// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
  const clonedFragment = cardTemplate.cloneNode(true);
  const cardElement = clonedFragment.querySelector('.card');

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
