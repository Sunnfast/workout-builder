# Workout Builder

## Table of contents

- [Overview](#overview)
  - [Functionality](#functionality)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

This web application serves to help users keep track of their lifts throughout their entire workout. From my experience, I have found that most people that lift generally have their phones on their person throughout their workout for music, podcasts, audiobooks, etc. Since most gym-goers already have their phones on them, this program will allow users to perform basic tracking without having to pack anything extra in their gym bag and be able to remain completely focused on working out.

Lastly, I wanted to build a program that is capable of having an actual, albeit small, userbase in order to understand how I can develop based on user feedback/stories firsthand. As a powerlifter myself, I also can take my own experiences into account while using input from other users to help prioritize new features to be implemented.

### Functionality

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- Add and remove exercises as necessary
- Count sets completed and toggle overall exercise completion
- Adjust the weight units between imperial or metric units
- Open and close the bottom menu by tapping or clicking
- Access and use a plate calculator that tells the user which plates to load up each side of the barbell with

### Screenshots

Taken on September 14, 2021.

Desktop - Menu Closed
![Screenshot: Desktop](/images/desktop-closed.png)

Desktop - Menu Open
![Screenshot: Desktop2](/images/desktop-open.png)

Mobile - Menu Closed
![Screenshot: Mobile 2](/images/mobile-closed.png)

Mobile - Menu Open
![Screenshot: Mobile](/images/mobile-open.png)

## My process

### Built with

- Semantic HTML5 markup
- CSS Grid and Flexbox
- Sassy CSS
- Constructor functions

### What I learned

Other than achieving the desired function as a 'fitness tracker' of sorts, this project also allowed for me to continue to practice constructor functions, using index numbers, and using `this`. Most of these concepts are demonstrated by the remove exercise button below.

```
 // remove exercise button

let removeBtn = document.createElement("button");
removeBtn.classList ="remove-exercise-btn";
removeBtn.textContent = "Remove";
removeBtn.onclick = function(e) {
    thisBook = e.target.parentElement;
    thisBookIndex = thisBook.dataset.indexNumber;
    myLibrary.splice(myLibrary[thisBookIndex], 1);
    thisBook.remove();
};
```

### Continued development

I am currently working to utilize `localStorage`, so that users can leave and return to the page without losing their inputs.

### Useful resources

[Web Storage API MDN Web Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)

## Author

- Portfolio - [Simone Christen](https://sunnfast.github.io/)
- [Github](https://www.github.com/Sunnfast)
- [LinkedIn](https://www.linkedin.com/in/simonechristen/)

## Acknowledgments

Thank you to all my lifter friends who use this web application, and have taken the time to offer their feedback.
