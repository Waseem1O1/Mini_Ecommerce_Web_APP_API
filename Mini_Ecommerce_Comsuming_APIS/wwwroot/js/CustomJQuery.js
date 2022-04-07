
$(document).ready(function () {
    $(document).on('click', '.plus', function () {
        var count = $(this).closest(".qty").find(".count");
        var count = $(this).siblings(".count");
        var count = $(this).parent().find(".count");
        $(count).val(parseInt($(count).val()) + 1);
        var qty = $(this).closest('.qty').find('.count');
        var price = $(this).closest('tr').find('[id*=price]');
        var total = $(this).closest('.row').find('[id*=lblsub]');
        var total1 = $(this).closest('.row').find('[id*=lbltotal]');
        $(total).text(parseFloat($(total).text()) + parseFloat($(price).val()));
        $(total1).text(parseFloat($(total1).text()) + parseFloat($(price).val()));
    });

    $(document).on('click', '.minus', function () {
        var count = $(this).closest(".qty").find(".count");
        var count = $(this).siblings(".count");
        var count = $(this).parent().find(".count");
        $(count).val(parseInt($(count).val()) - 1);
        var qty = $(this).closest('.qty').find('.count');
        var price = $(this).closest('tr').find('[id*=price]');
        var total = $(this).closest('.row').find('[id*=lblsub]');
        var total1 = $(this).closest('.row').find('[id*=lbltotal]');
        $(total).text(parseFloat($(total).text()) - parseFloat($(price).val()));
        $(total1).text(parseFloat($(total1).text()) - parseFloat($(price).val()));

    });
});
$(function () {
    $('[id*=btnSend]').on('click', function () {
        var id = $(this).closest('tr').find('td').eq(1).html().trim();
        var linetotal = $(this).closest('tr').find('td').eq(2).html().trim();
        var price = $(this).closest('tr').find("td:eq(5) input[type='text']").val().trim();
        var quantity = $(this).closest('tr').find("td:eq(6) input[type='text']").val();
        $.post("/Product/UpdateCart", { id: id, linetotal: linetotal, price: price, quantity: quantity }, function (r) {
        });
    });
});

$(function () {
    var imagesPreview = function (input, placeToInsertImagePreview) {

        if (input.files) {
            var filesAmount = input.files.length;

            for (i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = function (event) {
                    $($.parseHTML('<img>')).attr('src', event.target.result).appendTo(placeToInsertImagePreview);
                    $(".gallery img").attr("style", "height:110px;width: 110px;padding:2px;border:1px solid blue");

                }
                reader.readAsDataURL(input.files[i]);
            }
        }
    };

    $('#fileupload').on('change', function () {
        imagesPreview(this, 'div.gallery');
    });
});
//$(function () {
//    $(".paginate").paginga({
//        itemsPerPage: 6
//    });

//    $(".paginate-page-2").paginga({
//        page: 2
//    });

//    $(".paginate-no-scroll").paginga({
//        scrollToTop: false
//    });
//});
function PagerClick(index) {
    document.getElementById("hfCurrentPageIndex").value = index;
    document.forms[0].submit();
}
$(document).ready(function () {
    $("#divdropdwon").hide();
   
});

