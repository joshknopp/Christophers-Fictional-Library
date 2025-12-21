
import './style.css';

let books = [];
let currentBook = null;
let currentPageIndex = 0;

/**
 * Fetches book data from the JSON file.
 */
async function fetchBooks() {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}books.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const fetchedBooks = await response.json();
    // Prepend the base URL to all book asset paths
    books = fetchedBooks.map(book => ({
      ...book,
      cover: `${import.meta.env.BASE_URL}${book.cover}`,
      pages: book.pages.map(page => `${import.meta.env.BASE_URL}${page}`),
    }));
  } catch (error) {
    console.error("Could not fetch books:", error);
  }
}

/**
 * Renders the bookshelf in the DOM.
 */
function renderBookshelf() {
  const bookshelfElement = document.getElementById('app');
  if (!bookshelfElement) return;

  const booksHtml = books.map(book => `
    <div class="book-cover" data-book-id="${book.id}">
      <img src="${book.cover}" alt="${book.title}" loading="lazy">
    </div>
  `).join('');

  bookshelfElement.innerHTML = booksHtml;
}

/**
 * Shows a specific page in the reader view.
 */
function showPage(index) {
  const pagesWrapper = document.querySelector('.pages-wrapper');
  if (!pagesWrapper) return;

  const offset = -index * 100;
  pagesWrapper.style.transform = `translateX(${offset}%)`;
  currentPageIndex = index;
}

/**
 * Opens the reader view for a specific book.
 */
function openReader(bookId) {
  currentBook = books.find(b => b.id === bookId);
  if (!currentBook) return;

  const pagesContainer = document.getElementById('reader-view-pages');
  // Clear previous content safely
  while (pagesContainer.firstChild) {
    pagesContainer.removeChild(pagesContainer.firstChild);
  }

  const pagesWrapper = document.createElement('div');
  pagesWrapper.className = 'pages-wrapper';
  pagesWrapper.style.width = `${currentBook.pages.length * 100}%`;

  currentBook.pages.forEach(pageSrc => {
    const pageElement = document.createElement('div');
    pageElement.className = 'reader-page';

    const imgElement = document.createElement('img');
    imgElement.src = pageSrc;
    imgElement.alt = `Page from ${currentBook.title}`;
    imgElement.loading = 'lazy';

    pageElement.appendChild(imgElement);
    pagesWrapper.appendChild(pageElement);
  });

  pagesContainer.appendChild(pagesWrapper);

  document.getElementById('reader-view').style.display = 'flex';
  showPage(0);
}

/**
 * Closes the reader view.
 */
function closeReader() {
  document.getElementById('reader-view').style.display = 'none';
  currentBook = null;
}

/**
 * Sets up event listeners for the application.
 */
function setupEventListeners() {
  // Bookshelf clicks
  document.getElementById('app').addEventListener('click', (event) => {
    const bookCover = event.target.closest('.book-cover');
    if (bookCover) {
      openReader(bookCover.dataset.bookId);
    }
  });

  // Reader view navigation
  document.getElementById('close-reader').addEventListener('click', closeReader);
  document.getElementById('next-page').addEventListener('click', () => {
    if (currentBook && currentPageIndex < currentBook.pages.length - 1) {
      showPage(currentPageIndex + 1);
    }
  });
  document.getElementById('prev-page').addEventListener('click', () => {
    if (currentBook && currentPageIndex > 0) {
      showPage(currentPageIndex - 1);
    }
  });

  // Keyboard navigation
  window.addEventListener('keydown', (event) => {
    if (!currentBook) return;
    if (event.key === 'ArrowRight') {
      document.getElementById('next-page').click();
    } else if (event.key === 'ArrowLeft') {
      document.getElementById('prev-page').click();
    } else if (event.key === 'Escape') {
      closeReader();
    }
  });
}

/**
 * Main function to initialize the application.
 */
async function main() {
  await fetchBooks();
  renderBookshelf();
  setupEventListeners();
}

main();
