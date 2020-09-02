import React from 'react' 
import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import addImage from 'assets/images/addImage.png'
import { categories } from './projectCategories'

const useStyles = makeStyles(theme=>({
  item:{
    width: '100%',
    paddingRight: '0.5rem'
  }
}))

export default (initiative)=>{
  const classes = useStyles()
  
  return [

  [    
    {
      type: "image", 
      id: "addImage",
      imgPath: addImage,
      label: "+ Додайте титульну картинку"
    },
    {
      type: "text",
      id: "name",
      label: "Назва вашої пропозиції",
      maxLength: 40
    },
    {
      type: "text",
      id: "contractor",
      label: "Виконавець",
      maxLength: 40
    },
    {
      type: "text",
      id: "location",
      label: "Локація",
      maxLength: 300
    }
  ],
  [
    {
      type: "select",
      id: "category",
      label: "Оберіть категорію проекту",
      options: categories
    },
    {
      type: "text",
      id: "problem",
      label: "Яку проблему він має вирішити?",
      rows: 3,
      maxLength: 300
    },
    {
      type: "text",
      id: "description",
      label: "Опишіть проект:",
      rows: 8,
      maxLength: 1000
    },
  ],
  [
    {
      type: "text",
      id: "experience",
      label: "Який маєте досвід для реалізації?",
      rows: 8,
      maxLength: 300
    },
    {
      type: "text",
      id: "resource",
      label: "Які негрошові ресурси необхідні?",
      rows: 8,
      maxLength: 300
    },
  ],
  [
    {
      type: "text",
      id: "volunteers",
      label: "Скільки волонтерів вам буде потрібно?",
      maxLength: 3
    },
    {
      type: "text",
      id: "volunteersTask",
      label: "Які задачі мають виконувати волонтери?",
      rows: 4,
      maxLength: 300
    },
    {
      type: "text",
      id: "price",
      label: "Який мінімальний необхідний бюджет?",
      maxLength: 10
    },
    {
      type: "text",
      id: "budgetDescription",
      label: "Які витрати має покривати бюджет?",
      rows: 4,
      maxLength: 300
    },
  ],
]};
