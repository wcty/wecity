import React from "react"
export default {

  //Side drawer
    initiativeMap: "Map of initiatives",
    myInitiatives: "My initiatives",
    projectLibrary: "Project Library",
    resourceLibrary: "Local Resources",
    settings: "Settings",
    feedback: "Feedback", 
    language: "Language",
    en: "🇬🇧",
    uk: "🇺🇦",
    ka: "🇬🇪",
    fi: "🇫🇮",

    //App bar
    enter: "Login",
    exit: "Logout",
    loading: "Loading",

    //Project Library
    projectLibraryTitle: "Library of project proposals",
    myProjectsTitle: "My projects", //when adding project to inititiative
    onlyMineCheckbox: "Show only created by me",
    noMyProjects: "You didn't create projects yet {#choice in the library | by this category#}.",
    noProjects:  `There are no projects in the library{#choice | by this category#}.
    Be the first to propose one.`,

    //categories of projects
    chooseCategory: "Choose category",
    allCategories: "All categories",
    greenery: "Greenery",
    publicSpace:"Public spaces",
    domestic:"Domestic",
    recreation: "Recreation",
    help: "Help",
    art: "Art",
    business: "Enterpreneurship",
    other: "Other",

    //Form controls
    add: "Add",
    addAndJoin: "Add and join",
    cancel: "Cancel",
    back: "Back",
    next: "Next",
    send: "Send",

    //Feedback form
    feedbackGreeting: "🖐Welcome to our site!",
    feedbackDescription: <>
      <p>- In case of any questions please contact us by email hi@weee.city.</p>
      <p>- If you are registered on our site you can leave your questions or offers in the feedback form.</p>
    </>,
    feedbackName: "Your name:",
    feedbackMessage: "Your message:",
    feedbackContact: "How to contact you:",
    //Feedback email contents
    feedbackEmailTitle: "Feedback from",
    feedbackEmailName: "Name",
    feedbackEmailMessage: "Message",
    feedbackEmailContact: "How to contact me",

    //User form
    userFormGreetings: '🖐Dear visitor!',
    userFormDescription: <>
        <p>- You are on the site, which is the first prototype of the platform for civic self-governance Wecity.</p>
        <p>- This site works in the experimental mode and its goal is to test different methods of citizen self-organization online to improve our cities.
        It was launched in the framework of EASA 2020 (European Architectural Student Assembly) in Kyiv, Chokolivka. </p>
        <p>to take part in this experiment, we kindly ask you to answer couple of question and by this to consent letting us analyse and manage your data at the site for development purposes.</p>
    </>,
    userFormName: "Your name:",
    userFormHowDidYouFindUs: "How did you hear about this site:",
    userFormHowToContactYou: "How can we contact you:",

    //Project form
    projectAddCoverPhoto: "+ Add cover image",
    projectName: "Name of your proposal",
    projectContractor: "Contractor organization",
    projectContractorLocation: "Place of realization",
    projectChooseCategory: "Choose project category",
    projectProblem: "Which problem it is called to solve?",
    projectDescription: "describe the project:",
    projectContractorExperience: "Do you have any relavant experience?",
    projectOtherResources: "Which non-financial resources would you need for its relization?",
    projectNumberOfVolunteers: "How many volunteers would you need?",//maybe remove
    projectVolunteerTasks: "What tasks should be done by volunteers?",
    projectMinimalBudget: "What is the minimal necessary budget?",
    projectBudgetExpenses: "Which expenses will it cover?",
    
    //Initiative library
    intiativeLibraryTitle: "Initiatives that you've joined:",
    initiativeLibraryEmpty: 
    `You didn't join any initiative yet! 
    Go to the Map and join the one, that seem important,
    or propose your own`,
    //Initiative form
    initiativeInstruction: "Move the map to locate the initiative marker (red) in the right place, then add the name and click Next.",
    initiativeName: "Name of your initiative",
    initiativeAddCoverPhoto: "+ Add the title photo",
    initiativeProblem: "Which problem stands behind the initiative?",
    initiativeExpectedResult: "Describe desired outcomes:",
    initiativeCurrentState: "What is the current state of it:"
};