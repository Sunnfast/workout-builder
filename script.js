let myLibrary = [] // book objects need to be stored in an empty array
myLibrary[0] = new Exercise("Bench Press", "chest, biceps, triceps", 315, "5x5", "incomplete");
myLibrary[1] = new Exercise("Deadlift", "posterior chain", 405, "5x5", "complete");


const newExercise = document.getElementById("new-book-btn").addEventListener("click", function() {
    addExercise();
    addNewestBook(myLibrary);
});



function Exercise(name, target, weight, sets, status) {
    this.name = name;
    this.target = target;
    this.weight = weight;
    this.sets = sets;
    this.status = status;
}

function addExercise() {
    let name = window.prompt("Enter the name of the lift.");
    let target = window.prompt("Enter the targeted bodypart.");
    let weight = window.prompt("Enter the weight of the exercise.")
    let sets = window.prompt("Enter the number of sets and reps.");
    let status = window.prompt("Enter whether you have completed the exercise or not.");
    
    const exercise = new Exercise(name, target, weight, sets, status);

    myLibrary.push(exercise);

}

function displayAllBooks(library) { // displays pre-existing books
    
    let length = library.length;

    for (let i = 0; i < length; i++) {
        let namePara = document.createElement('h2');
        let nameNode = document.createTextNode(library[i].name);
        namePara.appendChild(nameNode);

        let targetPara = document.createElement('p');
        let targetNode = document.createTextNode(library[i].target);
        targetPara.appendChild(targetNode);

        let weightPara = document.createElement('p');
        let weightNode = document.createTextNode(library[i].weight);
        weightPara.appendChild(weightNode);

        let setsPara = document.createElement('p');
        let setsNode = document.createTextNode("Sets x Reps: " + library[i].sets);
        setsPara.appendChild(setsNode);

        let statusPara = document.createElement('p');
        let statusNode = document.createTextNode("Status: " + library[i].status);
        statusPara.appendChild(statusNode);

        let exerciseDiv = document.createElement('div');
        exerciseDiv.appendChild(namePara);
        exerciseDiv.appendChild(targetPara);
        exerciseDiv.appendChild(weightPara);
        exerciseDiv.appendChild(setsPara);
        exerciseDiv.appendChild(statusPara);

        let bookShelf = document.getElementById("exercise");
        bookShelf.appendChild(exerciseDiv);
        exerciseDiv.dataset.indexNumber = i; // set data-attribute

        // remove exericse button

        let removeBtn = document.createElement("button");
        removeBtn.classList ="remove-book-btn";
        removeBtn.textContent = "Remove Exercise";
        removeBtn.onclick = function(e) {
            thisBook = e.target.parentElement;
            thisBookIndex = thisBook.dataset.indexNumber;
            myLibrary.splice(myLibrary[thisBookIndex], 1);
            console.log(thisBook.querySelector('h2').textContent + " removed."); // debug helper
            thisBook.remove();
        };

        // status toggle button

        let statusToggleBtn = document.createElement("button");
        statusToggleBtn.textContent = "Toggle Status";
        statusToggleBtn.classList = "read-state-btn";
        let status1 = myLibrary[i].status;

        statusToggleBtn.onclick = function(e) {
            status1 = myLibrary[i].status;
            if (status1 == "complete") {
                myLibrary[i].status = "incomplete";
             
            } else {
                myLibrary[i].status = "complete";
            }

            statusPara.removeChild(statusNode); // refactor: just replace childnode instead of deleting and re-appending
            statusNode = document.createTextNode("Status: " + library[i].status);
            statusPara.appendChild(statusNode);
        }
       
        exerciseDiv.appendChild(removeBtn);
        exerciseDiv.appendChild(statusToggleBtn);

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

    let bookShelf = document.getElementById("exercise");
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