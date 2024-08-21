document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search');
    const innerContainer = document.getElementById('inner-container');

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value;
        if (query) {
            fetchBooks(query);
        }
    });

    async function fetchBooks(query) {
        const url = `https://openlibrary.org/search.json?q=${query}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log('Search Results:', data);
            displayBooks(data.docs);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }

    function displayBooks(books) {
        innerContainer.innerHTML = '';
        const fragment = document.createDocumentFragment();

        books.forEach(book => {
            console.log('Processing Book:', book);
            
            const bookBox = document.createElement('div');
            bookBox.classList.add('box');

            const bookImage = document.createElement('div');
            bookImage.classList.add('image');
            
            const img = document.createElement('img');
            img.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
            img.alt = `Book Image ${book.title}`;
            bookImage.appendChild(img);

            const bookDetails = document.createElement('div');
            bookDetails.classList.add('details');
            
            const title = document.createElement('h3');
            title.textContent = book.title;
            
            const description = document.createElement('p');
            description.textContent = book.first_sentence ? book.first_sentence[0] : 'No description available';
            
            const readBy = document.createElement('p');
            readBy.textContent = `Author: ${book.author_name ? book.author_name[0] : 'Unknown'}`;

            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('button-container');
            
            const purchaseBtn = document.createElement('button');
            purchaseBtn.textContent = 'Purchase';
            purchaseBtn.addEventListener('click', () => {
                localStorage.setItem('selectedBook', JSON.stringify(book));
                window.location.href = '/html/purchase.html';
            });

            const wannaReadBtn = document.createElement('button');
            wannaReadBtn.textContent = 'Wanna Read';
            wannaReadBtn.addEventListener('click', () => {
                localStorage.setItem('selectedBook', JSON.stringify(book));
                window.location.href = '/html/read-online.html';
            });

            buttonContainer.appendChild(purchaseBtn);
            buttonContainer.appendChild(wannaReadBtn);

            bookDetails.appendChild(title);
            bookDetails.appendChild(description);
            bookDetails.appendChild(readBy);
            bookDetails.appendChild(buttonContainer);

            bookBox.appendChild(bookImage);
            bookBox.appendChild(bookDetails);

            fragment.appendChild(bookBox);
        });

        innerContainer.appendChild(fragment);
    }
});