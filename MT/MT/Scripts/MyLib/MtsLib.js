﻿function DoPagination(tableID) {

    var table = document.getElementById(tableID);

    $(table).DataTable({
        language: {
            info: "_TOTAL_ kayıttan _START_ - _END_ kayıt gösteriliyor.",
            infoEmpty: "Gösterilecek hiç kayıt yok.",
            loadingRecords: "Kayıtlar yükleniyor.",
            zeroRecords: "Tablo boş",
            search: "Arama:",
            infoFiltered: "(toplam _MAX_ kayıttan filtrelenenler)",
            buttons: {
                copyTitle: "Panoya kopyalandı.",
                copySuccess: "Panoya %d satır kopyalandı",
                copy: "Kopyala",
                print: "Yazdır",
            },

            paginate: {
                first: "İlk",
                previous: "Önceki",
                next: "Sonraki",
                last: "Son"
            },
        },
        dom: 'Bfrtip',
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        responsive: true
    });
}
function ProductList() {

    var elemenet = document.getElementById("ProductTable");

    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Product/ProductList',
        success: function (data) {
            $.each(data, function () {
                $("#ProductTable").append(
                    "<tr>"
                    + "<td>" + this.ProductName + "</td>"
                    + "<td>  <button class='btn btn-success' data-toggle='modal' data-target='#Edit' onclick='EditProduct(" + this.Id + ")'>Düzenle</button> <button class='btn btn-danger' onclick='DeleteProduct(" + this.Id + ")'>Sil</button></td>"
                    + "</tr>"
                    )
            })
            DoPagination("ProductTable");
        }
    })
}
function CreateProduct() {
    var ProductName = $("#ProductName").val();
    if (ProductName !== "") {
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '/Product/Add',
            data: { ProductName: ProductName },
            success: function (data) {
                alert(ProductName + " Yeni Ürünü Oluşturuldu");
                location.reload();
            },
            error: function (xhr) {
                alert("İşlem Başarısız !")
            }
        })
    }
    else {
        $("input").focus();
    }
}
function EditProduct(Id) {

    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Product/Edit',
        data: { Id: Id },
        success: function (data) {
            $.each(data, function () {
                document.getElementById("tempProductName").value = this.ProductName;
                document.getElementById("Id").value = this.Id;
            })
        }
    })
}
function UpdateProduct() {

    var tempProductName = $("#tempProductName").val();
    var tempId = $("#Id").val();
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: '/Product/Update',
        data: { ProductName: tempProductName, Id: tempId },
        success: function (data) {
            alert("Güncelleme iştemi gerçekleştirildi");
            location.reload();

        },
        error: function (xhr) {
            alert("işlem başarısız");
            location.reload();
        }
    })
}
function DropdownPropductListForModelsPage() {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Product/ProductList',
        success: function (data) {
            $.each(data, function () {
                $("#Products").append(
                    "<option value='" + this.Id + "'>" + this.ProductName + "</option>"
                    )
            })

        }
    })
}
function DeleteProduct(Id) {
    if (confirm("Silmek istediğine eminmisin ?")) {
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '/Product/Delete',
            data: { Id: Id },
            success: function (data) {
                alert("Silme işlemi gerçekleştirildi");
                location.reload();
            },
            error: function (xhr) {
                alert("Silme işlemi gerçekleşmedi");
            }
        })
    }
}


function CreateModel() {
    var ProductId = $("#Products").val();
    var ModelName = $("#ModelName").val();
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/MDL/Add',
        data: { ProductId: ProductId, ModelName: ModelName },
        success: function (data) {
            alert("Model oluşturuldu");
            location.reload();
        },
        error: function (xhr) {
            alert("işlem başarısız");
        }
    })
}
function ModelList() {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/MDL/List',
        success: function (data) {
            $.each(data, function () {
                $("#ModelTable").append(
                    "<tr>"
                        + "<td>" + this.ProductName + "</td>"
                        + "<td>" + this.ModelName + "</td>"
                        + "<td>  <button class='btn btn-success' onclick='EditModel(" + this.Id + ")' data-toggle='modal' data-target='#Edit' >Düzenle</button> <button class='btn btn-danger' onclick='DeleteModel(" + this.Id + ")'>Sil</button></td>"
                    + "</tr>"
                    )
            })
            DoPagination("ModelTable");
        }
    })
}
function EditModel(Id) {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/MDL/Edit',
        data: { Id: Id },
        success: function (data) {
            $.each(data, function () {
                document.getElementById("Products").value = this.ProductId;
                document.getElementById("Id").value = this.Id;
                document.getElementById("tempModelName").value = this.ModelName;
            })
        }
    })
}
function UpdateModel() {
    var Id = $("#Id").val();
    var ModelName = $("#tempModelName").val();
    var ProductId = $("#Products").val();
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/MDL/Update',
        data: { Id: Id, ProductId: ProductId, ModelName: ModelName },
        success: function (data) {
            alert("Güncelleme işlemi gerçekleştirildi"); location.reload();

        },
        error: function (xhr) {
            alert("işlem başarısız");
        }
    })
}
function DeleteModel(Id) {
    if (confirm("Silmek istediğine eminmisin ?")) {
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '/MDL/Delete',
            data: { Id: Id },
            success: function (data) {
                alert("Silme işlemi gerçekleştirildi");
                location.reload();
            },
            error: function (xhr) {
                alert("Silme işlemi gerçekleşmedi");
            }
        })
    }
}

function CreateKartela() {
    var KartelaName = $("#KartelaName").val();
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: '/Catalog/Add',
        data: { KartelaName: KartelaName },
        success: function (data) {
            alert("Kartela Oluşturuldu");
            location.reload();
        },
        error: function (xhr) {
            alert("işlem başarısız");
        }
    })
}
function KartelaList() {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Catalog/List',
        success: function (data) {
            $.each(data, function () {
                $("#KartelaTable").append(
                    "<tr>"
                    + "<td>" + this.KartelaName + "</td>"
                    + "<td>  <button class='btn btn-success'  data-toggle='modal' data-target='#Edit' onclick='EditKartela(" + this.Id + ")'>Düzenle</button> <button class='btn btn-danger' onclick='DeleteKartela(" + this.Id + ")'>Sil</button></td>"
                    + "</tr>"
                    )
            })
            DoPagination("KartelaTable");
        }
    })
}
function EditKartela(Id) {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Catalog/Edit',
        data: { Id: Id },
        success: function (data) {
            $.each(data, function () {
                document.getElementById("Id").value = this.Id;
                document.getElementById("kartela").value = this.KartelaName;
            })
        }
    })
}
function UpdateKartela() {
    var kartela = $("#kartela").val();
    var Id = $("#Id").val();
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: '/Catalog/Update',
        data: { KartelaName: kartela, Id: Id },
        success: function (data) {
            alert("Güncelleme işlemi gerçekleştirildi"); location.reload();
        },
        error: function (xhr) {
            alert("işlem başarısız");
        }
    })
}
function DeleteKartela(Id) {
    if (confirm("Silmek istediğine eminmisin ?")) {
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '/Catalog/Delete',
            data: { Id: Id },
            success: function (data) {
                alert("Silme işlemi gerçekleştirildi");
                location.reload();
            },
            error: function (xhr) {
                alert("Silme işlemi gerçekleşmedi");
            }
        })
    }
}



function KartelaForDropdownList() {

    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Catalog/List',
        success: function (data) {
            $.each(data, function () {
                $("#Kartela").append(
                        "<option value='" + this.Id + "'>" + this.KartelaName + "</option>"
                    )
            })

        }
    })
}

function AddKartelaProduct() {
    var KartelaId = $("#Kartela").val();
    var ProductName = $("#ProductName").val();
    var ProductCode = $("#ProductCode").val();
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: '/CatalogProduct/Add',
        data: { KartelaId: KartelaId, ProductCode: ProductCode, ProductName: ProductName },
        success: function (data) {
            alert("Kayıt işlemi başarılı");
        },
        error: function (xhr) {
            alert("işlem başarısız");
        }
    })
}

function KartelaProductList() {
    var elemenet = document.getElementById("KartelaProduct");
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/CatalogProduct/List',
        success: function (data) {
            $.each(data, function () {
                $("#KartelaProduct").append(
                    "<tr>"
                    + "<td>" + this.KartelaName + "</td>"
                    + "<td>" + this.ProductName + "</td>"
                    + "<td>" + this.ProductCode + "</td>"
                    + "<td>  <button class='btn btn-success' data-toggle='modal' data-target='#Edit' onclick='EditKartelaProduct(" + this.Id + ")'>Düzenle</button> <button class='btn btn-danger' onclick='DeleteKartelaProduct(" + this.Id + ")'>Sil</button></td>"
                    + "</tr>"
                    )
            })
            DoPagination("KartelaProduct");
        }
    })
}


function EditKartelaProduct(Id) {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/CatalogProduct/Edit',
        data: { Id: Id },
        success: function (data) {
            $.each(data, function () {
                document.getElementById("Kartela").value = this.KartelaId;
                document.getElementById("ProductName").value = this.ProductName;
                document.getElementById("ProductCode").value = this.ProductCode;
                document.getElementById("Id").value = this.Id;
            })
        }
    })
}
function UpdateKartelaProduct() {
    var KartelaId = $("#Kartela").val();
    var ProductName = $("#ProductName").val();
    var ProductCode = $("#ProductCode").val();
    var Id = $("#Id").val();
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: '/CatalogProduct/Update',
        data: { Id: Id, KartelaId: KartelaId, ProductName: ProductName, ProductCode: ProductCode },
        success: function (data) {
            alert("Güncelleme işlemi gerçekleştirildi."); location.reload();
        },
        error: function (xhr) {
            alert("Güncelleme işlemi başarısız");
        }

    })
}
function DeleteKartelaProduct(Id) {
    if (confirm("Silmek istediğinize eminmisiniz")) {
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '/CatalogProduct/Delete',
            data: { Id: Id },
            success: function (data) {
                alert("Silme işlemi gerçekleştirildi.")
                location.reload();
            },
            error: function (xhr) {
                alert("işlem başarısız !! ");
            }
        })
    }
}


function AddUser() {
    var NameSurname = $("#NameSurname").val();
    var Email = $("#Email").val();
    var Password = $("#Password").val();
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: '/User/AddUser',
        data: { NameSurname: NameSurname, Email: Email, Password: Password },
        success: function (data) {
            alert("Yeni Kullanıcı Oluşturuldu");
            location.reload();
        },
        error: function (xhr) {
            alert("işlem başarısız !!");
        }
    })
}



function GetUsers() {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/User/UserList',
        success: function (data) {
            $.each(data, function () {
                $("#UserTable").append(
                    "<tr>"
                        + "<td>" + this.NameSurname + "</td>"
                        + "<td>" + this.Email + "</td>"
                        + "<td><button type='button' class='btn btn-sm btn-primary' data-toggle='modal' data-target='#Edit' onclick='EditUser(" + this.Id + ")'>Düzenle</button> <button type='button' class='btn btn-sm btn-danger' onclick='DeleteUser(" + this.Id + ")'>Sil</button></td>"
                    + "</tr>"
                )
            })
            DoPagination("UserTable");

        }
    })
}

function EditUser(Id) {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/User/EditUser',
        data: { Id: Id },
        success: function (data) {
            $.each(data, function () {
                document.getElementById("NameSurname").value = this.NameSurname;
                document.getElementById("Email").value = this.Email;
                document.getElementById("Password").value = this.Password;
                document.getElementById("Id").value = this.Id;
            })
        }
    })
}

function UpdateUser() {
    var NameSurname = $("#NameSurname").val();
    var Email = $("#Email").val();
    var Password = $("#Password").val();
    var Id = $("#Id").val();
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: '/User/UpdateUser',
        data: { Id: Id, NameSurname: NameSurname, Email: Email, Password: Password },
        success: function (data) {
            alert("Güncelleme işlemi gerçekleştirildi."); location.reload();
        },
        error: function (xhr) {
            alert("Güncelleme işlemi başarısız");
        }

    })
}

function DeleteUser(Id) {
    if (confirm("Silmek istediğinize eminmisiniz")) {
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '/User/DeleteUser',
            data: { Id: Id },
            success: function (data) {
                alert("Silme işlemi gerçekleştirildi.")
                location.reload();
            },
            error: function (xhr) {
                alert("işlem başarısız !! ");
            }
        })
    }
}


function AddCustomerForOrderPage() {
    var NameSurname = $("#CustomerNameSurname").val();
    var Phone1 = $("#Phone1").val();
    var Phone2 = $("#Phone2").val();
    var Adress = $("#Adress").val();
    var Email = $("#Email").val();
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: '/Order/AddCustomer',
        data: { NameSurname: NameSurname, Phone1: Phone1, Phone2: Phone2, Adress: Adress, Email: Email },
        success: function (data) {

            alert("Yeni Müşteri Oluşturuldu");

            location.reload();
        },
        error: function (xhr) {
            alert("İşlem Başarısız");
        }
    })

}
function GetCustomerForOrderPageSelectList() {

    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Order/CustomerList',
        success: function (data) {
            debugger
            $("#SelectCustomer").html("");
            $("#SelectCustomer").append("<option value='0' disabled selected> Müşteri Seçiniz</option>");
            $.each(data, function () {
                $("#SelectCustomer").append(
                    "<option value='" + this.Id + "'>" + this.NameSurname + " </option>"
                    )
            })
        }
    })
}


function ProductListForOrderPageSelectList() {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Order/ProductList',
        success: function (data) {
            $("#Product").append("<option value='0' selected disabled>Ürün Seçiniz</option>");
            $.each(data, function () {
                $("#Product").append("<option value='" + this.Id + "'>" + this.ProductName + "</option>");
            })
        }
    })
}

function GetProductModelForOrderPageSelectList() {
    var ProductId = $("#Product").val();
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Order/ProdocutForModel',
        data: { ProductId: ProductId },
        success: function (data) {
            $("#Model").html("");
            $("#Model").append("<option value='0' selected disabled>Model Seçiniz</option>");
            $.each(data, function () {
                $("#Model").append("<option value='" + this.Id + "'>" + this.ModelName + "</option>");
            })
        }
    })
}


function GetKartelaForOrderPageSelectList() {

    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Order/KartelaList',
        success: function (data) {
            $.each(data, function () {
                $("#Kartela").append("<option value='0'  selected disabled> Kartela Seçiniz</option>");
                $("#Kartela").append(
                        "<option value='" + this.Id + "'>" + this.KartelaName + "</option>"
                    )
            })

        }
    })
}

function GetKartelaModelForOrderPageSelectList() {
    var KartelaId = $("#Kartela").val();
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Order/KartelaForProduct',
        data: { KartelaId: KartelaId },
        success: function (data) {
            $("#KartelaProduct").html("");
            $("#KartelaProduct").append("<option value='0' selected disabled>Kartela Modeli Seçiniz</option>");
            $.each(data, function () {
                $("#KartelaProduct").append("<option value='" + this.Id + "'>" + this.ProductName + "</option>");
            })
        }
    })
}