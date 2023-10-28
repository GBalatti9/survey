let questions = [];
let totalQuestions = 0;
let currentQuestionIndex = 0;
let correctAnswer = 0;
let wrongAnswers = [];

const formEasy = document.querySelector('#formEasy');
const formMedium = document.querySelector('#formMedium');
const formDifficulty = document.querySelector('#formDifficulty');
const body = document.querySelector('body');
// const formsToInit = document.querySelector('.forms-to-init');
const title = document.querySelector('#title');
const result = document.querySelector('.result');
const link = document.querySelector('.link');

console.log('QUESTIONS DESDE EL INICIO: ', questions);

const resetQuestions = () => {
    questions = [];
    totalQuestions = 0;
    currentQuestionIndex = 0;
    correctAnswer = 0;
    wrongAnswers = [];
}

const postApi = async ( url, difficulty ) => {

    resetQuestions();

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ difficulty })
    });
    
    if( response.ok ){
        const data = await response.json();
        console.log({ data });
        questions.push(...data.questions);
        totalQuestions = data.totalQuestions;
        console.log( { questions } );
        displayCurrentQuestionsWithOptions();
        updateFormsToInitVisibility();
    } else {
        console.error('Error en la solicitud del servidor');
    }
}

const processForm = (form) => {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        resetQuestions();
    
        const formData = new FormData(form);
        console.log({ formData });
        const difficulty = formData.get('difficulty');
        console.log({ difficulty });
    
        const url = 'http://localhost:3000/';
    

        postApi( url, difficulty );
    });
}

const updateFormsToInitVisibility = () => {
    if (questions.length > 1) {
        // formsToInit.style.display = 'none';
        formEasy.style.display = 'none';
        formMedium.style.display = 'none';
        formDifficulty.style.display = 'none';
        title.style.display = 'none';
    }
}
link.style.display = 'none'

formEasy.addEventListener('click', () => processForm(formEasy));
formMedium.addEventListener('click', () => processForm(formMedium));
formDifficulty.addEventListener('click', () => processForm(formDifficulty));

const displayCurrentQuestionsWithOptions = () => {

    if( currentQuestionIndex < questions.length ){

        const newForm = document.createElement('form');
        newForm.classList.add('form-new')

        const question = questions[currentQuestionIndex];
        const questionContainer = document.createElement('div');
        
        questionContainer.classList.add('container');
        questionContainer.style.width = '500px';
        questionContainer.style.textAlign = 'center';
        const questionElement = document.createElement('h3');
        questionElement.textContent = question.question;
        
        const optionContainer = document.createElement('div');
        optionContainer.classList.add('list-group');
        optionContainer.classList.add('m-auto');

            question.options.forEach(option => {
                const optionElement = document.createElement('button');
                optionElement.textContent = option.option;
                optionElement.classList.add('list-group-item');
                optionElement.classList.add('list-group-item-action');
                optionElement.classList.add('list-group-item-warning');
                optionElement.classList.add('text-primary');

                optionElement.addEventListener('click', (e) => {

                    e.preventDefault();
                    checkAnswerAndShowNextQuestion(option.option);
                })

                optionContainer.appendChild(optionElement);
            })
    
            questionContainer.appendChild(questionElement)
            questionContainer.appendChild(optionContainer);
            newForm.appendChild(questionContainer);
            body.appendChild(newForm);
    } else {
        // console.log({ questions });
        let average = Math.round(( correctAnswer/totalQuestions ) * 100 );
        // console.log({ average });
        const result = document.createElement('div');
        result.classList.add('result-style');
        
        if(average === 100) {
            result.style.border = '1px solid green';
            body.appendChild(result);
            result.textContent = `${average}%`
        };

        if(average < 100 && average >= 50) {
            result.style.border = '1px solid orange';
            body.appendChild(result);
            result.textContent = `${average}%`
            showWrongAnswers(wrongAnswers);
        };

        if(average < 50) {
            result.style.border = '1px solid red';
            body.appendChild(result);
            result.textContent = `${average}%`
            showWrongAnswers(wrongAnswers);
        };
        
        link.style.display = 'block';
        link.addEventListener('click', ( e ) => {
            resetQuestions();
        })
        
        resetQuestions();

        // body.textContent = `${average}%`;
    }
}

const showWrongAnswers = (arr) => {
    arr.forEach(answer => {
        const question = document.createElement('h4');
        const divAnswers = document.createElement('div');
        divAnswers.style.width = '350px';
        divAnswers.style.display = 'flex';
        divAnswers.style.justifyContent = 'space-around';
        divAnswers.style.flexFirection = 'column';
        divAnswers.style.alignItems = 'center';
        divAnswers.style.textAlign = 'center';
        const wrong = document.createElement('p');
        const correct = document.createElement('p');
        question.textContent = answer.question;
        correct.textContent = 
        `Respuesta correcta:
        ${answer.correctOption}`;
        correct.style.color = 'green';
        wrong.textContent = 
        `Tu respuesta: 
        ${answer.userOption}`;
        wrong.style.color = 'red';
        body.appendChild(question);
        divAnswers.appendChild(correct);
        divAnswers.appendChild(wrong);
        body.appendChild(divAnswers);
    })
}

const checkAnswerAndShowNextQuestion = (answer) => {

    if (currentQuestionIndex < questions.length) {
        let actualQuestion = questions[currentQuestionIndex];
        let optionsFromActualQuestion = actualQuestion.options;
        // console.log({ actualQuestion });
        let checkUserAnswer = actualQuestion.options.find(( option ) => option.option === answer);
        // console.log({ checkUserAnswer });
        const { is_correct } = checkUserAnswer;

        is_correct === 1 
        ? correctAnswer++ 
        : wrongAnswers.push({
            question: actualQuestion.question,
            userOption: answer, 
            correctOption: optionsFromActualQuestion.find(( option ) => option.is_correct === 1).option
            });
        const currentForm = document.querySelectorAll('.form-new');
        currentForm.forEach(form => {
            form.style.display = 'none';
        })
    }
    currentQuestionIndex++;
    displayCurrentQuestionsWithOptions();
}

