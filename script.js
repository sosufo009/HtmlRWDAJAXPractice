$(document).ready(function() {

    //get the data from json on first time
    $.get("http://jsonplaceholder.typicode.com/posts", function(data) {

        //generate the html
        var string = "<h1>List:(Click the string)</h1> <ul>";
        for (var key in data) {
            string += "<li><p id=" + data[key].id + ">" + data[key].title + "</p></li>";
        }
        string += "</ul>";


        $('#content').append(string);
    }).done(function() {
        $('#content > ul> li> p').click(function() {

            //click the string to open dialog
            getContent($(this).attr("id"));
        });
    }).fail(function() {
        alert("Get List Error");
    });


    //get content by id
    function getContent(id) {
        $.get("http://jsonplaceholder.typicode.com/posts/" + id, function(data) {

            //generate the html
            var string = "<br/>" + data.body;

            //generate the dialog
            $('#dialog-message').html("");
            $('#dialog-message').append(string);

        }).done(function(data) {

            //open the dialog
            $("#dialog-message").dialog({
                modal: true,
                title: data.title,
                buttons: {
                    Ok: function() {
                        $(this).dialog("close");
                    }
                }
            });
        }).fail(function() {
            alert("Get Content Error");
        });
    };


});
