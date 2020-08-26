import React from 'react' 
import { List, ListItem, ListItemText, makeStyles } from '@material-ui/core'

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
      type: "elements",
      id: "elements",
      elements: <List key='elements' disablePadding style={{marginLeft: '1rem'}}>
        {initiative.problem&& (<ListItem className={classes.item} disableGutters>
          <ListItemText
            primary="Проблема або ідея:"
            secondary={initiative.problem}
          />
        </ListItem>)}
        {initiative.outcome&& (<ListItem className={classes.item} disableGutters>
          <ListItemText
            primary="Мета:"
            secondary={initiative.outcome}
          />
        </ListItem>)}
        {initiative.context && (<ListItem className={classes.item} disableGutters>
          <ListItemText
            primary="Передумови:"
            secondary={initiative.context}
          />
        </ListItem>)}
        {initiative.timestamp && (<ListItem className={classes.item} disableGutters>
          <ListItemText
            primary="Додано:"
            secondary={initiative.timestamp.toDate().getDay()+"."+initiative.timestamp.toDate().getMonth()+"."+initiative.timestamp.toDate().getFullYear()}
          />
        </ListItem>)}
      </List>
    }
  ],
  [
    {
      type: "text",
      id: "name",
      label: "Назва вашого проекту",
      maxLength: 40
    },
    {
      type: "text",
      id: "contractor",
      label: "Ім'я виконавця",
      maxLength: 40
    },
    {
      type: "text",
      id: "location",
      label: "Місце виробництва",
      maxLength: 300
    }
  ],
  [
    {
      type: "select",
      id: "category",
      label: "Оберіть категорію проекту",
      options:[
        "Озеленення",
        "Громадські простори",
        "Побутові",
        "Відпочинок",
        "Допомога",
        "Мистецтво",
        "Бізнес",
        "Інше"
      ]
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
      label: "Які витрати має покривати бюдет?",
      rows: 4,
      maxLength: 300
    },
  ],
]};
