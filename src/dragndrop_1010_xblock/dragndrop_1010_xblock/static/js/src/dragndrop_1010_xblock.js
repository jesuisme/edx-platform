/* Javascript for Dragndrop1010XBlock. */
function Dragndrop1010XBlock(runtime, element) {


       
      //After that data convert  string to JSON object .

    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
    $c1 = $c2 = $c3 = $c4 = $c5 = false;
    var boundingContainer, boundingDraggable, prevLeft, prevTop;
    $noRotate = false;
    app2 = {
        init: function () {
            $isRotated = false,
                $('.draggable').draggable({
                    revert: true,
                    containment: '#container',
                    start: function (e, ui) {
                        $(this).css('z-index', 9999);
                       // app.top = $(this).css('top');
                        //app.left = $(this).css('left');
                        // if(app2.getRotationDegrees($(this)) == '270'){
                        // // $(this).draggable('option','containment',[180, -180, 792, 180]);
                        // $(this).data('uiDraggable')._setContainment();
                        // }
                    },
                    stop: function (e) {
                        $left = parseInt($(this).css('left').replace('px', ''));
                        $minLeft = $('#container').innerWidth() / 8;
                        $maxLeft = $minLeft + 100;
                        $('.ui-draggable-dragging').parent().css('z-index', '999');
                        app2.check();
                        if ($left >= $minLeft && $left <= $maxLeft) {
                            $(this).find('.hove').rotate({ duration: 500, animateTo: -90 });
                            // $(this).addClass('rotatedDrag');
                        }
                        else {
                            $(this).find('.hove').rotate({ duration: 500, animateTo: 0 });
                            // $(this).css({'transform-origin':'50% 50%', 'transform': 'rotate(0deg)' ,'z-index': '999999'});
                        }
                    },
                    drag: function (e) {

                        $left = parseInt($(this).css('left').replace('px', ''));
                        $minLeft = $('#container').innerWidth() / 8;
                        $maxLeft = $minLeft + 100;
                        if ($left >= $minLeft && $left <= $maxLeft && !$noRotate) {
                            $(this).find('.hove').rotate({ duration: 500, animateTo: -90 });
                            // $(this).css({'transform-origin':'50% 50%', 'transform': 'rotate(-90deg)','z-index': '999999'});
                        }
                        else {
                            $(this).find('.hove').rotate({ duration: 500, animateTo: 0 });
                            // $(this).css({'transform-origin':'50% 50%', 'transform': 'rotate(0deg)' ,'z-index': '999999'});
                        }


                        $('.ui-draggable-dragging').parent().css('z-index', '9999');
                    }
                });
            $('.droppable').droppable({
                drop: app2.fun_drop
            });

        },

        fun_drop: function (event, ui) {

            $lastDrag = ui.draggable;
            var drags = ui.draggable.attr('id');
            var drops = $(this).attr('id');
            $('#' + drops).removeClass('drop');

            if (ui.draggable.element !== undefined) {
                ui.draggable.element.droppable('enable');
            }
            ui.draggable.position({
                of: $(this),
                my: "center center",
                at: "center center"
            });
            ui.draggable.draggable('option', 'revert', "invalid");


            // var data_id = ui.draggable.attr('data-id');

            // var data_ids = $(this).attr('data-ids');
            // var num = $(this).attr('num');
            // var drag_status = ui.draggable.attr('drag');
            // var dro = ui.draggable.attr('dro');
            // if(drops != "dragBox"){

            // if($(this).attr('data-ids' == -1)){
            // $("#"+drops).attr('data-ids',data_id);
            // $(this).attr('data-ids', ui.draggable.attr('data-id'));
            // ui.draggable.attr('drag','true');
            // ui.draggable.attr('dro', $(this).attr('num'));        }}
            // }else if(data_ids == -1 && drag_status == 'true'){
            // $("#"+drops).attr('data-ids',data_id);
            // $("#drops"+dro).attr('data-ids',"-1");
            // $("#drags"+data_id).attr('drag','true');
            // $("#drags"+data_id).attr('dro', num);          
            // }else if(data_ids != -1 && drag_status == 'false' && !$("#drags"+data_ids).hasClass('rights')){
            // $("#"+drops).attr('data-ids',data_id);
            // $("#drags"+data_id).attr('drag','true');            
            // $("#drags"+data_ids).animate({left:0,top:0});
            // $("#drags"+data_ids).attr('drag','false');
            // $("#drags"+data_id).attr('dro', num);        
            // $("#drags"+data_ids).removeClass('wrong')
            // $("#drags"+data_ids).css({'transform-origin':'50% 50%', 'transform': 'rotate(0deg)'});
            // }else if(data_ids != -1 && drag_status == 'true' && !$("#drags"+data_ids).hasClass('rights')){
            // $("#"+drops).attr('data-ids',data_id);
            // $("#drops"+dro).attr('data-ids',data_ids);
            // $("#drags"+data_id).attr('drag','true');
            // app.top = app.top.replace('px','');
            // //if()
            // app.top = (parseInt(app.top) + ((data_id - data_ids) * 40))+'px';
            // $("#drags"+data_ids).animate({left:app.left,top: app.top});
            // $("#drags"+data_id).attr('dro', num);
            // $("#drags"+data_ids).attr('dro', dro);     
            if ($(this).attr('num') == ui.draggable.attr('data-id')) {
                ui.draggable.draggable('disable').find('.hove').addClass('rights');
                if (ui.draggable.attr('data-id') == '4')
                    $noRotate = true;
            } else {
                ui.draggable.draggable('option', 'revert', true).find('.hove').rotate({ duration: 500, animateTo: 0 });
            }

            // }else{
            // $("#drops"+dro).attr('data-ids',"-1");
            // $("#drags"+data_id).attr('drag','false');
            // $("#drags"+data_id).css({left:0,top:0});
            // $("#drags"+data_id).attr('dro', "");
            // }

        },

        check: function () {
            // $('.rights').removeClass('rights');
            // $('.wrong').removeClass('wrong');

            // for(var i=0;i<5;i++)
            // {	    
            // if($('#drags'+i).attr('drag')!= "false")
            // {
            // if($('#drags'+i).attr('data-id') == i.toString() && $('#drags'+i).attr('dro') == i.toString()){
            // $('#drags'+i).addClass('rights').draggable( "disable" );
            // }else{
            // $('#drags'+i).addClass('wrong');
            // }
            // if($('#drops4').attr('data-ids') == i){
            // $('#drags'+$('#drops4').attr('data-ids')).css({'transform-origin':'109px -70px', 'transform': 'rotate(-90deg)', 'top': (179 - $('#drops4').attr('data-ids') * 40) + 'px', 'left': '58px'});
            // }
            // else
            // $('#drags'+i).css({'transform-origin':'50% 50%', 'transform': 'rotate(0deg)'});
            // }
            // }

            if ($('.rights').length == 5) {
                $('#dcorrect').fadeIn('slow').css('z-index', '435345345');
            }
        }

    }


    $(window).load(function () {
        app2.init();
    });
}
