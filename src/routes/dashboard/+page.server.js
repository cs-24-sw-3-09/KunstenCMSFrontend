// Needs to be imported from the database in the future
import { temp_card_data } from "./temp_data.js"

export function load() {
	return {
		card_data: temp_card_data.map((card) => ({
			content: card.content,
			location: card.location,
			title: card.title,
			title_location: card.title_location,
			status: card.status,
		}))
	};
}