function DoPagination(tableID) {

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
function ProductListForOrderPageSelectList2() {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Order/ProductList',
        success: function (data) {
            $("#Product2").append("<option value='0' selected disabled> 2.Ürün Seçiniz</option>");
            $.each(data, function () {
                $("#Product2").append("<option value='" + this.Id + "'>" + this.ProductName + "</option>");
            })
        }
    })
}
function ProductListForOrderPageSelectList3() {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Order/ProductList',
        success: function (data) {
            $("#Product3").append("<option value='0' selected disabled> 3.Ürün Seçiniz</option>");
            $.each(data, function () {
                $("#Product3").append("<option value='" + this.Id + "'>" + this.ProductName + "</option>");
            })
        }
    })
}
function ProductListForOrderPageSelectList4() {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Order/ProductList',
        success: function (data) {
            $("#Product4").append("<option value='0' selected disabled> 4.Ürün Seçiniz</option>");
            $.each(data, function () {
                $("#Product4").append("<option value='" + this.Id + "'>" + this.ProductName + "</option>");
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
function GetProductModelForOrderPageSelectList2() {
    var ProductId = $("#Product2").val();
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Order/ProdocutForModel',
        data: { ProductId: ProductId },
        success: function (data) {
            $("#Model2").html("");
            $("#Model2").append("<option value='0' selected disabled>2. Model Seçiniz</option>");
            $.each(data, function () {
                $("#Model2").append("<option value='" + this.Id + "'>" + this.ModelName + "</option>");
            })
        }
    })
}
function GetProductModelForOrderPageSelectList3() {
    var ProductId = $("#Product3").val();
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Order/ProdocutForModel',
        data: { ProductId: ProductId },
        success: function (data) {
            $("#Model3").html("");
            $("#Model3").append("<option value='0' selected disabled>3. Model Seçiniz</option>");
            $.each(data, function () {
                $("#Model3").append("<option value='" + this.Id + "'>" + this.ModelName + "</option>");
            })
        }
    })
}
function GetProductModelForOrderPageSelectList4() {
    var ProductId = $("#Product4").val();
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Order/ProdocutForModel',
        data: { ProductId: ProductId },
        success: function (data) {
            $("#Model4").html("");
            $("#Model4").append("<option value='0' selected disabled>3. Model Seçiniz</option>");
            $.each(data, function () {
                $("#Model4").append("<option value='" + this.Id + "'>" + this.ModelName + "</option>");
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
function GetKartelaForOrderPageSelectList2() {

    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Order/KartelaList',
        success: function (data) {
            $.each(data, function () {
                $("#Kartela2").append("<option value='0'  selected disabled>2. Kartela Seçiniz</option>");
                $("#Kartela2").append(
                        "<option value='" + this.Id + "'>" + this.KartelaName + "</option>"
                    )
            })

        }
    })
}
function GetKartelaForOrderPageSelectList3() {

    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Order/KartelaList',
        success: function (data) {
            $.each(data, function () {
                $("#Kartela3").append("<option value='0'  selected disabled>3. Kartela Seçiniz</option>");
                $("#Kartela3").append(
                        "<option value='" + this.Id + "'>" + this.KartelaName + "</option>"
                    )
            })

        }
    })
}
function GetKartelaForOrderPageSelectList4() {

    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Order/KartelaList',
        success: function (data) {
            $.each(data, function () {
                $("#Kartela4").append("<option value='0'  selected disabled>4. Kartela Seçiniz</option>");
                $("#Kartela4").append(
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
function GetKartelaModelForOrderPageSelectList1() {
    var KartelaId = $("#Kartela1").val();
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Order/KartelaForProduct',
        data: { KartelaId: KartelaId },
        success: function (data) {
            $("#KartelaProduct1").html("");
            $("#KartelaProduct1").append("<option value='0' selected disabled>Kartela Modeli Seçiniz</option>");
            $.each(data, function () {
                $("#KartelaProduct1").append("<option value='" + this.Id + "'>" + this.ProductName + "</option>");
            })
        }
    })
}
function GetKartelaModelForOrderPageSelectList2() {
    var KartelaId = $("#Kartela2").val();
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Order/KartelaForProduct',
        data: { KartelaId: KartelaId },
        success: function (data) {
            $("#KartelaProduct2").html("");
            $("#KartelaProduct2").append("<option value='0' selected disabled>Kartela Modeli Seçiniz</option>");
            $.each(data, function () {
                $("#KartelaProduct2").append("<option value='" + this.Id + "'>" + this.ProductName + "</option>");
            })
        }
    })
}
function GetKartelaModelForOrderPageSelectList3() {
    var KartelaId = $("#Kartela3").val();
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Order/KartelaForProduct',
        data: { KartelaId: KartelaId },
        success: function (data) {
            $("#KartelaProduct3").html("");
            $("#KartelaProduct3").append("<option value='0' selected disabled>Kartela Modeli Seçiniz</option>");
            $.each(data, function () {
                $("#KartelaProduct3").append("<option value='" + this.Id + "'>" + this.ProductName + "</option>");
            })
        }
    })
}
function GetKartelaModelForOrderPageSelectList4() {
    var KartelaId = $("#Kartela4").val();
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Order/KartelaForProduct',
        data: { KartelaId: KartelaId },
        success: function (data) {
            $("#KartelaProduct4").html("");
            $("#KartelaProduct4").append("<option value='0' selected disabled>Kartela Modeli Seçiniz</option>");
            $.each(data, function () {
                $("#KartelaProduct4").append("<option value='" + this.Id + "'>" + this.ProductName + "</option>");
            })
        }
    })
}

function CreateOrder() {

    var CustomerId = $("#SelectCustomer").val();
    var StartDate = $("#OrderDate").val();
    var FinishDate = $("#LastOrderDate").val();


    var ProductId = $("#Product").val();
    var ModelId = $("#Model").val();
    var KartelaId = $("#Kartela").val();
    var KartelaModelId = $("#KartelaProduct").val();
    var Cila = $("#Cila").val();
    var Description = $("#Description").val();

    var ProductId2 = $("#Product2").val();
    var ModelId2 = $("#Model2").val();
    var KartelaId2 = $("#Kartela2").val();
    var KartelaModelId2 = $("#KartelaProduct2").val();
    var Cila2 = $("#Cila2").val();
    var Description2 = $("#Description2").val();


    var ProductId3 = $("#Product3").val();
    var ModelId3 = $("#Model3").val();
    var KartelaId3 = $("#Kartela3").val();
    var KartelaModelId3 = $("#KartelaProduct3").val();
    var Cila3 = $("#Cila3").val();
    var Description3 = $("#Description3").val();


    var ProductId4 = $("#Product4").val();
    var ModelId4 = $("#Model4").val();
    var KartelaId4 = $("#Kartela4").val();
    var KartelaModelId4 = $("#KartelaProduct4").val();
    var Cila4 = $("#Cila4").val();
    var Description4 = $("#Description4").val();

    var TotalPrice = $("#Price").val();
    var KaporaPrice = $("#Kapora").val();


    var KaporaType;
    if ($("#KaporaNakit").is(":checked")) {
        KaporaType = $("#KaporaNakit").val();
    }
    if ($("#KaporaKredi").is(":checked")) {
        KaporaType += " " + $("#KaporaKredi").val();
    }

    var PaymentType;
    if ($("#PaymentNakit").is(":checked")) {
        PaymentType = $("#PaymentNakit").val();
    }
    if ($("#PaymentKredi").is(":checked")) {
        PaymentType += " " + $("#PaymentKredi").val();
    }

    if ($("#PaymentSenet").is(":checked")) {
        PaymentType += " " + $("#PaymentSenet").val();
    }

    if ($("#PaymentCek").is(":checked")) {
        PaymentType += " " + $("#PaymentCek").val();
    }


    $.ajax({
        type: 'post',
        dataType: 'json',
        url: '/Order/orderAdd',
        data: {
            StartDate: StartDate, FinishDate: FinishDate, ProductId: ProductId, ModelId: ModelId, KartelaId: KartelaId,
            KartelaModelId: KartelaModelId, Cila: Cila, Description: Description,

            ProductId2: ProductId2, ModelId2: ModelId2, KartelaId2: KartelaId2,
            KartelaModelId2: KartelaModelId2, Cila2: Cila2, Description2: Description2,

            ProductId3: ProductId3, ModelId3: ModelId3, KartelaId3: KartelaId3,
            KartelaModelId3: KartelaModelId3, Cila3: Cila3, Description3: Description3,

            ProductId4: ProductId4, ModelId4: ModelId4, KartelaId4: KartelaId4,
            KartelaModelId4: KartelaModelId4, Cila4: Cila4, Description4: Description4,

            TotalPrice: TotalPrice, KaporaPrice: KaporaPrice, CustomerId: CustomerId,

            PaymentType: PaymentType, KaporaType: KaporaType
        },
        success: function (data) {
            alert("Sipariş Oluşturuldu"); location.reload();
        },
        error: function (xhr) {
            alert("işlem başarısız !!");
        }
    })
}


function FirstLoginPageOrderList() {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Order/FirstLoginOrderList',
        success: function (data) {
            $.each(data, function () {
                $("#OrderTable").append(
                    "<tr>"
                    + "<td>" + this.NameSurname + "</td>"
                    + "<td>" + this.Phone1 + "</td>"
                    + "<td>" + this.StartDate + "</td>"
                    + "<td>" + this.FinishDate + "</td>"
                    + "<td>" + this.KaporaPrice + "</td>"
                    + "<td>" + this.TotalPrice + "</td>"
                    + "<td><button class='btn btn-primary' data-toggle='modal' data-target='#PageDetail' onClick='OrderDetail(" + this.Id + ")'>Detay</button> <button class='btn btn-success'>Düzenle</button> <button class='btn btn-danger'>Sil</button></td>"
                    + "</tr>"
                   )
            })

            DoPagination("OrderTable");
        }
    })
}


function OrderDetail(Id) {
    $.ajax({
        type: 'get',
        dataType: 'json',
        url: '/Order/OrderDetail',
        data: { Id: Id },
        success: function (data) {
            $.each(data, function () {
                $("#CustomerName").text(this.NameSurname),
                $("#NameSurname").text(this.NameSurname),
                $("#Phone1").text(this.Phone1),
                 $("#Phone2").text(this.Phone2),
                $("#Urun1").text(this.ProductName),
                $("#Adress").text(this.Adress),
                $("#Model1").text(this.ModelName),
                $("#Kartela1").text(this.KartelaName),
                $("#KM1").text(this.KartelaProductName),
                $("#Cila1").text(this.Cila),
                $("#Aciklama1").text(this.Description),

                 $("#Urun2").text(this.ProductName2),
                $("#Model2").text(this.ModelName2),
                $("#Kartela2").text(this.KartelaName2),
                $("#KM2").text(this.KartelaProductName2),
                $("#Cila2").text(this.Cila2),
                $("#Aciklama2").text(this.Description2),

                $("#Urun3").text(this.ProductName3),
                $("#Model3").text(this.ModelName3),
                $("#Kartela3").text(this.KartelaName3),
                $("#KM3").text(this.KartelaProductName3),
                $("#Cila3").text(this.Cila3),
                $("#Aciklama3").text(this.Description3),

                $("#Urun4").text(this.ProductName4),
                $("#Model4").text(this.ModelName4),
                $("#Kartela4").text(this.KartelaName4),
                $("#KM4").text(this.KartelaProductName4),
                $("#Cila4").text(this.Cila4),
                $("#Aciklama4").text(this.Description4),
                $("#KapFiyat").text(this.KaporaPrice + " TL - " + this.KaporaType),
                $("#TotalFiyat").text(this.TotalPrice + " TL")
              
                $("#StartDate").text(this.StartDate)
                $("#FinishDate").text(this.FinishDate)
             
                var kalanTutar = this.TotalPrice - this.KaporaPrice;
                $("#TotalKalan").text(kalanTutar + " TL")
                
            })
        }
    })
}

 


function printDiv(divName) {
    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}