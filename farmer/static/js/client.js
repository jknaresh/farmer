jQuery.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
    if (o[this.name]) {
        if (!o[this.name].push) {
            o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
    } else {
        o[this.name] = this.value || '';
    }
    });
    return o;
};

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

jQuery(function(){

    if(jQuery("#farmers").length > 0){

        var dialog, form,

          // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
          emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
          name = $( "#name" ),
          email = $( "#email" ),
          password = $( "#password" ),
          allFields = $( [] ).add( name ).add( email ).add( password ),
          tips = $( ".validateTips" );

            function updateTips( t ) {
              tips
                .text( t )
                .addClass( "ui-state-highlight" );
              setTimeout(function() {
                tips.removeClass( "ui-state-highlight", 1500 );
              }, 500 );
            }

            function checkLength( o, n, min, max ) {
              if ( o.val().length > max || o.val().length < min ) {
                o.addClass( "ui-state-error" );
                updateTips( "Length of " + n + " must be between " +
                  min + " and " + max + "." );
                return false;
              } else {
                return true;
              }
            }

            function checkRegexp( o, regexp, n ) {
              if ( !( regexp.test( o.val() ) ) ) {
                o.addClass( "ui-state-error" );
                updateTips( n );
                return false;
              } else {
                return true;
              }
            }

            function addUser() {
                // bypass all validations
                //
                var jFrm = jQuery("form.cls_frm_add_farmer");
                data = jFrm.serializeObject();
                console.log(jFrm.serializeObject());
                var valid = true;
                jQuery.ajax({
                    url: "/api/farmers/",
                    type: "POST",
                    data: JSON.stringify(data),
                    headers: {
                        'X-CSRFToken': getCookie('csrftoken'),
                        "Content-Type": "application/json"
                    },
                    dataType: "json",
                    success: function(r){
                        console.log(r);
                        if ( r.id != void 0 ) {
                            $( "#farmers tbody" ).append( "<tr>" +
                              "<td>" + r.name + "</td>" +
                              "<td>" + r.contact_no + "</td>" +
                              "<td>" + r.pin + "</td>" +
                              "<td>" + r.address + "</td>" +
                              "<td>remove</td>" +
                            "</tr>" );
                            dialog.dialog( "close" );
                        }
                    }
                });
                allFields.removeClass( "ui-state-error" );
                return valid;
            }

            dialog = $( "#farmer-dialog-form" ).dialog({
              autoOpen: false,
              height: 400,
              width: 350,
              modal: true,
              buttons: {
                "Create farmer": addUser,
                Cancel: function() {
                  dialog.dialog( "close" );
                }
              },
              close: function() {
                form[ 0 ].reset();
                allFields.removeClass( "ui-state-error" );
              }
            });

        jQuery("body").on("submit", "form.cls_frm_add_farmer", function( e ) {
            e.preventDefault();
            addUser();
        });

        jQuery('body').on("click", ".cls_add_farmer", function(){
            dialog.dialog( "open" );
        });

        // cls_add_farmer, cls_remove_farmer, cls_farmer_edit
        jQuery.get("/api/farmers/", function(r){
            jQuery.each(r.results, function(i, obj){
                obj.remove = "<a href='#' data-id='"+obj.id+"' class='cls_remove_farmer'>remove</a>";
                obj.name1 = '<a href="#" class="cls_farmer_edit" data-id="'+obj.id+'">'+obj.name+'</a>';
            });

            jQuery("#farmers").DataTable( {
                "data": r.results,
                "columns": [
                    { "data": "name1" },
                    { "data": "contact_no" },
                    { "data": "pin" },
                    { "data": "address" },
                    { "data": "remove" },
                ]
            } );
        });
    }

    jQuery("body").on("click touch", "a.cls_add_farm", function(){
        jQuery("div#id_frm_html").show('slow');
    });


    jQuery("body").on("submit", "form.cls_frm_save_farm", function(){
        var jFrm = jQuery("form.cls_frm_save_farm");
        data = jFrm.serializeObject();
        var valid = true;
        jQuery.ajax({
            url: "/api/farm/",
            type: "POST",
            data: JSON.stringify(data),
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                "Content-Type": "application/json"
            },
            dataType: "json",
            success: function(r){
                console.log(r);
                if ( r.id != void 0 ) {
                    jQuery( "table#farm tbody" ).append( "<tr>" +
                      "<td>" + r.name + "</td>" +
                      "<td>" + r.details + "</td>" +
                      "<td>" + r.farmer.name + "</td>" +
                      "<td>remove</td>" +
                    "</tr>" );
                    jFrm[0].reset();
                    jQuery("div#id_frm_html").hide();
                }
            }
        });
    });

    if(jQuery("table#farm").length > 0){
        jQuery.get("/api/farm/", function(r){
            console.log(r);
            jQuery.each(r.results, function(i, obj){
                obj.name1 = '<a href="#" >'+obj.name+'</a>';
                obj.remove = '<a>remove</a>';
                obj.farmer_name = obj.farmer.name;
            });

            jQuery("table#farm").DataTable({
                "data": r.results,
                "columns": [
                    { "data": "name1" },
                    { "data": "details" },
                    { "data": "farmer_name" },
                    { "data": "remove" },
                ]
            });
        });
    }


    if(jQuery("table#farm_field").length > 0){

        jQuery.get("/api/farm-field/", function(r){
            console.log(r);
            jQuery.each(r.results, function(i, obj){
                obj.name1 = '<a href="#" >'+obj.name+'</a>';
                obj.remove = '<a>remove</a>';
                obj.farm_name = obj.farm.name;
            });

            jQuery("table#farm_field").DataTable({
                "data": r.results,
                "columns": [
                    { "data": "name1" },
                    { "data": "farm_name" },
                    { "data": "crop_type" },
                    { "data": "season" },
                    { "data": "field_from" },
                    { "data": "field_to" },
                    { "data": "remove" },
                ]
            });
        });
    }



    jQuery("body").on("submit", "form#id_frm_add_farm_field", function(){

        var jFrm = jQuery("form#id_frm_add_farm_field");
        data = jFrm.serializeObject();
        var valid = true;
        jQuery.ajax({
            url: "/api/farm-field/",
            type: "POST",
            data: JSON.stringify(data),
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                "Content-Type": "application/json"
            },
            dataType: "json",
            success: function(r){
                console.log(r);
                if ( r.id != void 0 ) {
                    jQuery( "table#farm tbody" ).append( "<tr>" +
                      "<td>" + r.name + "</td>" +
                      "<td>" + r.details + "</td>" +
                      "<td>" + r.farmer.name + "</td>" +
                      "<td>remove</td>" +
                    "</tr>" );
                    jFrm[0].reset();
                    jQuery("div#id_html_add_farm_field").hide('slow');
                }
            }
        });

    });

    jQuery("body").on("click", ".cls_open_add_farm_field", function(){
        jQuery("#id_html_add_farm_field").show('slow');

        if(window.leaf_map){
            var mymap = L.map('mapid', {drawControl: true}).setView([17.4062917, 78.4390537], 16);
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoiamtuYXJlc2giLCJhIjoiY2o4YmFmaWlpMGMwcDJxcDYxaDgxaXIwciJ9.qBkVUuA-N3PkyMBgPddVUA'
            }).addTo(mymap);

            // add a marker in the given location
//            L.marker(center).addTo(mymap);

            // Initialise the FeatureGroup to store editable layers
            var editableLayers = new L.FeatureGroup();
            mymap.addLayer(editableLayers);

            var drawPluginOptions = {
                position: 'topright',
                draw: {
                    polygon: {
                        allowIntersection: false, // Restricts shapes to simple polygons
                        drawError: {
                            color: '#e1e100', // Color the shape will turn when intersects
                            message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
                        },
                        shapeOptions: {
                            color: '#97009c'
                        }
                    },
                    // disable toolbar item by setting it to false
                    polyline: false,
                    circle: false, // Turns off this drawing tool
                    rectangle: false,
                    marker: false,
                },
                edit: {
                    featureGroup: editableLayers, //REQUIRED!!
                    remove: false
                }
            };

            // Initialise the draw control and pass it the FeatureGroup of editable layers
            var drawControl = new L.Control.Draw(drawPluginOptions);
            mymap.addControl(drawControl);

            var editableLayers = new L.FeatureGroup();
            mymap.addLayer(editableLayers);

            mymap.on('draw:created', function(e) {
                var type = e.layerType,
                    layer = e.layer;

                if (type === 'marker') {
                    layer.bindPopup('A popup!');
                }

                editableLayers.addLayer(layer);
                console.log(layer);
                gj=layer.toGeoJSON();
                gj = gj.geometry.coordinates[0];
                geo_arr = []
                jQuery.each(gj,function(i, itm){
                    geo_arr.push(itm.join(","));
                });
                geo_json = geo_arr.join(":");
                console.log(geo_json);
                jQuery("#id_land_coordinates").val(geo_json);
            });
        }
    });

});