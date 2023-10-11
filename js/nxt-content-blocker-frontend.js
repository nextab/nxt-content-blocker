document.addEventListener('DOMContentLoaded', function () {
  const agreementButtons = document.querySelectorAll('.agreement-button')

  agreementButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      // Set the cookie as before
      document.cookie =
        'nxt-content-agreement=true; expires=Fri, 31 Dec 9999 23:59:59 GMT'

      // Get the overlay that's parent to the clicked button
      const overlay = button.closest('.agreement-overlay')

      // Assuming you store the actual content as data-content attribute
      const actualContent = overlay.dataset.content

      // Replace the overlay with the actual content
      if (actualContent) {
        overlay.outerHTML = actualContent
      } else {
        overlay.style.display = 'none'
      }
    })
  })
})
