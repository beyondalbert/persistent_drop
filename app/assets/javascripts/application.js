// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery.ui.draggable
//= require jquery.ui.sortable
//= require_tree .


$(function() {
    // Append the draggable widget to all the img objects
    $(".draggable").draggable({
        // Capture the "stop drag" event
        stop: function(event, ui) {

            // Generate the img object with the new coordinates.
            var img = {
                "id": $(this).attr('id'),
                "position_y": $(this).position().top.toString(),
                "position_x": $(this).position().left.toString()
            };

            // Send the request to the server
            $.ajax({
                type: "PUT",
                url: "/images/" + $(this).attr('id') + ".json",
                data: JSON.stringify( img ),
                contentType: 'application/json',
                dataType: 'json',

                // In case that an error happens, capture it and show the details.
                error: function(xhr, msg, error) {
                    alert(msg + ": " + error);
                }
            })
        }
    });

    $("#sortable").sortable({
        update: function(event, ui) {
            var positions = {}
            var li_num = $("#sortable li").length;
            for (i=0;i<li_num;i++) {
                var tmp_li = $("#sortable li:eq(" + i + ")");
                positions[tmp_li.val()] = i;
            };

            var data_pos = {"positions": positions};

            $.ajax({
                type: "PUT",
                url: "/images/resort_images",
                data: JSON.stringify(data_pos),
                contentType: 'application/json',
                dataType: 'json'
            });
        }
    });
    $("#sortable").disableSelection();
});
