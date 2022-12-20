const $delete = (element) => document.getElementById(element);

$delete("centrarBotonEliminar").addEventListener("submit", function (e) {

  e.preventDefault();

      Swal.fire({
        title: '¿Estas seguro que deseas eliminar el producto?',
        text: "Si eliminas el producto, no hay vuelta atras",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Eliminado',
            'El producto fue eliminado.',
            'success'
            )
            this.submit()
        }else{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto no eliminado',
            showConfirmButton: false,
            timer: 1500
          }) 
        }
      })

  })