import{useState , useEffect} from 'react';
import Quizzes from './Quizzes';


export default function Face(){

    // Hide first page and show Q's
    const [quizzOn, setQuizzOn] = useState(false);
    function startQuizz() { setQuizzOn( true ) }

    // Storing questions and answers
    const [Data, setData] = useState([]);
    const [answerAndQuestions, setAnswerAndQuestions] = useState([]);
    
    // initiating newGame
    const [finish, setFinish] = useState(false);
    
    const [showWarning, setShowWarning] = useState(false);

    function playAgain(){
        setData([])
        setAnswerAndQuestions([])
        setFinish(false)
    }

    // Fetching Data 
    useEffect(() => {
        if(Data.length === 0){
        fetch('https://opentdb.com/api.php?amount=5')
        .then(res => res.json())
        .then(data => 
            {
                console.log('x');
                setData(data.results)
                setAnswerAndQuestions( data.results.map( (answerAndQuestion) =>{
                    return  {
                                question: answerAndQuestion.question,
                                shuffledAnswers: shuffle([...answerAndQuestion.incorrect_answers, answerAndQuestion.correct_answer]),
                                correctAnswer: answerAndQuestion.correct_answer,
                                selectedAnswer: ''
                            }
                }))

            })}
    }, [Data])

    // ---------------------------------
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
      // --------------------------------

    function updateAnswer(CurrentQuestion, answer){
        setAnswerAndQuestions( 
            answerAndQuestions.map( (elem) => {
            return  elem.question === CurrentQuestion ?
                    {
                        ...elem,
                        selectedAnswer: answer
                    }
                    :
                    elem
        }) )
    }
    
    const quizzies = answerAndQuestions.map((quiz , index) => {
       return <Quizzes 
                key={index}
                question={quiz.question}
                shuffledAnswers={quiz.shuffledAnswers}
                correctAnswer={quiz.correctAnswer}
                selectedAnswer={quiz.selectedAnswer}
                updateAnswer={updateAnswer}
                finish={finish}
            />
    })

    function checker(){
        return answerAndQuestions.every((elem) => {
            return elem.selectedAnswer !== ''
        })
    }

    
    
    
    function showAnswers(){
        if(checker()){
            setFinish(true);
        }
        const notAllAnswered = answerAndQuestions.some((elem) => {
            return elem.selectedAnswer === ''
        })
        
        setShowWarning(notAllAnswered)
    }
    

    return (
                <main className="quizz-main">

                    {!quizzOn && <h2 className="quizz-title">Quizzical</h2> }
                    {!quizzOn && <button className="quizz-start" onClick={startQuizz}>Start quiz</button>}
                    
                    {quizzOn && quizzies}
                    

                    {quizzOn 
                    && 
                    <footer className='quizz-footer'>

                        {showWarning && <p className='quizz-notice'>You must answer all quizzes</p>}


                        {finish && <p className='quizz-notice'>You scored {
                            
                                answerAndQuestions.filter((elem) => {
                                    return elem.selectedAnswer === elem.correctAnswer
                                }).length
                                
                        }/5 correct answers</p>}

                        <button className='quizz-validate' onClick={finish ? playAgain : showAnswers}>{finish ? 'New Game' : 'Check answers'}</button>

                    </footer>}
                </main>
            )
}