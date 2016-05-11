(function ($) {
    $("#button3").on('click', function () {
        // remove resultset if this has already been run
        $('.content ul').remove();
        // add spinner to indicate something is happening
        $('<i class="fa fa-refresh fa-spin"/>').appendTo('body');
        
        // get selected number
        var zip = $('select option:selected').text();

        // make AJAX call
        $.getJSON('http://movie-quotes-2.herokuapp.com/api/v1/quotes/',function (data, xhr) {
            
            // Genterate Random Number, quicker than using anything else ...
            var rdNum = Math.floor(Math.random() * 7) + 1  ;

            // do all this on success       
            var items = [],
                $ul;
            
            $.each(data, function (key, val) {
                                // Move through results and match content to the number generated 
                               if (val.id == rdNum ) {
                                    items.push('<span class="name">' + val.film + '</span><br><br><span class="addr">' + "<i>''" + val.content + "''</i>" +
                                        '</span><br><br><span class="addr">' + " <b>told by </b>" + val.character + '</span> <br><span class="addr">' + " <b>Year </b>" + val.year + '</span><br><span class="city">' + "<b> Played By </B>" + val.actor + '</span>');
                };
            });

            // if no items were returned
            if (items.length < 1) {
                items.push('No results for this movie, try again!');
            }
            
            // remove spinner
            $('.fa-spin').remove();
            
            // append list to page
            $ul = $('<ul />').appendTo('.content');
            
            //append list items to list
            $ul.append(items);

        }).fail( function(d, textStatus, error) { //If fail to connect display message to user and devloper message to console. 
                console.error("getJSON failed, status: " + textStatus + ", error: "+error)

                var items = [],
                $ul;

                items.push('Error Getting Data from API please contact developer.');

                // remove spinner
                $('.fa-spin').remove();
                
                // append list to page
                $ul = $('<ul />').appendTo('.content');
                
                //append list items to list
                $ul.append(items);

    });
    });

}(jQuery));