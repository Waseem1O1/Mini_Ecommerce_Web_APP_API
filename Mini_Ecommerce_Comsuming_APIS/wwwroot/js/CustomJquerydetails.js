$(document).ready(function () {
    $(document).on('click', '#plusdet', function () {
        $('.countQty').val(parseInt($('.countQty').val()) + 1);
    });
    $(document).on('click', '#minusdet', function () {
        $('.countQty').val(parseInt($('.countQty').val()) - 1);
        if ($('.countQty').val() == 0) {
            $('.countQty').val(1);
        }
    });
});

$("#img_01").ezPlus({
    tint: true,
    tintColour: '#F90', tintOpacity: 0.5
});

function myFunction(imgs) {
    var expandImg = document.getElementById("img_01");
    expandImg.src = imgs.src;
}