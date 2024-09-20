// LICENCE -----------------------------------------------------------------------------

// Copyright 2024 - Maude Tagand & Dominique Muller

// Initialize jsPsych -----------------------------------------------------------------
var jsPsych = initJsPsych({
});

// browser exclusion ------------------------------------------------------------------
var browser_check = {
  type: jsPsychBrowserCheck,
  inclusion_function: (data) => {
    return data.browser === 'firefox'|| data.browser === 'chrome' && data.mobile === false
  },
  exclusion_message: (data) => {
    if(data.mobile){
      return "p>You must use a desktop/laptop computer to participate in this experiment.</p>";
    } else if (data.browser !== 'firefox' && data.browser !== 'chrome'){
      return "<p>You must use Chrome or Firefox to complete this experiment.</p>"+
             "<p>If you would like to take part in our study, please copy and paste the experiment link into one of the compatible browsers.</p>";
    }
  }
}
// Test test test
// Create Timeline --------------------------------------------------------------------------
var timeline = [];

// Welcome

var welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:
    "<h1 class ='custom-title'> Welcome </h1>" +
    "<p class='instructions'>Thank you for taking part in this survey. <b> Please note that you can only participate from a computer.</b> </p>" +
    "<p class='instructions'>We are going to ask you to imagine you are a medical researcher who wants to test the effectiveness of a medicine against a fictitious disease. " +
    "Your task will be to give your opinion on the effectiveness of this medicine. You will also have to answer questions about your beliefs and personality.</p>" +
    "<p class='instructions'>If you have any question related to this research, please " +
    "send a message on Prolific. </p>" +

    "<p class = 'continue-instructions'>Press <strong>space</strong> to start the study.</p>",
  choices: [' ']
};


var consent = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
  "<h1 class ='custom-title'> Informed consent </h1>" +
    "<p class='instructions'>By clicking below to start the study, you recognize that:</p>" +
      "<ul class='instructions'>" +
        "<li>You know you can stop your participation at any time, without having to justify yourself. " +
        "However, keep in mind that you have to complete the whole study in order to be paid.</li>" +
        "<li>You know you can contact our team for any questions or dissatisfaction related to your " +
        "participation in the research via Prolific.</li>" +
        "<li>You know the data collected will be strictly confidential and it will be impossible for " +
        "any unauthorized third party to identify you.</li>" +
        "<li>Please note that there will be one or several questions to check that you read instructions carefully. " +
        "If you do not answer this or these (very simple) questions correctly, you might not be paid. " +
        "<li>You must be over 18 to participate. " +
      "</ul>" +
    "<p class='instructions'>By clicking on the \"I confirm\" button, you give your free and informed consent to participate " +
    "in this research.</p>",
  choices: ['I confirm']
};


var consigne = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
  "<p class= 'instructions_questionnary bold'>Please read these instructions very carefully.</p>" +
  "<p class= 'instructions_questionnary'>Imagine you are a medical researcher looking for a cure for a (fictional) disease called the Vonne syndrome. " + 
  "You just found a medicine that you think could work and your role will be to determine whether this medicine is effective or not. " +
  "<p class= 'instructions_questionnary'>To do so, you will see patients suffering from the disease one by one, and depending on the instructions, you will have to give them either the medicine or a placebo, " +
  "that is to say a pill that resembles the medicine but does not contain any substance affecting health (it is generally with this type of pill that a medicine is compared to in order to judge its effectiveness).</p>" + //retour à la ligne
  "<p class= 'instructions_questionnary'>After we let you know whether the patient has recovered or not, you will have to choose between two options:</p>" +
  "<p class= 'instructions_questionnary'> <b> 1) continue testing </b>, in other words give the medicine or placebo to the next patient.</p>" +
  "<p class= 'instructions_questionnary'> <b> 2) stop the trials </b> if you feel you have tested enough patients to be able to give your opinion on the efficacy of the medicine.</p>" +
  "<p class= 'instructions_questionnary'>Many patients suffering from the disease have chosen to volunteer to test the medicine. You will therefore be able to carry out a large number of tests to determine its effectiveness.</p>",
  choices: ['I have read carrefully and I can start the study']
};

var stim = [
  {pilule: "medicine", correct_button: 0, diagnostic: "recovered", image: "jspsych/img/healthypeople.jpg", med_score: 1, pla_score: 0},
  {pilule: "medicine", correct_button: 0, diagnostic: "recovered", image: "jspsych/img/healthypeople.jpg", med_score: 1, pla_score: 0},
  {pilule: "medicine", correct_button: 0, diagnostic: "recovered", image: "jspsych/img/healthypeople.jpg", med_score: 1, pla_score: 0},
  {pilule: "medicine", correct_button: 0, diagnostic: "not recovered", image: "jspsych/img/sickpeople.jpg", med_score: -1, pla_score: 0},
  {pilule: "placebo", correct_button: 1, diagnostic: "recovered", image: "jspsych/img/healthypeople.jpg", med_score: 0, pla_score: 1},
  {pilule: "placebo", correct_button: 1, diagnostic: "recovered", image: "jspsych/img/healthypeople.jpg", med_score: 0, pla_score: 1},
  {pilule: "placebo", correct_button: 1, diagnostic: "recovered", image: "jspsych/img/healthypeople.jpg", med_score: 0, pla_score: 1},
  {pilule: "placebo", correct_button: 1, diagnostic: "not recovered", image: "jspsych/img/sickpeople.jpg", med_score: 0, pla_score: -1}
]
//medicine_high veut dire
var button_randomization = jsPsych.randomization.sampleWithoutReplacement(["medicine_high", "medicine_low"], 1)[0]

var medicine = stim.filter(function(s){return s.pilule === "medicine"; });
var placebo = stim.filter(function(s){return s.pilule === "placebo"; });

var medicine_randomization = jsPsych.randomization.repeat(medicine, 8);
var placebo_randomization = jsPsych.randomization.repeat(placebo, 8);
var order_randomization = jsPsych.randomization.sampleWithoutReplacement(["medicine_first", "placebo_first"], 1)[0]
var stim_randomization = [];

for (var i = 0; i < 32; i++) {
  if (order_randomization == "medicine_first"){
    stim_randomization.push(medicine_randomization.pop(), placebo_randomization.pop());
  } else if (order_randomization == "placebo_first"){
    stim_randomization.push(placebo_randomization.pop(), medicine_randomization.pop());
  }
}
console.log(medicine);
console.log(placebo);
console.log(medicine_randomization);
console.log(placebo_randomization);
console.log(order_randomization);
console.log(stim_randomization);

var pilule_given = {
  type : jsPsychImageButtonResponse,
  stimulus: "jspsych/img/sickpeople.jpg",
  stimulus_width: 250,
  choices: [
    `<div class='choice-container'><img style='width: 100px;' src='jspsych/img/pilule.png'><div class='choice-text'>Medicine</div></div>`,
    `<div class='choice-container'><img style='width: 100px;' src='jspsych/img/pilule.png'><div class='choice-text'>Placebo</div></div>`
    ],
  prompt: function() {
  return `<p class='instructions'>You give the ${jsPsych.timelineVariable('pilule')} to the patient.</p>`
  }
}

var loop_pilule = {
  timeline: [pilule_given],
  loop_function: function(){
    var response = jsPsych.data.get().last().values()[0].response;
    var correct_button = jsPsych.timelineVariable('correct_button')
    if (response == correct_button){
      return false;
    } else {
      return true;
    }
  }
}

var feedback = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function(){
    return `
    <img style= 'width: 250px;' src="${jsPsych.timelineVariable('image')}"></img>
    <p class='instructions'>The patient has ${jsPsych.timelineVariable('diagnostic')}!</p>
    <p class='instructions'>Do you want to continue to test this medicine (which means give this medicine or a placebo to the next patient),  
    or do you feel that you have tested enough patients to stop the trials and give your opinion on the effectiveness of this medicine?</p>`;
  },
  choices: ["stop","continue"],
  on_finish: function(){
    var response = jsPsych.data.get().last().values()[0].response;
    if (response == 0){
      jsPsych.endCurrentTimeline();
    }
  }
}

var procedure_testing = {
  timeline: [loop_pilule, feedback],
  timeline_variables: stim_randomization,
  data: {
    pilule: jsPsych.timelineVariable('pilule'),
    diagnostic: jsPsych.timelineVariable('diagnostic'),
    med_score: jsPsych.timelineVariable('med_score'),
    pla_score: jsPsych.timelineVariable('pla_score')
  },
}

//question croyances
var question = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      prompt: "<p>On the basis of the information you have gathered, you think that:</p>",
      options: function(){if (button_randomization == "medicine_high"){
        return [
          "Patients have a better chance of recovery with the medicine",
          "Patients have as much chance of recovery with the medicine as with the placebo",
          "Patients have a better chance of recovery with the placebo"
          ];
      } else if (button_randomization == "medicine_low"){
        return [
          "Patients have a better chance of recovery with the placebo",
          "Patients have as much chance of recovery with the medicine as with the placebo",
          "Patients have a better chance of recovery with the medicine"
        ];
      } else {
        return "<p>Erreur : réponse inattendue.</p>";
      }
    },
    required: true // This makes the question required
  }
]
}

var slider = {
  type: jsPsychHtmlSliderResponse,
  slider_start: 1,
  require_movement: true,
  min: 1,
  max: 100,
  step: 1,
  labels: [
    '1<br>Very small extent', 
    '25<br>Small extent', 
    '50<br>Moderate extent', 
    '75<br>Large extent', 
    '100<br>Very large extent'
  ],
  stimulus: function() {
    var response = jsPsych.data.get().last().values()[0].response.Q0;
    var questionText = "";
    if (response == "Patients have a better chance of recovery with the medicine") {
      questionText = "To what extent do you think that people are more likely to get better with the medicine?";
    } else if (response == "Patients have a better chance of recovery with the placebo") {
      questionText = "To what extent do you think that people are more likely to get better with the placebo?";
    } else {
      questionText = "Erreur : réponse inattendue.";
    }

    return `<p>${questionText}</p>`;
  }
};

var conditional_slider = {
  timeline: [slider],
  conditional_function: function() {
    var response = jsPsych.data.get().last().values()[0].response.Q0;
    if (response == "Patients have as much chance of recovery with the medicine as with the placebo") {
      return false;
    } else {
      return true;
    }
  }
};


//question certi
var confidence = {
  type: jsPsychHtmlSliderResponse,
  slider_start: 0,
  require_movement: true,
  labels: ['0<br>Not at all sure', '100<br>Very sure'],
  stimulus: `<p>Please indicate how sure you are of your answer on a scale from 0 (not at all sure) to 100 (very sure).</p>`
}



//Attention check
var attention_check = {
  type: jsPsychSurveyText,
  questions: [
    {
      prompt: "<p class='instructions_questionnary'>This question is here to check that you read the instructions carefully. On this page, we will ask you only one question, but you will not answer it. Instead, just write the word \u0022baguette\u0022. </p>" +
              "<p class='instructions_questionnary'>What is your favorite color?</p>",
      name: 'attention_check',
      required: true
    }
  ],
  button_label: 'Continue',
}

/*

//Survey
var instruction_questionnary = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:
    "<p class='instructions_questionnary'>The first part of this study has been completed. You will now have to answer a series of questions about your points of view and personality.</p>" +
    "<p class = 'continue-instructions'>Press <strong>space</strong> to start the questions.</p>",
  choices: [' ']
};

///Questionnary gcbs 
var gcbs_label = [
  "<br>Definitely not true", 
  "<br>Probably not true", 
  "<br>Not sure / Cannot decide", 
  "<br>Probably true", 
  "<br>Definitely true"
];

var gcbs_questionnary = {
  type: jsPsychSurveyLikert,
  preamble:
  "<p class='instructions_questionnary bold'>Beliefs About the World</p>" +// ATTENTION différent de qualtrics
  "<p class='instructions_questionnary'>We are interested in your beliefs about the world. There is often debate about whether or not the public is told the whole truth about various important issues. " +// ATTENTION différent de qualtric
  "This brief survey is designed to assess your beliefs about some of these subjects. " +// ATTENTION différent de qualtric
  "<p class='instructions_questionnary '>Please indicate the extent to which you think the following statements are likely to be true.</p>",
  questions: [
    {prompt: "The government is involved in the murder of innocent citizens and/or well-known public figures, and keeps this a secret.", name: 'gcbs1', labels: gcbs_label, required: true},
    {prompt: "The power held by heads of state is second to that of small unknown groups who really control world politics.", name: 'gcbs2', labels: gcbs_label, required: true},
    {prompt: "Secret organizations communicate with extraterrestrials, but keep this fact from the public.", name: 'gcbs3', labels: gcbs_label, required: true},
    {prompt: "The spread of certain viruses and/or diseases is the result of the deliberate, concealed efforts of some organization.", name: 'gcbs4', labels: gcbs_label, required: true},
    {prompt: "Groups of scientists manipulate, fabricate, or suppress evidence in order to deceive the public.", name: 'gcbs5', labels: gcbs_label, required: true},
    {prompt: "The government permits or perpetrates acts of terrorism on its own soil, disguising its involvement.", name: 'gcbs6', labels: gcbs_label, required: true},
    {prompt: "A small, secret group of people is responsible for making all major world decisions, such as going to war.", name: 'gcbs7', labels: gcbs_label, required: true},
    {prompt: "Evidence of alien contact is being concealed from the public.", name: 'gcbs8', labels: gcbs_label, required: true},
    {prompt: "Technology with mind-control capacities is used on people without their knowledge.", name: 'gcbs9', labels: gcbs_label, required: true},
    {prompt: "New and advanced technology which would harm current industry is being suppressed.", name: 'gcbs10', labels: gcbs_label, required: true},
    {prompt: "The government uses people as patsies to hide its involvement in criminal activity.", name: 'gcbs11', labels: gcbs_label, required: true},
    {prompt: "Certain significant events have been the result of the activity of a small group who secretly manipulate world events.", name: 'gcbs12', labels: gcbs_label, required: true},
    {prompt: "Some UFO sightings and rumors are planned or staged in order to distract the public from real alien contact.", name: 'gcbs13', labels: gcbs_label, required: true},
    {prompt: "Experiments involving new drugs or technologies are routinely carried out on the public without their knowledge or consent.", name: 'gcbs14', labels: gcbs_label, required: true},
    {prompt: "A lot of important information is deliberately concealed from the public out of self-interest.", name: 'gcbs15', labels: gcbs_label, required: true},
  ],
  required_error: "Please answer the question."
};

///Questionnary IH
var gihs_label = [
  "<br>Not at all true of me", 
  "<br>Slightly true of me", 
  "<br>Moderately true of me", 
  "<br>Very true of me", 
  "<br>Extremely true of me"
];
   
var gihs_questionnary = {
  type: jsPsychSurveyLikert,
  preamble:
  "<p class='instructions_questionnary bold'>Please answer this set of questions about you.</p>"+
  "<p class='instructions_questionnary'>Again, there are no right or wrong answers. Just tell what you think and be as honest as possible.</p>"+
  "<p class='instructions_questionnary'>Please indicate to what extent these caracteristics describe you on the following scale: " + //ATTENTION difference qualtric
  "Not at all true of me, Slightly true of me, Moderately true of me, Very true of me, Extremely true of me",
  questions: [
    {prompt: "<div style = 'width: 900px;'>I question my own opinions, positions, and viewpoints because they could be wrong.</div>", name: 'gihs1', labels: gihs_label, required: true},
    {prompt: "I reconsider my opinions when presented with new evidence.", name: 'gihs2', labels: gihs_label, required: true},
    {prompt: "I recognize the value in opinions that are different from my own.", name: 'gihs3', labels: gihs_label, required: true},
    {prompt: "I accept that my beliefs and attitudes may be wrong.", name: 'gihs4', labels: gihs_label, required: true},
    {prompt: "In the face of conflicting evidence, I am open to changing my opinions.", name: 'gihs5', labels: gihs_label, required: true},
    {prompt: "I like finding out new information that differs from what I already think is true.", name: 'gihs6', labels: gihs_label, required: true},
  ],
  required_error: "Please answer the question."
}

var questionnary = {
  timeline: (function(){
    var order_questionnary_randomization = jsPsych.randomization.sampleWithoutReplacement(["gcbs_first", "gihs_first"], 1)[0];
    if (order_questionnary_randomization == "gcbs_first"){
      return [gcbs_questionnary, gihs_questionnary]
    } else {
      return [gihs_questionnary, gcbs_questionnary]
    }
  })()
}
*/


var instruction_demographic_questionnary = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:
    "<p class='instructions_questionnary'>You are nearly at the end of this experiment, please answer this last set of questions about yourself.</p>" +
    "<p class = 'continue-instructions'>Press <strong>space</strong> to start these questions.</p>",
  choices: [' ']
};

          
var genre = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      prompt: "<p class='instructions_questionnary'>What gender do you identify as?</p>", 
      options: ["Woman", "Man","Other"],
      name: 'genre',
      required: true,
      horizontal: true
    }
  ],
  required_error: "Please, answer all questions.",
  button_label: 'Continue'
}
          
var age = {
  type: jsPsychSurveyText,
  questions: [
    {
      prompt: "<p class='instructions_questionnary'>How old are you? (in year, just a number, for instance 32)</p>",
      placeholder: 'XX',
      name: 'age',
      required: true
    }
  ],
  required_error: "Please, answer all questions.",
  button_label: 'Continue'
}

var comment = {
  type: jsPsychSurveyText,
  questions: [
    {
      prompt: "<p class='instructions'>Do you have any comments about the study?</p>", // différent que qualtrics
      name: 'comment',
      rows: 5
    }
  ],
  required_error: "Please, answer all questions.",
  button_label: 'Continue'
}

var waiting_demand = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
  "<p class='instructions'>You have now finished answering all the questions. " +
  "After clicking <strong>continue</strong>, the data will be saved while loading. " +
  "<strong>Please wait until the next page appears to exit.</strong> " +
  "Otherwise, we will have no proof that you have completed the study and won't be able to pay you</p>",
  choices: ['Continue']
}

//prolific ----------------------------------------------------------------------------------
var prolific = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<p class='instructions'>You have finished the last task. Thanks for participating!</p>"+
  "<p class='instructions'>Please wait a moment, you will automatically be redirected to prolific.</p>",
  trial_duration: 3000,
  choices: "NO_KEYS",
  on_finish: function(){
  window.location.href = "https://app.prolific.com/submissions/complete?cc=C4B65VYL";
  }
}
var prolific_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
var study_id = jsPsych.data.getURLVariable('STUDY_ID');
var session_id = jsPsych.data.getURLVariable('SESSION_ID');

//Save data ---------------------------------------------------------------------------------
const subject_id = jsPsych.randomization.randomID(10);
const filename = `${subject_id}.csv`;
const experiment_id = "RrGG2ORSPpVt";
// Your OSF token
// const osfToken = 'VLFG5mbOACd0fk6jkN1IhAwbdrCi8OSm62rzTqPBreN3asR5QCcIeTBz9YkwJy1WL9CkNp';


jsPsych.data.addProperties({
  subject_id: subject_id,
  prolific_id: prolific_id,
  study_id: study_id,
  session_id: session_id,
  stim_randomization: stim_randomization,
  button_randomization: button_randomization
})

var save_data = {
  type: jsPsychPipe,
  action: "save",
  experiment_id: experiment_id,
  filename: filename,
  data_string: ()=>jsPsych.data.get().csv()
  //token: osfToken
}

//timeline
timeline.push 
  (browser_check,
  welcome,
  consent,
  consigne,
  procedure_testing,
  question,
  conditional_slider,
  confidence,
  attention_check,
  instruction_demographic_questionnary,
  genre,
  age,
  comment,
  waiting_demand,
  save_data, 
  prolific 
)

jsPsych.run(timeline)