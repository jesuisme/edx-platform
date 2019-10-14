


show_slider(0);

  function doctPop1(){
    $("#step3b_1, #step3b_2, #step3b_3, #step3b_4, #step3b_5, #step3b_6, #step3b_7, #step3b_8, #step3b_9, #step3b_10, #step3b_11, #step3b_12").hide();
  }
  $("#step4_1d").click(function(){
    $('#myMd1_d').modal();    
     $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16_1.png');
  });
  $("#step4_2d").click(function(){
    $('#myMd2_d').modal();    
     $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16_2.png');
  });
  $("#step4_3d").click(function(){
    $('#myMd3_d').modal();    
     $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16_3.png');
  });
  $("#step4_4d").click(function(){
    $('#myMd4_d').modal();    
     $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16_4.png');
  });

  $("#chall_M1 .col-sm-6").click(function(){
    $('#myMd5_d').modal();         
  });
  $("#m4s9img17, #m4s9img17a").click(function(){
    $('#myMd8_d').modal();         
  });
  $("#m4s9img13d").click(function(){
    $('#myMd9_d').modal();         
  });
  $("#stepd2").click(function(){
    console.log("stepd2-----------");
    show_slider(1);
    console.log("stepd2 slider-----");
    $('#myMd10_d').modal();  
          app.Page1=1;
      app.Page2=1;
      app.Page3=1;        
  });



  $("#stepd3_1").click(function(){    
    doctPop1();
    $("#step3b_0").hide();
    $("#step3b_1").show();
    $('#m4s9img15').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img15_1.png');
  });
  $("#stepd3_2").click(function(){   
    doctPop1();
    $("#step3b_0").hide();
    $("#step3b_2").show(); 
    $('#m4s9img15').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img15_2.png');
  });
  $("#stepd3_3").click(function(){    
    doctPop1();
    $("#step3b_0").hide();
    $("#step3b_3").show();
    $('#m4s9img15').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img15_3.png');
  });
  $("#stepd3_4").click(function(){    
    doctPop1();
    $("#step3b_0").hide();
    $("#step3b_4").show();
    $('#m4s9img15').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img15_4.png');
  });
  $("#stepd3_5").click(function(){    
    doctPop1();
    $("#step3b_0").hide();
    $("#step3b_5").show();
    $('#m4s9img15').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img15_5.png');
  });
  $("#stepd3_6").click(function(){
    doctPop1();
    $("#step3b_0").hide();
    $("#step3b_6").show();
    $('#m4s9img15').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img15_6.png');
  });
  $("#stepd3_7").click(function(){
    doctPop1();
    $("#step3b_0").hide();
    $("#step3b_7").show();
    $('#m4s9img15').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img15_7.png');
  });
  $("#stepd3_8").click(function(){
    doctPop1();
    $("#step3b_0").hide();
    $("#step3b_8").show();
    $('#m4s9img15').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img15_8.png');
  });
  $("#stepd3_9").click(function(){
    doctPop1();
    $("#step3b_0").hide();
    $("#step3b_9").show();
    $('#m4s9img15').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img15_9.png');
  });
  $("#stepd3_10").click(function(){
    doctPop1();
    $("#step3b_0").hide();
    $("#step3b_10").show();
    $('#m4s9img15').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img15_10.png');
  });
  $("#stepd3_11").click(function(){
    doctPop1();
    $("#step3b_0").hide();
    $("#step3b_11").show();
    $('#m4s9img15').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img15_11.png');
  });
  $("#stepd3_12").click(function(){
    doctPop1();
    $("#step3b_0").hide();
    $("#step3b_12").show();
    $('#m4s9img15').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img15_12.png');
  });




  function st_color1(){  
  $('#stepd1,#stepd2,#stepd3,#stepd4,#stepd5,#stepd6,#stepd7').css({'background-color':'#f0f0f0'});
}
 
   $('#stepd1').on('click', function () {
    console.log("stepd1===========");
    show_slider(0);
    $('.m4s9mcqd .item1').removeClass('active');
    $('.m4s9mcqd #110').addClass('active'); 
    $('.m4s9mcqd ol li').hide();   
    app.Page1=0;
  app.Page2=0;
  app.Page3=0;
     st_color1();   
    $('#stepd1').css({'background-color':'#33d8ba'});
    $('.left1, .right1').hide();                      
    $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16.png');      
  $('#T1').show();
  $('#T2').hide();
  });

  $('#exp2, #stepd2').on('click', function () {
    console.log("stepd2 exp2===============");
    $('.m4s9mcqd .item1').removeClass('active');
    $('.m4s9mcqd #111').addClass('active'); 
    $('.m4s9mcqd ol li').hide();    
    $('.m4s9mcqd ol li:eq(111)').show();   
    $('.m4s9mcqd ol li:eq(112)').show();   
    $('.m4s9mcqd ol li').removeClass('active');
    $('.m4s9mcqd ol li:eq(1)').addClass('active');
    st_color1();
    //app.Page2=1;
    $('#myMd10_d').modal(); 
    
  app.Page1=1;
  app.Page2=1;
  app.Page3=1;
    $('#stepd2').css({'background-color':'#33d8ba'});    
    $('.left1, .right1').show();                      
    $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16.png');
  $('#T1').hide();
  $('#T2').show();  
  });


  $('#stepd3').on('click', function () {
    console.log("--stepd3=====");
    show_slider(3);
    $('.m4s9mcqd .item1').removeClass('active');
    $('.m4s9mcqd #113').addClass('active');
    $('.m4s9mcqd ol li').hide();    
    st_color1();
    //app.Page2=3;
  app.Page1=3;
  app.Page2=3;
  app.Page3=3;
    $('#stepd3').css({'background-color':'#33d8ba'});
    $('.left1, .right1').show();    
    $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16.png');    
  $('#T1').hide();
  $('#T2').show();
  });

   $('#stepd4').on('click', function () {
    console.log("stepd4=======");
    show_slider(4);
    $('.m4s9mcqd .item1').removeClass('active');
    $('.m4s9mcqd #114').addClass('active');
     $('.m4s9mcqd ol li').hide(); 
    st_color1();
  //app.Page2=4;
  app.Page1=4;
  app.Page2=4;
  app.Page3=4;
    $('#stepd4').css({'background-color':'#33d8ba'});
    $('.left1, .right1').show();    
    $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16.png');     
  $('#T1').hide();
  $('#T2').show();
  });
   $('#stepd5').on('click', function () {
    console.log("stepd5==========");
    show_slider(5);
    $('.m4s9mcqd .item1').removeClass('active');
    $('.m4s9mcqd #115').addClass('active');
    $('.m4s9mcqd ol li').hide();
    $('.m4s9mcqd ol li:eq(5)').show();   
    $('.m4s9mcqd ol li:eq(6)').show();
    $('.m4s9mcqd ol li:eq(7)').show();
    $('.m4s9mcqd ol li').removeClass('active');
    $('.m4s9mcqd ol li:eq(5)').addClass('active');
    st_color1(); 
  //app.Page2=6;  
  app.Page1=6;
  app.Page2=6;
  app.Page3=6;
    $('#stepd5').css({'background-color':'#33d8ba'});
    $('.left1, .right1').show();    
    $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16.png'); 
  $('#T1').hide();
  $('#T2').show();
  });

    $('#stepd6').on('click', function () {
    console.log("stepd6===");
    show_slider(8);
    $('.m4s9mcqd .item1').removeClass('active');
    $('.m4s9mcqd #118').addClass('active');
    $('.m4s9mcqd ol li').hide();
    $('.m4s9mcqd ol li:eq(8)').show();   
    $('.m4s9mcqd ol li:eq(9)').show();
    $('.m4s9mcqd ol li:eq(10)').show();
    $('.m4s9mcqd ol li').removeClass('active');
    $('.m4s9mcqd ol li:eq(8)').addClass('active');
    st_color1();  
  //app.Page2=8;  
    app.Page1=8;
  app.Page2=8;
  app.Page3=8;
    $('#stepd6').css({'background-color':'#33d8ba'});
    setMsgBoxHeight1();
    $('.left1, .right1').show();    
    $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16.png'); 
    $('#T1').hide();
  $('#T2').show();
  });

    $('#stepd7').on('click', function () {
      console.log("stepd7====");
      show_slider(11);
    $('.m4s9mcqd .item1').removeClass('active');
    $('.m4s9mcqd #1111').addClass('active');
    $('.m4s9mcqd ol li').hide(); 
    st_color1();
     //app.Page2=11; 
  app.Page1=11;
  app.Page2=11;
  app.Page3=11;
    $('#stepd7').css({'background-color':'#33d8ba'});
    $('.left1').show();              
    $('.right1').hide();    
    $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16.png');    
  $('#T1').hide();
  $('#T2').show();
  });


function hideFun1(){
$('#chall_1,#chall_2,#chall_3, .overlayBG').hide();

}


// Challenge 
 $('#cha_11').on('click', function () {
  console.log("cha_11-----------");            
      $('#cha_11').addClass('selectedAnsCha');
      $('#cha_21, #cha_31').removeClass('selectedAnsCha');
      hideFun1();
      $('#chall_1, .overlayBG').show();
  }); 
 $('#cha_21').on('click', function () {
  console.log("cha_21-----------");            
      $('#cha_21').addClass('selectedAnsCha');
      $('#cha_11, #cha_31').removeClass('selectedAnsCha');
      hideFun1();
      $('#chall_2, .overlayBG').show();
  });
 $('#cha_31').on('click', function () {
    console.log("cha_31-----------");            
      $('#cha_31').addClass('selectedAnsCha');
      $('#cha_11, #cha_21').removeClass('selectedAnsCha');
      hideFun1();
      $('#chall_3, .overlayBG').show();
  });

 $('.close_popup, .overlayBG').on('click', function () {  
    hideFun1();
    $('#cha_11,#cha_21,#cha_31').removeClass('selectedAnsCha');
  });





function ShowCarousel1(id)
{
  //debugger;
  //alert(id);
    if(id==undefined)
    {
      return false;
    }
    if(id == 0) {    
          st_color1();
          $('.m4s9mcqd ol li').hide();
          $('#stepd1').css({'background-color':'#33d8ba'});         
          $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16.png');
        }
        if(id == 1) {
          $('.m4s9mcqd ol li').hide();    
          $('.m4s9mcqd ol li:eq(111)').show();   
          $('.m4s9mcqd ol li:eq(112)').show();   
          st_color1();
          $('#stepd2').css({'background-color':'#33d8ba'});            
          $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16.png');          
        }

        if(id == 2) { 
          $('.m4s9mcqd ol li').hide();    
          $('.m4s9mcqd ol li:eq(111)').show();   
          $('.m4s9mcqd ol li:eq(112)').show();       
          st_color1();
          $('#stepd2').css({'background-color':'#33d8ba'});               
          $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16.png');          
        }

        if(id == 3) {
          $('.sd ol li').hide();
          st_color1();
          $('#stepd3').css({'background-color':'#33d8ba'});          
          $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16.png');          
        }
        if(id == 4) {
          $('.m4s9mcqd ol li').hide();
          st_color1();
          $('#stepd4').css({'background-color':'#33d8ba'});            
          $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16.png');          
        }
        if(id == 5) {    
          $('.m4s9mcqd ol li').hide();    
          $('.m4s9mcqd ol li:eq(115)').show();   
          $('.m4s9mcqd ol li:eq(116)').show(); 
          $('.m4s9mcqd ol li:eq(117)').show();           
          st_color1();
          $('#stepd5').css({'background-color':'#33d8ba'});            
          $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16.png');          
        }

        if(id == 6) {
          $('.m4s9mcqd ol li').hide();    
          $('.m4s9mcqd ol li:eq(115)').show();   
          $('.m4s9mcqd ol li:eq(116)').show(); 
          $('.m4s9mcqd ol li:eq(117)').show();
          st_color1();
          $('#stepd5').css({'background-color':'#33d8ba'});            
          $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16.png');          
        }
        if(id == 7) {  
        $('.m4s9mcqd ol li').hide();    
          $('.m4s9mcqd ol li:eq(115)').show();   
          $('.m4s9mcqd ol li:eq(116)').show(); 
          $('.m4s9mcqd ol li:eq(117)').show();        
          st_color1();
          $('#stepd5').css({'background-color':'#33d8ba'});            
          $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16.png');          
        }        

        if(id == 8) {
          $('.m4s9mcqd ol li').hide();    
          $('.m4s9mcqd ol li:eq(118)').show();   
          $('.m4s9mcqd ol li:eq(119)').show(); 
          $('.m4s9mcqd ol li:eq(1110)').show(); 
          st_color1();
          $('#stepd6').css({'background-color':'#33d8ba'});          
          $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16.png');          
        }
        if(id == 9) { 
          $('.m4s9mcqd ol li').hide();    
          $('.m4s9mcqd ol li:eq(118)').show();   
          $('.m4s9mcqd ol li:eq(119)').show(); 
          $('.m4s9mcqd ol li:eq(1110)').show(); 
           st_color1();
          $('#stepd6').css({'background-color':'#33d8ba'});                   
          $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16.png');          
        }
        if(id == 10) {
          $('.m4s9mcqd ol li').hide();    
          $('.m4s9mcqd ol li:eq(118)').show();   
          $('.m4s9mcqd ol li:eq(119)').show(); 
          $('.m4s9mcqd ol li:eq(1110)').show(); 
          st_color1();
          $('#stepd6').css({'background-color':'#33d8ba'});          
          $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16.png');          
        }

        if(id == 11) {
          $('.m4s9mcqd ol li').hide();
          st_color1();
          $('#stepd7').css({'background-color':'#33d8ba'});          
          $('#m4s9img16').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img16.png');         
      $('.left1').show();
          $('.right1').hide();
        } 
    //app.Page2=id;
  app.Page1=id;
  app.Page2=id;
  app.Page3=id;
    return false;
}


$('.stepd5_slide').on('click', function(data){
    var dataevent = this.id;
    var dot_id = dataevent.split('1')[1];
    console.log("classsssssssssssssss");
    console.log("classsssssssssssssssdot_id===", dot_id);
    // console.log(this.id);
    show_slider(dot_id);
    // ShowCarousel1(dot_id);
    if (dot_id == 5) {
      $('.m4s9mcqd ol li').removeClass('active');
      $('.m4s9mcqd ol li:eq(5)').addClass('active');

    }
    if (dot_id == 6) {
      $('.m4s9mcqd ol li').removeClass('active');
      $('.m4s9mcqd ol li:eq(6)').addClass('active');

    }
    if (dot_id == 7) {
      $('.m4s9mcqd ol li').removeClass('active');
      $('.m4s9mcqd ol li:eq(7)').addClass('active');

    }
    
});


$('.stepd8_slide').on('click', function(data){
    var dataevent = this.id;
    var dot_id = dataevent.split('slide')[1];
    console.log("classsssssssssssssss");
    console.log("classsssssssssssssssdot_id===", dot_id);
    // console.log(this.id);
    show_slider(dot_id);
    // ShowCarousel1(dot_id);
    if (dot_id == 8) {
      $('.m4s9mcqd ol li').removeClass('active');
      $('.m4s9mcqd ol li:eq(8)').addClass('active');

    }
    if (dot_id == 9) {
      $('.m4s9mcqd ol li').removeClass('active');
      $('.m4s9mcqd ol li:eq(9)').addClass('active');

    }
    if (dot_id == 10) {
      $('.m4s9mcqd ol li').removeClass('active');
      $('.m4s9mcqd ol li:eq(10)').addClass('active');

    }
    
});






$('#my-Carousel1d').on('slid.bs.carousel', function (e) {
       $('#my-Carousel1d .item1 .ans').removeClass('Dis');
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
    ShowCarousel1(id);
    
        setMsgBoxHeight1();


      });
    
            $(function () {
                setMsgBoxHeight1();
        });

        function setMsgBoxHeight1() {
          console.log("diabetis  setMsgBoxHeight1");
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


















$('.tryagin1').on('click', function(data){
    // var dataevent = this.id;
    // var dot_id = dataevent.split('1')[1];
    console.log("tryagin1========");
    console.log("classsssssssssssssss ccccccc");
    console.log("classsssssssssssssss ccccccc this", this);
    // $('.item1.active div').removeClass("incorrect").removeClass("selectedAns");
    // $(this).removeClass('selectedAns').removeClass('incorrect');


    $(this).closest('.item1.active').find('div').removeClass("incorrect").removeClass("selectedAns");
    $(this).closest('.item1').find('.row-eq-height').removeClass('Dis');
});

$('.tryagin11').on('click', function(data){
    console.log("tryagin1========");
    console.log("classsssssssssssssss ccccccc");
    console.log("classsssssssssssssss ccccccc this", this);
   


    $(this).removeClass('selectedAns').parents('.white').removeClass('incorrect');
    $(this).closest('.item1').find('.row-eq-height').removeClass('Dis');
    $(this).closest('.item1').find('.customansclass2').removeClass('selectedAns'); 
});





$('.nextquestion').on('click', function(data){
   console.log("nextquestion---------");
    $('.m4s9mcqd ol li').removeClass('active');
    $('.m4s9mcqd ol li:eq(9)').addClass('active');
    show_slider(9);
    
    
});


function TryA(obj){
      $(obj).closest('.item1.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      $(obj).closest('.item1').find('.row-eq-height').removeClass('Dis'); 
    }

function show_slider(id){
  console.log("show slider");
  for(var i=0;i<=11;i++)
        {
          console.log("show slider======loop");
          $('#11'+i).hide();
        }
  $('#11'+id).show();


}


    function checkAnswer_d(obj, f) {

        var TempJson=JasonData;
    TempJson.item_id="m4s9";
    TempJson.test_name="Dell Med\\ Module 4\\ Section 9 Item1";
    TempJson.test_id="m4s9t001";
    TempJson.student_id=app.Decrypt(app.LoginEmail);
    TempJson.item_stem=$(obj).closest('.item1').find('.ques').text();
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
            $('.item1.active div').removeClass("incorrect").removeClass("selectedAns");
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
        





  $("#my-Carousel1d .additem").on("swipeleft",function(){
    //debugger;
      if(app.isMobile){
    var i = $(this).children("div.item1.active").index()+1;
   var l = $(this).children("div.item1").length;

   //var id = $(this).children("div.item.active")[0].id;
   $("#my-Carousel1d .carousel-indicators li").removeClass("active");
    $(this).children("div.item1").removeClass("active");
     if(i==l)
   {
      $("#my-Carousel1d .carousel-indicators li:nth-child(1)").addClass("active");
      $("#my-Carousel1d .additem1 div.item1:nth-child(1)").addClass("active");
    ShowCarousel1(0);    
   }
   else{
       i++;
     $("#my-Carousel1d .carousel-indicators li:nth-child("+i+")").addClass("active");
      $("#my-Carousel1d .additem1 div.item1:nth-child("+i+")").addClass("active");
    ShowCarousel1(i-1);
   }

   //alert(i);
  
       

   setMsgBoxHeight1();
   }
  });
  $("#my-Carousel1d .additem").on("swiperight",function(){
  //debugger;
    if(app.isMobile){
     var i = $(this).children("div.item1.active").index()+1;
   var l = $(this).children("div.item1").length;
   $("#my-Carousel1d .carousel-indicators li").removeClass("active");
    $(this).children("div.item1").removeClass("active");
     if(i==1)
   {
      $("#my-Carousel1d .carousel-indicators li:nth-child("+l+")").addClass("active");
      $("#my-Carousel1d .additem div.item1:nth-child("+l+")").addClass("active");
    ShowCarousel1(11); 
   }
   else{
       i--;
     $("#my-Carousel1d .carousel-indicators li:nth-child("+i+")").addClass("active");
      $("#my-Carousel1d .additem div.item1:nth-child("+i+")").addClass("active");
    ShowCarousel1(i-1);  
   }
    //ShowCarousel(i-1);  
    
        
     setMsgBoxHeight1();
     }
  });

  
  $(document).ready(function() {
    //fun_hide();
    //$('#slide1,#slides1').show();

    st_color1();
    hideFun1();
    doctPop1();
    
    $('#stepd1').css({'background-color':'#33d8ba'});
    setMsgBoxHeight1();
  if(app.Page2!=null && app.Page2!=-1)
  {
    console.log("diabetis page2========");
    $("#my-Carousel1d .carousel-indicators li").removeClass("active");
    $("#my-Carousel1d .additem div.item1").removeClass("active");
    if(app.Page2==0)
  {
    console.log("diabetis page2===0=====");
    $('.left1').hide();              
    $('.right1').hide();
  }
  else{
    console.log("diabetis page2=====else===");
    $('.left1').show();              
    $('.right1').show();
  }
  console.log("diabetis page2===last=====");
    $("#my-Carousel1d .carousel-indicators li:nth-child("+(app.Page2+1)+")").addClass("active");
      $("#my-Carousel1d .additem div.item1:nth-child("+(app.Page2+1)+")").addClass("active");
    ShowCarousel1(app.Page2);
  }
});



