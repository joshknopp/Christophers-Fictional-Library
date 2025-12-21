
import './style.css';

let books = [];
let currentBook = null;
let currentPageIndex = 0;

/**
 * Fetches book data from the JSON file.
 */
async function fetchBooks() {
  try {
    const response = await fetch('/books.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    books = await response.json();
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
  pagesContainer.innerHTML = `
    <div class="pages-wrapper" style="width: ${currentBook.pages.length * 100}%">
      ${currentBook.pages.map(pageSrc => `
        <div class="reader-page">
          <img src="${pageSrc}" alt="Page from ${currentBook.title}" loading="lazy">
        </div>
      `).join('')}
    </div>
  `;

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
