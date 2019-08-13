const saveToLocalStorage = (userID, cards) => {
    const arrJson = JSON.stringify(cards)
    localStorage.setItem(userID,arrJson)
}

const getCardsFromLocalStorage = (userID) =>
localStorage.getItem(userID) ? JSON.parse(localStorage.getItem(userID)) : []

export { saveToLocalStorage, getCardsFromLocalStorage };