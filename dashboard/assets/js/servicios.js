// === FUNCIONALIDAD PARA AGREGAR, EDITAR, ELIMINAR Y MOSTRAR SERVICIOS ===

$(document).ready(function () {
    // === LISTAR SERVICIOS ===
    if (document.getElementById('tablaServicios')) {
      const servicios = JSON.parse(sessionStorage.getItem('servicios')) || [];
  
      servicios.forEach((s, index) => {
        $('#tablaServicios tbody').append(`
          <tr data-index="${index}">
            <td><img src="${s.imagen}" alt=""></td>
            <td>${s.nombre}</td>
            <td>${s.precio}</td>
            <td>${s.duracion} min</td>
            <td>
              <i class='bx bx-edit-alt editar-servicio' style="cursor:pointer"></i>
              <i class='bx bx-trash eliminar-servicio' style="cursor:pointer"></i>
            </td>
          </tr>
        `);
      });
  
      $('#tablaServicios').DataTable({
        pageLength: 5,
        lengthMenu: [5, 10, 25, 50],
        language: {
          url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json'
        }
      });
  
      // Eliminar servicio
      $(document).on('click', '.eliminar-servicio', function () {
        const index = $(this).closest('tr').data('index');
        let servicios = JSON.parse(sessionStorage.getItem('servicios')) || [];
        servicios.splice(index, 1);
        sessionStorage.setItem('servicios', JSON.stringify(servicios));
        location.reload();
      });
  
      // Editar servicio
      $(document).on('click', '.editar-servicio', function () {
        const index = $(this).closest('tr').data('index');
        sessionStorage.setItem('servicioEditar', index);
        window.location.href = 'editarservicios.html';
      });
    }
  
    // === AGREGAR SERVICIO ===
    if (document.getElementById('formServicio') && window.location.pathname.includes('agregarservicios.html')) {
      document.getElementById('imagen').addEventListener('change', function (e) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const img = document.getElementById('preview');
          img.src = event.target.result;
          img.style.display = 'block';
        };
        reader.readAsDataURL(e.target.files[0]);
      });
  
      document.getElementById('formServicio').addEventListener('submit', function (e) {
        e.preventDefault();
  
        const reader = new FileReader();
        const file = document.getElementById('imagen').files[0];
  
        reader.onloadend = function () {
          const nuevoServicio = {
            imagen: reader.result,
            nombre: document.getElementById('nombre').value,
            precio: document.getElementById('precio').value,
            duracion: document.getElementById('duracion').value
          };
  
          const servicios = JSON.parse(sessionStorage.getItem('servicios')) || [];
          servicios.push(nuevoServicio);
          sessionStorage.setItem('servicios', JSON.stringify(servicios));
  
          alert('Servicio registrado exitosamente');
          window.location.href = 'listarservicios.html';
        };
  
        if (file) {
          reader.readAsDataURL(file);
        }
      });
    }
  
    // === EDITAR SERVICIO ===
    if (document.getElementById('formServicio') && window.location.pathname.includes('editarservicios.html')) {
      const index = sessionStorage.getItem('servicioEditar');
      const servicios = JSON.parse(sessionStorage.getItem('servicios')) || [];
      const servicio = servicios[index];
  
      if (servicio) {
        document.getElementById('nombre').value = servicio.nombre;
        document.getElementById('precio').value = servicio.precio;
        document.getElementById('duracion').value = servicio.duracion;
  
        const preview = document.getElementById('preview');
        if (preview) {
          preview.src = servicio.imagen;
          preview.style.display = 'block';
        }
      }
  
      document.getElementById('formServicio').addEventListener('submit', function (e) {
        e.preventDefault();
  
        const reader = new FileReader();
        const file = document.getElementById('imagen').files[0];
  
        function actualizarServicio(imgData) {
          servicios[index] = {
            imagen: imgData || servicio.imagen,
            nombre: document.getElementById('nombre').value,
            precio: document.getElementById('precio').value,
            duracion: document.getElementById('duracion').value
          };
          sessionStorage.setItem('servicios', JSON.stringify(servicios));
          alert('Servicio actualizado');
          window.location.href = 'listarservicios.html';
        }
  
        if (file) {
          reader.onloadend = function () {
            actualizarServicio(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          actualizarServicio(null);
        }
      });
    }
  });
  