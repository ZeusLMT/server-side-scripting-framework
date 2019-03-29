const imageDisplayDiv = document.querySelector('#imageDisplay');


window.onload = () => {
  if (category) {
    const currentCategory = document.querySelector(`#option-category-${category}`);
    const defaultCategory = document.querySelector(`#option-category-all`);
    currentCategory.setAttribute('selected', 'true');
  }

  if (data.length !== 0) {
    let imageDisplayHtml = '';

    data.forEach((image) => {
      const title = image.title;
      const category = image.category;
      const details = image.details;
      const filename = image.filename;

      imageDisplayHtml += `
        <div class="col-12 col-sm-6 col-lg-4" style="margin-top: 15px; margin-bottom: 15px">
            <div class="card text-center bg-light" style="display: block">
                <img class="card-img-top" src="./uploads/${filename}_medium.png" alt="${title}" style="width:100%; min-height: 30vh; height: 15vw; object-fit: cover;">
                <div class="card-body">
                    <h4 class="card-title">${title}</h4>
                    <p class="card-text">${details}</p>
                    <a href="#" class="btn btn-info">Edit info</a>
                    <a href="#" class="btn btn-outline-danger">Delete</a>
                </div>
            </div>
        </div>
      `;
    });

    //Update HTML
    imageDisplayDiv.innerHTML = imageDisplayHtml;
  } else {
    //Show empty alert
    imageDisplayDiv.innerHTML = '<p id="noImage">Sorry, no image available yet.</p>';
  }
};