/* Javascript for M10s10XBlock. */
function M10s10XBlock(runtime, element) {
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
    
    $(function ($) {
      $('#dlink').attr('href', '/static/pdf/My_Improvement_Project_planning_kit.pdf');
        if (	
			
            navigator.userAgent.match(/Phone/i) ||
            navigator.userAgent.match(/DROID/i) ||
            navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/) ||
            navigator.userAgent.match(/Windows Phone/i) ||
            navigator.userAgent.match(/ZuneWP7/i) ||
            navigator.userAgent.match(/IEMobile/i)
            ) {
        var mobile_device = true;
    }

    if (mobile_device) {// mobile!
		$('#myMde1').modal(); 
        //alert("Please use browser for better experiance");
    }

function html_entity_decode(txt){
    var randomID = Math.floor((Math.random()*100000)+1);
    $('body').append('<div id="random'+randomID+'"></div>');
    $('#random'+randomID).html(txt);
    var entity_decoded = $('#random'+randomID).html();
	entity_decoded=entity_decoded.replace(/&amp;/g, '&');
    $('#random'+randomID).remove();
    return entity_decoded;
}
//myString = myString.replace( /\&amp;/g, '&' );
    //$('#initial-txt').text(html_entity_decode(app.MData.m10.sections["s2"].response1));    
	var checkbox1=false; var slidersubmit1=false; 
	 var c1_id='';   var c2_id='';
	
	$('#action2,#slider0,#slider1,#slider2').hide();
//$('#slider1').show();
	$("#rbot1").click(function(){	
	   $("#rbot1").css("background-color", "#28ae95");
	   $("#rbot2").css("background-color", "#f58221");
	   
       $("#slider2").hide();    
       $("#slider0").show();
	   
	   if($('#response2Text').val()!='')
	   {
	   $('#action1').hide();
	   $('#action2').show();	  
	   } else {
	    $('#action1').show();
	   }
	   /////slider left right bot show hide////////
	   //alert(c1_id+'---'+c2_id);
	   if(c1_id == 'a0'){
              $('.left').hide();              
              $('.right').show();
          }else if(c1_id == 'a2'){
            $('.left').show();
            $('.right').hide();
          } else {
            $('.left').show();
            $('.right').show();
          }
       	 //////////////// 
	   if(slidersubmit1==true) $("#slider1").show(); //show slider 1 if input submited and pdf created
	   
	   $('html, body').animate({
        scrollTop: $("#slider0").offset().top
    }, 1000);
		
	   });
	   
	$("#rbot2").click(function(){
	   $('#action2,#slider0,#slider1').hide();	
	   $("#rbot2").css("background-color", "#28ae95");
	   $("#rbot1").css("background-color", "#f58221");
       $("#slider2").show();
	     /////slider left right bot show hide////////
	   //alert(c1_id+'---'+c2_id);
        if(c2_id == 0){
              $('.left2').hide();              
              $('.right2').show();
          }else if(c2_id == 11){
            $('.left2').show();
            $('.right2').hide();
          } else {
            $('.left2').show();
            $('.right2').show();
          }
		 //////////////// 
	   $('html, body').animate({
        scrollTop: $("#slider2").offset().top
    }, 1000);
	   });   

	$("#next-bot").click(function(){  
      var text1= $('#response1Text').val();
	  if(text1=="") {
	  alert('Enter Text');
	  } else {
	  $('#response2Text').val(text1);
	  $('#action1').hide();
	  $('#action2').show();	  
	  } 	   
	  });   

	$("#submit-bot").click(function(){  
	  var text2= $('#response2Text').val();
	  if(text2=="") {
	  alert('Enter Text');
	   }
	  else if($('input[type=checkbox]:checked').length < 5)
	  {
	  //alert('Please Checked a goal.');
	  $('#error1').show();
	   } else {
	  $("#error1").hide();
	  $(".m10s10p1 #sgoalbox").css("background-color", "#25AD95");
	  $('#slider1').show(); $('.left').hide(); $('.right').show();    
	  $('.mygoal').text(text2);
	  $("#response2Text").prop("readonly", true);
	  $("#response1Text").prop("readonly", true);
	  $("input[type=checkbox]").prop("readonly", true);
	  checkbox1=true; slidersubmit1=true;
	  $('#dis1').show();
	  $("#submit-bot").attr("disabled", "disabled");
	 $('html, body').animate({
        scrollTop: $("#slider1").offset().top
    }, 1000);
	   }
	   
	   
	   /*pdf creation start */
	      var goal= $('#response2Text').val();
		  var link="";
		  var data = "goal="+goal+"&link="+link;
         $.ajax({
            url: "m10_activity_pdf.php",
            data: data, 
            success: function(html) {               
               $("#dlink").attr("href", html); // return link will be change for download
				$('#dlink').show();
			}
		});   
	   	   /*pdf creation end */
	
	});

/*
$('#myCarousel').on('slid.bs.carousel', function (e) {
       $('.item .ans').removeClass('Dis');
       var id = e.relatedTarget.id;
	    c1_id=id;
          if(id == 'a0'){
              $('.left').hide();              
              $('.right').show();
          }else if(id == 'a2'){
            $('.left').show();
            $('.right').hide();
          } else {
            $('.left').show();
            $('.right').show();
          }
      });


$('#myCarousel2').on('slid.bs.carousel', function (e) {
       var id = parseInt(e.relatedTarget.id);     
	   c2_id=id;
 
          if(id == 0){
              $('.left2').hide();              
              $('.right2').show();
          }else if(id == 11){
            $('.left2').show();
            $('.right2').hide();
          } else {
            $('.left2').show();
            $('.right2').show();
          }
      });
	*/
	$('.carousel').on('slid.bs.carousel', function (e) {
      // $('.item .ans').removeClass('Dis');
      // $('.item .ans').removeClass('DisB');
       var id = parseInt(e.relatedTarget.id);
          if(id == 0){
              $('.left1').hide();
              $('.right1').show();
          }else if(id == 10){
            $('.left1').show();
            $('.right1').hide();
          }
		  else{
		    $('.left1').show();
            $('.right1').show();
		  }


          if(id == 3){
              $('.left2').hide();  
              $('.right2').show();
				// setMsgBoxHeight2();
          }else if(id == 14){
            $('.left2').show();
            $('.right2').hide();
			// setMsgBoxHeight2();
          } else {
            $('.left2').show();
            $('.right2').show();
			// setMsgBoxHeight2();
          }
           
      });

    $("#submit-bot2").click(function(){
	/* PDF Creation 
         var goal= $('#response2Text').val();
		  var link= $('#response3Text').val();
		  if(link=='') {
		  alert('Enter Text');
		  } else {
		  $("#goal-link").hide();
		  $("#wait2").show();
		   var data = "goal="+goal+"&link="+link;
         $.ajax({
            url: "m10_activity_pdf.php",
            data: data, 
            success: function(html) {               
               $("#dlink").attr("href", html); // return link will be change for download
            	$("#wait2").hide();
				$("#goal-link2").text(link);
				$('#dlink').show();
			}
		});
        return false;
		}
		*/
    });	
	

	 $("input[type=checkbox]").click(function(){
	      if ($('input[type=checkbox]:checked').length >= 5) 
		      {
	 	      $("#submit-bot").css("background-color", "#acadb1").css("color", "#fff");
			   $("#submit-bot").attr("enabled", "enabled");
			  }   else {
			  $("#submit-bot").css("background-color", "").css("color", "");
		      }
      if(checkbox1==true) {	  
	  return false;
	  }  else {
	  if ($('input[type=checkbox]:checked').length > 5) {
	    $('input[type=checkbox]:checked').prop('checked', false);
        $(this).prop('checked', true);
        //alert("allowed only 1");
        } else {
		 if($(this).prop("checked") == true)
		 $(this).prop('checked', true);
		 else
		$(this).prop('checked', false);
		}
	 	}
     });	    
    });
}

$(document).ready(function(){
    setMsgBoxHeight();
});
        function setMsgBoxHeight() {
    var f_height = 0;
            var msgboxHeight = $(".carousel .active .row-eq-height").height();
       var l = $(".carousel .active .ans").length;
        for(var i=1;i<=l;i++)
        {
        var h =  $(".carousel .active .row-eq-height div:nth-child("+i+") .ans").css("height");
        var h1 = h.split('p');
       if(f_height < Number(h1[0]))
       {
          f_height = h1[0];
       }
      }
           $(".carousel .active .ans").css("height",f_height+"px"); 
        $(".carousel .active .ans").css("line-height","block-height !important");      
    }
function TryA(obj){
    $(obj).closest('.m10s10mcq.item').find('div').removeClass("incorrect").removeClass("selectedAns");
      //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
    //  $(obj).closest('.item').find('.row-eq-height').removeClass('Dis'); 
	   $(obj).closest('.item').find('.row-eq-height').show(); 
    }


    function checkAnswer(obj, f) {
    // var TempJson='';//JasonData;
    // TempJson.item_id="m10s10";
    // TempJson.test_name="Dell Med\\ Module 10\\ Section 10 Item";
    // TempJson.test_id="m10s10t001";
    // //TempJson.student_id=app.Decrypt(app.LoginEmail);
    // TempJson.item_stem=$(obj).closest('.item').find('.ques').text();
    // var options=$(obj).closest('.row-eq-height').find('.ans');
    // TempJson.options = new Array();

    // $.each(options,function(i,v)
    // {
    //   TempJson.options.push({
    //     "letter" : i,
    //     "text"  : $(v).text().trim(),
    //     "selected":$(v).text().trim() == $(obj).text().trim() ? true : false,
    //     "correct":  $(v).attr('onclick').indexOf('1')!=-1 ? true : false,
    //   });
    // })
	
			 
		if($(obj).hasClass("customansclass1"))
        {
        if(obj.innerText=="May was lower than March so there is nothing important about this recent trend")
        {
           $("#wtext").html("This does not have an effect on these datas&#x2019; designation as special cause.");
        }  
        if(obj.innerText=="Rule #5")
        {
           $("#wtext2").html("To meet Montgomery rule #5 for special cause variation, there need to be 6 points in a row that either increase or decrease. The points on this chart do not meet that rule.");
        } 		
        else
        {
        $("#wtext").html("These data represent special cause variation, so you cannot report that they&#x2019;re not significant.");
		 $("#wtext2").html("There are no data points that are above the UCL or or below the LCL, at least one of which is required  to meet the Montgomery rule #1 for special cause variation.");
        }
          }

            //$('.item .ans').addClass('Dis');
      //$(obj).closest('.row-eq-height').addClass('Dis');
           $(obj).closest('.row-eq-height').hide(); 
		   
           // $('.item div').removeClass("incorrect").removeClass("selectedAns");

		    $(obj).closest('.item div').removeClass("incorrect").removeClass("selectedAns");
            $(obj).parents(".eq-h").find(".ans")
            $(obj).parents(".item").removeClass("correct incorrect");
            if (f === 1) {
                $(obj).addClass('selectedAns').parents('.white').addClass('correct');
            } else if (f === 0) {
			
                $(obj).addClass('selectedAns').parents('.white').addClass('incorrect');
            } else {
                $(obj).addClass('selectedAns').parents('.white').addClass('correct bothCorrect');
                //alert(f);
                $(".5401, .2497").addClass("hide");
                $("." + f).removeClass("hide");
            }

         //app.SaveJson(JSON.stringify(TempJson));
		 
		 
        }    


	