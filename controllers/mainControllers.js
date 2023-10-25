const { Question, Option } = require('../database/models');

let answers = [];
let questions = [];
let totalQuestions = 0;
let wrongChoices = [];
let currentQuestionIndex = 0;
let questionsAnswered = 0;
let answeredQuestions = new Set();

const findAllQuestionsWithOptions = async (number) => {
    try {
        return await Question.findAll({
            where: {
                difficulty: number,
            },
            include: [{ model: Option, as: 'options' }],
        })
    } catch (error) {
        console.log(error);
    }
}

const shuffleArray = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

const checkUserOption = async (option) => {
    try {
        let findOption = await Option.findOne({where: {
            option: option,
            is_correct: 1,
        }})
        if(!findOption) {
            findOption = false;
            answers.push({answerState: findOption, userChoice: option});
            // wrongChoices.push(option)
            // console.log({answers}, {wrongChoices});
        } else {
            findOption = true;
            answers.push(findOption);
            // console.log({answers});
        }
        return findOption;
    } catch (error) {
        console.log(error);
    }
}

const averageAnswer = (arr) => {
    let totalAnswers = arr.length;
    let trueAnswers = arr.filter(el => el === true).length;
    let average = (trueAnswers / totalAnswers) * 100;
    // console.log({totalAnswers}, {trueAnswers});
    return average;
}



// ENCUENTRO LAS PREGUNTAS MAL CONTESTADAS
const findWrongQuestions = (arr1, arr2) => {
    
    // En este primer forEach se recorren todas las respuestas del usuario y se toman los índices de las respuestas que son false, para luego con esos índices recorrer el array questions que tiene todas las preguntas y tomar únicamente las preguntas cuyas respuestas estén equivocadas. Además este índice va a servir para volver a recorrer arr1 y obtener la respuesta del usuario.
    let falseIndex = [];
    arr1.forEach((element, index) => {
        if(element.answerState === false){
            falseIndex.push(index);
        }
    })

    let questionsWrongAnswered = [];
    falseIndex.forEach(element => {
        let questionToPush = arr2[element].question;
        let arrayWithCorrectAnswers = arr2[element].options.filter(el => el.is_correct === 1);
        let userChoice = arr1[element].userChoice
        questionsWrongAnswered.push({question: questionToPush, correctAnswer: arrayWithCorrectAnswers, userChoice});

    })
    
    return questionsWrongAnswered;
}

module.exports = {
    getIndex: (req, res) => {
        // res.render('index');
        return res.json({ message: 'Bienvenido' });
    },
    postIndex: async (req, res) => {
        let body = req.body;
        console.log({ body });
        // let params = req.params;
        // console.log({params});
        let { difficulty } = req.body;
        difficulty = Number(difficulty);
        console.log({ difficulty });
        // console.log({ difficulty });
        try {
            // console.log('Estoy aca');
            if (questions.length === 0) {
                const questionsAndOptions = await findAllQuestionsWithOptions(difficulty);
                const orderQuestions = questionsAndOptions.map(el => el.dataValues);
                let shuffle = shuffleArray(orderQuestions);
                questions.push(...shuffle);
                if (shuffle.length === 0) {
                    res.send('No hay preguntas disponibles');
                    return;
                }
            }
            totalQuestions = questions.length;
            // questionsAnswered = currentQuestionIndex + 1;
            // console.log({ totalQuestions }, { questions }, { questionsAnswered });
            // res.render('form', { question: questions[currentQuestionIndex], currentQuestionIndex, totalQuestions, questionsAnswered });
            res.json({ questions: questions, totalQuestions });
            // res.redirect('/question');

        } catch (error) {
            console.log(error);
        }

    },
    getQuestion: (req, res) => {
        // console.log('ESTOY EN EL GET DE /QUESTION');
        // let { answer } = req.body;
        // console.log({ answer });
        // if(questions.length === 0) {
        //     return res.redirect('/');
        // }
        // questionsAnswered = currentQuestionIndex + 1;
        // // let { index } = req.params;
        // // let nextQuestion = questions[index];
        // let currentQuestion = questions[currentQuestionIndex];
        // // console.log({ question });
        // if(currentQuestion === undefined){
        //     // currentQuestion INDICA QUE SE TERMINA EL CUESTIONARIO
        //     let average = `${Math.round(averageAnswer(answers))}%`;
        //     let wrongAnswers = findWrongQuestions(answers, questions);
        //     currentQuestionIndex = 0;
        //     questions = [];
        //     answers = [];
        //     totalQuestions = 0;
        //     questionsAnswered = 0;
        //     return res.render('result', {result: average, wrongAnswers});
        // }
        // // res.render('form', { question: currentQuestion, currentQuestionIndex, totalQuestions, questionsAnswered});
        // res.json(currentQuestion);
    },

    nextQuestion: async (req, res) => {
        // const { answer } = req.body;
        // console.log(req.body);
        // answeredQuestions.add(questions[currentQuestionIndex]);
        // console.log({ questions });
        // console.log({ answeredQuestions });
        // // console.log({answeredQuestions});
        // // const { currentQuestionIndex, answer } = req.body;
        // let userOption = await checkUserOption(answer)
        // console.log({ userOption });
        // // let nextQuestionIndex = Number(currentQuestionIndex) + 1;
        // currentQuestionIndex++;
        // console.log({ currentQuestionIndex });
        // // res.render('form', {question: questions[currentQuestionIndex], currentQuestionIndex, totalQuestions, questionsAnswered});
        // // res.redirect(`/`);
        // res.json();
    }
}