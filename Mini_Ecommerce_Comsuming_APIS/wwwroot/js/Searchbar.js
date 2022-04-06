$('#SearchBar').click(function () {
    var value = this.value.toLowerCase();
    $('#myproductList #items').each(function () {
        var id = $(this).text().toLowerCase();
        $(this).toggle(id.indexOf(value) !== -1);
    })
});