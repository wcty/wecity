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
      label: i18n('projectFormAddCoverPhoto')
    },
    {
      type: "text",
      id: "name",
      label: i18n('projectFormName'),
      maxLength: 40
    },
    {
      type: "text",
      id: "contractor",
      label: i18n('projectFormContractor'),
      maxLength: 40
    },
    {
      type: "text",
      id: "location",
      label: i18n('projectFormContractorLocation'),
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
      label: i18n('projectFormProblem'),
      rows: 3,
      maxLength: 300
    },
    {
      type: "text",
      id: "description",
      label: i18n('projectFormDescription'),
      rows: 8,
      maxLength: 1000
    },
  ],
  [
    {
      type: "text",
      id: "experience",
      label: i18n('projectFormContractorExperience'),
      rows: 8,
      maxLength: 300
    },
    {
      type: "text",
      id: "resource",
      label: i18n('projectFormOtherResources'),
      rows: 8,
      maxLength: 300
    },
  ],
  [
    {
      type: "text",
      id: "volunteers",
      label: i18n('projectFormNumberOfVolunteers'),
      maxLength: 3
    },
    {
      type: "text",
      id: "volunteersTask",
      label: i18n('projectFormVolunteerTasks'),
      rows: 4,
      maxLength: 300
    },
    {
      type: "text",
      id: "price",
      label: i18n('projectFormMinimalBudget'),
      maxLength: 10
    },
    {
      type: "text",
      id: "budgetDescription",
      label: i18n('projectFormBudgetExpenses'),
      rows: 4,
      maxLength: 300
    },
  ],
]};
