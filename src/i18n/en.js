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
    addToInitiative: "Add to Initiative",
    join: "Join",
    leave: "Leave",
    delete: "Delete",
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
    projectFormAddCoverPhoto: "+ Add cover image",
    projectFormName: "Name of your proposal",
    projectFormContractor: "Contractor organization",
    projectFormContractorLocation: "Place of realization",
    projectFormChooseCategory: "Choose project category",
    projectFormProblem: "Which problem it is called to solve?",
    projectFormDescription: "describe the project:",
    projectFormContractorExperience: "Do you have any relavant experience?",
    projectFormOtherResources: "Which non-financial resources would you need for its relization?",
    projectFormNumberOfVolunteers: "How many volunteers would you need?",//maybe remove
    projectFormVolunteerTasks: "What tasks should be done by volunteers?",
    projectFormMinimalBudget: "What is the minimal necessary budget?",
    projectFormBudgetExpenses: "Which expenses will it cover?",
    projectFormCategory: "Choose category",

    //Project preview
    projectContractor: "Contractor name",
    projectContractorLocation: "Place of implementation",
    projectProblem: "Which problem is solving",
    projectDescription: "Project description",
    projectContractorExperience: "Contractor experience",
    projectOtherResources: "Necessary no-financial resources",
    projectNumberOfVolunteers: "Necessary number of volunteers",
    projectVolunteerTasks: "Volunteer tasks",
    projectMinimalBudget: "Minimal required budget",
    projectBudgetExpenses: "What does the budget covers",
    projectDateAdded: "Date added",

    //Initiative library
    intiativeLibraryTitle: "Initiatives that you've joined:",
    initiativeLibraryEmpty: 
    `You didn't join any initiative yet! 
    Go to the Map and join the one, that seem important,
    or propose your own`,
    //Initiative form
    initiativeFormInstruction: "Move the map to locate the initiative marker (red) in the right place, then add the name and click Next.",
    initiativeFormName: "Name of your initiative",
    initiativeFormAddCoverPhoto: "+ Add the title photo",
    initiativeFormProblem: "Which problem stands behind the initiative?",
    initiativeFormExpectedResult: "Describe desired outcomes:",
    initiativeFormCurrentState: "What is the current state of it:",

    //Initiative preview
    initiativeDistanceFromMeKM: 'km from me',
    initiativeDistanceFromMeM: 'm from me',
    initiativeShare: 'Share',
    initiativeProblem: 'Problematics or idea:',
    initiativeExpectedResult: 'Goals:',
    initiativeCurrentState: 'Current state:',
    initiativeDateAdded: 'Date added:',
    
    //Initiative Group
    initiativeGroupChat: "Chat",
    initiativeGroupMembers: "Members",
    initiativeGroupProjects: "Projects",
    initiativeGroupResources: "Resources",
        
    //Alerts
    alertYouNeedToLogin: "You must be logged in to create initiative, project or resource",
    alertLinkWasCopied: "Link was succesfully copied to the clipboard",
};