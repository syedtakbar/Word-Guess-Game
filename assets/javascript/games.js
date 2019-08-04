
    const NUM_OF_GUESSES = 12;

    window.onload = function(){
        movieGame.ResetMessage();       
    }

    document.onkeyup = function(event) {

        const inputLtr = event.key.toLocaleLowerCase();


        if (inputLtr === "enter")
        {        
            if (movieGame.isGameStarted === true) 
            {
                return;
            }

            movieGame.domInstructionElem.innerHTML = "Welcome !!!";
            movieGame.isGameStarted = true;
            movieGame.genRandomGuess();           
        }
        else if (!(inputLtr.length === 1 && inputLtr.match(/[a-z]/i).length > 0 ) || 
            (movieGame.letterGuessedArray.indexOf(inputLtr) !== -1))
        {
            return;
        }
            
        if (movieGame.isGameOver === true)
        {            
            setTimeout(function() {
                movieGame.ResetMessage();
            }, 5000);

            return;
        }
               
        movieGame.numberOfGuesses--;
        movieGame.domNumOfGuessesElem.innerText  = movieGame.numberOfGuesses

        if (inputLtr.length === 1)
        {
            movieGame.letterGuessedArray.push(inputLtr);
            movieGame.letterGuessedDisplay = movieGame.letterGuessedDisplay + " " + inputLtr;           
            movieGame.domLetterAlreadyGussedElem.innerText = movieGame.letterGuessedDisplay;
        }
        
            
        if (movieGame.numberOfGuesses === 0)
        {
            movieGame.isGameOver = true;
            movieGame.domInstructionElem.innerHTML = "Game Over !!!";

            setTimeout(function() {
                movieGame.ResetMessage();
            }, 5000);

            return;
        }

        document.querySelectorAll(".movie-box").forEach(function(node){ 
          
              if (inputLtr === node.value)
              {                 
                const h1Elem = document.createElement("h1");
                h1Elem.textContent = inputLtr;
                node.appendChild(h1Elem);
              }              
        })

        let isMissMatch = false;
        document.querySelectorAll(".movie-box").forEach(function(node){           
                        
            if (node.innerText !== node.value)
            {                 
                isMissMatch = true;
            }              
        }) 

        if (isMissMatch === false)
        {
            movieGame.isGameWon = true;
            movieGame.domInstructionElem.innerHTML = "You have won !!!";

            movieGame.domMoviePane.style.display = "block";
                        
            movieGame.domMoviePane.innerHTML = movieGame.movieUrl;
            movieGame.domMoviePane.focus();

            window.location.hash = '#moviePane';

            return;
        }        
    }
    
    let movieGame = {

        domInstructionElem: document.getElementById("instruction-text"),        
        domCurrWordElem: document.getElementById("currentword-text"),
        domNumOfGuessesElem: document.getElementById("numberofguesses-text"),
        domLetterAlreadyGussedElem: document.getElementById("letterguessed-text"),
        domHintElem: document.getElementById("instruction-text"),
        domMovieFrame: document.getElementById("movieFrame"),
        domMoviePane: document.getElementById("moviePane"),
        domHintText: document.getElementById("hint-text"),
        


        ResetMessage: function  () {

            this.isGameOver = false;
            this.isGameStarted  = false;
            this.isGameWon = false;
            this.numberOfGuesses = NUM_OF_GUESSES;
            this.domNumOfGuessesElem.innerText = this.numberOfGuesses;  

            this.domInstructionElem.innerHTML = "Press enter key to get started";             
            this.domLetterAlreadyGussedElem.innerText = "";    
            this.domHintText.innerText = "";

            this.domCurrWordElem.style.display = "none";                          
            this.domMoviePane.style.display = "none";

            this.domMoviePane.innerHTML = "";

            this.letterGuessedArray = []; 

            this.letterGuessedDisplay = "";
        },

        movies : 
        [
            { 
              title: "rushmore", 
              url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/GxCNDpvGyss?controls=0;autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 
              hint: "One of the best movie of Wes Anderson about a preparatory school" 
            },

            { 
                title: "titanic", 
                url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/2e-eXJ6HgkQ?controls=0;autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                hint: "Won the best movie Oscar of 1998" 
            },
            { 
                title: "fargo", 
                url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/EB4PmbfG4bw?controls=0;autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 
                hint: "Coen brothers famous crime drama" 
            },
            { 
                title: "goodfellas", 
                url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/qo5jJpHtI1Y?controls=0;autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 
                hint: "Martin Scorsese mob drama" 
            },
            { 
                title: "braveheart", 
                url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/nMft5QDOHek?controls=0;autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>', 
                hint: "Mel Gibson character begins a revolt against King Edward I of England" 
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
        isGameWon: false,

        genDashBoxes : function (movieTitle) {
        
            this.domCurrWordElem.style.display = "block";
            for (let i = 0; i < movieTitle.length; i++)
            {
                const titleBtnElem = document.createElement("button");
                const h1Elem = document.createElement("h1");

                titleBtnElem.setAttribute("class", "btn btn-outline-warning btn-md m-2 p-2 btn-choice movie-box");
                titleBtnElem.setAttribute("value", movieTitle.charAt(i));

                h1Elem.textContent = movieTitle.charAt(i);
                //titleBtnElem.appendChild(h1Elem);

                this.domCurrWordElem.appendChild(titleBtnElem);
                                               
            }
        },

        genRandomGuess:  function() {

            const randIndex = Math.floor(Math.random() * this.movies.length);
            this.randomTitle = this.movies[randIndex].title;
            this.movieHint = this.movies[randIndex].hint;
            this.movieUrl = this.movies[randIndex].url;

            this.domCurrWordElem.innerHTML = "";

            this.genDashBoxes (this.randomTitle);
            
            this.domHintText.innerHTML = "<small> hint: " + this.movieHint + "</small>";     
        },        
    };
