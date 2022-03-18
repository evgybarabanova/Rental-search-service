const cards = document.querySelector('.cards');


cards.addEventListener('click', async (event) => {
	const removeBtn = event.target.id.split('-')
	const card = document.getElementById(`card${removeBtn[1]}`)
	if (removeBtn[0] === 'remove') {
		const response = await fetch(`/basket/${removeBtn[1]}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ id: removeBtn[1] }),
		});
		if (response.status === 200) {
			cards.removeChild(card)
		} else {
			alert('Что то пощло не так... :(');
		}
	}
})
