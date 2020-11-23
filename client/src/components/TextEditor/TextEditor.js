import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  editor:{
    marginTop:20,
    height:400,
    outline:'none'
  },
  panel:{
    display:'flex',
    justifyContent:'space-between',
    marginLeft:20,
    marginRight:20,
  },
  inputId:{
    display: 'none'
  }
}));

export default function TextEditor() {
  const classes = useStyles();

  return(
    <div>
      <div className={classes.panel}>
        <div>
          <label htmlFor="inputId">Добавить файл</label>
          <input id="inputId" type="file" className={classes.inputId}/>
        </div>
      </div>
      <div contentEditable suppressContentEditableWarning className={classes.editor}>
        Введите текст...
      </div>
      <div>
        imgs
      </div>
    </div>
  )
}
