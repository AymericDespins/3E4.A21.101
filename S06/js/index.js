const SERVICE_URL = 'https://api.andromia.science/planets/';

$(document).ready(() => {
    getPlanets();
});

async function getPlanets() {
    try {
        const response = await axios.get(SERVICE_URL);
        if(response.status === 200) {
            const planets = response.data;
            planets.forEach(p => {
                $('#planets').append(displayPlanet(p));
            });
        } else {
            console.log(response);
        }

    } catch {
        console.log(err);
    }
}

function displayPlanet(planet) {

    let planetHtml = '<div class="card col-2">';
    planetHtml += `<a href="details.html"><img src="${planet.icon}"/></a>`
    planetHtml += `<h5 clas="nom-planet"><a href="details.html">${planet.name}</a></h5>`;
    planetHtml += '</div>';

    return planetHtml;

}