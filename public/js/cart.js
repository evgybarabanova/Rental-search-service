const cartSvg = document.querySelectorAll('.bi')

console.log(cartSvg);


cartSvg.forEach((e)=> {
  e.addEventListener('click',async (event)=>{
    if(event.target) {
      
      console.log("🚀 ~ file: cart.js ~ line 15 ~ e.addEventListener ~ event.target.style.fill", event.target.style.fill)
      const id = event.target.id
      console.log(id);
      const response = await fetch('/add', {
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({id}),
      })
      if (response.status === 200) {
        
        if(event.target.style.fill === 'black' || event.target.style.fill === ''){
          event.target.style.fill = 'gold'
        } else {
          event.target.style.fill = 'black'
        }
      }
    }
  })
})
