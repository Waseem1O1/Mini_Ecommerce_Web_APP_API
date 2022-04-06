$('#SearchBar').change(function () {
    var value = this.value.toLowerCase();
    
    var dt = $('#myproductList #items').each(function () {
        var id = $(this).text().toLowerCase();
        $(this).toggle(id.indexOf(value) !== -1);
    //    $('#pagi').show();
    })
    //if (dt > -1) {
    //    $('#pagi').show();
    //}
    //else {
    //    $('#pagi').hide();
    //}

});
