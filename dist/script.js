let myLibrary = [];
myLibrary[0] = new Exercise(
  "Bench Press",
  "chest, biceps, triceps",
  135,
  5,
  5,
  "incomplete",
  0
);
myLibrary[1] = new Exercise(
  "Deadlift",
  "posterior chain",
  225,
  5,
  5,
  "incomplete",
  0
);

let setsCompleted;

const newExercise = document
  .getElementById("new-exercise-btn")
  .addEventListener("click", function () {
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
  let weight = window.prompt("Enter the weight of the exercise.");
  let sets = window.prompt("Enter the number of sets.");
  let reps = window.prompt("Enter the number of reps per set.");
  let status = "incomplete";
  let setsCompleted = 0;

  const exercise = new Exercise(
    name,
    target,
    weight,
    sets,
    reps,
    status,
    setsCompleted
  );

  myLibrary.push(exercise);
}

function displayAllExercises(library) {
  // displays pre-existing exercises

  let length = library.length;

  for (let i = 0; i < length; i++) {
    let namePara = document.createElement("h2");
    let nameNode = document.createTextNode(library[i].name);
    namePara.appendChild(nameNode);

    let statusSpan = document.createElement("span");
    let statusNode = document.createTextNode(library[i].status);
    statusSpan.classList.add("status");
    statusSpan.appendChild(statusNode);

    let statusToggleBtn = document.createElement("button");
    statusToggleBtn.textContent = "Status: ";
    statusToggleBtn.classList = "status-btn";

    namePara.append(statusToggleBtn, statusSpan);

    let targetPara = document.createElement("p");
    let targetNode = document.createTextNode(library[i].target);
    targetPara.classList.add("target-paragraph");
    targetPara.appendChild(targetNode);

    let weightPara = document.createElement("p");
    let weightNode = document.createTextNode(
      `${library[i].sets}
        sets x
        ${library[i].reps}
        reps @ 
        ${library[i].weight}`
    );
    weightPara.appendChild(weightNode);

    let conversionBtn = document.createElement("button");
    conversionBtn.classList = "conversion-btn";
    conversionBtn.textContent = "lbs";
    weightPara.appendChild(conversionBtn);

    let completedPara = document.createElement("p");
    let completedNode = document.createTextNode(
      `Sets Completed: ${library[i].setsCompleted}`
    );

    let setCounterBtn = document.createElement("button");
    setCounterBtn.classList = "set-counter-btn";
    setCounterBtn.textContent = "+";

    let setsMinusBtn = document.createElement("button");
    setsMinusBtn.classList = "set-minus-btn";
    setsMinusBtn.textContent = "-";

    let repsPara = document.createElement("p");
    completedPara.append(completedNode, setCounterBtn, setsMinusBtn);

    let exerciseDiv = document.createElement("div");
    exerciseDiv.append(
      namePara,
      targetPara,
      weightPara,
      completedPara,
      repsPara
    );

    let exerciseContainer = document.getElementById("exercise");
    exerciseContainer.appendChild(exerciseDiv);

    exerciseDiv.dataset.indexNumber = i; // set data-attribute

    // remove exercise button

    let removeBtn = document.createElement("button");
    removeBtn.classList = "remove-exercise-btn";
    removeBtn.textContent = "Remove";
    removeBtn.onclick = function (e) {
      thisBook = e.target.parentElement;
      thisBookIndex = thisBook.dataset.indexNumber;
      myLibrary.splice(myLibrary[thisBookIndex], 1);
      console.log(thisBook.querySelector("h2").textContent + " removed."); // debug helper
      thisBook.remove();
    };

    // status toggle button

    let status1 = myLibrary[i].status;

    statusToggleBtn.onclick = function (e) {
      status1 = myLibrary[i].status;
      if (status1 == `complete ` + String.fromCodePoint(0x1f4aa)) {
        myLibrary[i].status = `incomplete`;
      } else {
        myLibrary[i].status = `complete ` + String.fromCodePoint(0x1f4aa);
      }

      namePara.removeChild(statusSpan); // refactor: just replace childnode instead of deleting and re-appending
      statusSpan = document.createElement("span");
      statusNode = document.createTextNode(library[i].status);
      statusSpan.classList.add("status");
      statusSpan.appendChild(statusNode);
      namePara.appendChild(statusSpan);
    };

    // set counter buttons

    setCounterBtn.onclick = function (e) {
      myLibrary[i].setsCompleted = myLibrary[i].setsCompleted + 1;

      completedPara.removeChild(setCounterBtn);
      completedPara.removeChild(setsMinusBtn);
      completedPara.removeChild(completedNode);
      completedNode = document.createTextNode(
        `Sets Completed: ${library[i].setsCompleted}`
      );
      completedPara.append(completedNode, setCounterBtn, setsMinusBtn);
    };

    setsMinusBtn.onclick = function (e) {
      if (myLibrary[i].setsCompleted == 0) {
        myLibrary[i].setsCompleted;
      } else {
        myLibrary[i].setsCompleted = myLibrary[i].setsCompleted - 1;
      }

      completedPara.removeChild(setCounterBtn);
      completedPara.removeChild(setsMinusBtn);
      completedPara.removeChild(completedNode);
      completedNode = document.createTextNode(
        "Sets Completed: " + library[i].setsCompleted
      );
      completedPara.appendChild(completedNode);
      completedPara.appendChild(setCounterBtn);
      completedPara.appendChild(setsMinusBtn);
    };

    // conversion button
    conversionBtn.onclick = function (e) {
      if (conversionBtn.textContent == "lbs") {
        myLibrary[i].weight = Math.round(myLibrary[i].weight / 2.2);
        conversionBtn.textContent = "kg";

        weightPara.removeChild(weightNode);
        weightPara.removeChild(conversionBtn);
        weightNode = document.createTextNode(
          `${library[i].sets}
             sets x 
            ${library[i].reps}
             reps @ 
            ${library[i].weight}`
        );
        weightPara.append(weightNode, conversionBtn);
      } else if (conversionBtn.textContent == "kg") {
        myLibrary[i].weight = Math.round(myLibrary[i].weight * 2.2);
        conversionBtn.textContent = "lbs";

        weightPara.removeChild(weightNode);
        weightPara.removeChild(conversionBtn);
        weightNode = document.createTextNode(
          library[i].sets +
            " sets x " +
            library[i].reps +
            " reps @ " +
            library[i].weight
        );

        weightPara.append(weightNode, conversionBtn);
      }
    };

    exerciseDiv.appendChild(removeBtn);
  }
}

function addNewestExercise(library) {
  let length = library.length;

  let namePara = document.createElement("h2");
  let nameNode = document.createTextNode(library[length - 1].name);
  namePara.appendChild(nameNode);

  let statusSpan = document.createElement("span");
  let statusNode = document.createTextNode(library[length - 1].status);
  statusSpan.classList.add("status");
  statusSpan.appendChild(statusNode);

  let statusToggleBtn = document.createElement("button");
  statusToggleBtn.textContent = "Status: ";
  statusToggleBtn.classList = "status-btn";

  namePara.appendChild(statusToggleBtn);
  namePara.appendChild(statusSpan);

  let targetPara = document.createElement("p");
  let targetNode = document.createTextNode(library[length - 1].target);
  targetPara.classList.add("target-paragraph");
  targetPara.appendChild(targetNode);

  let weightPara = document.createElement("p");
  let weightNode = document.createTextNode(
    `${library[length - 1].sets} sets x ${library[length - 1].reps} reps @ ${
      library[length - 1].weight
    } lbs`
  );
  weightPara.appendChild(weightNode);

  let conversionBtn = document.createElement("button");
  conversionBtn.classList = "conversion-btn";
  conversionBtn.textContent = "lbs";
  weightPara.appendChild(conversionBtn);

  let completedPara = document.createElement("p");
  let completedNode = document.createTextNode(
    `Sets Completed: ${library[length - 1].setsCompleted}`
  );

  let setCounterBtn = document.createElement("button");
  setCounterBtn.classList = "set-counter-btn";
  setCounterBtn.textContent = "+";

  let setsMinusBtn = document.createElement("button");
  setsMinusBtn.classList = "set-minus-btn";
  setsMinusBtn.textContent = "-";

  let repsPara = document.createElement("p");

  completedPara.append(completedNode, setCounterBtn, setsMinusBtn);

  let exerciseDiv = document.createElement("div");
  exerciseDiv.append(namePara, targetPara, weightPara, completedPara, repsPara);

  let exerciseContainer = document.getElementById("exercise");
  exerciseContainer.appendChild(exerciseDiv);

  exerciseDiv.dataset.indexNumber = myLibrary.length - 1;

  // remove exercise button
  let removeBtn = document.createElement("button");
  removeBtn.classList = "remove-exercise-btn";
  removeBtn.textContent = "Remove";
  removeBtn.onclick = function (e) {
    thisExercise = e.originalTarget.parentElement;
    thisExerciseIndex = thisExercise.dataset.indexNumber;
    myLibrary.splice(myLibrary[thisExerciseIndex], 1);
    console.log(thisExercise.querySelector("h2").textContent + " removed."); // debug helper
    thisExercise.remove();
  };

  // status toggle button

  statusToggleBtn.onclick = function (e) {
    thisExercise = e.originalTarget.parentElement;
    let i = thisExercise.dataset.indexNumber;
    let status1 = myLibrary[length - 1].status;

    if (status1 == `complete ` + String.fromCodePoint(0x1f4aa)) {
      myLibrary[length - 1].status = `incomplete`;
    } else {
      myLibrary[length - 1].status =
        `complete ` + String.fromCodePoint(0x1f4aa);
    }
    namePara.removeChild(statusSpan); // refactor: just replace childnode instead of deleting and re-appending
    statusSpan = document.createElement("span");
    statusNode = document.createTextNode(library[length - 1].status);
    statusSpan.classList.add("status");
    statusSpan.appendChild(statusNode);
    namePara.appendChild(statusSpan);
  };
  // set counter buttons

  setCounterBtn.onclick = function (e) {
    let i = length - 1;
    myLibrary[i].setsCompleted = myLibrary[i].setsCompleted + 1;

    completedPara.removeChild(setCounterBtn);
    completedPara.removeChild(setsMinusBtn);
    completedPara.removeChild(completedNode);
    completedNode = document.createTextNode(
      `Sets Completed: ${library[i].setsCompleted}`
    );

    completedPara.append(completedNode, setCounterBtn, setsMinusBtn);
  };

  setsMinusBtn.onclick = function (e) {
    let i = length - 1;
    if (myLibrary[i].setsCompleted == 0) {
      myLibrary[i].setsCompleted;
    } else {
      myLibrary[i].setsCompleted = myLibrary[i].setsCompleted - 1;
    }

    completedPara.removeChild(setCounterBtn);
    completedPara.removeChild(setsMinusBtn);
    completedPara.removeChild(completedNode);
    completedNode = document.createTextNode(
      `Sets Completed: ${library[length - 1].setsCompleted}`
    );
    completedPara.appendChild(completedNode);
    completedPara.appendChild(setCounterBtn);
    completedPara.appendChild(setsMinusBtn);
  };
  // conversion button
  conversionBtn.onclick = function (e) {
    if (conversionBtn.textContent == "lbs") {
      myLibrary[length - 1].weight = Math.round(
        myLibrary[length - 1].weight / 2.2
      );
      conversionBtn.textContent = "kg";

      weightPara.removeChild(weightNode);
      weightPara.removeChild(conversionBtn);
      weightNode = document.createTextNode(
        `${library[length - 1].sets}
           sets x 
          ${library[length - 1].reps}
           reps @ 
          ${library[length - 1].weight}`
      );
      weightPara.append(weightNode, conversionBtn);
    } else if (conversionBtn.textContent == "kg") {
      myLibrary[length - 1].weight = Math.round(
        myLibrary[length - 1].weight * 2.2
      );
      conversionBtn.textContent = "lbs";

      weightPara.removeChild(weightNode);
      weightPara.removeChild(conversionBtn);
      weightNode = document.createTextNode(
        `${library[length - 1].sets}
           sets x 
          ${library[length - 1].reps}
           reps @ 
          ${library[length - 1].weight}`
      );

      weightPara.append(weightNode, conversionBtn);
    }
  };

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

plateCalcBtn.onclick = function (e) {
  //imperial units only at this time

  let biggestPlates; // 45 lbs
  let secondBiggest; // 25 lbs
  let thirdbiggest; // 10 lbs
  let secondSmallest; // 5 lbs
  let smallest; // 2.5 lbs
  let remainder;

  let weightInput = document.getElementById("weight-input").value;

  let weightNum = Math.abs(Number(weightInput));

  // for lbs assuming a 45 lb barbell

  secondBiggest = 0;
  thirdbiggest = 0;
  secondSmallest = 0;
  smallest = 0;

  // calculate 45 lb plates
  weightNum = (weightNum - 45) / 2;
  biggestPlates = Math.floor(weightNum / 45);

  // calculate 25 lb plates
  if (weightNum % 45 !== 0) {
    remainder = weightNum - biggestPlates * 45;
    secondBiggest = Math.floor(remainder / 25);
    weightNum = remainder;

    // calculate 10 lb plates
    if (weightNum % 25 !== 0) {
      remainder = weightNum - secondBiggest * 25;
      thirdbiggest = Math.floor(remainder / 10);
      weightNum = remainder;

      // calculate 5 lb plates
      if (weightNum % 10 !== 0) {
        remainder = weightNum - thirdbiggest * 10;
        secondSmallest = Math.floor(remainder / 5);
        weightNum = remainder;

        // calculate 2.5 lb plates
        if (weightNum % 5 !== 5) {
          remainder = weightNum - secondSmallest * 5;
          smallest = Math.floor(remainder / 2.5);
        }
      }
    }
  }

  // plate calc results display
  let oldDiv = document.querySelector("#original");
  let newDiv = document.createElement("div");
  let container = document.querySelector(".result-container");

  let platesPer = document.createElement("p");
  platesPer.innerText = "Plates per side:";
  platesPer.classList.add = "platesPer";

  let biggestPlatesPara = document.createElement("p");
  biggestPlatesPara.innerText = biggestPlates + " x 45 lbs";

  let secondBiggestPara = document.createElement("p");
  secondBiggestPara.innerText = secondBiggest + " x 25 lbs";

  let thirdbiggestPara = document.createElement("p");
  thirdbiggestPara.innerText = thirdbiggest + " x 10 lbs";

  let secondSmallestPara = document.createElement("p");
  secondSmallestPara.innerText = secondSmallest + " x 5 lbs";

  let smallestPara = document.createElement("p");
  smallestPara.innerText = smallest + " x 2.5 lbs";

  newDiv.append(
    platesPer,
    biggestPlatesPara,
    secondBiggestPara,
    thirdbiggestPara,
    secondSmallestPara,
    smallestPara
  );

  newDiv.classList.add = "calc-results";

  container.replaceChild(newDiv, oldDiv);
  newDiv.id = "original";
};

// menu toggle

const menuBtn = document.querySelector(".toggle-button");
const menu = document.getElementsByClassName("menu")[0];
const menuBars = document.getElementsByClassName("bar");

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
});
