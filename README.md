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



### Add new Deck

Add a new deck to add cards and take quiz on that.

### View Deck

See the cards of a deck, add new cards and start a quiz on that deck (the max number of cards on the quiz can be configured on the Configuration screen).

### Add new Card

Add a new card to use on the quiz.

### Quiz question

Shows a card question.

### Quiz answer

Shows a card answer.

### Quiz summary

Presents the summary about the answers on the quiz.

### Configuration

Configure the notifications to remember to study and change the max card number on the quiz.
