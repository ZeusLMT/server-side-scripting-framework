const indicator = document.querySelector('#indicator');
const slideshow = document.querySelector('#slideshow');
const imageDisplayDiv = document.querySelector('#imageDisplay');


window.onload = () => {
  if (data.length !== 0) {
    let indicatorCounter = 0;
    let indicatorHtml = '';
    let slideshowHtml = '';

    data.forEach((image) => {
      const title = image.title;
      const category = image.category;
      const details = image.details;
      const filename = image.filename;

      if (indicatorCounter === 0) {
        indicatorHtml += `
        <li data-target="#imageDisplay" data-slide-to="${indicatorCounter}" class="active"></li>
        `;

        slideshowHtml += `
          <div class="carousel-item active">
                <img src="./uploads/${filename}.png" alt="${title}" style="width: 100%; height: 100%">
                <div class="carousel-caption" style="background-color: rgba(52, 58, 64, 0.5)">
                    <h3>${title}</h3>
                    <p>${details}</p>
                </div>
            </div>
          `;
      } else {
        indicatorHtml += `
        <li data-target="#imageDisplay" data-slide-to="${indicatorCounter}"></li>
        `;

        slideshowHtml += `
          <div class="carousel-item">
                <img src="./uploads/${filename}.png" alt="${title}" style="width: 100%; height: 100%">
                <div class="carousel-caption" style="background-color: rgba(52, 58, 64, 0.5)">
                    <h3>${title}</h3>
                    <p>${details}</p>
                </div>
            </div>
          `;
      }
      indicatorCounter += 1;
    });

    //Update HTML
    indicator.innerHTML = indicatorHtml;
    slideshow.innerHTML = slideshowHtml;
  } else {
    //Hide carousel
    imageDisplayDiv.innerHTML = '<p id="noImage">Sorry, no image available yet.</p>';
  }
};