// ======================================
// ÍCONE PERSONALIZADO
// ======================================

const reciclagemIcon = L.icon({

    iconUrl:
    "https://cdn-icons-png.flaticon.com/512/565/565491.png",

    iconSize:[40,40],

    iconAnchor:[20,40],

    popupAnchor:[0,-40]

});

// ======================================
// MAPA
// ======================================

const map = L.map('map').setView(
    [-12.9718, -38.5011],
    12
);

L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
        attribution: '&copy; OpenStreetMap'
    }
).addTo(map);

// ======================================
// PONTOS DE COLETA
// ======================================

const pontos = [

    {
        nome: "Ecoponto Itaigara",
        lat: -12.999,
        lng: -38.460,
        tipo: "Papel, plástico, vidro e metal"
    },

    {
        nome: "UFBA Coleta Seletiva",
        lat: -13.001,
        lng: -38.507,
        tipo: "Recicláveis"
    },

    {
        nome: "Rio Vermelho",
        lat: -13.013,
        lng: -38.488,
        tipo: "Todos os materiais"
    }

];

// ======================================
// ADICIONA MARCADORES
// ======================================

pontos.forEach((ponto) => {

    L.marker(
        [ponto.lat, ponto.lng],
        {
            icon: reciclagemIcon
        }
    )
    .addTo(map)
    .bindPopup(`
        <b>${ponto.nome}</b><br>
        ${ponto.tipo}
    `);

});

// ======================================
// GEOLOCALIZAÇÃO DO USUÁRIO
// ======================================

if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(

        (position) => {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            L.marker([lat, lng])
                .addTo(map)
                .bindPopup("📍 Você está aqui")
                .openPopup();

            map.setView([lat, lng], 14);

        },

        () => {
            console.log("Localização não permitida.");
        }

    );

}

if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(

        (position) => {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            const userIcon = L.icon({
                iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                iconSize: [35,35],
                iconAnchor: [17,35]
            });

            L.marker(
                [lat,lng],
                {
                    icon:userIcon
                }
            )
            .addTo(map)
            .bindPopup("📍 Sua localização")
            .openPopup();

            map.setView([lat,lng],14);

        },

        () => {
            alert("Não foi possível acessar sua localização.");
        }

    );

}

const form = document.getElementById("suggestForm");

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    alert(
        "Obrigado! Sua sugestão foi registrada."
    );

    form.reset();

});

const darkBtn =
document.getElementById("darkModeBtn");

darkBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark-mode");

    const icon =
    darkBtn.querySelector("i");

    if(document.body.classList.contains("dark-mode")){

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    }else{

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

    }

});