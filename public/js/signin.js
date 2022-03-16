const { signinForm } = document.forms;


signinForm.addEventListener('submit', async (event) => {
	event.preventDefault();

	const dataObj = {
		email: event.target.email.value,
		password: event.target.password.value,
	};

	const response = await fetch('/signin', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dataObj),
	});

	if (response.status === 500) {
		alert('Что то пошло не так :( Мы уже знаем об ошибке. Попробуйте позже...');
	}
	window.location.assign('/');
});
