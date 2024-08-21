document.addEventListener('DOMContentLoaded', () => {
    const bookDetailsContainer = document.getElementById('book-details');
    const deleteButton = document.getElementById('delete-book');

    const book = JSON.parse(localStorage.getItem('selectedBook'));
    if (book) {
        bookDetailsContainer.innerHTML = `
            <h3>${book.title}</h3>
            <p>${book.first_sentence ? book.first_sentence[0] : 'No description available'}</p>
            <p>Author: ${book.author_name ? book.author_name[0] : 'Unknown'}</p>
        `;
    }

    deleteButton.addEventListener('click', () => {
        localStorage.removeItem('selectedBook');
        bookDetailsContainer.innerHTML = '';
    });
});
