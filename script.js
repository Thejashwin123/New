const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

document.querySelectorAll('.brand').forEach((brand) => {
    brand.setAttribute('aria-label', 'Edunova home');
    const brandName = brand.querySelector(':scope > span:last-child');
    if (brandName) brandName.textContent = 'Edunova';
});

const savedTheme = localStorage.getItem('edunovaTheme') || 'light';
document.documentElement.dataset.theme = savedTheme;

document.querySelectorAll('#light-theme, #dark-theme').forEach((themeButton) => {
    themeButton.addEventListener('click', () => {
        const theme = themeButton.id === 'dark-theme' ? 'dark' : 'light';
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('edunovaTheme', theme);
        document.querySelectorAll('#light-theme, #dark-theme').forEach((button) => button.classList.toggle('active', button === themeButton));
    });
    if ((savedTheme === 'dark' && themeButton.id === 'dark-theme') || (savedTheme === 'light' && themeButton.id === 'light-theme')) themeButton.classList.add('active');
});

const languageChoice = document.querySelector('#language-choice');
const savedLanguage = localStorage.getItem('edunovaLanguage') || 'en';
document.documentElement.lang = savedLanguage;

const interfaceTranslations = {
    hi: {
        Home: 'होम', Learn: 'सीखें', 'Quantum Playground': 'क्वांटम प्लेग्राउंड', 'AI Tutor': 'AI ट्यूटर', 'Voice Assistant': 'वॉइस असिस्टेंट', Profile: 'प्रोफ़ाइल', 'Log in': 'लॉग इन', 'Log out': 'लॉग आउट', 'Continue learning': 'सीखना जारी रखें', 'Start Learning': 'सीखना शुरू करें', 'Open Playground': 'प्लेग्राउंड खोलें', 'Choose your theme': 'अपनी थीम चुनें', 'Choose your language': 'अपनी भाषा चुनें', Appearance: 'दिखावट', Language: 'भाषा', Light: 'लाइट', Dark: 'डार्क', 'Your learning profile': 'आपकी सीखने की प्रोफ़ाइल', 'Keep your momentum.': 'अपनी गति बनाए रखें।', 'Your quantum copilot': 'आपका क्वांटम सहायक', 'Ask better questions.': 'बेहतर सवाल पूछें।'
    },
    ta: {
        Home: 'முகப்பு', Learn: 'கற்றல்', 'Quantum Playground': 'குவாண்டம் விளையாட்டு', 'AI Tutor': 'AI ஆசிரியர்', 'Voice Assistant': 'குரல் உதவியாளர்', Profile: 'சுயவிவரம்', 'Log in': 'உள்நுழைவு', 'Log out': 'வெளியேறு', 'Continue learning': 'கற்றலைத் தொடருங்கள்', 'Start Learning': 'கற்றலைத் தொடங்கு', 'Open Playground': 'விளையாட்டு தளத்தைத் திற', 'Choose your theme': 'தீமைத் தேர்ந்தெடுக்கவும்', 'Choose your language': 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்', Appearance: 'தோற்றம்', Language: 'மொழி', Light: 'ஒளி', Dark: 'இருள்', 'Your learning profile': 'உங்கள் கற்றல் சுயவிவரம்', 'Keep your momentum.': 'உங்கள் முன்னேற்றத்தைத் தொடருங்கள்.', 'Your quantum copilot': 'உங்கள் குவாண்டம் உதவியாளர்', 'Ask better questions.': 'சிறந்த கேள்விகளைக் கேளுங்கள்.'
    }
};

function translateInterface(language) {
    const dictionary = interfaceTranslations[language];
    if (!dictionary) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach((node) => {
        const original = node.nodeValue.trim();
        if (dictionary[original]) node.nodeValue = node.nodeValue.replace(original, dictionary[original]);
    });
}

translateInterface(savedLanguage);
if (languageChoice) {
    languageChoice.value = savedLanguage;
    languageChoice.addEventListener('change', () => {
        document.documentElement.lang = languageChoice.value;
        localStorage.setItem('edunovaLanguage', languageChoice.value);
        window.location.reload();
    });
}

const isLoggedIn = sessionStorage.getItem('edunovaLoggedIn') === 'true' || localStorage.getItem('edunovaUser');
const currentPage = window.location.pathname.split(/[\\/]/).pop().toLowerCase();
const protectedPages = new Set([
    'learn.html',
    'playground.html',
    'tutor.html',
    'voice.html',
    'profile.html',
    'lesson-01-qubits.html',
    'lesson-02-gates.html',
    'lesson-03-entanglement.html',
    'lesson-04-circuits.html',
    'lesson-05-interference.html',
    'lesson-06-foundations.html',
    'lesson-07-grover.html',
    'lesson-08-qft.html',
    'lesson-09-shor.html',
    'lesson-10-hybrid-ai.html'
]);

if (protectedPages.has(currentPage) && !isLoggedIn) {
    window.location.replace('login.html?redirect=' + encodeURIComponent(currentPage));
}

document.querySelectorAll('.login-nav-link').forEach((loginLink) => {
    loginLink.hidden = Boolean(isLoggedIn);
});

const storedUser = JSON.parse(localStorage.getItem('edunovaCurrentUser') || sessionStorage.getItem('edunovaCurrentUser') || 'null');
document.querySelectorAll('[data-user-name]').forEach((element) => {
    if (storedUser) element.textContent = storedUser.name;
});
document.querySelectorAll('[data-user-email]').forEach((element) => {
    if (storedUser) element.textContent = storedUser.email;
});
document.querySelectorAll('[data-user-initial]').forEach((element) => {
    if (storedUser) element.textContent = storedUser.name.charAt(0).toUpperCase();
});

const logoutButton = document.querySelector('#logout-button');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('edunovaUser');
        localStorage.removeItem('edunovaCurrentUser');
        sessionStorage.removeItem('edunovaLoggedIn');
        sessionStorage.removeItem('edunovaCurrentUser');
        window.location.replace('login.html');
    });
}

const voiceButton = document.querySelector('#voice-button');
if (voiceButton) {
    const voiceStatus = document.querySelector('#voice-status');
    const voiceTranscript = document.querySelector('#voice-transcript');
    const voiceAnswer = document.querySelector('#voice-answer');
    const voiceOrb = document.querySelector('#voice-orb');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const voiceAnswers = {
        qubit: 'A qubit is the basic unit of quantum information. Unlike a normal bit, it can be a blend of zero and one until it is measured.',
        superposition: 'Superposition means a qubit can hold multiple possibilities at once. Measurement gives one definite result.',
        gate: 'A quantum gate changes a qubit state. The Hadamard gate creates superposition, while the X gate flips zero to one.',
        entanglement: 'Entanglement connects qubits so their measurement results are strongly related, even when the qubits are far apart.',
        circuit: 'A quantum circuit is a sequence of gates applied to qubits. Wires show the qubits and symbols show the operations.',
        phase: 'Phase is a property of a quantum wave. Interference can strengthen useful possibilities and cancel unhelpful ones.',
        deutsch: 'The Deutsch and Deutsch-Jozsa algorithms discover whether a hidden function has a global property using very few queries.',
        grover: 'Grover’s algorithm searches an unstructured list in about the square root of N steps by amplifying the correct answer.',
        fourier: 'The Quantum Fourier Transform reveals repeating patterns and helps with phase estimation and period finding.',
        shor: 'Shor’s algorithm uses quantum period finding to factor large numbers. A classical computer then completes the calculation.',
        vqe: 'VQE uses a small quantum circuit and a classical optimizer together to estimate molecular energy on noisy hardware.'
    };

    function answerVoiceQuestion(question) {
        const normalizedQuestion = question.toLowerCase();
        const keyword = Object.keys(voiceAnswers).find((item) => normalizedQuestion.includes(item));
        const answer = keyword ? voiceAnswers[keyword] : 'I can explain qubits, superposition, gates, entanglement, circuits, phase, Grover, Fourier, Shor, and VQE. Please ask about one of these topics.';
        voiceAnswer.innerHTML = '<span>Edunova voice tutor</span><p>' + answer + '</p>';
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(new SpeechSynthesisUtterance(answer));
    }

    if (!SpeechRecognition) {
        voiceStatus.textContent = 'Voice input is not supported in this browser. Try Chrome or Edge.';
        voiceButton.disabled = true;
    } else {
        const recognition = new SpeechRecognition();
        let isListening = false;
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.continuous = false;
        recognition.maxAlternatives = 1;
        recognition.addEventListener('start', () => {
            isListening = true;
            voiceOrb.classList.add('is-listening');
            voiceButton.classList.add('is-listening');
            voiceButton.innerHTML = '<span>&#9632;</span> Stop listening';
            voiceTranscript.textContent = 'Listening for your question...';
            voiceStatus.textContent = 'Speak now. I will answer when you pause.';
        });
        recognition.addEventListener('result', (event) => {
            let transcript = '';
            for (let index = event.resultIndex; index < event.results.length; index += 1) {
                transcript += event.results[index][0].transcript;
            }
            voiceTranscript.textContent = '“' + transcript + '”';
            if (event.results[event.results.length - 1].isFinal) answerVoiceQuestion(transcript);
        });
        recognition.addEventListener('end', () => {
            isListening = false;
            voiceOrb.classList.remove('is-listening');
            voiceButton.classList.remove('is-listening');
            voiceButton.innerHTML = '<span>&#9835;</span> Start listening';
            voiceStatus.textContent = 'Press the microphone to ask another question.';
        });
        recognition.addEventListener('error', (event) => {
            isListening = false;
            voiceStatus.textContent = event.error === 'not-allowed' ? 'Microphone access was blocked. Allow microphone access and try again.' : 'I could not hear that. Please speak closer to the microphone.';
        });
        voiceButton.addEventListener('click', () => {
            if (isListening) {
                recognition.stop();
                return;
            }
            voiceTranscript.textContent = 'Listening for your question...';
            try {
                recognition.start();
            } catch (error) {
                voiceStatus.textContent = 'The microphone is already starting. Please try again.';
            }
        });
    }
}


if (menuToggle && navMenu) {
    if (!navMenu.querySelector('a[href="voice.html"]')) {
        const voiceLink = document.createElement('a');
        voiceLink.className = 'nav-link';
        voiceLink.href = 'voice.html';
        voiceLink.textContent = 'Voice Assistant';
        navMenu.insertBefore(voiceLink, navMenu.querySelector('.profile-link'));
    }

    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    document.querySelectorAll('.nav-link, .profile-link').forEach((link) => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open navigation menu');
        });
    });
}

document.querySelectorAll('.module-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
        const module = trigger.closest('.curriculum-item');
        const isOpen = module.classList.toggle('is-open');
        trigger.setAttribute('aria-expanded', String(isOpen));
    });
});

const tutorForm = document.querySelector('#tutor-form');

if (tutorForm) {
    const tutorQuestion = tutorForm.querySelector('input');
    const promptStatus = document.querySelector('#prompt-status');
    const tutorResponse = document.querySelector('#tutor-response');
    const topicPrompts = document.querySelectorAll('[data-topic]');

    const topicAnswers = {
        qubits: ['Introduction to Quantum Mechanics & Qubits', 'A normal bit is either 0 or 1. A qubit can hold a blend of both possibilities until it is measured. We write the basic states as |0> and |1>. Measurement gives one result and ends the blend.'],
        gates: ['Single-Qubit Gates & Superposition', 'A quantum gate changes a qubit\'s state. The X gate flips it, while the Hadamard gate creates an even blend of 0 and 1. The Bloch Sphere is a visual map that helps us see these changes.'],
        entanglement: ['Multi-Qubit Systems & Entanglement', 'Entanglement connects qubits so their results are related, even when they are far apart. A CNOT gate, often combined with a Hadamard gate, can create an entangled Bell State.'],
        circuits: ['Quantum Circuits & Reversible Logic', 'A quantum circuit is a recipe: wires represent qubits and symbols represent gates. Operations must be reversible, so information is preserved until measurement turns it into ordinary bits.'],
        interference: ['Quantum Phase & Interference', 'Quantum states behave like waves. Waves that line up become stronger, and waves that oppose each other cancel. Algorithms use this to make useful answers more likely.'],
        foundations: ['Foundational Quantum Algorithms', 'Deutsch and Deutsch-Jozsa use interference to learn a global property of a hidden function with fewer queries than a classical approach. They are early examples of quantum advantage.'],
        grover: ["Quantum Search & Amplitude Amplification", "Grover's algorithm searches an unstructured list by marking the correct answer and repeatedly amplifying its probability. It needs about the square root of N queries instead of N queries."],
        qft: ['Quantum Phase Estimation & Fourier Transform', 'The Quantum Fourier Transform reveals repeating patterns in a quantum state. Phase Estimation measures hidden phase values, which helps algorithms such as Shor\'s algorithm.'],
        shor: ["Shor's Factoring Algorithm", "Shor's algorithm turns factoring into a period-finding problem. The quantum computer finds the period, and a classical computer uses it to calculate factors. Large-scale versions could threaten RSA encryption."],
        hybrid: ['Variational Quantum & Hybrid AI Algorithms', 'VQE and QAOA use a small quantum circuit together with a classical optimizer. The classical computer adjusts circuit parameters, making these methods practical for noisy current devices and machine-learning workflows.']
    };

    const keywords = {
        qubits: ['qubit', 'quantum mechanics', 'dirac', 'measurement', 'bit'],
        gates: ['gate', 'hadamard', 'pauli', 'superposition', 'bloch'],
        entanglement: ['entanglement', 'bell', 'cnot', 'tensor', 'multi-qubit'],
        circuits: ['circuit', 'reversible', 'register', 'operator'],
        interference: ['phase', 'interference', 'kickback', 'constructive', 'destructive'],
        foundations: ['deutsch', 'foundational', 'oracle', 'deterministic'],
        grover: ['grover', 'search', 'amplitude', 'diffusion'],
        qft: ['qft', 'fourier', 'phase estimation', 'qpe', 'period'],
        shor: ['shor', 'factoring', 'factor', 'rsa', 'order-finding'],
        hybrid: ['vqe', 'qaoa', 'variational', 'hybrid', 'nisq', 'machine learning']
    };

    function showTopic(topic) {
        const answer = topicAnswers[topic];
        if (!tutorResponse) return;
        tutorResponse.innerHTML = '<span class="response-label">' + answer[0] + '</span><p>' + answer[1] + '</p>';
        topicPrompts.forEach((prompt) => prompt.classList.toggle('selected', prompt.dataset.topic === topic));
    }

    function findTopic(question) {
        return Object.keys(keywords).find((topic) => keywords[topic].some((keyword) => question.includes(keyword))) || null;
    }

    topicPrompts.forEach((prompt) => prompt.addEventListener('click', () => showTopic(prompt.dataset.topic)));

    tutorForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!isLoggedIn) {
            window.location.replace('login.html?redirect=tutor.html');
            return;
        }
        const question = tutorQuestion.value.trim();

        if (!question) {
            promptStatus.textContent = 'Type a question to start your tutor session.';
            tutorQuestion.focus();
            return;
        }

        const topic = findTopic(question.toLowerCase());
        if (topic && tutorResponse) {
            showTopic(topic);
            promptStatus.textContent = 'Here is a simple explanation for your question.';
        } else if (topic) {
            promptStatus.textContent = 'Your AI Tutor session is ready for: “' + question + '”';
        } else {
            if (!tutorResponse) {
                promptStatus.textContent = 'Try asking about a quantum topic.';
                tutorQuestion.value = '';
                return;
            }
            tutorResponse.innerHTML = '<span class="response-label">Let us start with the Learn topics</span><p>I can explain qubits, gates, entanglement, circuits, interference, foundational algorithms, Grover, QFT, Shor, VQE, and hybrid AI. Try asking about one of these.</p>';
            promptStatus.textContent = 'Try mentioning a quantum topic from the list above.';
        }
        tutorQuestion.value = '';
    });
}

const offlineUsers = {
    users: [
        { name: 'Dev', email: 'dev@example.com', password: 'dev123' },
        { name: 'Tharun_pranav', email: 'tharun_pranav@gmail.com', password: 'tharun_pranav123' },
        { name: 'Admin', email: 'Admin@example.com', password: 'Admin123' }
    ]
};

async function loadUsers() {
    try {
        const response = await fetch('users.json', { cache: 'no-store' });
        if (!response || !response.ok) {
            throw new Error('User data unavailable');
        }
        const data = await response.json();
        return Array.isArray(data.users) ? data.users : offlineUsers.users;
    } catch (error) {
        return offlineUsers.users;
    }
}

const loginForm = document.querySelector('#login-form');

if (loginForm) {
    const emailInput = document.querySelector('#login-email');
    const passwordInput = document.querySelector('#login-password');
    const passwordToggle = document.querySelector('#toggle-password');
    const rememberMe = document.querySelector('#remember-me');
    const loginStatus = document.querySelector('#login-status');

    passwordToggle.addEventListener('click', () => {
        const showingPassword = passwordInput.type === 'text';
        passwordInput.type = showingPassword ? 'password' : 'text';
        passwordToggle.textContent = showingPassword ? 'Show' : 'Hide';
        passwordToggle.setAttribute('aria-label', showingPassword ? 'Show password' : 'Hide password');
    });

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        loginStatus.classList.remove('success');
        loginStatus.textContent = '';

        if (!emailInput.value.trim() || !passwordInput.value) {
            loginStatus.textContent = 'Please enter your email and password.';
            return;
        }

        try {
            const users = await loadUsers();
            const user = users.find((account) => account.email.toLowerCase() === emailInput.value.trim().toLowerCase() && account.password === passwordInput.value);

            if (!user) {
                loginStatus.textContent = 'Email or password is incorrect.';
                return;
            }

            const userSession = JSON.stringify({ name: user.name, email: user.email });
            if (rememberMe.checked) {
                localStorage.setItem('edunovaUser', user.name);
                localStorage.setItem('edunovaCurrentUser', userSession);
            } else {
                sessionStorage.setItem('edunovaCurrentUser', userSession);
            }
            sessionStorage.setItem('edunovaLoggedIn', 'true');
            loginStatus.classList.add('success');
            loginStatus.textContent = 'Welcome back, ' + user.name + '! Login successful.';
            const redirectPage = new URLSearchParams(window.location.search).get('redirect');
            const destination = redirectPage && protectedPages.has(redirectPage.toLowerCase()) ? redirectPage : 'index.html';
            window.setTimeout(() => window.location.replace(destination), 700);
        } catch (error) {
            loginStatus.textContent = 'Login failed. Please check your email and password.';
        }
    });

    document.querySelector('#forgot-password').addEventListener('click', (event) => {
        event.preventDefault();
        loginStatus.textContent = 'Password recovery will be available soon.';
    });
}

