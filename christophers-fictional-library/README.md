# Christopher’s Fictional Library

This is a simple static website that displays a collection of fictional books. It's built with Vite and vanilla JavaScript.

## How to Add a New Book

To add a new book to the library, follow these steps:

1.  **Update `public/books.json`**:
    Add a new JSON object to the array in `public/books.json`. The object should have the following structure:

    ```json
    {
      "id": "book-3",
      "title": "Your New Book Title",
      "cover": "/assets/books/book-3/cover.jpg",
      "pages": [
        "/assets/books/book-3/page-1.jpg",
        "/assets/books/book-3/page-2.jpg"
      ]
    }
    ```

2.  **Create a New Directory**:
    Create a new directory inside `public/assets/books/`. The name of the directory should match the `id` of the book you added to `books.json`. For example, `public/assets/books/book-3`.

3.  **Add Book Images**:
    Place the cover image and all page images inside the new directory you created. Make sure the file names match the paths you specified in `books.json`.

## A Note on Google Drive Links

Using Google Drive "sharing" links for images is not recommended. These links are not direct image URLs and may not render correctly or reliably in the application.

**Recommended Approach**:
It is best to download the images from Google Drive and place them directly in the `public/assets/books/[book-id]/` directory as described above. This ensures that the images are always available and load quickly.
