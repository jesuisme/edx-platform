


show_slider1(0);


  function doctPop2(){
    $("#step3c_1, #step3c_2, #step3c_3, #step3c_4, #step3c_5, #step3c_6, #step3c_7, #step3c_8, #step3c_9, #step3c_10").hide();
  }
  $("#step4_1k").click(function(){
    $('#myMd1_k').modal();    
     $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21_1.png');
  });
  $("#step4_2k").click(function(){
    $('#myMd2_k').modal();    
     $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21_2.png');
  });
  $("#step4_3k").click(function(){
    $('#myMd3_k').modal();    
     $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21_3.png');
  });
  $("#step4_4k").click(function(){
    $('#myMd4_k').modal();    
     $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21_4.png');
  });

  /*$("#chall_M1 .col-sm-6").click(function(){
    $('#myMd5').modal();         
  });*/
  
  $("#m4s9img22, #m4s9img22a").click(function(){
    $('#myMd8_k').modal();         
  });
  $("#m4s9img13p").click(function(){
    $('#myMd9_k').modal();         
  });

$("#stepp2").click(function(){
  console.log("stepp2------------");
    $('#myMd10_k').modal();   
      app.Page1=1;
      app.Page2=1;
      app.Page3=1;      
  });



  $("#stepn3_1").click(function(){    
    doctPop2();
    $("#step3c_0").hide();
    $("#step3c_1").show();
    $('#m4s9img20').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img20_1.png');
  });
  $("#stepn3_2").click(function(){   
    doctPop2();
    $("#step3c_0").hide();
    $("#step3c_2").show(); 
    $('#m4s9img20').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img20_2.png');
  });
  $("#stepn3_3").click(function(){    
    doctPop2();
    $("#step3c_0").hide();
    $("#step3c_3").show();
    $('#m4s9img20').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img20_3.png');
  });
  $("#stepn3_4").click(function(){    
    doctPop2();
    $("#step3c_0").hide();
    $("#step3c_4").show();
    $('#m4s9img20').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img20_4.png');
  });
  $("#stepn3_5").click(function(){    
    doctPop2();
    $("#step3c_0").hide();
    $("#step3c_5").show();
    $('#m4s9img20').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img20_5.png');
  });
  $("#stepn3_6").click(function(){
    doctPop2();
    $("#step3c_0").hide();
    $("#step3c_6").show();
    $('#m4s9img20').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img20_6.png');
  });
  $("#stepn3_7").click(function(){
    doctPop2();
    $("#step3c_0").hide();
    $("#step3c_7").show();
    $('#m4s9img20').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img20_7.png');
  });
  $("#stepn3_8").click(function(){
    doctPop2();
    $("#step3c_0").hide();
    $("#step3c_8").show();
    $('#m4s9img20').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img20_8.png');
  });
  $("#stepn3_9").click(function(){
    doctPop2();
    $("#step3c_0").hide();
    $("#step3c_9").show();
    $('#m4s9img20').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img20_9.png');
  });
  $("#stepn3_10").click(function(){
    doctPop2();
    $("#step3c_0").hide();
    $("#step3c_10").show();
    $('#m4s9img20').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img20_10.png');
  });




  function st_color2(){  
    $('#stepp1,#stepp2,#stepp3,#stepp4,#stepp5,#stepp6,#stepp7').css({'background-color':'#f0f0f0'});
  }
 
   $('#stepp1').on('click', function () {
    console.log("stepp1===========");
    show_slider1(0);
    $('.m4s9mcqp .item2').removeClass('active');
    $('.m4s9mcqp #220').addClass('active'); 
    $('.m4s9mcqp ol li').hide();   
  //app.Page3=0;
  app.Page1=0;
  app.Page2=0;
  app.Page3=0;
    st_color2();    
    $('#stepp1').css({'background-color':'#e4c72b'});
    $('.left1, .right1').hide(); 
    $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21.png');  
  $('#T1').show();
  $('#T2').hide();
  });

  $('#exp3, #stepp2').on('click', function () {
    console.log("stepp2=======");
    show_slider1(1);
    $('.m4s9mcqp .item2').removeClass('active');
    $('.m4s9mcqp #221').addClass('active'); 
    $('.m4s9mcqp ol li').hide();    
    $('.m4s9mcqp ol li:eq(1)').show();   
    $('.m4s9mcqp ol li:eq(2)').show();   
    $('.m4s9mcqp ol li').removeClass('active');
    $('.m4s9mcqp ol li:eq(1)').addClass('active');
    st_color2();
    $('#myMd10').modal();
    //app.Page3=1;    
  app.Page1=1;
  app.Page2=1;
  app.Page3=1;
    $('#stepp2').css({'background-color':'#e4c72b'});    
    $('.left1, .right1').show();                      
    $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21.png');    
  $('#T1').hide();
  $('#T2').show();
  });


  $('#stepp3').on('click', function () {
    console.log("stepp3==========");
    show_slider1(3);
    $('.m4s9mcqp .item2').removeClass('active');
    $('.m4s9mcqp #223').addClass('active');
    $('.m4s9mcqp ol li').hide();    
    st_color2();
    //app.Page3=3;
  app.Page1=3;
  app.Page2=3;
  app.Page3=3;
    $('#stepp3').css({'background-color':'#e4c72b'});
    $('.left1, .right1').show();    
    $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21.png');  
  $('#T1').hide();
  $('#T2').show();
  });

   $('#stepp4').on('click', function () {
    console.log("stepp4==========");
    show_slider1(4);
    $('.m4s9mcqp .item2').removeClass('active');
    $('.m4s9mcqp #224').addClass('active');
     $('.m4s9mcqp ol li').hide(); 
    st_color2();
  //app.Page3=4;
    app.Page1=4;
  app.Page2=4;
  app.Page3=4;
    $('#stepp4').css({'background-color':'#e4c72b'});
    $('.left1, .right1').show();    
    $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21.png');  
  $('#T1').hide();
  $('#T2').show();
  });
   $('#stepp5').on('click', function () {
    console.log("stepp5=========");
    show_slider1(5);
    $('.m4s9mcqp .item2').removeClass('active');
    $('.m4s9mcqp #225').addClass('active');
    $('.m4s9mcqp ol li').hide();
    $('.m4s9mcqp ol li:eq(5)').show();   
    $('.m4s9mcqp ol li:eq(6)').show();
    $('.m4s9mcqp ol li:eq(7)').show();
    $('.m4s9mcqp ol li').removeClass('active');
    $('.m4s9mcqp ol li:eq(5)').addClass('active');
    st_color2(); 
  //app.Page3=6;  
  app.Page1=6;
  app.Page2=6;
  app.Page3=6;
    $('#stepp5').css({'background-color':'#e4c72b'});
    $('.left1, .right1').show();    
    $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21.png');  
  $('#T1').hide();
  $('#T2').show();
  });

    $('#stepp6').on('click', function () {
      console.log("stepp6=========");
      show_slider1(8);
    $('.m4s9mcqp .item2').removeClass('active');
    $('.m4s9mcqp #228').addClass('active');
    $('.m4s9mcqp ol li').hide();
    $('.m4s9mcqp ol li:eq(8)').show();   
    $('.m4s9mcqp ol li:eq(9)').show();
    $('.m4s9mcqp ol li:eq(10)').show();
    $('.m4s9mcqp ol li').removeClass('active');
    $('.m4s9mcqp ol li:eq(8)').addClass('active');
    st_color2();  
  //app.Page3=8; 
  app.Page1=8;
  app.Page2=8;
  app.Page3=8;  
    $('#stepp6').css({'background-color':'#e4c72b'});
    setMsgBoxHeight2();
    $('.left1, .right1').show();    
    $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21.png'); 
  $('#T1').hide();
  $('#T2').show();
  });

    $('#stepp7').on('click', function () {
      console.log("stepp7=========");
      show_slider1(11);
    $('.m4s9mcqp .item2').removeClass('active');
    $('.m4s9mcqp #2211').addClass('active');
    $('.m4s9mcqp ol li').hide(); 
    st_color2();
     //app.Page3=11; 
  app.Page1=11;
  app.Page2=11;
  app.Page3=11;
    $('#stepp7').css({'background-color':'#e4c72b'});
    $('.left1').show();              
    $('.right1').hide();    
    $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21.png');  
  $('#T1').hide();
  $('#T2').show();
  });


function hideFun2(){
$('#chall_12,#chall_22,#chall_32, .overlayBG').hide();

}


// Challenge 
 $('#cha_12').on('click', function () {
  console.log("cha_12----");            
      $('#cha_12').addClass('selectedAnsCha');
      $('#cha_22, #cha_32').removeClass('selectedAnsCha');
      hideFun2();
      $('#chall_12, .overlayBG').show();
  }); 
 $('#cha_22').on('click', function () {
  console.log("cha_22----");            
      $('#cha_22').addClass('selectedAnsCha');
      $('#cha_12, #cha_32').removeClass('selectedAnsCha');
      hideFun2();
      $('#chall_22, .overlayBG').show();
  });
 $('#cha_32').on('click', function () { 
    console.log("cha_32----");           
      $('#cha_32').addClass('selectedAnsCha');
      $('#cha_12, #cha_22').removeClass('selectedAnsCha');
      hideFun2();
      $('#chall_32, .overlayBG').show();
  });

 $('.close_popup, .overlayBG').on('click', function () {  
    hideFun2();
    $('#cha_12,#cha_22,#cha_32').removeClass('selectedAnsCha');
  });


$('.tryagin2').on('click', function(data){
    // var dataevent = this.id;
    // var dot_id = dataevent.split('1')[1];
    console.log("tryagin1========");
    console.log("classsssssssssssssss ccccccc");
    console.log("classsssssssssssssss ccccccc this", this);
    // $('.item1.active div').removeClass("incorrect").removeClass("selectedAns");
    // $(this).removeClass('selectedAns').removeClass('incorrect');

    $(this).closest('.item2.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
    $(this).closest('.item2').find('.row-eq-height').removeClass('Dis'); 
});
$('.tryagin3').on('click', function(data){
    // var dataevent = this.id;
    // var dot_id = dataevent.split('1')[1];
    console.log("tryagin1========");
    console.log("classsssssssssssssss ccc33cccc");
    console.log("classsssssssssssssss ccccc33cc this", this);
    $(this).removeClass('selectedAns').parents('.white').removeClass('incorrect');
    $(this).closest('.item2').find('.row-eq-height').removeClass('Dis');
    $(this).closest('.item2').find('.customansclass2').removeClass('selectedAns'); 
});



$('.stepp5_slide').on('click', function(data){
    var dataevent = this.id;
    var dot_id = dataevent.split('dot_id')[1];
    console.log("classsssssssssssssss");
    console.log("stepp5_slide===", dot_id);
    // console.log(this.id);
    show_slider1(dot_id);
    // ShowCarousel1(dot_id);
    if (dot_id == 5) {
      $('.m4s9mcqp ol li').removeClass('active');
      $('.m4s9mcqp ol li:eq(5)').addClass('active');

    }
    if (dot_id == 6) {
      $('.m4s9mcqp ol li').removeClass('active');
      $('.m4s9mcqp ol li:eq(6)').addClass('active');

    }
    if (dot_id == 7) {
      $('.m4s9mcqp ol li').removeClass('active');
      $('.m4s9mcqp ol li:eq(7)').addClass('active');

    }
    if (dot_id == 8) {
      $('.m4s9mcqp ol li').removeClass('active');
      $('.m4s9mcqp ol li:eq(8)').addClass('active');

    }
    if (dot_id == 9) {
      $('.m4s9mcqp ol li').removeClass('active');
      $('.m4s9mcqp ol li:eq(9)').addClass('active');

    }
    if (dot_id == 10) {
      $('.m4s9mcqp ol li').removeClass('active');
      $('.m4s9mcqp ol li:eq(10)').addClass('active');

    }
    
});

$('.nextquestion1').on('click', function(data){
   console.log("nextquestion111---------");
    $('.m4s9mcqp ol li').removeClass('active');
    $('.m4s9mcqp ol li:eq(9)').addClass('active');
    show_slider1(9);
    
    
    
});








function ShowCarousel2(id)
{
  //debugger;
  //alert(id);
    if(id==undefined)
    {
      return false;
    }
    if(id == 0) {
          st_color2();
          $('.m4s9mcqp ol li').hide();
          $('#stepp1').css({'background-color':'#e4c72b'});            
          $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21.png');          
        }
        if(id == 1) {
          $('.m4s9mcqp ol li').hide();    
          $('.m4s9mcqp ol li:eq(1)').show();   
          $('.m4s9mcqp ol li:eq(2)').show();   
          st_color2();
          $('#stepp2').css({'background-color':'#e4c72b'});            
          $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21.png');          
        }

        if(id == 2) { 
          $('.m4s9mcqp ol li').hide();    
          $('.m4s9mcqp ol li:eq(1)').show();   
          $('.m4s9mcqp ol li:eq(2)').show();       
          st_color2();
          $('#stepp2').css({'background-color':'#e4c72b'});               
          $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21.png');          
        }

        if(id == 3) {
          $('.m4s9mcqp ol li').hide();
          st_color2();
          $('#stepp3').css({'background-color':'#e4c72b'});          
          $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21.png');          
        }
        if(id == 4) {
          $('.m4s9mcqp ol li').hide();
          st_color2();
          $('#stepp4').css({'background-color':'#e4c72b'});            
          $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21.png');          
        }
        if(id == 5) {    
          $('.m4s9mcqp ol li').hide();    
          $('.m4s9mcqp ol li:eq(5)').show();   
          $('.m4s9mcqp ol li:eq(6)').show(); 
          $('.m4s9mcqp ol li:eq(7)').show();           
          st_color2();
          $('#stepp5').css({'background-color':'#e4c72b'});            
          $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21.png');          
        }

        if(id == 6) {
          $('.m4s9mcqp ol li').hide();    
          $('.m4s9mcqp ol li:eq(5)').show();   
          $('.m4s9mcqp ol li:eq(6)').show(); 
          $('.m4s9mcqp ol li:eq(7)').show();
          st_color2();
          $('#stepp5').css({'background-color':'#e4c72b'});            
          $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21.png');          
        }
        if(id == 7) {  
        $('.m4s9mcqp ol li').hide();    
          $('.m4s9mcqp ol li:eq(5)').show();   
          $('.m4s9mcqp ol li:eq(6)').show(); 
          $('.m4s9mcqp ol li:eq(7)').show();        
          st_color2();
          $('#stepp5').css({'background-color':'#e4c72b'});            
          $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21.png');          
        }        

        if(id == 8) {
          $('.m4s9mcqp ol li').hide();    
          $('.m4s9mcqp ol li:eq(8)').show();   
          $('.m4s9mcqp ol li:eq(9)').show(); 
          $('.m4s9mcqp ol li:eq(10)').show(); 
          st_color2();
          $('#stepp6').css({'background-color':'#e4c72b'});          
          $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21.png');          
        }
        if(id == 9) { 
          $('.m4s9mcqp ol li').hide();    
          $('.m4s9mcqp ol li:eq(8)').show();   
          $('.m4s9mcqp ol li:eq(9)').show(); 
          $('.m4s9mcqp ol li:eq(10)').show(); 
           st_color2();
          $('#stepp6').css({'background-color':'#e4c72b'});                   
          $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21.png');          
        }
        if(id == 10) {
          $('.m4s9mcqp ol li').hide();    
          $('.m4s9mcqp ol li:eq(8)').show();   
          $('.m4s9mcqp ol li:eq(9)').show(); 
          $('.m4s9mcqp ol li:eq(10)').show(); 
          st_color2();
          $('#stepp6').css({'background-color':'#e4c72b'});          
          $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21.png');          
        }

        if(id == 11) {
          $('.m4s9mcqp ol li').hide();
          st_color2();
          $('#stepp7').css({'background-color':'#e4c72b'});          
          $('#m4s9img21').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img21.png'); 
      $('.left1').show();
      $('.right1').hide();      
        } 
    //app.Page3=id;
  app.Page1=id;
  app.Page2=id;
  app.Page3=id;
    return false;
}

$('#my-Carousel1').on('slid.bs.carousel', function (e) {
       $('#my-Carousel1 .item2 .ans').removeClass('Dis');
       var id = parseInt(e.relatedTarget.id);
        //alert(id);
  
          if(id == 0){
              $('.left1').hide();              
              $('.right1').hide();
          } else if(id == 11){
            $('.left1').show();
            $('.right1').hide();
          } else {
            $('.left1').show();
            $('.right1').show();
          }
    ShowCarousel2(id);
    
        setMsgBoxHeight2();


      });
    
            $(function () {
                setMsgBoxHeight2();
        });

        function setMsgBoxHeight2() {
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
    }

function TryA(obj){
      $(obj).closest('.item2.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
      $(obj).closest('.item2').find('.row-eq-height').removeClass('Dis'); 
    }

function show_slider1(id){
  console.log("show slider");
  for(var i=0;i<=11;i++)
        {
          console.log("show slider======loop");
          $('#22'+i).hide();
        }
  $('#22'+id).show();


}

    function checkAnswer_k(obj, f) {

         var TempJson=JasonData;
    TempJson.item_id="m4s9";
    TempJson.test_name="Dell Med\\ Module 4\\ Section 9 Item2";
    TempJson.test_id="m4s9t001";
    TempJson.student_id=app.Decrypt(app.LoginEmail);
    TempJson.item_stem=$(obj).closest('.item2').find('.ques').text();
    var options=$(obj).closest('.row-eq-height').find('.ans');
    TempJson.options = new Array();
    $.each(options,function(i,v)
    {
      TempJson.options.push({
        "letter" : i,
        "text"  : $(v).text().trim(),
        "selected":$(v).text().trim() == $(obj).text().trim() ? true : false,
        "correct":  $(v).attr('onclick').indexOf('1')!=-1 ? true : false,
      });
    }); 
           $(obj).closest('.row-eq-height').addClass('Dis');
            $('.item2.active div').removeClass("incorrect").removeClass("selectedAns");
            $(obj).parents(".eq-h").find(".ans")
            $(obj).parents(".white").removeClass("correct incorrect");
            if (f === 1) {
                $(obj).addClass('selectedAns').parents('.white').addClass('correct');
            } else if (f === 0) {
                $(obj).addClass('selectedAns').parents('.white').addClass('incorrect');
            } else {
                $(obj).addClass('selectedAns').parents('.white').addClass('correct bothCorrect');
                $(".5401, .2497").addClass("hide");
                $("." + f).removeClass("hide");
            }
      app.SaveJson(JSON.stringify(TempJson));
        }
        





  $("#my-Carousel1 .additem").on("swipeleft",function(){
   // debugger;
  if(app.isMobile){
  var i = $(this).children("div.item2.active").index()+1;
  var l = $(this).children("div.item2").length;

   //var id = $(this).children("div.item.active")[0].id;
   $("#my-Carousel1 .carousel-indicators li").removeClass("active");
    $(this).children("div.item2").removeClass("active");
     if(i==l)
   {
      $("#my-Carousel1 .carousel-indicators li:nth-child(1)").addClass("active");
      $("#my-Carousel1 .additem div.item2:nth-child(1)").addClass("active");
    ShowCarousel2(0);    
   }
   else{
       i++;
     $("#my-Carousel1 .carousel-indicators li:nth-child("+i+")").addClass("active");
      $("#my-Carousel1 .additem div.item2:nth-child("+i+")").addClass("active");
    ShowCarousel2(i-1);
   }

   //alert(i);
  
       

   setMsgBoxHeight2();
   }
  });
  $("#my-Carousel1 .additem").on("swiperight",function(){
  //debugger;
  if(app.isMobile){
  var i = $(this).children("div.item2.active").index()+1;
  var l = $(this).children("div.item2").length;
   $("#my-Carousel1 .carousel-indicators li").removeClass("active");
    $(this).children("div.item2").removeClass("active");
     if(i==1)
   {
      $("#my-Carousel1 .carousel-indicators li:nth-child("+l+")").addClass("active");
      $("#my-Carousel1 .additem div.item2:nth-child("+l+")").addClass("active");
    ShowCarousel2(11); 
   }
   else{
       i--;
     $("#my-Carousel1 .carousel-indicators li:nth-child("+i+")").addClass("active");
      $("#my-Carousel1 .additem div.item2:nth-child("+i+")").addClass("active");
    ShowCarousel2(i-1);  
   }
          
        
     setMsgBoxHeight2();
     }
  });

  
  $(document).ready(function() {
    //fun_hide();
    //$('#slide1,#slides1').show();

    // st_color();
    hideFun2();
    doctPop2();
    
    $('#stepp1').css({'background-color':'#e4c72b'});
    setMsgBoxHeight2();
  if(app.Page3!=null && app.Page3!=-1)
  {
    $("#my-Carousel1 .carousel-indicators li").removeClass("active");
     $("#my-Carousel1 .additem div.item2").removeClass("active");
    if(app.Page3==0)
  {
    $('.left1').hide();              
    $('.right1').hide();
  }
  else{
    $('.left1').show();              
    $('.right1').show();
  }
    $("#my-Carousel1 .carousel-indicators li:nth-child("+(app.Page3+1)+")").addClass("active");
      $("#my-Carousel1 .additem div.item2:nth-child("+(app.Page3+1)+")").addClass("active");
    ShowCarousel2(app.Page3);
  }
});


