let myLibrary = []
myLibrary[0] = new Exercise("Bench Press", "chest, biceps, triceps", 315, 5, 5, "incomplete", 0);
myLibrary[1] = new Exercise("Deadlift", "posterior chain", 405, 5, 5, "incomplete", 0);

let setsCompleted

const newExercise = document.getElementById("new-exercise-btn").addEventListener("click", function() {
    addExercise();
    addNewestExercise(myLibrary);
});



function Exercise(name, target, weight, sets, reps, status, setsCompleted) {
    this.name = name;
    this.target = target;
    this.weight = weight;
    this.sets = sets;
    this.reps = reps;
    this.status = status;
    this.setsCompleted = setsCompleted;
}

function addExercise() {
    let name = window.prompt("Enter the name of the lift.");
    let target = window.prompt("Enter the targeted bodypart.");
    let weight = window.prompt("Enter the weight of the exercise.")
    let sets = window.prompt("Enter the number of sets.");
    let reps = window.prompt("Enter the number of reps per set.");
    let status = "incomplete";
    let setsCompleted = 0;
    
    const exercise = new Exercise(name, target, weight, sets, reps, status, setsCompleted);

    myLibrary.push(exercise);

}

function displayAllExercises(library) { // displays pre-existing exercises
    
    let length = library.length;

    for (let i = 0; i < length; i++) {
        let namePara = document.createElement('h2');
        let nameNode = document.createTextNode(library[i].name);
        namePara.appendChild(nameNode);

        let targetPara = document.createElement('p');
        let targetNode = document.createTextNode(library[i].target);
        targetPara.classList.add("target-paragraph");
        targetPara.appendChild(targetNode);

        let weightPara = document.createElement('p');
        let weightNode = document.createTextNode(library[i].sets + " sets x " + library[i].reps + " reps @ "+ library[i].weight + " lbs");
        weightPara.appendChild(weightNode);

        let completedPara = document.createElement('p');
        let completedNode = document.createTextNode("Sets Completed: " + library[i].setsCompleted)
        completedPara.classList.add("test-paragraph");

        let repsPara = document.createElement('p');

        completedPara.appendChild(completedNode);

        let statusPara = document.createElement('p');
        let statusNode = document.createTextNode("Status: " + library[i].status);
        statusPara.classList.add("status");
        statusPara.appendChild(statusNode);

        let exerciseDiv = document.createElement('div');
        exerciseDiv.appendChild(namePara);
        exerciseDiv.appendChild(targetPara);
        exerciseDiv.appendChild(weightPara);
        exerciseDiv.appendChild(completedPara);
        exerciseDiv.appendChild(repsPara);
        exerciseDiv.appendChild(statusPara);

        let exerciseContainer = document.getElementById("exercise");
        exerciseContainer.appendChild(exerciseDiv);

        exerciseDiv.dataset.indexNumber = i; // set data-attribute

        // remove exercise button

        let removeBtn = document.createElement("button");
        removeBtn.classList ="remove-exercise-btn";
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
        statusToggleBtn.classList = "status-btn";
        let status1 = myLibrary[i].status;

        statusToggleBtn.onclick = function(e) {
            status1 = myLibrary[i].status;
            if (status1 == "complete " + String.fromCodePoint(0x1F4AA)) {
                myLibrary[i].status = "incomplete";
            } else {
                myLibrary[i].status = "complete " + String.fromCodePoint(0x1F4AA);      
            }

            statusPara.removeChild(statusNode); // refactor: just replace childnode instead of deleting and re-appending
            statusNode = document.createTextNode("Status: " + library[i].status);
            statusPara.appendChild(statusNode);
        }
       
        // sets counter button
        let setCounterBtn = document.createElement("button");        
        setCounterBtn.classList = "set-counter-btn";
        setCounterBtn.textContent = String.fromCodePoint(0x2714);

        setCounterBtn.onclick = function(e) {
            myLibrary[i].setsCompleted = myLibrary[i].setsCompleted + 1;
            completedPara.removeChild(completedNode);
            completedNode = document.createTextNode("Sets Completed: " + library[i].setsCompleted);
            completedPara.appendChild(completedNode);
        }

        exerciseDiv.appendChild(removeBtn);
        exerciseDiv.appendChild(statusToggleBtn);
        exerciseDiv.appendChild(setCounterBtn);

    }
}


function addNewestExercise(library) {
    let length = library.length;

    let namePara = document.createElement('h2');
    let nameNode = document.createTextNode(library[length - 1].name);
    namePara.appendChild(nameNode);

    let targetPara = document.createElement('p');
    let targetNode = document.createTextNode(library[length - 1].target);
    targetPara.appendChild(targetNode);

    let weightPara = document.createElement('p');
    let weightNode = document.createTextNode(library[length - 1].weight);
    weightPara.appendChild(weightNode);

    let setsPara = document.createElement('p');
    let setsNode = document.createTextNode("Sets: " + library[length - 1].sets);
    let repsPara = document.createElement('p');
    let repsNode = document.createTextNode("Reps: " + library[length - 1].reps);
    setsPara.appendChild(setsNode);
    repsPara.appendChild(repsNode);

    let statusPara = document.createElement('p');
    let statusNode = document.createTextNode("Status: " + library[length - 1].status);
    statusPara.appendChild(statusNode);

    let exerciseDiv = document.createElement('div');
    exerciseDiv.appendChild(namePara);
    exerciseDiv.appendChild(targetPara);
    exerciseDiv.appendChild(weightPara);
    exerciseDiv.appendChild(setsPara);
    exerciseDiv.appendChild(repsPara);
    exerciseDiv.appendChild(statusPara);

    let exerciseContainer = document.getElementById("exercise");
    exerciseContainer.appendChild(exerciseDiv);

    exerciseDiv.dataset.indexNumber = (myLibrary.length) - 1;



      // remove exercise button
      let removeBtn = document.createElement("button");
      removeBtn.classList ="remove-exercise-btn";
      removeBtn.textContent = "Remove Book";
      removeBtn.onclick = function(e) {
          thisExercise = e.originalTarget.parentElement;
          thisExerciseIndex = thisExercise.dataset.indexNumber;
          myLibrary.splice(myLibrary[thisExerciseIndex], 1);
          console.log(thisExercise.querySelector('h2').textContent + " removed."); // debug helper
          thisExercise.remove();
    };

    // status toggle button

    let statusToggleBtn = document.createElement("button");
    statusToggleBtn.textContent = "Toggle Status";
    statusToggleBtn.classList = "status-btn";

    statusToggleBtn.onclick = function(e) {
        thisExercise = e.originalTarget.parentElement;
        let i = thisExercise.dataset.indexNumber;
        let status1 = myLibrary[i].status;
    
        if (status1 == "complete " + String.fromCodePoint(0x1F4AA)) {
            myLibrary[i].status = "incomplete";
        } else {
            myLibrary[i].status = "complete " + String.fromCodePoint(0x1F4AA);      
        }
        statusPara.removeChild(statusNode);// refactor: just replace childnode instead of deleting and re-appending; replaceChild()
        statusNode = document.createTextNode("Status: " + library[i].status);
        statusPara.appendChild(statusNode);
    }
    exerciseDiv.appendChild(removeBtn);
    exerciseDiv.appendChild(statusToggleBtn);

}

// function removeAll(library) {
//     library = [];
//     displayAllExercises(library);
//     library[0] = [];
//     library[1] = []
//     return library[0], library[1];
// }

// let removeAllBtn = document.getElementById("remove-all");
// removeAllBtn.addEventListener("click", function() {
//     removeAll(myLibrary);
//     console.log('remove all clicked')
//     // displayAllBooks(myLibrary);
// });


// localStorage

// let testArray = [{name: "bob", age: 2}, {name: "jan", age: 4}];
// localStorage.setItem('testArray', JSON.stringify(testArray));
// let retrievedArray = JSON.parse(localStorage.getItem('testArray'));

let retrievedLibrary;

document.getElementById("save-btn").addEventListener("click", function() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    retrievedLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    console.log("Saved!")
    return retrievedLibrary;
});
displayAllExercises(myLibrary); 


// idea 2

// if (retrievedLibrary !== "undefined") {
//     displayAllExercises(retrievedLibrary);
//     console.log("retrieved saved exercises!")
// }


// idea 1

// if (retrievedLibrary == "undefined") {
//      
// // displays books in the background
//     console.log('undefined hit')

// } else {
//     displayAllExercises(retrievedLibrary);
//     console.log('retrieved hit')
// }


