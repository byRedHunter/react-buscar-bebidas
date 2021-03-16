import React, { useContext } from 'react'
import { RecetasContext } from '../context/RecetasContext'
import { Receta } from './Receta'

export const ListaRecetas = () => {
	const { recetas } = useContext(RecetasContext)

	if (recetas.length === 0) return null

	return (
		<div className='row mb-5'>
			{recetas.map((receta) => (
				<Receta key={receta.idDrink} receta={receta} />
			))}
		</div>
	)
}
