const url = "https://countries.plaul.dk/api/countries/";

document.getElementById("svg2").onclick = getCountryDetails;

let selectedElement;
let originalFill;

function getCountryDetails(evt) {
  const target = evt.target;
  const isoId = target.id;

  if (isoId < 3) {
    return;
  }

  fetch(url + isoId)
    .then((res) => res.json())
    .then((data) => {
       // Reset the fill color of the previously selected SVG element
       if (selectedElement) {
        selectedElement.style.fill = originalFill;
      }
      originalFill = target.style.fill;
      // Set the fill color of the clicked SVG element
      target.style.fill = "red";
      selectedElement = target; // Update the selected element
      document.getElementById("country-info").style.display = "block";
      document.getElementById("flag").src = data.flag;
      document.getElementById("country-name").innerText = data.name.common;
      document.getElementById("country-member-un").innerText = data.unMember;
      let currency = "";
      for (prop in data.currencies) {
        currency += `${prop} - ${data.currencies[prop].name} - ${data.currencies[prop].symbol}`
      }

      document.getElementById("country-currency").innerText = currency;
      document.getElementById("country-capital").innerText = data.capital;
      document.getElementById("country-borders").innerText = data.borders.join(", ");
    })
}
