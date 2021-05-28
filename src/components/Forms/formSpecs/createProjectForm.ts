import addImage from 'assets/images/addImage.png'
import { categories } from './projectCategories'
import { useI18n } from 'misc'
import { FormGetterProps } from '../types';

export default ():FormGetterProps =>{
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
      id: "description",
      label: i18n('projectFormDescription'),
      rows: 4,
    },
    {
      type: "select",
      id: "category",
      label: i18n('projectFormCategory'),
      options: categories(i18n)
    },
    {
      type: "text",
      id: "experience",
      label: i18n('projectFormContractorExperience'),
      rows: 4,
    },
  ],
  [
    {
      type: "number",
      id: "volunteers",
      label: i18n('projectFormNumberOfVolunteers'),
      maxLength: 3,
      adornment: "люд."
    },
    {
      type: "text",
      id: "volunteersTask",
      label: i18n('projectFormVolunteerTasks'),
      rows: 4,
      maxLength: 300
    },
    {
      type: "number",
      id: "price",
      label: i18n('projectFormMinimalBudget'),
      maxLength: 10,
      adornment: "грн"
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
