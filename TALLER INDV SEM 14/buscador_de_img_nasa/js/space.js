document.addEventListener("DOMContentLoaded", () => {
    const Buscar = document.getElementById("inputBuscar");
    const btnBuscar = document.getElementById("btnBuscar");
    const contenedor = document.getElementById("contenedor");
  
    const buscarImagenes = async () => {
      const query = Buscar.value.trim();
      if (query === "") {
        alert("Busqueda vacía");
        return;
      }
  
      const url = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        mostrarImagenes(data.collection.items);
      } catch (error) {
        console.error("No se pudo obtener los datos", error);
      }
    };
  
    const mostrarImagenes = (imagenes) => {
      contenedor.innerHTML = "";
  
      if (imagenes.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
      }
      imagenes.forEach((imagen) => {
        const { title, description, date_created } = imagen.data[0];
        const imageUrl = imagen.links ? imagen.links[0].href : "";
  
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("col");  // se agrega la clase col para q se pueda ver en formato GRID
  //se agregan las tarjetas en el html
        tarjeta.innerHTML = `
          <div class="card h-100">
            <img src="${imageUrl}" class="card-img-top" alt="${title}">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${description || "Sin descripción"}</p>
            </div>
            <div class="card-footer">
              <small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small>
            </div>
          </div>
        `;
  
        contenedor.appendChild(tarjeta); // inserta cada tarjeta creada dentro del contenedor en el HTML
      });
    };
  
    btnBuscar.addEventListener("click", buscarImagenes);
  });
  