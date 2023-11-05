import {decode} from 'html-entities';


export default function Quizzes({question , shuffledAnswers , correctAnswer, selectedAnswer , updateAnswer , finish }){

    

    function clickAnswer(answer , currentQuestion){
        updateAnswer(currentQuestion , answer)
    }
    
    // ${finish && selectedAnswer === correctAnswer ? 'quizz-incorrect' : ''}

    const responses = shuffledAnswers.map((res,index) => {
        return  <div
                key= {index} 
                className=  {`quizz-options 
                            ${res === selectedAnswer ? 'selected-answer' : ''}
                            ${finish && res === selectedAnswer && selectedAnswer !== correctAnswer ? 'quizz-incorrect' : ''}
                            ${finish && res === correctAnswer ? 'quizz-correct' : ''}
                            `
                        } 
                onClick= {!finish ? () => clickAnswer(res , question) : () => {}} >
                    {decode(res)}
                </div>
    })

    

    return(
        <section>
            
            <h4 className="quizz-question">{decode(question)}</h4>

            <div className="quizz-options-container">

             {responses}

            </div>

            <hr />
            

        </section>
    )
}