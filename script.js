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
        let weightNode = document.createTextNode(library[i].sets + " sets x " + library[i].reps + " reps @ "+ library[i].weight);
        weightPara.appendChild(weightNode);

        let conversionBtn = document.createElement("button");
        conversionBtn.classList = "conversion-btn";
        conversionBtn.textContent = "lbs"
        weightPara.appendChild(conversionBtn);

        let completedPara = document.createElement('p');
        let completedNode = document.createTextNode("Sets Completed: " + library[i].setsCompleted)
        
        let setCounterBtn = document.createElement("button");
        setCounterBtn.classList = "set-counter-btn";
        setCounterBtn.textContent = String.fromCodePoint(0x2B06);

        let setsMinusBtn = document.createElement("button");
        setsMinusBtn.classList = "set-minus-btn";
        setsMinusBtn.textContent = String.fromCodePoint(0x2B07);

        let repsPara = document.createElement('p');

        completedPara.appendChild(completedNode);
        completedPara.appendChild(setCounterBtn);
        completedPara.appendChild(setsMinusBtn);

        let statusPara = document.createElement('p');
        let statusNode = document.createTextNode(library[i].status);
        statusPara.classList.add("status");

        let statusToggleBtn = document.createElement("button");
        statusToggleBtn.textContent = "Status: ";
        statusToggleBtn.classList = "status-btn";

        statusPara.appendChild(statusToggleBtn);
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
        removeBtn.textContent = "Remove";
        removeBtn.onclick = function(e) {
            thisBook = e.target.parentElement;
            thisBookIndex = thisBook.dataset.indexNumber;
            myLibrary.splice(myLibrary[thisBookIndex], 1);
            console.log(thisBook.querySelector('h2').textContent + " removed."); // debug helper
            thisBook.remove();
        };

        // status toggle button

       
        let status1 = myLibrary[i].status;

        statusToggleBtn.onclick = function(e) {
            status1 = myLibrary[i].status;
            if (status1 == "complete " + String.fromCodePoint(0x1F4AA)) {
                myLibrary[i].status = "incomplete";
            } else {
                myLibrary[i].status = "complete " + String.fromCodePoint(0x1F4AA);      
            }

            statusPara.removeChild(statusNode); // refactor: just replace childnode instead of deleting and re-appending
            statusNode = document.createTextNode(library[i].status);
            statusPara.appendChild(statusNode);
        }
       
        // set counter buttons
       

        setCounterBtn.onclick = function(e) {
            myLibrary[i].setsCompleted = myLibrary[i].setsCompleted + 1;

            completedPara.removeChild(setCounterBtn);
            completedPara.removeChild(setsMinusBtn);
            completedPara.removeChild(completedNode);
            completedNode = document.createTextNode("Sets Completed: " + library[i].setsCompleted);
            completedPara.appendChild(completedNode);
            completedPara.appendChild(setCounterBtn);
            completedPara.appendChild(setsMinusBtn);
        }

        setsMinusBtn.onclick = function(e) {

            if (myLibrary[i].setsCompleted == 0) {
                myLibrary[i].setsCompleted
            } else {
                myLibrary[i].setsCompleted = myLibrary[i].setsCompleted -1;
            }
            

            completedPara.removeChild(setCounterBtn);
            completedPara.removeChild(setsMinusBtn);
            completedPara.removeChild(completedNode);
            completedNode = document.createTextNode("Sets Completed: " + library[i].setsCompleted);
            completedPara.appendChild(completedNode);
            completedPara.appendChild(setCounterBtn);
            completedPara.appendChild(setsMinusBtn);
        }

        exerciseDiv.appendChild(removeBtn);
        // exerciseDiv.appendChild(statusToggleBtn);
        // exerciseDiv.appendChild(setCounterBtn);

    }
}


function addNewestExercise(library) {
    let length = library.length;

    let namePara = document.createElement('h2');
    let nameNode = document.createTextNode(library[length - 1].name);
    namePara.appendChild(nameNode);

    let targetPara = document.createElement('p');
    let targetNode = document.createTextNode(library[length - 1].target);
    targetPara.classList.add("target-paragraph");
    targetPara.appendChild(targetNode);

    let weightPara = document.createElement('p');
    let weightNode = document.createTextNode(library[length - 1].sets + " sets x " + library[length - 1].reps + " reps @ "+ library[length - 1].weight + " lbs");
    weightPara.appendChild(weightNode);
  

    let completedPara = document.createElement('p');
    let completedNode = document.createTextNode("Sets Completed: " + library[length - 1].setsCompleted)
    
    let setCounterBtn = document.createElement("button");
    setCounterBtn.classList = "set-counter-btn";
    setCounterBtn.textContent = String.fromCodePoint(0x2B06);

    let setsMinusBtn = document.createElement("button");
    setsMinusBtn.classList = "set-minus-btn";
    setsMinusBtn.textContent = String.fromCodePoint(0x2B07);

    let repsPara = document.createElement('p');

    completedPara.appendChild(completedNode);
    completedPara.appendChild(setCounterBtn);
    completedPara.appendChild(setsMinusBtn);

    let statusPara = document.createElement('p');
    let statusNode = document.createTextNode(library[length - 1].status);
    statusPara.classList.add("status");

    let statusToggleBtn = document.createElement("button");
    statusToggleBtn.textContent = "Status: ";
    statusToggleBtn.classList = "status-btn";

    statusPara.appendChild(statusToggleBtn);
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

    exerciseDiv.dataset.indexNumber = (myLibrary.length) - 1;



      // remove exercise button
      let removeBtn = document.createElement("button");
      removeBtn.classList ="remove-exercise-btn";
      removeBtn.textContent = "Remove";
      removeBtn.onclick = function(e) {
          thisExercise = e.originalTarget.parentElement;
          thisExerciseIndex = thisExercise.dataset.indexNumber;
          myLibrary.splice(myLibrary[thisExerciseIndex], 1);
          console.log(thisExercise.querySelector('h2').textContent + " removed."); // debug helper
          thisExercise.remove();
    };

    // status toggle button


    statusToggleBtn.onclick = function(e) {
        thisExercise = e.originalTarget.parentElement;
        let i = thisExercise.dataset.indexNumber;
        let status1 = myLibrary[length - 1].status;
    
        if (status1 == "complete " + String.fromCodePoint(0x1F4AA)) {
            myLibrary[length-1].status = "incomplete";
        } else {
            myLibrary[length - 1].status = "complete " + String.fromCodePoint(0x1F4AA);      
        }
        statusPara.removeChild(statusNode);// refactor: just replace childnode instead of deleting and re-appending; replaceChild()
        statusNode = document.createTextNode(library[length - 1].status);
        statusPara.appendChild(statusNode);
    }
        // set counter buttons
       

        setCounterBtn.onclick = function(e) {
            let i = length - 1;
            myLibrary[i].setsCompleted = myLibrary[i].setsCompleted + 1;

            completedPara.removeChild(setCounterBtn);
            completedPara.removeChild(setsMinusBtn);
            completedPara.removeChild(completedNode);
            completedNode = document.createTextNode("Sets Completed: " + library[i].setsCompleted);
            completedPara.appendChild(completedNode);
            completedPara.appendChild(setCounterBtn);
            completedPara.appendChild(setsMinusBtn);
        }

        setsMinusBtn.onclick = function(e) {
            let i = length - 1;    
            if (myLibrary[i].setsCompleted == 0) {
                myLibrary[i].setsCompleted
            } else {
                myLibrary[i].setsCompleted = myLibrary[i].setsCompleted -1;
            }
            

            completedPara.removeChild(setCounterBtn);
            completedPara.removeChild(setsMinusBtn);
            completedPara.removeChild(completedNode);
            completedNode = document.createTextNode("Sets Completed: " + library[length -1].setsCompleted);
            completedPara.appendChild(completedNode);
            completedPara.appendChild(setCounterBtn);
            completedPara.appendChild(setsMinusBtn);
        }

        exerciseDiv.appendChild(removeBtn);
    

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


