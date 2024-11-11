// Needs to be imported from the database in the future
import { temp_card_data } from "./temp_data.js"

export function load() {
	return {
		card_data: temp_card_data.map((card) => ({
			file: card.file,
			location: card.location,
			title: card.title,
			title_location: card.title_location,
		}))
	};
}