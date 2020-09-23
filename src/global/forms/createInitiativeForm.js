import addImage from 'assets/images/addImage.png'
// import { categories } from './projectCategories'
import { useI18n } from 'global/Hooks'

export default (initiative)=>{
  const i18n = useI18n()

  return [
    [
      {
        type: "note",
        id: "notes",
        label: i18n('initiativeFormInstruction'),
      },
      {
        type: "text",
        id: "name",
        label: i18n('initiativeFormName'),
        maxLength: 40
      }
    ],
    [
      {
        type: "image", 
        id: "addImage",
        imgPath: addImage,
        label: i18n('initiativeFormAddCoverPhoto')
      }
    ],
    [
      {
        type: "text",
        id: "problem",
        label: i18n('initiativeFormProblem'),
        rows: 2,
      },
      {
        type: "text",
        id: "outcome",
        label: i18n('initiativeFormExpectedResult'),
        rows: 1,
      },
    ],
    [
      {
        type: "text",
        id: "context",
        label: i18n('initiativeFormCurrentState'),
        rows: 6,
      },
    ]
  ]};
