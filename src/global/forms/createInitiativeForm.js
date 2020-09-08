import addImage from 'assets/images/addImage.png'
import { categories } from './projectCategories'
import { useI18n } from 'global/Hooks'

export default (initiative)=>{
  const i18n = useI18n()

  return [
    [
      {
        type: "note",
        id: "notes",
        label: i18n('initiativeInstruction'),
      },
      {
        type: "text",
        id: "name",
        label: i18n('initiativeName'),
        maxLength: 40
      }
    ],
    [
      {
        type: "image", 
        id: "addImage",
        imgPath: addImage,
        label: i18n('initiativeAddCoverPhoto')
      }
    ],
    [
      {
        type: "text",
        id: "problem",
        label: i18n('initiativeProblem'),
        rows: 2,
        maxLength: 300
      },
      {
        type: "text",
        id: "outcome",
        label: i18n('initiativeExpectedResult'),
        rows: 1,
        maxLength: 300
      },
    ],
    [
      {
        type: "text",
        id: "context",
        label: i18n('initiativeCurrentState'),
        rows: 6,
        maxLength: 300
      },
    ]
  ]};
