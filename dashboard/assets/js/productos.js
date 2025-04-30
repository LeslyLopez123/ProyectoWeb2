// === FUNCIONALIDAD GENERAL PARA AGREGAR, EDITAR Y MOSTRAR PRODUCTOS ===

$(document).ready(function () {
  // === LISTAR PRODUCTOS ===
  if (document.getElementById('tablaProductos')) {
    const productosGuardados = JSON.parse(sessionStorage.getItem('productos')) || [];

    productosGuardados.forEach((p, index) => {
      const estadoBadge = p.estado === 'Activo'
        ? '<span class="badge bg-success">Activo</span>'
        : '<span class="badge bg-danger">Inactivo</span>';

      $('#tablaProductos tbody').append(`
        <tr data-index="${index}">
          <td><img src="${p.imagen}" alt=""></td>
          <td>${p.producto}</td>
          <td>${p.categoria}</td>
          <td>${p.precio}</td>
          <td>${p.cantidad}</td>
          <td>${estadoBadge}</td>
          <td>
            <i class='bx bx-edit-alt editar-producto' style="cursor:pointer"></i>
            <i class='bx bx-trash eliminar-producto' style="cursor:pointer"></i>
          </td>
        </tr>
      `);
    });

    $('#tablaProductos').DataTable({
      pageLength: 5,
      lengthMenu: [5, 10, 25, 50],
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json'
      }
    });

    // Eliminar producto
    $(document).on('click', '.eliminar-producto', function () {
      const index = $(this).closest('tr').data('index');
      let productos = JSON.parse(sessionStorage.getItem('productos')) || [];
      productos.splice(index, 1);
      sessionStorage.setItem('productos', JSON.stringify(productos));
      location.reload();
    });

    // Editar producto
    $(document).on('click', '.editar-producto', function () {
      const index = $(this).closest('tr').data('index');
      sessionStorage.setItem('productoEditar', index);
      window.location.href = 'editarproductos.html';
    });
  }

  // === AGREGAR PRODUCTO ===
  if (document.getElementById('formProducto') && window.location.pathname.includes('agregarproductos.html')) {
    document.getElementById('imagen').addEventListener('change', function (e) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = document.getElementById('preview');
        img.src = event.target.result;
        img.style.display = 'block';
      };
      reader.readAsDataURL(e.target.files[0]);
    });

    document.getElementById('formProducto').addEventListener('submit', function (e) {
      e.preventDefault();

      const reader = new FileReader();
      const file = document.getElementById('imagen').files[0];

      reader.onloadend = function () {
        const nuevoProducto = {
          imagen: reader.result,
          producto: document.getElementById('producto').value,
          categoria: document.getElementById('categoria').value,
          precio: document.getElementById('precio').value,
          cantidad: document.getElementById('cantidad').value,
          estado: document.getElementById('estado').value
        };

        const productos = JSON.parse(sessionStorage.getItem('productos')) || [];
        productos.push(nuevoProducto);
        sessionStorage.setItem('productos', JSON.stringify(productos));

        alert('Producto registrado exitosamente');
        window.location.href = 'listarproductos.html';
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    });
  }

  // === EDITAR PRODUCTO ===
  if (document.getElementById('formProducto') && window.location.pathname.includes('editarproductos.html')) {
    const index = sessionStorage.getItem('productoEditar');
    const productos = JSON.parse(sessionStorage.getItem('productos')) || [];
    const producto = productos[index];

    if (producto) {
      document.getElementById('producto').value = producto.producto;
      document.getElementById('categoria').value = producto.categoria;
      document.getElementById('precio').value = producto.precio;
      document.getElementById('cantidad').value = producto.cantidad;
      document.getElementById('estado').value = producto.estado;

      const preview = document.getElementById('preview');
      if (preview) {
        preview.src = producto.imagen;
        preview.style.display = 'block';
      }
    }

    document.getElementById('formProducto').addEventListener('submit', function (e) {
      e.preventDefault();

      const reader = new FileReader();
      const file = document.getElementById('imagen').files[0];

      function actualizarProducto(imgData) {
        productos[index] = {
          imagen: imgData || producto.imagen,
          producto: document.getElementById('producto').value,
          categoria: document.getElementById('categoria').value,
          precio: document.getElementById('precio').value,
          cantidad: document.getElementById('cantidad').value,
          estado: document.getElementById('estado').value
        };
        sessionStorage.setItem('productos', JSON.stringify(productos));
        alert('Producto actualizado');
        window.location.href = 'listarproductos.html';
      }

      if (file) {
        reader.onloadend = function () {
          actualizarProducto(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        actualizarProducto(null);
      }
    });
  }
  
});
