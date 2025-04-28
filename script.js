// Form Validation
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Reset error messages
    document.getElementById('name-error').style.display = 'none';
    document.getElementById('email-error').style.display = 'none';
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    let isValid = true;
    
    // Name validation
    if (name === '') {
        document.getElementById('name-error').textContent = 'Name is required';
        document.getElementById('name-error').style.display = 'block';
        isValid = false;
    }
    
    // Email validation
    if (email === '') {
        document.getElementById('email-error').textContent = 'Email is required';
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
    } else if (!email.includes('@') || !email.includes('.')) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address';
        document.getElementById('email-error').style.display = 'block';
        isValid = false;
    }
    
    // If form is valid, submit it
    if (isValid) {
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    }
});

// Quiz Implementation
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const myQuestions = [
    {
        question: "What is the recommended duration for cardio exercises per session?",
        answers: {
            a: "10-15 minutes",
            b: "20-30 minutes",
            c: "45-60 minutes",
            d: "Over 90 minutes"
        },
        correctAnswer: "b"
    },
    {
        question: "How many days a week should you strength train for optimal results?",
        answers: {
            a: "1 day",
            b: "2-3 days",
            c: "5-6 days",
            d: "Every day"
        },
        correctAnswer: "b"
    },
    {
        question: "What is the most important factor in muscle recovery?",
        answers: {
            a: "Protein intake",
            b: "Sleep",
            c: "Stretching",
            d: "All of the above"
        },
        correctAnswer: "d"
    }
];

function buildQuiz() {
    const output = [];
    
    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];
        
        for (const letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter.toUpperCase()}) ${currentQuestion.answers[letter]}
                </label>`
            );
        }
        
        output.push(
            `<div class="question">
                <h3>${currentQuestion.question}</h3>
                <div class="answers">${answers.join('')}</div>
            </div>`
        );
    });
    
    quizContainer.innerHTML = output.join('');
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    
    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
        
        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainers[questionNumber].style.color = 'green';
        } else {
            answerContainers[questionNumber].style.color = 'red';
        }
    });
    
    resultsContainer.innerHTML = `You scored ${numCorrect} out of ${myQuestions.length}`;
}

buildQuiz();

submitButton.addEventListener('click', showResults);

// Add to cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const product = this.closest('.product-card').querySelector('figcaption').textContent;
        const price = this.closest('.product-card').querySelector('.price').textContent;
        
        // Animation
        this.textContent = 'ADDED!';
        this.style.backgroundColor = 'green';
        
        setTimeout(() => {
            this.textContent = 'ADD TO CART';
            this.style.backgroundColor = '';
        }, 2000);
        
        
        console.log(`Added ${product} (${price}) to cart`);
    });
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});