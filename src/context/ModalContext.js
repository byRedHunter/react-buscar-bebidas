import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const ModalContext = createContext()

export const ModalProvider = (props) => {
	const [idReceta, setIdReceta] = useState(null)
	const [data, setReceta] = useState({})

	useEffect(() => {
		const obtenerReceta = async () => {
			if (!idReceta) return

			const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`

			const response = await axios.get(url)
			setReceta(response.data.drinks[0])
		}

		obtenerReceta()
	}, [idReceta])

	return (
		<ModalContext.Provider value={{ setIdReceta, setReceta, data }}>
			{props.children}
		</ModalContext.Provider>
	)
}
