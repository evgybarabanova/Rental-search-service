const { signupForm } = document.forms;
console.log(signupForm);

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const dataObj = {
    name: event.target.name.value,
    email: event.target.email.value,
    password: event.target.password.value,
  };
  console.log("🚀 ~ file: signup.js ~ line 11 ~ signupForm.addEventListener ~ dataObj", dataObj)

  const response = await fetch('/signup', {
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
