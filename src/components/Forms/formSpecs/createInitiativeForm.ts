import addImage from 'assets/images/addImage.png'
import { useI18n } from 'misc'
import { FormGetterProps } from '../types';

export default ():FormGetterProps =>{
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
        id: "image",
        imgPath: addImage,
        label: i18n('initiativeFormAddCoverPhoto')
      }
    ],
    [
      {
        type: "text",
        id: "description",
        label: i18n('initiativeFormShortDescription'),
        rows: 6,
      },
    ]
  ]};
