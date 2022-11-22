/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

	TASKS TODO:
	  1. Calculate the score as the total of the number of correct answers

	  2. Add an Event listener for the submit button, which will display the score and highlight 
		 the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

	  3. Add 2 more questions to the app (each question must have 4 options).

	  4. Reload the page when the reset button is clicked (hint: search window.location)

	  5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
	const start = document.querySelector('#start');
	start.addEventListener('click', function (e) {
		document.querySelector('#quizBlock').style.display = 'block';
		start.style.display = 'none';

		//Add event listeners
		document.getElementById("submit").addEventListener('click', calculateScore);

		//Reset (reload page) quiz
		document.getElementById("btnReset")
			.addEventListener('click', () => location.reload())

		//Start timer
		startTimer(90)
	});
	// quizArray QUESTIONS & ANSWERS
	// q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
	// Basic ideas from https://code-boxx.com/simple-javascript-quiz/
	const quizArray = [
		{
			q: 'Which is the third planet from the sun?',
			o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
			a: 1, // array index 1 - so Earth is the correct answer here
		},
		{
			q: 'Which is the largest ocean on Earth?',
			o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
			a: 3,
		},
		{
			q: 'What is the capital of Australia',
			o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
			a: 1,
		},//Add two questions, each must have four answers
		{
			q: 'What is the highest building in the world',
			o: ['Burj Khalifa', 'Eiffel Tower', 'Statue of Liberty', 'Shanghai Tower'],
			a: 0,
		},
		{
			q: 'How many lobes does the Human brain have',
			o: ['Two', 'Five', 'Four', 'Eight'],
			a: 2,
		},
	];

	// function to Display the quiz questions and answers from the object
	const displayQuiz = () => {
		const quizWrap = document.querySelector('#quizWrap');
		let quizDisplay = '';
		quizArray.map((quizItem, index) => {
			quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
			quizWrap.innerHTML = quizDisplay;
		});
	};

	//Starts the quiz countdown and automatically submits quiz when time is up
	let runTimer;
	const startTimer = async (startTime = 60) => {
		let time = startTime;
		runTimer = true;
		//Format and update time (Displays the correct time on load)
		updateTime(time);

		//Loop each second, remove 1 second from the time and format the time correctly
		while(time > 0 && runTimer){
			//Wait 1s
			await new Promise(r => setTimeout(r, 1000));

			//Decrement time
			time--;

			//Format and update time
			updateTime(time);


		}
		calculateScore();
	};

	//Updates the timer display
	function updateTime(time){
		let timePostfix = "s";
		let newTime = time;
		if(time >= 60){
			timePostfix = "m";
			let minutes = Math.floor(time / 60); //Get minutes as whole number
			let seconds = time - minutes * 60;
			newTime = `${minutes}:${(seconds < 10) ? `0${seconds}`:seconds}`;
		}

		//Update display
		document.getElementById("time").textContent = `${newTime}${timePostfix}`;
	}

	//Stops the timer
	function stopTimer(){
		runTimer = false;
	}

	// Calculate the score
	const calculateScore = () => {
		let score = 0;
		stopTimer();
		quizArray.map((quizItem, index) => {
			for (let i = 0; i < 4; i++) {
				//highlight the li if it is the correct answer
				let li = `li_${index}_${i}`;
				let r = `radio_${index}_${i}`;
				liElement = document.querySelector('#' + li);
				radioElement = document.querySelector('#' + r);

				//Change all selected radios to red, if it's correct, this will be overrided later
				if (radioElement.checked) {
					radioElement.parentNode.style.backgroundColor = "#ab2e2e"
					radioElement.parentNode.style.color = "white"
				}

				//Checks if the radio button is the answer.
				if (quizItem.a == i) {
					//change background color of li element here

					liElement.style.backgroundColor = "#66b072";
					liElement.style.color = "white";

					//If the radio button is also checked, then it's the correct answer.
					if (radioElement.checked) {
						// code for task 1 goes here
						score++;
					}
				}
			}
		});
		document.getElementById("score").innerHTML = `<p>Score: ${score}/${quizArray.length}</p>`
	};

	// call the displayQuiz function
	displayQuiz();
});
