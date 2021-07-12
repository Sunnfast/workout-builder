let myLibrary = [] // book objects need to be stored in an empty array
myLibrary[0] = new Book("1984", "George Orwell", 328, "read");
myLibrary[1] = new Book("Brave New World", "Aldous Huxley", 311, "unread");


const newBook = document.getElementById("new-book-btn").addEventListener("click", function() {
    addBookToArray();
    addNewestBook(myLibrary);
});



function Book(title, author, pages, readState) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readState = readState;
}

function addBookToArray() {
    let title = window.prompt("Enter the book's title.")
    let author = window.prompt("Enter the author of the book.")
    let pages = window.prompt("Enter the page count of the book.")
    let readState = window.prompt("Enter whether you have: read, not read, or are currently reading the book.")
    
    const book = new Book(title, author, pages, readState);

    myLibrary.push(book);

}

function displayAllBooks(library) { // displays pre-existing books
    
    let length = library.length;

    for (let i = 0; i < length; i++) {
        let titlePara = document.createElement('h2');
        let titleNode = document.createTextNode(library[i].title);
        titlePara.appendChild(titleNode);

        let authorPara = document.createElement('p');
        let authorNode = document.createTextNode(library[i].author);
        authorPara.appendChild(authorNode);


        let pagePara = document.createElement('p');
        let pageNode = document.createTextNode(library[i].pages + " pages");
        pagePara.appendChild(pageNode);

        let readPara = document.createElement('p');
        let readNode = document.createTextNode("Status: " + library[i].readState);
        readPara.appendChild(readNode);

        let bookDiv = document.createElement('div');
        bookDiv.appendChild(titlePara);
        bookDiv.appendChild(authorPara);
        bookDiv.appendChild(pagePara);
        bookDiv.appendChild(readPara);

        let bookShelf = document.getElementById("book");
        bookShelf.appendChild(bookDiv);
        bookDiv.dataset.indexNumber = i; // set data-attribute

        // add REMOVE BOOK button

        let removeBtn = document.createElement("button");
        removeBtn.classList ="remove-book-btn";
        removeBtn.textContent = "Remove Book";
        removeBtn.onclick = function(e) {
            thisBook = e.target.parentElement;
            thisBookIndex = thisBook.dataset.indexNumber;
            myLibrary.splice(myLibrary[thisBookIndex], 1);
            console.log(thisBook.querySelector('h2').textContent + " removed."); // debug helper
            thisBook.remove();
        };

        // readState toggle button

        let readStateToggleBtn = document.createElement("button");
        readStateToggleBtn.textContent = "Change Read/Unread";
        readStateToggleBtn.classList = "read-state-btn";
        let readState1 = myLibrary[i].readState;

        readStateToggleBtn.onclick = function(e) {
            readState1 = myLibrary[i].readState;
            if (readState1 == "read") {
                myLibrary[i].readState = "unread";
             
            } else {
                myLibrary[i].readState = "read";
            }

            readPara.removeChild(readNode); // refactor: just replace childnode instead of deleting and re-appending
            readNode = document.createTextNode("Status: " + library[i].readState);
            readPara.appendChild(readNode);
        }
       
        bookDiv.appendChild(removeBtn);
        bookDiv.appendChild(readStateToggleBtn);

    }
}


function addNewestBook(library) {
    let length = library.length;

    let titlePara = document.createElement('h2');
    let titleNode = document.createTextNode(library[length-1].title);
    titlePara.appendChild(titleNode);

    let authorPara = document.createElement('p');
    let authorNode = document.createTextNode(library[length-1].author);
    authorPara.appendChild(authorNode);


    let pagePara = document.createElement('p');
    let pageNode = document.createTextNode(library[length-1].pages + " pages");
    pagePara.appendChild(pageNode);

    let readPara = document.createElement('p');
    let readNode = document.createTextNode("Status: " + library[length-1].readState);
    readPara.appendChild(readNode);

    let bookDiv = document.createElement('div');
    bookDiv.appendChild(titlePara);
    bookDiv.appendChild(authorPara);
    bookDiv.appendChild(pagePara);
    bookDiv.appendChild(readPara);

    let bookShelf = document.getElementById("book");
    bookShelf.appendChild(bookDiv);

    bookDiv.dataset.indexNumber = (myLibrary.length) - 1;



      // REMOVE BOOK
      let removeBtn = document.createElement("button");
      removeBtn.classList ="remove-book-btn";
      removeBtn.textContent = "Remove Book";
      removeBtn.onclick = function(e) {
          thisBook = e.originalTarget.parentElement;
          thisBookIndex = thisBook.dataset.indexNumber;
          myLibrary.splice(myLibrary[thisBookIndex], 1);
          console.log(thisBook.querySelector('h2').textContent + " removed."); // debug helper
          thisBook.remove();
    };

    // readState toggle button

    let readStateToggleBtn = document.createElement("button");
    readStateToggleBtn.textContent = "Change Read/Unread";
    readStateToggleBtn.classList = "read-state-btn";

    readStateToggleBtn.onclick = function(e) {
        thisBook = e.originalTarget.parentElement;
        let i = thisBook.dataset.indexNumber;
        let readState1 = myLibrary[i].readState;
    
        if (readState1 == "read") {
            myLibrary[i].readState = "unread";
        } else {
            myLibrary[i].readState = "read";      
        }
        readPara.removeChild(readNode);// refactor: just replace childnode instead of deleting and re-appending; replaceChild()
        readNode = document.createTextNode("Status: " + library[i].readState);
        readPara.appendChild(readNode);
    }
    bookDiv.appendChild(removeBtn);
    bookDiv.appendChild(readStateToggleBtn);

}

// function removeAll(library) {
//     library = [];
//     // displayAllBooks(library);
// }

// let removeAllBtn = document.getElementById("remove-all");
// removeAllBtn.addEventListener("click", function() {
//     removeAll(myLibrary);
//     console.log('remove all clicked')
//     displayAllBooks(myLibrary);
// });



displayAllBooks(myLibrary);  
// displays books in the background