import addImage from 'assets/images/addImage.png'
import { categories } from './projectCategories'
import { useI18n } from 'global/Hooks'

export default (initiative)=>{
  const i18n = useI18n()

  return [

  [    
    {
      type: "image", 
      id: "addImage",
      imgPath: addImage,
      label: i18n('projectAddCoverPhoto')
    },
    {
      type: "text",
      id: "name",
      label: i18n('projectName'),
      maxLength: 40
    },
    {
      type: "text",
      id: "contractor",
      label: i18n('projectContractor'),
      maxLength: 40
    },
    {
      type: "text",
      id: "location",
      label: i18n('projectContractorLocation'),
      maxLength: 300
    }
  ],
  [
    {
      type: "select",
      id: "category",
      label: i18n('projectCategory'),
      options: categories(i18n)
    },
    {
      type: "text",
      id: "problem",
      label: i18n('projectProblem'),
      rows: 3,
      maxLength: 300
    },
    {
      type: "text",
      id: "description",
      label: i18n('projectDescription'),
      rows: 8,
      maxLength: 1000
    },
  ],
  [
    {
      type: "text",
      id: "experience",
      label: i18n('projectContractorExperience'),
      rows: 8,
      maxLength: 300
    },
    {
      type: "text",
      id: "resource",
      label: i18n('projectOtherResources'),
      rows: 8,
      maxLength: 300
    },
  ],
  [
    {
      type: "text",
      id: "volunteers",
      label: i18n('projectNumberOfVolunteers'),
      maxLength: 3
    },
    {
      type: "text",
      id: "volunteersTask",
      label: i18n('projectVolunteerTasks'),
      rows: 4,
      maxLength: 300
    },
    {
      type: "text",
      id: "price",
      label: i18n('projectMinimalBudget'),
      maxLength: 10
    },
    {
      type: "text",
      id: "budgetDescription",
      label: i18n('projectBudgetExpenses'),
      rows: 4,
      maxLength: 300
    },
  ],
]};
