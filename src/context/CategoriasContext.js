import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

// crear el context
export const CategoriasContext = createContext()

// provides, donde se encuentras las funciones y el state
export const CategoriasProvider = (props) => {
	// crear el state del context
	const [categorias, setCategorias] = useState([])

	// ejecutar el llamado a la api
	useEffect(() => {
		const obtenerCategorias = async () => {
			const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
			const categorias = await axios.get(url)
			setCategorias(categorias.data.drinks)
		}
		obtenerCategorias()
	}, [])

	return (
		<CategoriasContext.Provider value={{ categorias }}>
			{props.children}
		</CategoriasContext.Provider>
	)
}
