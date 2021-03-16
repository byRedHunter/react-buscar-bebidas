import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const RecetasContext = createContext()

export const RecetasProvider = (props) => {
	const [recetas, guardarRecetas] = useState([])
	const [busqueda, buscarRecetas] = useState({
		nombre: '',
		categoria: '',
	})
	const [buscando, setBuscando] = useState(false)

	useEffect(() => {
		const obtenerRecetas = async () => {
			const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${busqueda.nombre}&c=${busqueda.categoria}`

			const response = await axios.get(url)
			guardarRecetas(response.data.drinks)
			setBuscando(false)
		}
		if (buscando) {
			obtenerRecetas()
		}
	}, [busqueda, buscando])

	return (
		<RecetasContext.Provider
			value={{ buscarRecetas, setBuscando, buscando, recetas }}
		>
			{props.children}
		</RecetasContext.Provider>
	)
}
