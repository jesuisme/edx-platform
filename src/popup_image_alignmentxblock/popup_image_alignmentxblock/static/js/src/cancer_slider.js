
  function doctPop(){
    $("#step3a_1, #step3a_2, #step3a_3, #step3a_4, #step3a_5, #step3a_6, #step3a_7, #step3a_8, #step3a_9, #step3a_10").hide();
  }

  

    $("#step4_1").click(function(){
    $('#myMd1_c').modal();    
    $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img5.png');
  });
    $("#step4_2").click(function(){
    $('#myMd2_c').modal();    
     $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img8.png');
  });
  $("#step4_3").click(function(){
    $('#myMd3_c').modal();    
     $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img7.png');
  });
  $("#step4_4").click(function(){
    $('#myMd4_c').modal();    
     $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img6.png');
  });

  $("#chall_M1 .col-sm-6").click(function(){
    $('#myMd5_c').modal();         
  });
 
  $("#m4s9img11, #m4s9img11a").click(function(){
    $('#myMd8_c').modal();         
  });
  $("#m4s9img13").click(function(){
    $('#myMd9_c').modal();         
  });

    $("#step2").click(function(){
      console.log("step2===========");
      $('.m4s9mcq #1').addClass('active'); 
    $('#myMd10_c').modal();      
      app.Page1=1;
      app.Page2=1;
      app.Page3=1;    
  });

  $("#step3_1").click(function(){    
    doctPop();
    $("#step3a_0").hide();
    $("#step3a_1").show();
    $('#m4s9s3').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img3_1.png');
   // $('.left1, .right1').hide(); 
  });
  $("#step3_2").click(function(){ 
    doctPop();
    $("#step3a_0").hide();
    $("#step3a_2").show(); 
    $('#m4s9s3').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img3_2.png');
    $('#T1').hide();
    $('#T2').show();
  });
  $("#step3_3").click(function(){    
    doctPop();
    $("#step3a_0").hide();
    $("#step3a_3").show();
    $('#m4s9s3').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img3_3.png');
  });
  $("#step3_4").click(function(){    
    doctPop();
    $("#step3a_0").hide();
    $("#step3a_4").show();
    $('#m4s9s3').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img3_4.png');
  });
  $("#step3_5").click(function(){    
    doctPop();
    $("#step3a_0").hide();
    $("#step3a_5").show();
    $('#m4s9s3').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img3_5.png');
  });
  $("#step3_6").click(function(){
    doctPop();
    $("#step3a_0").hide();
    $("#step3a_6").show();
    $('#m4s9s3').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img3_6.png');
  });
  $("#step3_7").click(function(){
    doctPop();
    $("#step3a_0").hide();
    $("#step3a_7").show();
    $('#m4s9s3').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img3_7.png');
  });
  $("#step3_8").click(function(){
    doctPop();
    $("#step3a_0").hide();
    $("#step3a_8").show();
    $('#m4s9s3').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img3_8.png');
  });
  $("#step3_9").click(function(){
    doctPop();
    $("#step3a_0").hide();
    $("#step3a_9").show();
    $('#m4s9s3').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img3_9.png');
  });
  $("#step3_10").click(function(){
    doctPop();
    $("#step3a_0").hide();
    $("#step3a_10").show();
    $('#m4s9s3').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img3_10.png');
  });
  /* step function */
  function st_color(){
  console.log("st color------")  
  $('#step1,#step2,#step3,#step4,#step5,#step6,#step7').css({'background-color':'#f0f0f0'});
}
 
   $('#step1').on('click', function () {
    console.log("==step1===========");
    $('.m4s9mcq .item').removeClass('active');
    $('.m4s9mcq #0').addClass('active'); 
    $('.m4s9mcq ol li').hide();   
  app.Page1=0;
  app.Page2=0;
  app.Page3=0;
    st_color();    
    $('#step1').css({'background-color':'#21c4ff'});
    $('.left1, .right1').hide();                      
    $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img4.png');    
  $('#T1').show();
  $('#T2').hide();  
  });

    $('#exp1, #step2').on('click', function() {
      console.log("exp1 click--------");
    $('.m4s9mcq .item').removeClass('active');
    $('.m4s9mcq #1').addClass('active'); 
    $('.m4s9mcq ol li').hide();    
    $('.m4s9mcq ol li:eq(1)').show();   
    $('.m4s9mcq ol li:eq(2)').show();   
    $('.m4s9mcq ol li').removeClass('active');
    $('.m4s9mcq ol li:eq(1)').addClass('active');
    
    $('#myMd10_c').modal();
    console.log("mymd10=c======");
    app.Page1=1;
    app.Page2=1;
    app.Page3=1;
    st_color();    
    $('#step2').css({'background-color':'#21c4ff'});    
    $('.left1, .right1').show();                  
    $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img4.png');    
   $('#T1').hide();
  $('#T2').show();
  });


  $('#step3').on('click', function () {
    $('.m4s9mcq .item').removeClass('active');
    $('.m4s9mcq #3').addClass('active');
    $('.m4s9mcq ol li').hide();    
    st_color();
    app.Page1=3;
    app.Page2=3;
    app.Page3=3;
    $('#step3').css({'background-color':'#21c4ff'});
    $('.left1, .right1').show();    
    $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img4.png'); 
  $('#T1').hide();
  $('#T2').show();  
  });

   $('#step4').on('click', function () {
    $('.m4s9mcq .item').removeClass('active');
    $('.m4s9mcq #4').addClass('active');
     $('.m4s9mcq ol li').hide(); 
    st_color();
  app.Page1=4;
  app.Page2=4;
  app.Page3=4;
    $('#step4').css({'background-color':'#21c4ff'});
    $('.left1, .right1').show();    
    $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img4.png');    
  $('#T1').hide();
  $('#T2').show();
  });
   $('#step5').on('click', function () {
    console.log("step5----");
    $('.m4s9mcq .item').removeClass('active');
    $('.m4s9mcq #5').addClass('active');
    $('.m4s9mcq ol li').hide();
    $('.m4s9mcq ol li:eq(5)').show();   
    $('.m4s9mcq ol li:eq(6)').show();
    $('.m4s9mcq ol li:eq(7)').show();
    $('.m4s9mcq ol li').removeClass('active');
    $('.m4s9mcq ol li:eq(5)').addClass('active');
    st_color(); 
  app.Page1=6;
  app.Page2=6;
  app.Page3=6;
    $('#step5').css({'background-color':'#21c4ff'});
    $('.left1, .right1').show();    
    $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img4.png');    
  $('#T1').hide();
  $('#T2').show();
  });

    $('#step6').on('click', function () {
      console.log("step6===");
    $('.m4s9mcq .item').removeClass('active');
    $('.m4s9mcq #8').addClass('active');
    $('.m4s9mcq ol li').hide();
    $('.m4s9mcq ol li:eq(8)').show();   
    $('.m4s9mcq ol li:eq(9)').show();
    $('.m4s9mcq ol li:eq(10)').show();
    $('.m4s9mcq ol li').removeClass('active');
    $('.m4s9mcq ol li:eq(8)').addClass('active');
    st_color();  
  app.Page1=8;
  app.Page2=8;
  app.Page3=8;
    $('#step6').css({'background-color':'#21c4ff'});
    setMsgBoxHeight();
    $('.left1, .right1').show();    
    $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img4.png');   
  $('#T1').hide();
  $('#T2').show();  
  });

    $('#step7').on('click', function () {
      console.log("step7=======");
    $('.m4s9mcq .item').removeClass('active');
    $('.m4s9mcq #11').addClass('active');
    $('.m4s9mcq ol li').hide(); 
    st_color();
  app.Page1=11; 
  app.Page2=11; 
  app.Page3=11; 
    $('#step7').css({'background-color':'#21c4ff'});
    $('.left1').show();              
    $('.right1').hide();    
    $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img4.png');
  $('#T1').hide();
  $('#T2').show();
    });
function hideFun(){
$('#chall_1,#chall_2,#chall_3, .overlayBG').hide();

}
// Challenge 
 $('#cha_1').on('click', function () {            
      $('#cha_1').addClass('selectedAnsCha');
      $('#cha_2, #cha_3').removeClass('selectedAnsCha');
      hideFun();
      $('#chall_1, .overlayBG').show();
  }); 
 $('#cha_2').on('click', function () {            
      $('#cha_2').addClass('selectedAnsCha');
      $('#cha_1, #cha_3').removeClass('selectedAnsCha');
      hideFun();
      $('#chall_2, .overlayBG').show();
  });
 $('#cha_3').on('click', function () {            
      $('#cha_3').addClass('selectedAnsCha');
      $('#cha_1, #cha_2').removeClass('selectedAnsCha');
      hideFun();
      $('#chall_3, .overlayBG').show();
  });

 $('.close_popup, .overlayBG').on('click', function () {  
    hideFun();
    $('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
  });





  //for carousel .. event



function ShowCarousel(id)
{
  //debugger;
 // alert(id);
 console.log("ShowCarousel=======");
 console.log("ShowCarousel===id====", id);
    if(id==undefined)
    {
      return false;
    }
    if(id == 0) {
          st_color();
          $('.m4s9mcq ol li').hide();
          $('#step1').css({'background-color':'#21c4ff'}); 
          $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img4.png');
          //$('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
          // hideFun();
        }
        if(id == 1) {
          $('.m4s9mcq ol li').hide();    
          $('.m4s9mcq ol li:eq(1)').show();   
          $('.m4s9mcq ol li:eq(2)').show();   
          st_color();
          $('#step2').css({'background-color':'#21c4ff'}); 
          $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img4.png');          
         // $('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
          //hideFun();
        }

        if(id == 2) { 
          //alert('up');
          $('.m4s9mcq ol li').hide();    
          $('.m4s9mcq ol li:eq(1)').show();   
          $('.m4s9mcq ol li:eq(2)').show();       
          st_color();
          $('#step2').css({'background-color':'#21c4ff'});
          $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img4.png');          
          //alert('down');
          //$('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
          //hideFun();
        }

        if(id == 3) {
          $('.m4s9mcq ol li').hide();
          st_color();
          $('#step3').css({'background-color':'#21c4ff'});          
          $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img4.png');         
         // $('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
          //hideFun();
        }
        if(id == 4) {
          $('.m4s9mcq ol li').hide();
          st_color();
          $('#step4').css({'background-color':'#21c4ff'});
          $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img4.png');          
          //$('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
         // hideFun();
        }
        if(id == 5) {
        console.log("id =5");    
          $('.m4s9mcq ol li').hide();    
          $('.m4s9mcq ol li:eq(5)').show();   
          $('.m4s9mcq ol li:eq(6)').show(); 
          $('.m4s9mcq ol li:eq(7)').show();           
          st_color();
          $('#step5').css({'background-color':'#21c4ff'});          
          $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img4.png');         
         // $('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
          //hideFun();
        }

        if(id == 6) {
          console.log("id = 6");
          $('.m4s9mcq ol li').hide();    
          $('.m4s9mcq ol li:eq(5)').show();   
          $('.m4s9mcq ol li:eq(6)').show(); 
          $('.m4s9mcq ol li:eq(7)').show();
          st_color();
          $('#step5').css({'background-color':'#21c4ff'});
          $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img4.png');          
          //$('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
          //hideFun();
        }
        if(id == 7) {  
        $('.m4s9mcq ol li').hide();    
          $('.m4s9mcq ol li:eq(5)').show();   
          $('.m4s9mcq ol li:eq(6)').show(); 
          $('.m4s9mcq ol li:eq(7)').show();        
          st_color();
          $('#step5').css({'background-color':'#21c4ff'});            
          $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img4.png');          
          //$('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
          //hideFun();
        }        

        if(id == 8) {
          $('.m4s9mcq ol li').hide();    
          $('.m4s9mcq ol li:eq(8)').show();   
          $('.m4s9mcq ol li:eq(9)').show(); 
          $('.m4s9mcq ol li:eq(10)').show(); 
          st_color();
          $('#step6').css({'background-color':'#21c4ff'});          
          $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img4.png');          
         // $('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
        //  hideFun();
        }
        if(id == 9) { 
          $('.m4s9mcq ol li').hide();    
          $('.m4s9mcq ol li:eq(8)').show();   
          $('.m4s9mcq ol li:eq(9)').show(); 
          $('.m4s9mcq ol li:eq(10)').show(); 
           st_color();
          $('#step6').css({'background-color':'#21c4ff'}); 
          $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img4.png');          
          //$('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
         // hideFun();
        }
        if(id == 10) {
          $('.m4s9mcq ol li').hide();    
          $('.m4s9mcq ol li:eq(8)').show();   
          $('.m4s9mcq ol li:eq(9)').show(); 
          $('.m4s9mcq ol li:eq(10)').show(); 
          st_color();
          $('#step6').css({'background-color':'#21c4ff'});         
          $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img4.png');          
         // $('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
         // hideFun();
        }

        if(id == 11) {
          $('.m4s9mcq ol li').hide();
          st_color();
          $('#step7').css({'background-color':'#21c4ff'});          
          $('#m4s9_1').attr('src','https://s3.us-east-2.amazonaws.com/dms-vbhc/img/m4s9img4.png');          
          //$('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
          //hideFun();
      $('.left1').show();
          $('.right1').hide();
        } 
    app.Page1=id;
    app.Page2=id;
    app.Page3=id;
    return false;
}


$('#my-Carousel1').on('slid.bs.carousel', function (e) {
       $('#my-Carousel1 .item .ans').removeClass('Dis');
       var id = parseInt(e.relatedTarget.id);
       // var id = e.relatedTarget.id;
       console.log("--my-Carousel1===");
       console.log("--my-Carousel1==id=", id);
        ShowCarousel(id);
       // alert(id);
  
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
    
    
        setMsgBoxHeight();


      });


    
            $(function () {
                setMsgBoxHeight();
        });

        function setMsgBoxHeight() {
          console.log("setMsgBoxHeight---");
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






// $('#myMd5_c').on('click', function(data){
//   $('.modal-backdrop fade').removeClass("in");

// });






$('.tryagin').on('click', function(data){
    var obj = this
    console.log("classsssssssssssssss ccccccc");
    console.log("classsssssssssssssss ccccccc this", this);
    $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
    $(obj).closest('.item').find('.row-eq-height').removeClass('Dis');

    
});










    function checkAnswer(obj, f) {
      console.log("checkAnswer=====");
      console.log("checkAnswer===obj==", obj);
      console.log("checkAnswer===f==", f);  
            $(obj).closest('.row-eq-height').addClass('Dis');
            $('.item.active div').removeClass("incorrect").removeClass("selectedAns");
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
        }
        





 $("#my-Carousel1 .additem").on("swipeleft",function(){
  console.log("my-Carousel1 .additem-------");
   if(app.isMobile){
    //debugger;
    var i = $(this).children("div.item.active").index()+1;
   var l = $(this).children("div.item").length;

   //var id = $(this).children("div.item.active")[0].id;
   $("#my-Carousel1 .carousel-indicators li").removeClass("active");
    $(this).children("div.item").removeClass("active");
     if(i==l)
   {
      $("#my-Carousel1 .carousel-indicators li:nth-child(1)").addClass("active");
      $("#my-Carousel1 .additem div.item:nth-child(1)").addClass("active");
    ShowCarousel(0);    
   }
   else{
       i++;
     $("#my-Carousel1 .carousel-indicators li:nth-child("+i+")").addClass("active");
      $("#my-Carousel1 .additem div.item:nth-child("+i+")").addClass("active");
    ShowCarousel(i-1);
   }

   //alert(i);
  
       

   setMsgBoxHeight();
   }
  });
  $("#my-Carousel1 .additem").on("swiperight",function(){
    console.log(". add item 560");
  //debugger;
    if(app.isMobile){
  var i = $(this).children("div.item.active").index()+1;
  var l = $(this).children("div.item").length;
   $("#my-Carousel1 .carousel-indicators li").removeClass("active");
    $(this).children("div.item").removeClass("active");
     if(i==1)
   {
      $("#my-Carousel1 .carousel-indicators li:nth-child("+l+")").addClass("active");
      $("#my-Carousel1 .additem div.item:nth-child("+l+")").addClass("active");
    ShowCarousel(11); 
   }
   else{
       i--;
     $("#my-Carousel1 .carousel-indicators li:nth-child("+i+")").addClass("active");
      $("#my-Carousel1 .additem div.item:nth-child("+i+")").addClass("active");
    ShowCarousel(i-1);  
   }
    //ShowCarousel(i-1);  
    
        
     setMsgBoxHeight();
     }
  });

  
  $(document).ready(function() {
    

    st_color();
    hideFun();
   
    
    $('#step1').css({'background-color':'#21c4ff'});
    setMsgBoxHeight();
  if(app.Page1!=null && app.Page1!=-1)
  {
    $("#my-Carousel1 .carousel-indicators li").removeClass("active");
     $("#my-Carousel1 .additem div.item").removeClass("active");
     if(app.Page1==0)
     {
      $('.left1').hide();              
      $('.right1').hide();
     }
     else{
      $('.left1').show();              
      $('.right1').show();
    }
    $("#my-Carousel1 .carousel-indicators li:nth-child("+(app.Page1+1)+")").addClass("active");
      $("#my-Carousel1 .additem div.item:nth-child("+(app.Page1+1)+")").addClass("active");
    ShowCarousel(app.Page1);
  }
});




