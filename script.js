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

      
        let statusSpan = document.createElement('span');
        let statusNode = document.createTextNode(library[i].status);
        statusSpan.classList.add("status");
        statusSpan.appendChild(statusNode);

        let statusToggleBtn = document.createElement("button");
        statusToggleBtn.textContent = "Status: ";
        statusToggleBtn.classList = "status-btn";

        namePara.appendChild(statusToggleBtn);
        namePara.appendChild(statusSpan);

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
        setCounterBtn.textContent = "+";

        let setsMinusBtn = document.createElement("button");
        setsMinusBtn.classList = "set-minus-btn";
        setsMinusBtn.textContent = "-";

        let repsPara = document.createElement('p');

        completedPara.appendChild(completedNode);
        completedPara.appendChild(setCounterBtn);
        completedPara.appendChild(setsMinusBtn);
        

        let exerciseDiv = document.createElement('div');
        exerciseDiv.appendChild(namePara);
        exerciseDiv.appendChild(targetPara);
        exerciseDiv.appendChild(weightPara);
        exerciseDiv.appendChild(completedPara);
        exerciseDiv.appendChild(repsPara);

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

            namePara.removeChild(statusSpan); // refactor: just replace childnode instead of deleting and re-appending
            statusSpan = document.createElement('span');
            statusNode = document.createTextNode(library[i].status);
            statusSpan.classList.add("status");
            statusSpan.appendChild(statusNode);
            namePara.appendChild(statusSpan);
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

        // conversion button
        conversionBtn.onclick = function(e) {
            if (conversionBtn.textContent == "lbs") {
                myLibrary[i].weight = Math.round(myLibrary[i].weight / 2.2);
                conversionBtn.textContent = "kg"

                weightPara.removeChild(weightNode);
                weightPara.removeChild(conversionBtn);
                weightNode = document.createTextNode(library[i].sets + " sets x " + library[i].reps + " reps @ "+ library[i].weight);
                weightPara.appendChild(weightNode);
                weightPara.appendChild(conversionBtn);

            } else if (conversionBtn.textContent == "kg") {
                myLibrary[i].weight =  Math.round(myLibrary[i].weight * 2.2);
                conversionBtn.textContent = "lbs"

                weightPara.removeChild(weightNode);
                weightPara.removeChild(conversionBtn);
                weightNode = document.createTextNode(library[i].sets + " sets x " + library[i].reps + " reps @ "+ library[i].weight);

                weightPara.appendChild(weightNode);
                weightPara.appendChild(conversionBtn);

            }
        }

        exerciseDiv.appendChild(removeBtn);
        

    }
}


function addNewestExercise(library) {
    let length = library.length;

    let namePara = document.createElement('h2');
    let nameNode = document.createTextNode(library[length - 1].name);
    namePara.appendChild(nameNode);

    let statusSpan = document.createElement('span');
    let statusNode = document.createTextNode(library[length - 1].status);
    statusSpan.classList.add("status");
    statusSpan.appendChild(statusNode);

    let statusToggleBtn = document.createElement("button");
    statusToggleBtn.textContent = "Status: ";
    statusToggleBtn.classList = "status-btn";

    namePara.appendChild(statusToggleBtn);
    namePara.appendChild(statusSpan);

    let targetPara = document.createElement('p');
    let targetNode = document.createTextNode(library[length - 1].target);
    targetPara.classList.add("target-paragraph");
    targetPara.appendChild(targetNode);

    let weightPara = document.createElement('p');
    let weightNode = document.createTextNode(library[length - 1].sets + " sets x " + library[length - 1].reps + " reps @ "+ library[length - 1].weight + " lbs");
    weightPara.appendChild(weightNode);
  
    let conversionBtn = document.createElement("button");
    conversionBtn.classList = "conversion-btn";
    conversionBtn.textContent = "lbs"
    weightPara.appendChild(conversionBtn);

    let completedPara = document.createElement('p');
    let completedNode = document.createTextNode("Sets Completed: " + library[length - 1].setsCompleted)
    
    let setCounterBtn = document.createElement("button");
    setCounterBtn.classList = "set-counter-btn";
    setCounterBtn.textContent = "+";

    let setsMinusBtn = document.createElement("button");
    setsMinusBtn.classList = "set-minus-btn";
    setsMinusBtn.textContent = "-";

    let repsPara = document.createElement('p');

    completedPara.appendChild(completedNode);
    completedPara.appendChild(setCounterBtn);
    completedPara.appendChild(setsMinusBtn);

    let exerciseDiv = document.createElement('div');
    exerciseDiv.appendChild(namePara);
    exerciseDiv.appendChild(targetPara);
    exerciseDiv.appendChild(weightPara);
    exerciseDiv.appendChild(completedPara);
    exerciseDiv.appendChild(repsPara);

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
        namePara.removeChild(statusSpan); // refactor: just replace childnode instead of deleting and re-appending
        statusSpan = document.createElement('span');
        statusNode = document.createTextNode(library[length - 1].status);
        statusSpan.classList.add("status");
        statusSpan.appendChild(statusNode);
        namePara.appendChild(statusSpan);
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
        // conversion button
        conversionBtn.onclick = function(e) {
            if (conversionBtn.textContent == "lbs") {
                myLibrary[length -1].weight = Math.round(myLibrary[length - 1].weight / 2.2);
                conversionBtn.textContent = "kg"

                weightPara.removeChild(weightNode);
                weightPara.removeChild(conversionBtn);
                weightNode = document.createTextNode(library[length - 1].sets + " sets x " + library[length -1].reps + " reps @ "+ library[length - 1].weight);
                weightPara.appendChild(weightNode);
                weightPara.appendChild(conversionBtn);

            } else if (conversionBtn.textContent == "kg") {
                myLibrary[length - 1].weight =  Math.round(myLibrary[length - 1].weight * 2.2);
                conversionBtn.textContent = "lbs"

                weightPara.removeChild(weightNode);
                weightPara.removeChild(conversionBtn);
                weightNode = document.createTextNode(library[length - 1].sets + " sets x " + library[length -1].reps + " reps @ "+ library[length - 1].weight);

                weightPara.appendChild(weightNode);
                weightPara.appendChild(conversionBtn);

            }
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

// document.getElementById("save-btn").addEventListener("click", function() {
//     localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
//     retrievedLibrary = JSON.parse(localStorage.getItem('myLibrary'));
//     console.log("Saved!")
//     return retrievedLibrary;
// });
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


// weight plate calculator

let plateCalcBtn = document.getElementById("calculate");
let plateResult = document.getElementById("result-div");


plateCalcBtn.onclick = function(e) {
    let biggestPlates
    let remainder
    let secondBiggest
    let thirdbiggest
    let secondSmallest
    let smallest 
    let weightNum = Number(document.getElementById("weight-input").value);

    // for lbs assuming a 45 lb barbell
    weightNum = (weightNum - 45)/2;
    console.log("weightNum is currently " + weightNum);
    biggestPlates = Math.floor(weightNum / 45);


    if (weightNum % 45 !== 0) {
        remainder = weightNum - (biggestPlates * 45);
        secondBiggest = Math.floor(remainder / 25);
        console.log("45 check")
        
        if (remainder % 25 !== 0) {
            let remainder = weightNum - (secondBiggest * 25);
            thirdbiggest = Math.floor(remainder / 10);
            console.log("25 check")


            if (remainder % 10 !== 0) {
                remainder = weightNum - (thirdbiggest * 10);
                secondSmallest = Math.floor(remainder / 5);
                console.log("10 check")

                if (remainder % 5 !== 5) {
                    remainder = weightNum - (secondSmallest * 5);
                    smallest = Math.floor(remainder / 2.5);
                    console.log(" 5 check")

                }
            }
        }
    }
 
    let biggestPlatesPara = document.createElement('p');
    let secondBiggestPara = document.createElement('p');
    let thirdbiggestPara = document.createElement('p');
    let secondSmallestPara = document.createElement('p');
    let smallestPara = document.createElement('p');


    biggestPlatesPara.classList = "plates";
    secondBiggestPara.classList = "plates";
    thirdbiggestPara.classList = "plates";
    secondSmallestPara.classList = "plates";
    smallestPara.classList = "plates";

    let biggestPlatesNode = document.createTextNode(biggestPlates + " x 45 lbs");
    let secondBiggestNode = document.createTextNode(secondBiggest + " x 25 lbs");
    let thirdbiggestNode = document.createTextNode(thirdbiggest + " x 10 lbs");
    let secondSmallestNode = document.createTextNode(secondSmallest + " x 5 lbs");
    let smallestNode = document.createTextNode(smallest + " x 2.5 lbs");
    biggestPlatesPara.appendChild(biggestPlatesNode);
    secondBiggestPara.appendChild(secondBiggestNode);
    thirdbiggestPara.appendChild(thirdbiggestNode);
    secondSmallestPara.appendChild(secondSmallestNode);
    smallestPara.appendChild(smallestNode);

    plateResult.appendChild(biggestPlatesPara);
    plateResult.appendChild(secondBiggestPara);
    plateResult.appendChild(thirdbiggestPara);
    plateResult.appendChild(secondSmallestPara);
    plateResult.appendChild(smallestPara);

    // plateResult.removeChild(biggestPlatesPara);
    // plateResult.removeChild(secondBiggestPara);

    // plateResult.appendChild(biggestPlatesPara);
    // plateResult.appendChild(secondBiggestPara);

}
