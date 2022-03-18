const { createUserAndSession } = require("../../controllers/authControllers");


const entry = document.createElement('div');
entry.classList.add('entry');
entries.appendChild(entry);

entries?.addEventListener('click', async(e) => {
  if (e.target.TagName === 'BUTTON') {
    const { id } = e.target;
    const response = await fetch('/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify ({
        id,
      }),
    });
   entries.removeChild(e.target.parentNode);
  }
})
