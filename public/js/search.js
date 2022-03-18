const { searchForm } = document.forms;

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const type = event.target.type.value
  const rooms = event.target.rooms.value
  const geo = event.target.geo.value

  const response = await fetch(`/entries/search?type=${type}&rooms=${rooms}&geo=${geo}`);

  const { status } = response

  if (status >= 500) {
    alert('server error')
  } else if (status >= 400) {
    alert('client error')
  } else if (status === 200) {
    const results = await response.json()

    //console.log(results)

    const list = document.querySelector('.container-entries')
    list.innerHTML = ''

    results.forEach(result => {
      // const item = document.createElement('li')

      // const title = document.createElement('h3')
      // title.innerText = result.title

      // const description = document.createElement('p')
      // description.innerText = result.body

      // const image = document.createElement('img')
      // image.src = result.img
      // image.style.width = '500px'

      // item.append(title, description, image)

      // list.append(item)

      const item = document.createElement('div')

      item.innerHTML = `<div class="entry-card">
      <div class="c-header">
        <img src="${result.img}" class="card-img-top" alt="...">
      </div>
  
      <div class="card-body">
        <h5 class="card-title">${result.title}</h5>
        <p class="card-text">${result.type}</p>
        <p class="card-text">${result.body}</p>
      </div>
      <div class="c-footer">
        <a href="/entry/${result.id}" class="btn btn-success size-btn">Подробнее</a>
      </div>
    </div>`

      list.append(item)
    })
  }
})
