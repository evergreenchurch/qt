/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');
const moment = require('moment');
const moment_tz = require('moment-timezone');
const APP_ID = undefined;  // TODO Optional

const languageStrings = {
    'en-US': {
        translation: {
            QT: {
                "04-19": "Revelation 01:01-18",
                "04-18": "Jude 01:17-25",
                "04-15": "2 John 01:01-13",
                "04-14": "1 John 05:13-21",
                "04-17": "Jude 01:01-16",
                "04-16": "3 John 01:01-15",
                "04-11": "1 John 04:01-06",
                "04-10": "1 John 03:11-24",
                "04-13": "1 John 05:01-12",
                "04-12": "1 John 04:07-21",
                "04-30": "Revelation 05:01-15",
                "05-01": "Revelation 05:16-30",
                "05-02": "Revelation 05:31-47",
                "04-24": "Revelation 02:12-25",
                "04-25": "Revelation 03:01-21",
                "04-26": "Revelation 03:22-36",
                "04-27": "Revelation 04:01-26",
                "04-20": "Revelation 01:19-28",
                "04-21": "Revelation 01:29-34",
                "04-22": "Revelation 01:35-51",
                "04-23": "Revelation 02:01-11",
                "04-28": "Revelation 04:27-42",
                "04-29": "Revelation 04:43-54",
                "04-08": "1 John 02:18-29",
                "04-09": "1 John 03:01-10",
                "04-06": "1 John 01:01-10",
                "04-07": "1 John 02:01-17",
                "04-04": "2 Peter 02:01-22",
                "04-05": "2 Peter 03:01-18",
                "04-02": "2 Peter 01:01-11",
                "04-03": "2 Peter 01:12-21",
                "04-01": "1 Peter 05:01-14"},
            SKILL_NAME: 'QT',
            GET_QT_MESSAGE: "Here's today's qt ",
            HELP_MESSAGE: 'You can say tell me a space fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    }
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetQTIntent');
    },
    'GetQTIntent': function() {
       /* var itemSlot = this.event.request.intent.slots.Date;
        var givenDate;
        if(itemSlot && itemSlot.value){
            givenDate = itemSlot.value.toLowerCase(); 
        } */
        
        const today = moment().tz('America/Los_Angeles').format("MM-DD");
        
        const qt = this.t('QT');
        const qtToday = qt[today];
        const speechOutput = this.t('GET_QT_MESSAGE') + qtToday; 
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), qtToday);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
