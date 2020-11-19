import React, {useEffect, useState} from 'react'
import {makeStyles}                 from '@material-ui/core/styles'
import Button                       from '@material-ui/core/Button'
import FormControl                  from '@material-ui/core/FormControl'
import InputLabel     from '@material-ui/core/InputLabel'
import Input          from '@material-ui/core/Input'
import Dialog         from '@material-ui/core/Dialog'
import DialogContent  from '@material-ui/core/DialogContent'
import DialogActions  from '@material-ui/core/DialogActions'
import Title          from '../components/Title'
import ImageIcon      from '@material-ui/icons/Image'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import './modalTask.css'
import ImgDialog      from './ImgDialog'
import Typography     from '@material-ui/core/Typography'
import Checkbox       from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import format from "date-fns/format";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import ruLocale from "date-fns/locale/ru"
import FormControlLabel from '@material-ui/core/FormControlLabel'

const useStyles = makeStyles((theme) => ({
	dialog: {
		paddingLeft: 40,
		paddingRight: 40,
		paddingTop: 40,
		paddingBottom: 20,
	},
	input: {
		width:230,
		marginRight: 40
	},
	datePiker:{
		width:130,
		marginRight: 40,
		marginTop:16
	},
	editor: {
		height: '35%',
		minHeight: '35%',
		maxHeight:'35%',
		display: 'flex',
		width: '100%'
	},
	panel: {
		display: 'flex',
		flexFlow: 'column',
		wordWrap: 'break-word',
		paddingRight: 40,
		paddingLeft: 40,
		borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    marginTop:30,
	},
	panelButtonImgsFiles: {
		display: 'flex',
		alignItems: 'center',
		paddingTop:5,
	},
	contentEditableArea: {
		height:'100%',
		outline: 'none',
	},
	inputId: {
		display: 'none'
	},
	otvet: {
		wordWrap: 'break-word',
		borderTop: '1px solid rgba(0, 0, 0, 0.12)',
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
		paddingTop: 5,
		marginBottom: 5,
		paddingLeft: 20,
		paddingRight: 20,
		height: '30%',
		minHeight: '30%',
		maxHeight:'30%',
		background:'#F8F8F8',
	},
	buttons: {
		color: '#3f51b5',
		'&:hover': {
			borderRadius: '5px',
			backgroundColor: 'rgb(7, 177, 77, 0.42)'
		},
	},
	groupFiles: {
		textAlign:'left',
		borderTop: '1px solid rgba(0, 0, 0, 0.12)',
		maxHeight: '85%',
		width: 250,
		overflow:'auto',
	},
	groupFilesImgs: {
		// display:'flex',
		// flexFlow:'row',
	},
	labelTitle:{
		borderTop: '1px solid rgba(0, 0, 0, 0.12)',
	},
	textFilesImgs: {
		marginLeft:15,
		marginBottom:5
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200,
	},
}))


class RuLocalizedUtils extends DateFnsUtils {
	getCalendarHeaderText(date) {
		return format(date, "LLLL", { locale: this.locale });
	}

	getDatePickerHeaderText(date) {
		return format(date, "dd MMMM", { locale: this.locale });
	}
}

export default function ModalTasks({opened, closeModal, items}) {
	const classes = useStyles()
	const [open, setOpen] = useState(false)
	const [scroll, setScroll] = useState('paper')
	const [otvet, setOtvet] = useState('Lorem ipsum dolor sit amet, ' +
		'consectetur adipisicing elit. Accusamus aperiam architecto aspernatur' +
		' assumenda beatae debitis dolore eaque explicabo fuga harum iusto maxime ' +
		'minima nemo odit officia recusandae, sequi voluptas voluptate?')
	const handleClickOpen = (scrollType) => () => {
		setOpen(true)
		setScroll(scrollType)
	}
	const [item, setItem] = useState({})
	const [files, setFiles] = useState([])
	const [openImg, setOpenImg] = useState(false)
	const [img, setImg] = useState(null)
	const [startText, setStartText] = useState('Введите текст...')
	const [checked, setChecked] = useState(true)
	const [selectedDate, handleDateChange] = useState(new Date())

	const handleChange = (event) => {
		setChecked(event.target.checked)
	}



	const handleClose = () => {
		closeModal()
		setOpen(false)
	}

	const descriptionElementRef = React.useRef(null)

	useEffect(() => {
		if (open) {
			const {current: descriptionElement} = descriptionElementRef
			if (descriptionElement !== null) {
				descriptionElement.focus()
			}
		}
		setItem(items)
		console.log(item)
	}, [open])

	const Otvet = () => {
		return (
			<div>
				Ответ:
				<div>
					{otvet}
				</div>
			</div>
		)
	}

	const load = (e) => {
		let oldData = files
		setFiles(
			[...oldData, e.target.files[0]]
		)
	}

	const Files = () => {
		if (files.length !== 0) {
			return (
				<div className={classes.groupFilesImgs}>
					{files.map((el) => <div className={classes.textFilesImgs} key={el.name}
																	onDoubleClick={() => openedDialog(el)}>{el.name}</div>)}
				</div>
			)
		} else {
			return ''
		}
	}

	const openedDialog = (el) => {
		setImg(el)
		setOpenImg(true)
	}

	const closeDialog = () => {
		setOpenImg(false)
	}

	useEffect(()=>{
		setOpen(opened)
	},[opened])


	// const mouseUP = (e) => {
	//   let content = document.createElement('img')
	//   content.src = 'profile.jpg'
	//   let selection = document.getSelection()
	//   if (selection.getRangeAt && selection.rangeCount) {
	//     let range = window.getSelection().getRangeAt(0)
	//     range.insertNode(content)
	//   }
	// }


	return (
		<div>
			<Button
				variant="contained"
				color='primary'
				size='small'
				onClick={handleClickOpen('paper')}
			>
				Создать
			</Button>
			<Dialog
				open={open}
				scroll={scroll}
				maxWidth={'lg'}
			>
				<div className={classes.dialog}>
					<Title>Заявка</Title>
					<ImgDialog opened={openImg} closeDialog={closeDialog} img={img}/>
					<div>
						<FormControl className={classes.input}>
							<InputLabel htmlFor="my-input">Тема</InputLabel>
							<Input aria-describedby="my-helper-text" value={item.theme}/>
						</FormControl>
						<FormControl className={classes.input}>
							<InputLabel htmlFor="my-input">Автор</InputLabel>
							<Input aria-describedby="my-helper-text" value={item.author}/>
						</FormControl>
						<FormControl className={classes.input}>
							<InputLabel id="demo-simple-select-label">Ответственный</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={item.responsible}
								onChange={handleChange}
							>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>
						<MuiPickersUtilsProvider utils={RuLocalizedUtils} locale={ruLocale}>
							<DatePicker
								className={classes.datePiker}
								value={selectedDate}
								onChange={handleDateChange}
								format={"d MMM yyyy"}
								cancelLabel={"отмена"}
							/>
						</MuiPickersUtilsProvider>
						<FormControl className={classes.input}>
							<InputLabel id="demo-simple-select-label">Статус</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								// value={age}
								onChange={handleChange}
							>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>
						<FormControl className={classes.input}>
							<InputLabel id="demo-simple-select-label">Приоритет</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								// value={age}
								onChange={handleChange}
							>
								<MenuItem value={10}>Ten</MenuItem>
								<MenuItem value={20}>Twenty</MenuItem>
								<MenuItem value={30}>Thirty</MenuItem>
							</Select>
						</FormControl>
						<FormControlLabel
							control={
								<Checkbox
									checked={checked}
									onChange={handleChange}
									name="checkedB"
									color="primary"
								/>
							}
							label="Закрыть заявку"
						/>
					</div>
				</div>
				<div className={classes.panel}>
					<div className={classes.panelButtonImgsFiles}>
						<input accept="image/*" className={classes.inputId} id="icon-button-file" type="file" onChange={load}/>
						<label htmlFor="icon-button-file">
							<ImageIcon fontSize='large' className={classes.buttons}/>
						</label>
						<input className={classes.inputId} id="icon-button-file" type="file"/>
						<label htmlFor="icon-button-file">
							<AttachFileIcon fontSize='large' className={classes.buttons}/>
						</label>
					</div>
				</div>
				<div className={classes.editor}>
					<DialogContent dividers={scroll === 'paper'}>
						<Typography contentEditable suppressContentEditableWarning
												className={classes.contentEditableArea}
												onFocus={()=>setStartText(' ')}
												onBlur={()=>setStartText('Введите текст...')}
						>
							{startText}
						</Typography>
					</DialogContent>
					<div align={'center'} className={classes.labelTitle}>
						<Title>
							Прикрепленные файлы
						</Title>
						<div id='files' className={classes.groupFiles}>
							<Files/>
						</div>
					</div>
				</div>
				<div className={classes.otvet}>
					{otvet && <Otvet/>}
				</div>
				<DialogActions>
					<Button variant="contained" color='primary' size='small' onClick={handleClose} color="primary">
						Отмена
					</Button>
					<Button variant="contained" color='primary' size='small' onClick={handleClose} color="primary">
						Сохранить
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
