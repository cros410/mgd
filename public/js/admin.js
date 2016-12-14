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
                url: '/admin/usuario',
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

    $("#btnAddUser").click(function () {
        window.location = "/admin/reguser";
    });

    $(".delete").click(function () {
        var _id = $(this).children(".material-icons").attr("valid");
        swal({
            title: 'Eliminar',
            text: "Seguro que desea eliminar al usuario?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0275d8',
            cancelButtonColor: '#FF1717',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then(function () {
            $.ajax({
                url: '/admin/usuario',
                type: 'DELETE',
                data: JSON.stringify({ id: _id }),
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
                            'El usuario fue eliminado',
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

    $("#descarga").click(function () {

        //var _id = $(this).children(".material-icons").attr("valid");
        var _id = 26;
        swal({
            title: 'Descarga de antivirus',
            text: "Instrucciones de descarga",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0275d8',
            cancelButtonColor: '#FF1717',
            confirmButtonText: 'Descargar',
            cancelButtonText: 'Cancelar'
        }).then(function () {
            $.ajax({
                url: '/admin/download',
                type: 'POST',
                data: JSON.stringify({ id: _id }),
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
                        $.fileDownload('/files/Propuesta.docx');
                        swal(
                            'Correcto',
                            'Descarga realizada con éxito',
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

    $("#reporte").click(function () {

        $.ajax({
            url: '/admin/download',
            type: 'GET'
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
                    $.fileDownload('/files/usuarios.xls');
                    swal(
                        'Correcto',
                        'Descarga realizada con éxito',
                        'success'
                    ).then(function () {
                        window.location = "/admin/usuarios";
                    })
                    break;
                default:
                    window.location = "/err";
            }
        });

    });

});

$(document).ajaxError(function () {
    window.location = "/err";
});