import React, {Fragment} from 'react'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
	panel:{

	},
	text:{
		marginTop:40,
		width:400,
		height:400
	}
}));


const add = () => {
	const asd = document.createElement('div')
	asd.innerText = 'ghjgjhjh'
	const el = document.getElementById('textedd')
	console.log(el)
	el.appendChild(asd)
}

export default function TextEditor(){
	const classes = useStyles();
	return(
		<Fragment>
			<div className={classes.panel}>
				<button onClick={add}>1</button>
				<button>1</button>
				<button>1</button>
				<button>1</button>
			</div>
			<div>
				<textarea name="" id="texted" cols="30" rows="10" className={classes.text}>
				</textarea>
			</div>
			<div contentEditable id="textedd">
				fgfh
			</div>
		</Fragment>
	)
}
