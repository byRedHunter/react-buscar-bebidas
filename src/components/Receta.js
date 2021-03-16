import React, { useContext, useState } from 'react'
import Modal from '@material-ui/core/Modal'
import { makeStyles } from '@material-ui/core/styles'

import { ModalContext } from '../context/ModalContext'

function getModalStyle() {
	const top = 50
	const left = 50

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	}
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: '90%',
		maxWidth: 500,
		height: '85vh',
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
		overflowY: 'auto',
	},
}))

export const Receta = ({ receta }) => {
	// config modal de material-ui
	const [modalStyle] = useState(getModalStyle)
	const [open, setopen] = useState(false)

	const classes = useStyles()

	const handleOpen = () => {
		setopen(true)
	}

	const handleClose = () => {
		setopen(false)
	}

	const { setIdReceta, data, setReceta } = useContext(ModalContext)

	// muestra y formatea los ingredientes
	const mostrarIngredientes = (data) => {
		let ingredientes = []

		for (let i = 1; i < 16; i++) {
			if (data[`strIngredient${i}`]) {
				ingredientes.push(
					<li key={i}>
						{data[`strIngredient${i}`]} - {data[`strMeasure${i}`]}
					</li>
				)
			}
		}

		return ingredientes
	}

	return (
		<div className='col-md-4 mb-3'>
			<div className='card'>
				<h2 className='card-header h4 text-center'>{receta.strDrink}</h2>
				<img
					className='card-img-top'
					src={receta.strDrinkThumb}
					alt={`Imagen de ${receta.stDrink}`}
				/>
				<div className='card-body'>
					<button
						className='btn btn-primary btn-block'
						onClick={() => {
							setIdReceta(receta.idDrink)
							handleOpen()
						}}
					>
						Ver Receta
					</button>

					<Modal
						open={open}
						onClose={() => {
							handleClose()
							setIdReceta(null)
							setReceta({})
						}}
					>
						<div style={modalStyle} className={`${classes.paper} text-dark`}>
							{data.length === 0 ? (
								<p className='alet alert-info'>Cargando...</p>
							) : (
								<>
									<h2 className='h3 text-success'>{data.strDrink}</h2>
									<h3 className='h4 mt-4'>Instrucciones</h3>
									<p>{data.strInstructions}</p>

									<img
										className='img-fluid'
										src={data.strDrinkThumb}
										alt={data.strDrink}
									/>

									<h3 className='h4 mt-3'>Ingrediente y cantidades</h3>
									<ul>{mostrarIngredientes(data)}</ul>
								</>
							)}
						</div>
					</Modal>
				</div>
			</div>
		</div>
	)
}
