# React Native Flashcards

This project is aimed to be part of my deliverables for Udacity's Nanodegree program.
The project is a flashcard mobile application. In this application, the user can add decks and cards to study. After create the decks and add their cards, the user can take quizes using those cards and see how good was her/him answers.
The user can also configure daily notifications and the quiz size.

## Installation

This project uses React Native and have been tested on Android using the simulator provided by Android Studio.
See the Android Studio homepage to see how to install and configure the emulator. After that, create the AVD to emulates the Android smartphone. This project was tested on an AVD emulating a Nexus 5 with Android 7.1.1 and ran locally using Node.js version 7.10.0.

To install locally, just run:

```
git clone https://github.com/joseteodoro/react-flashcards.git
cd react-flashcards
npm install
```

## Running on emulator

Make sure you started the emulator before start the application.
After start the emulator, run:

```
cd react-flashcards
npm run android
```

The React Native will send the code for the Android running on you emulator.

## Features

There are eight main screens on this app: `Home`, `Add new Deck`, `View Deck`, `Add new Card`, `Quiz question`, `Quiz answer`, `Quiz summary` and `Configuration`

### Home

Home is the application landing page. From there, #1 you can create a new deck, #2 view a deck or #3 go to the configuration screen.

![Landing page](https://raw.githubusercontent.com/joseteodoro/react-flashcards/master/doc/images/home.png)

### Add new Deck

Add a new deck to add cards and take quiz on that.

![Add new deck](https://raw.githubusercontent.com/joseteodoro/react-flashcards/master/doc/images/add-new-deck.png)

### View Deck

See the cards of a deck, add new cards and start a quiz on that deck (the max number of cards on the quiz can be configured on the Configuration screen).

![View deck](https://raw.githubusercontent.com/joseteodoro/react-flashcards/master/doc/images/inside-deck.png)

### Add new Card

Add a new card to use on the quiz. You must provide the question and the answer.

![Add card](https://raw.githubusercontent.com/joseteodoro/react-flashcards/master/doc/images/add-new-question.png)

### Quiz question

This screen shows a card question. You must try to answer the question and then press the `Show answer` button to check the question's answer. You can see how much questions are missing before end the quiz in the top of the screen. For example: `1/2` (first of two questions).

![Show question](https://raw.githubusercontent.com/joseteodoro/react-flashcards/master/doc/images/question-in-quiz.png)

### Quiz answer

Shows a card answer and ask you to say if you got a correct answer or not.

![Show answer](https://raw.githubusercontent.com/joseteodoro/react-flashcards/master/doc/images/question-answer-on-quiz.png)

### Quiz summary

After mark all the questions as correct or incorrect, you will be redirected to the quiz summary. That screen presents the summary about your answers on the quiz.

![Quiz summary](https://raw.githubusercontent.com/joseteodoro/react-flashcards/master/doc/images/quiz-summary.png)

### Configuration

Configure the notifications to remember to study and change the max card number on the quiz. If enabled, a notification will be send to you on the smartphone every day if you forget to take a quiz on that day.

![Configuration](https://raw.githubusercontent.com/joseteodoro/react-flashcards/master/doc/images/configuration.png)

![Configure notification](https://raw.githubusercontent.com/joseteodoro/react-flashcards/master/doc/images/time-inside-configuration.png)

You can configure the max quiz size.

![Configure quiz size](https://raw.githubusercontent.com/joseteodoro/react-flashcards/master/doc/images/select-quiz-size.png)


License MIT
