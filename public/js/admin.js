$(document).ready(function () {

    $(".state").click(function () {
        var state = $(this).children(".material-icons").attr("onair");
        var _id = $(this).children(".material-icons").attr("valid");
        swal({
            title: 'Cambio de estado',
            text: "Seguro que desea cambiar el estado de la persona?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0275d8',
            cancelButtonColor: '#FF1717',
            confirmButtonText: 'confirmar',
            cancelButtonText: 'cancelar'
        }).then(function () {
            $.ajax({
                url: '/admin/action',
                type: 'PUT',
                data: JSON.stringify({ state: state, id: _id }),
                contentType: "application/json",
                dataType: 'json'
            }).done(function (data) {
                switch (data.cod) {
                    case 0:
                        swal(
                            'Inválido',
                            'Se procesan datos no válidos',
                            'warning'
                        )
                        break;
                    case 1:
                        swal(
                            'Correcto',
                            'El usuario a cambiado de estado',
                            'success'
                        ).then(function () {
                            window.location = "/admin/usuarios";
                        })
                        break;
                    default:
                        window.location = "/err";
                }
            });
        })
    });

    $(".delete").click(function(){
        var _id = $(this).children(".material-icons").attr("valid"); 
    });

});

$(document).ajaxError(function () {
    window.location = "/err";
});