
    const NUM_OF_GUESSES = 12;

    window.onload = function(){
        movieGame.ResetMessage();       
    }

    document.onkeyup = function(event) {

        const inputLtr = event.key.toLocaleLowerCase();
        
        if (!(inputLtr.length === 1 && inputLtr.match(/[a-z]/i).length > 0 ) ||
            (movieGame.letterGuessedArray.indexOf(inputLtr) !== -1))
        {
            console.log("invalid input "  + inputLtr);
            return;
        }
         
    
        if (movieGame.isGameStarted === false)
        {
            movieGame.isGameStarted = true;
            movieGame.genRandomGuess();
        }

        if (movieGame.isGameOver === true)
        {
            // movieGame.domInstructionElem.innerHTML = "Please refresh the browser to restart the game!";

            setTimeout(function() {
                movieGame.ResetMessage();
            }, 5000);

            return;
        }
       
        movieGame.domInstructionElem.innerHTML  = "";
        movieGame.numberOfGuesses--;
        movieGame.domNumOfGuessesElem.innerText  = movieGame.numberOfGuesses

        movieGame.letterGuessedArray.push(inputLtr);

        movieGame.letterGuessedDisplay = movieGame.letterGuessedDisplay + " " + inputLtr;           
        movieGame.domLetterAlreadyGussedElem.innerText = movieGame.letterGuessedDisplay;
            
        if (movieGame.numberOfGuesses === 0)
        {
            movieGame.isGameOver = true;
            movieGame.domInstructionElem.innerHTML = "Game Over !!!";

            setTimeout(function() {
                movieGame.ResetMessage();
            }, 5000);

            return;
        }


        //now let's try to match it



        //end match
        
    }
    
    let movieGame = {

        domInstructionElem: document.getElementById("instruction-text"),
        domNumOfWinsElem: document.getElementById("numofwins-text"),
        domCurrWordElem: document.getElementById("currentword-text"),
        domNumOfGuessesElem: document.getElementById("numberofguesses-text"),
        domLetterAlreadyGussedElem: document.getElementById("letterguessed-text"),
        domHintElem: document.getElementById("instruction-text"),
        domMovieFrame: document.getElementById("movieFrame"),
        domMoviePane: document.getElementById("moviePane"),
        domHintText: document.getElementById("hint-text"),
        


        ResetMessage: function  (){

            this.isGameOver = false;
            this.isGameStarted  = false;
            this.numberOfGuesses = NUM_OF_GUESSES;
            this.domNumOfGuessesElem.innerText = this.numberOfGuesses;  

            this.domInstructionElem.innerHTML = "Press any key get started";
            this.domNumOfWinsElem.innerText = "0";            
            this.domLetterAlreadyGussedElem.innerText = "";    
            this.domHintText.innerText = "";

            this.domCurrWordElem.style.display = "none";                          
            this.domMoviePane.style.display = "none";

            this.letterGuessedArray = []; 

            this.letterGuessedDisplay = "";
        },

        movies : 
        [
            { 
              title: "rushmore", 
              url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/GxCNDpvGyss?controls=0&amp;start=14" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 
              hint: "One of the best movie of Wes Anderson about a preparatory School" 
            },

            { 
                title: "titanic", 
                url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/2e-eXJ6HgkQ?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> ',
                hint: "Won the best movie Oscar of 1998" 
            },
            { 
                title: "fargo", 
                url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/EB4PmbfG4bw?controls=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 
                hint: "Coen brothers famous crime drama" 
            }
        ],

        randomTitle: "",
        
        movieHint: "",
        movieUrl: "",
        letterGuessedDisplay: "",

        numberOfGuesses: 0,

        letterGuessedArray: [],
        
        isGameOver: false,
        isGameStarted: false,

        genDashBoxes : function (movieTitle) {
            
        //     <button id="button-1" class="btn btn-danger btn-choice" value="1">
        //     <h1>1</h1>
        //   </button>
        //   <button id="button-2" class="btn btn-danger btn-choice" value="2">
        //     <h1>2</h1>
        //   </button>
        //   <button id="button-3" class="btn btn-danger btn-choice" value="3">
        //     <h1>3</h1>
        //   </button>
        //   <button id="button-4" class="btn btn-danger btn-choice" value="4">
        //     <h1>4</h1>
        //   </button>

            this.domCurrWordElem.style.display = "block";
            for (let i = 0; i < movieTitle.length; i++)
            {
                const titleBtnElem = document.createElement("button");
                const h1Elem = document.createElement("h1");

                titleBtnElem.setAttribute("class", "btn btn-outline-warning btn-md m-2 p-2 btn-choice");
                titleBtnElem.setAttribute("value", movieTitle.charAt(i));

                h1Elem.textContent = movieTitle.charAt(i);
                titleBtnElem.appendChild(h1Elem);

                this.domCurrWordElem.appendChild(titleBtnElem);
                                               
            }
            


        },

        genRandomGuess:  function() {

            const randIndex = Math.floor(Math.random() * this.movies.length);
            randomTitle = this.movies[randIndex].title;
            movieHint = this.movies[randIndex].hint;
            movieUrl = this.movies[randIndex].url;
            
            this.domCurrWordElem.innerHTML = "";

            this.genDashBoxes (randomTitle);
            
            this.domHintText.innerHTML = "<small> hint: " + movieHint + "</small>";     
        },        
    };
