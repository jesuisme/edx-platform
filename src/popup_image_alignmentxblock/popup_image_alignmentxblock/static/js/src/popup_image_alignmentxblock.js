/* Javascript for PopupImageAlignmentXBlock. */
function checkAnswer(obj, f) {
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
function TryA(obj) {
  $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
  //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
  $(obj).closest('.item').find('.row-eq-height').removeClass('Dis');
}
function PopupImageAlignmentXBlock(runtime, element) {
  // $('#cancer_slide').hide();

  sessionStorage.setItem('cancer_html', $("#cancer-step").html());
  $("#cancer-step").remove();
  sessionStorage.setItem('diabetes_html', $("#diabetes-step").html());
  $("#diabetes-step").remove();
  sessionStorage.setItem('pain_html', $("#pain-step").html());
  $("#pain-step").remove();


  /* for roll over */
  $("#cancer, .m4s9img2_0bg").hover(function () {
    $('.m4s9img2_0bg').css({ "background": "rgba(33,196,255,0.5)" });
    $('#cancer').addClass('bgcH1');
  }, function () {
    $('.m4s9img2_0bg').css("background-color", "rgba(0,0,0,0)");
    $('#cancer').removeClass('bgcH1');
  });

  $("#diabetes, .m4s9img2_1bg").hover(function () {
    $('.m4s9img2_1bg').css({ "background": "rgba(51,216,186,0.5)" });
    $('#diabetes').addClass('bgcH2');
  }, function () {
    $('.m4s9img2_1bg').css("background-color", "rgba(0,0,0,0)");
    $('#diabetes').removeClass('bgcH2');
  });

  $("#pain, .m4s9img2_2bg").hover(function () {
    $('.m4s9img2_2bg').css({ "background": "rgba(228, 199, 43,0.5)" });
    $('#pain').addClass('bgcH3');
  }, function () {
    $('.m4s9img2_2bg').css("background-color", "rgba(0,0,0,0)");
    $('#pain').removeClass('bgcH3');
  });



  $('#cancer, .m4s9img2_0bg').on('click', function () {
    $('#cancer').removeClass('bgc');
    $('#cancer').addClass('bgc1');
    $('#diabetes, #pain').addClass('bgc');
    $('.m4s9img2_0bg, .m4s9img2_1bg, .m4s9img2_2bg, #m4s9img2_0, #m4s9img2_1, #m4s9img2_2').hide();
    $('.left1, .right1').hide();


    $("#m4s9-slider-steps").html(sessionStorage.getItem("cancer_html"));


    function doctPop() {
      $("#step3a_1, #step3a_2, #step3a_3, #step3a_4, #step3a_5, #step3a_6, #step3a_7, #step3a_8, #step3a_9, #step3a_10").hide();
    }



    $("#step4_1").click(function () {
      $('#myMd1').modal();
      $('#m4s9_1').attr('src', '/static/images/m4s9img5.png');
    });
    $("#step4_2").click(function () {
      $('#myMd2').modal();
      $('#m4s9_1').attr('src', '/static/images/m4s9img8.png');
    });
    $("#step4_3").click(function () {
      $('#myMd3').modal();
      $('#m4s9_1').attr('src', '/static/images/m4s9img7.png');
    });
    $("#step4_4").click(function () {
      $('#myMd4').modal();
      $('#m4s9_1').attr('src', '/static/images/m4s9img6.png');
    });

    $("#chall_M1 .col-sm-6").click(function () {
      $('#myMd5').modal();
    });

    $("#m4s9img11, #m4s9img11a").click(function () {
      $('#myMd8').modal();
    });
    $("#m4s9img13").click(function () {
      $('#myMd9').modal();
    });

    $("#step2").click(function () {
      $('#myMd10').modal();
      app.Page1 = 1;
      app.Page2 = 1;
      app.Page3 = 1;
    });





    $("#step3_1").click(function () {
      doctPop();
      $("#step3a_0").hide();
      $("#step3a_1").show();
      $('#m4s9s3').attr('src', '/static/images/m4s9img3_1.png');
      // $('.left1, .right1').hide(); 
    });
    $("#step3_2").click(function () {
      doctPop();
      $("#step3a_0").hide();
      $("#step3a_2").show();
      $('#m4s9s3').attr('src', '/static/images/m4s9img3_2.png');
      $('#T1').hide();
      $('#T2').show();
    });
    $("#step3_3").click(function () {
      doctPop();
      $("#step3a_0").hide();
      $("#step3a_3").show();
      $('#m4s9s3').attr('src', '/static/images/m4s9img3_3.png');
    });
    $("#step3_4").click(function () {
      doctPop();
      $("#step3a_0").hide();
      $("#step3a_4").show();
      $('#m4s9s3').attr('src', '/static/images/m4s9img3_4.png');
    });
    $("#step3_5").click(function () {
      doctPop();
      $("#step3a_0").hide();
      $("#step3a_5").show();
      $('#m4s9s3').attr('src', '/static/images/m4s9img3_5.png');
    });
    $("#step3_6").click(function () {
      doctPop();
      $("#step3a_0").hide();
      $("#step3a_6").show();
      $('#m4s9s3').attr('src', '/static/images/m4s9img3_6.png');
    });
    $("#step3_7").click(function () {
      doctPop();
      $("#step3a_0").hide();
      $("#step3a_7").show();
      $('#m4s9s3').attr('src', '/static/images/m4s9img3_7.png');
    });
    $("#step3_8").click(function () {
      doctPop();
      $("#step3a_0").hide();
      $("#step3a_8").show();
      $('#m4s9s3').attr('src', '/static/images/m4s9img3_8.png');
    });
    $("#step3_9").click(function () {
      doctPop();
      $("#step3a_0").hide();
      $("#step3a_9").show();
      $('#m4s9s3').attr('src', '/static/images/m4s9img3_9.png');
    });
    $("#step3_10").click(function () {
      doctPop();
      $("#step3a_0").hide();
      $("#step3a_10").show();
      $('#m4s9s3').attr('src', '/static/images/m4s9img3_10.png');
    });

    /* step function */

    function st_color() {
      $('#step1,#step2,#step3,#step4,#step5,#step6,#step7').css({ 'background-color': '#f0f0f0' });
    }

    $('#step1').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #0').addClass('active');
      $('.m4s9mcq ol li').hide();
      app.Page1 = 0;
      app.Page2 = 0;
      app.Page3 = 0;
      st_color();
      $('#step1').css({ 'background-color': '#21c4ff' });
      $('.left1, .right1').hide();
      $('#m4s9_1').attr('src', '/static/images/m4s9img4.png');
      $('#T1').show();
      $('#T2').hide();
    });

    $('#exp1, #step2').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #1').addClass('active');
      $('.m4s9mcq ol li').hide();
      $('.m4s9mcq ol li:eq(1)').show();
      $('.m4s9mcq ol li:eq(2)').show();
      $('.m4s9mcq ol li').removeClass('active');
      $('.m4s9mcq ol li:eq(1)').addClass('active');

      $('#myMd10').modal();
      app.Page1 = 1;
      app.Page2 = 1;
      app.Page3 = 1;
      st_color();
      $('#step2').css({ 'background-color': '#21c4ff' });
      $('.left1, .right1').show();
      $('#m4s9_1').attr('src', '/static/images/m4s9img4.png');
      $('#T1').hide();
      $('#T2').show();
    });


    $('#step3').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #3').addClass('active');
      $('.m4s9mcq ol li').hide();
      st_color();
      app.Page1 = 3;
      app.Page2 = 3;
      app.Page3 = 3;
      $('#step3').css({ 'background-color': '#21c4ff' });
      $('.left1, .right1').show();
      $('#m4s9_1').attr('src', '/static/images/m4s9img4.png');
      $('#T1').hide();
      $('#T2').show();
    });

    $('#step4').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #4').addClass('active');
      $('.m4s9mcq ol li').hide();
      st_color();
      app.Page1 = 4;
      app.Page2 = 4;
      app.Page3 = 4;
      $('#step4').css({ 'background-color': '#21c4ff' });
      $('.left1, .right1').show();
      $('#m4s9_1').attr('src', '/static/images/m4s9img4.png');
      $('#T1').hide();
      $('#T2').show();
    });
    $('#step5').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #5').addClass('active');
      $('.m4s9mcq ol li').hide();
      $('.m4s9mcq ol li:eq(5)').show();
      $('.m4s9mcq ol li:eq(6)').show();
      $('.m4s9mcq ol li:eq(7)').show();
      $('.m4s9mcq ol li').removeClass('active');
      $('.m4s9mcq ol li:eq(5)').addClass('active');
      st_color();
      app.Page1 = 6;
      app.Page2 = 6;
      app.Page3 = 6;
      $('#step5').css({ 'background-color': '#21c4ff' });
      $('.left1, .right1').show();
      $('#m4s9_1').attr('src', '/static/images/m4s9img4.png');
      $('#T1').hide();
      $('#T2').show();
    });

    $('#step6').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #8').addClass('active');
      $('.m4s9mcq ol li').hide();
      $('.m4s9mcq ol li:eq(8)').show();
      $('.m4s9mcq ol li:eq(9)').show();
      $('.m4s9mcq ol li:eq(10)').show();
      $('.m4s9mcq ol li').removeClass('active');
      $('.m4s9mcq ol li:eq(8)').addClass('active');
      st_color();
      app.Page1 = 8;
      app.Page2 = 8;
      app.Page3 = 8;
      $('#step6').css({ 'background-color': '#21c4ff' });
      setMsgBoxHeight();
      $('.left1, .right1').show();
      $('#m4s9_1').attr('src', '/static/images/m4s9img4.png');
      $('#T1').hide();
      $('#T2').show();
    });

    $('#step7').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #11').addClass('active');
      $('.m4s9mcq ol li').hide();
      st_color();
      app.Page1 = 11;
      app.Page2 = 11;
      app.Page3 = 11;
      $('#step7').css({ 'background-color': '#21c4ff' });
      $('.left1').show();
      $('.right1').hide();
      $('#m4s9_1').attr('src', '/static/images/m4s9img4.png');
      $('#T1').hide();
      $('#T2').show();
    });


    function hideFun() {
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



    function ShowCarousel(id) {
      //debugger;
      // alert(id);
      if (id == undefined) {
        return false;
      }
      if (id == 0) {
        st_color();
        $('.m4s9mcq ol li').hide();
        $('#step1').css({ 'background-color': '#21c4ff' });
        $('#m4s9_1').attr('src', '/static/images/m4s9img4.png');
        //$('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
        // hideFun();
      }
      if (id == 1) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(1)').show();
        $('.m4s9mcq ol li:eq(2)').show();
        st_color();
        $('#step2').css({ 'background-color': '#21c4ff' });
        $('#m4s9_1').attr('src', '/static/images/m4s9img4.png');
        // $('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
        //hideFun();
      }

      if (id == 2) {
        //alert('up');
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(1)').show();
        $('.m4s9mcq ol li:eq(2)').show();
        st_color();
        $('#step2').css({ 'background-color': '#21c4ff' });
        $('#m4s9_1').attr('src', '/static/images/m4s9img4.png');
        //alert('down');
        //$('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
        //hideFun();
      }

      if (id == 3) {
        $('.m4s9mcq ol li').hide();
        st_color();
        $('#step3').css({ 'background-color': '#21c4ff' });
        $('#m4s9_1').attr('src', '/static/images/m4s9img4.png');
        // $('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
        //hideFun();
      }
      if (id == 4) {
        $('.m4s9mcq ol li').hide();
        st_color();
        $('#step4').css({ 'background-color': '#21c4ff' });
        $('#m4s9_1').attr('src', '/static/images/m4s9img4.png');
        //$('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
        // hideFun();
      }
      if (id == 5) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(5)').show();
        $('.m4s9mcq ol li:eq(6)').show();
        $('.m4s9mcq ol li:eq(7)').show();
        st_color();
        $('#step5').css({ 'background-color': '#21c4ff' });
        $('#m4s9_1').attr('src', '/static/images/m4s9img4.png');
        // $('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
        //hideFun();
      }

      if (id == 6) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(5)').show();
        $('.m4s9mcq ol li:eq(6)').show();
        $('.m4s9mcq ol li:eq(7)').show();
        st_color();
        $('#step5').css({ 'background-color': '#21c4ff' });
        $('#m4s9_1').attr('src', '/static/images/m4s9img4.png');
        //$('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
        //hideFun();
      }
      if (id == 7) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(5)').show();
        $('.m4s9mcq ol li:eq(6)').show();
        $('.m4s9mcq ol li:eq(7)').show();
        st_color();
        $('#step5').css({ 'background-color': '#21c4ff' });
        $('#m4s9_1').attr('src', '/static/images/m4s9img4.png');
        //$('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
        //hideFun();
      }

      if (id == 8) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(8)').show();
        $('.m4s9mcq ol li:eq(9)').show();
        $('.m4s9mcq ol li:eq(10)').show();
        st_color();
        $('#step6').css({ 'background-color': '#21c4ff' });
        $('#m4s9_1').attr('src', '/static/images/m4s9img4.png');
        // $('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
        //  hideFun();
      }
      if (id == 9) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(8)').show();
        $('.m4s9mcq ol li:eq(9)').show();
        $('.m4s9mcq ol li:eq(10)').show();
        st_color();
        $('#step6').css({ 'background-color': '#21c4ff' });
        $('#m4s9_1').attr('src', '/static/images/m4s9img4.png');
        //$('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
        // hideFun();
      }
      if (id == 10) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(8)').show();
        $('.m4s9mcq ol li:eq(9)').show();
        $('.m4s9mcq ol li:eq(10)').show();
        st_color();
        $('#step6').css({ 'background-color': '#21c4ff' });
        $('#m4s9_1').attr('src', '/static/images/m4s9img4.png');
        // $('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
        // hideFun();
      }

      if (id == 11) {
        $('.m4s9mcq ol li').hide();
        st_color();
        $('#step7').css({ 'background-color': '#21c4ff' });
        $('#m4s9_1').attr('src', '/static/images/m4s9img4.png');
        //$('#cha_1,#cha_2,#cha_3').removeClass('selectedAnsCha');
        //hideFun();
        $('.left1').show();
        $('.right1').hide();
      }
      app.Page1 = id;
      app.Page2 = id;
      app.Page3 = id;
      return false;
    }


    $('#my-Carousel1').on('slid.bs.carousel', function (e) {
      $('#my-Carousel1 .item .ans').removeClass('Dis');
      var id = parseInt(e.relatedTarget.id);
      // var id = e.relatedTarget.id;
      ShowCarousel(id);
      //alert(id);

      if (id == 0) {
        $('.left1').hide();
        $('.right1').hide();
      } else if (id == 11) {
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
      var f_height = 0;
      var msgboxHeight = $(".carousel .active .row-eq-height").height();
      var l = $(".carousel .active .ans").length;
      for (var i = 1; i <= l; i++) {
        var h = $(".carousel .active .row-eq-height div:nth-child(" + i + ") .ans").css("height");
        var h1 = h.split('p');
        if (f_height < Number(h1[0])) {
          f_height = h1[0];
        }
      }
      $(".carousel .active .ans").css("height", f_height + "px");
    }

    



    $("#my-Carousel1 .additem").on("swipeleft", function () {
      if (app.isMobile) {
        //debugger;
        var i = $(this).children("div.item.active").index() + 1;
        var l = $(this).children("div.item").length;

        //var id = $(this).children("div.item.active")[0].id;
        $("#my-Carousel1 .carousel-indicators li").removeClass("active");
        $(this).children("div.item").removeClass("active");
        if (i == l) {
          $("#my-Carousel1 .carousel-indicators li:nth-child(1)").addClass("active");
          $("#my-Carousel1 .additem div.item:nth-child(1)").addClass("active");
          ShowCarousel(0);
        }
        else {
          i++;
          $("#my-Carousel1 .carousel-indicators li:nth-child(" + i + ")").addClass("active");
          $("#my-Carousel1 .additem div.item:nth-child(" + i + ")").addClass("active");
          ShowCarousel(i - 1);
        }

        //alert(i);



        setMsgBoxHeight();
      }
    });
    $("#my-Carousel1 .additem").on("swiperight", function () {
      //debugger;
      if (app.isMobile) {
        var i = $(this).children("div.item.active").index() + 1;
        var l = $(this).children("div.item").length;
        $("#my-Carousel1 .carousel-indicators li").removeClass("active");
        $(this).children("div.item").removeClass("active");
        if (i == 1) {
          $("#my-Carousel1 .carousel-indicators li:nth-child(" + l + ")").addClass("active");
          $("#my-Carousel1 .additem div.item:nth-child(" + l + ")").addClass("active");
          ShowCarousel(11);
        }
        else {
          i--;
          $("#my-Carousel1 .carousel-indicators li:nth-child(" + i + ")").addClass("active");
          $("#my-Carousel1 .additem div.item:nth-child(" + i + ")").addClass("active");
          ShowCarousel(i - 1);
        }
        //ShowCarousel(i-1);  


        setMsgBoxHeight();
      }
    });


    $(document).ready(function () {
      //fun_hide();
      //$('#slide1,#slides1').show();

      st_color();
      hideFun();
      // doctPop();

      $('#step1').css({ 'background-color': '#21c4ff' });
      setMsgBoxHeight();
      if (app.Page1 != null && app.Page1 != -1) {
        $("#my-Carousel1 .carousel-indicators li").removeClass("active");
        $("#my-Carousel1 .additem div.item").removeClass("active");
        if (app.Page1 == 0) {
          $('.left1').hide();
          $('.right1').hide();
        }
        else {
          $('.left1').show();
          $('.right1').show();
        }
        $("#my-Carousel1 .carousel-indicators li:nth-child(" + (app.Page1 + 1) + ")").addClass("active");
        $("#my-Carousel1 .additem div.item:nth-child(" + (app.Page1 + 1) + ")").addClass("active");
        ShowCarousel(app.Page1);
      }
    });



  });


  // ---------------------------------------------------------------------------------------------
  $('#diabetes, .m4s9img2_1bg').on('click', function () {
    $('#diabetes').removeClass('bgc');
    $('#diabetes').addClass('bgc2');
    $('#cancer').removeClass('bgc1');
    $('#cancer, #pain').addClass('bgc');
    $('.m4s9img2_0bg, .m4s9img2_1bg, .m4s9img2_2bg, #m4s9img2_0, #m4s9img2_1, #m4s9img2_2').hide();
    $('.left1, .right1').hide();

    $("#m4s9-slider-steps").html(sessionStorage.getItem("diabetes_html"));

    function doctPop() {
      $("#step3b_1, #step3b_2, #step3b_3, #step3b_4, #step3b_5, #step3b_6, #step3b_7, #step3b_8, #step3b_9, #step3b_10, #step3b_11, #step3b_12").hide();
    }
    $("#step4_1").click(function () {
      $('#myMd1').modal();
      $('#m4s9img16').attr('src', '/static/images/m4s9img16_1.png');
    });
    $("#step4_2").click(function () {
      $('#myMd2').modal();
      $('#m4s9img16').attr('src', '/static/images/m4s9img16_2.png');
    });
    $("#step4_3").click(function () {
      $('#myMd3').modal();
      $('#m4s9img16').attr('src', '/static/images/m4s9img16_3.png');
    });
    $("#step4_4").click(function () {
      $('#myMd4').modal();
      $('#m4s9img16').attr('src', '/static/images/m4s9img16_4.png');
    });

    $("#chall_M1 .col-sm-6").click(function () {
      $('#myMd5').modal();
    });
    /*$("#chall_M2 .col-sm-6").click(function(){
      $('#myMd5').modal();         
    });
    $("#chall_M3 .col-sm-6").click(function(){
      $('#myMd5').modal();         
    });*/
    $("#m4s9img17, #m4s9img17a").click(function () {
      $('#myMd8').modal();
    });
    $("#m4s9img13").click(function () {
      $('#myMd9').modal();
    });
    $("#stepd2").click(function () {
      $('#myMd10').modal();
      app.Page1 = 1;
      app.Page2 = 1;
      app.Page3 = 1;
    });



    $("#stepd3_1").click(function () {
      doctPop();
      $("#step3b_0").hide();
      $("#step3b_1").show();
      $('#m4s9img15').attr('src', '/static/images/m4s9img15_1.png');
    });
    $("#stepd3_2").click(function () {
      doctPop();
      $("#step3b_0").hide();
      $("#step3b_2").show();
      $('#m4s9img15').attr('src', '/static/images/m4s9img15_2.png');
    });
    $("#stepd3_3").click(function () {
      doctPop();
      $("#step3b_0").hide();
      $("#step3b_3").show();
      $('#m4s9img15').attr('src', '/static/images/m4s9img15_3.png');
    });
    $("#stepd3_4").click(function () {
      doctPop();
      $("#step3b_0").hide();
      $("#step3b_4").show();
      $('#m4s9img15').attr('src', '/static/images/m4s9img15_4.png');
    });
    $("#stepd3_5").click(function () {
      doctPop();
      $("#step3b_0").hide();
      $("#step3b_5").show();
      $('#m4s9img15').attr('src', '/static/images/m4s9img15_5.png');
    });
    $("#stepd3_6").click(function () {
      doctPop();
      $("#step3b_0").hide();
      $("#step3b_6").show();
      $('#m4s9img15').attr('src', '/static/images/m4s9img15_6.png');
    });
    $("#stepd3_7").click(function () {
      doctPop();
      $("#step3b_0").hide();
      $("#step3b_7").show();
      $('#m4s9img15').attr('src', '/static/images/m4s9img15_7.png');
    });
    $("#stepd3_8").click(function () {
      doctPop();
      $("#step3b_0").hide();
      $("#step3b_8").show();
      $('#m4s9img15').attr('src', '/static/images/m4s9img15_8.png');
    });
    $("#stepd3_9").click(function () {
      doctPop();
      $("#step3b_0").hide();
      $("#step3b_9").show();
      $('#m4s9img15').attr('src', '/static/images/m4s9img15_9.png');
    });
    $("#stepd3_10").click(function () {
      doctPop();
      $("#step3b_0").hide();
      $("#step3b_10").show();
      $('#m4s9img15').attr('src', '/static/images/m4s9img15_10.png');
    });
    $("#stepd3_11").click(function () {
      doctPop();
      $("#step3b_0").hide();
      $("#step3b_11").show();
      $('#m4s9img15').attr('src', '/static/images/m4s9img15_11.png');
    });
    $("#stepd3_12").click(function () {
      doctPop();
      $("#step3b_0").hide();
      $("#step3b_12").show();
      $('#m4s9img15').attr('src', '/static/images/m4s9img15_12.png');
    });



    /* step function */

    function st_color() {
      $('#stepd1,#stepd2,#stepd3,#stepd4,#stepd5,#stepd6,#stepd7').css({ 'background-color': '#f0f0f0' });
    }

    $('#stepd1').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #0').addClass('active');
      $('.m4s9mcq ol li').hide();
      app.Page1 = 0;
      app.Page2 = 0;
      app.Page3 = 0;
      st_color();
      $('#stepd1').css({ 'background-color': '#33d8ba' });
      $('.left1, .right1').hide();
      $('#m4s9img16').attr('src', '/static/images/m4s9img16.png');
      $('#T1').show();
      $('#T2').hide();
    });

    $('#exp2, #stepd2').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #1').addClass('active');
      $('.m4s9mcq ol li').hide();
      $('.m4s9mcq ol li:eq(1)').show();
      $('.m4s9mcq ol li:eq(2)').show();
      $('.m4s9mcq ol li').removeClass('active');
      $('.m4s9mcq ol li:eq(1)').addClass('active');
      st_color();
      //app.Page2=1;
      $('#myMd10').modal();

      app.Page1 = 1;
      app.Page2 = 1;
      app.Page3 = 1;
      $('#stepd2').css({ 'background-color': '#33d8ba' });
      $('.left1, .right1').show();
      $('#m4s9img16').attr('src', '/static/images/m4s9img16.png');
      $('#T1').hide();
      $('#T2').show();
    });


    $('#stepd3').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #3').addClass('active');
      $('.m4s9mcq ol li').hide();
      st_color();
      //app.Page2=3;
      app.Page1 = 3;
      app.Page2 = 3;
      app.Page3 = 3;
      $('#stepd3').css({ 'background-color': '#33d8ba' });
      $('.left1, .right1').show();
      $('#m4s9img16').attr('src', '/static/images/m4s9img16.png');
      $('#T1').hide();
      $('#T2').show();
    });

    $('#stepd4').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #4').addClass('active');
      $('.m4s9mcq ol li').hide();
      st_color();
      //app.Page2=4;
      app.Page1 = 4;
      app.Page2 = 4;
      app.Page3 = 4;
      $('#stepd4').css({ 'background-color': '#33d8ba' });
      $('.left1, .right1').show();
      $('#m4s9img16').attr('src', '/static/images/m4s9img16.png');
      $('#T1').hide();
      $('#T2').show();
    });
    $('#stepd5').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #5').addClass('active');
      $('.m4s9mcq ol li').hide();
      $('.m4s9mcq ol li:eq(5)').show();
      $('.m4s9mcq ol li:eq(6)').show();
      $('.m4s9mcq ol li:eq(7)').show();
      $('.m4s9mcq ol li').removeClass('active');
      $('.m4s9mcq ol li:eq(5)').addClass('active');
      st_color();
      //app.Page2=6;  
      app.Page1 = 6;
      app.Page2 = 6;
      app.Page3 = 6;
      $('#stepd5').css({ 'background-color': '#33d8ba' });
      $('.left1, .right1').show();
      $('#m4s9img16').attr('src', '/static/images/m4s9img16.png');
      $('#T1').hide();
      $('#T2').show();
    });

    $('#stepd6').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #8').addClass('active');
      $('.m4s9mcq ol li').hide();
      $('.m4s9mcq ol li:eq(8)').show();
      $('.m4s9mcq ol li:eq(9)').show();
      $('.m4s9mcq ol li:eq(10)').show();
      $('.m4s9mcq ol li').removeClass('active');
      $('.m4s9mcq ol li:eq(8)').addClass('active');
      st_color();
      //app.Page2=8;  
      app.Page1 = 8;
      app.Page2 = 8;
      app.Page3 = 8;
      $('#stepd6').css({ 'background-color': '#33d8ba' });
      setMsgBoxHeight();
      $('.left1, .right1').show();
      $('#m4s9img16').attr('src', '/static/images/m4s9img16.png');
      $('#T1').hide();
      $('#T2').show();
    });

    $('#stepd7').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #11').addClass('active');
      $('.m4s9mcq ol li').hide();
      st_color();
      //app.Page2=11; 
      app.Page1 = 11;
      app.Page2 = 11;
      app.Page3 = 11;
      $('#stepd7').css({ 'background-color': '#33d8ba' });
      $('.left1').show();
      $('.right1').hide();
      $('#m4s9img16').attr('src', '/static/images/m4s9img16.png');
      $('#T1').hide();
      $('#T2').show();
    });


    function hideFun() {
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




    function ShowCarousel(id) {
      //debugger;
      //alert(id);
      if (id == undefined) {
        return false;
      }
      if (id == 0) {
        st_color();
        $('.m4s9mcq ol li').hide();
        $('#stepd1').css({ 'background-color': '#33d8ba' });
        $('#m4s9img16').attr('src', '/static/images/m4s9img16.png');
      }
      if (id == 1) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(1)').show();
        $('.m4s9mcq ol li:eq(2)').show();
        st_color();
        $('#stepd2').css({ 'background-color': '#33d8ba' });
        $('#m4s9img16').attr('src', '/static/images/m4s9img16.png');
      }

      if (id == 2) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(1)').show();
        $('.m4s9mcq ol li:eq(2)').show();
        st_color();
        $('#stepd2').css({ 'background-color': '#33d8ba' });
        $('#m4s9img16').attr('src', '/static/images/m4s9img16.png');
      }

      if (id == 3) {
        $('.m4s9mcq ol li').hide();
        st_color();
        $('#stepd3').css({ 'background-color': '#33d8ba' });
        $('#m4s9img16').attr('src', '/static/images/m4s9img16.png');
      }
      if (id == 4) {
        $('.m4s9mcq ol li').hide();
        st_color();
        $('#stepd4').css({ 'background-color': '#33d8ba' });
        $('#m4s9img16').attr('src', '/static/images/m4s9img16.png');
      }
      if (id == 5) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(5)').show();
        $('.m4s9mcq ol li:eq(6)').show();
        $('.m4s9mcq ol li:eq(7)').show();
        st_color();
        $('#stepd5').css({ 'background-color': '#33d8ba' });
        $('#m4s9img16').attr('src', '/static/images/m4s9img16.png');
      }

      if (id == 6) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(5)').show();
        $('.m4s9mcq ol li:eq(6)').show();
        $('.m4s9mcq ol li:eq(7)').show();
        st_color();
        $('#stepd5').css({ 'background-color': '#33d8ba' });
        $('#m4s9img16').attr('src', '/static/images/m4s9img16.png');
      }
      if (id == 7) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(5)').show();
        $('.m4s9mcq ol li:eq(6)').show();
        $('.m4s9mcq ol li:eq(7)').show();
        st_color();
        $('#stepd5').css({ 'background-color': '#33d8ba' });
        $('#m4s9img16').attr('src', '/static/images/m4s9img16.png');
      }

      if (id == 8) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(8)').show();
        $('.m4s9mcq ol li:eq(9)').show();
        $('.m4s9mcq ol li:eq(10)').show();
        st_color();
        $('#stepd6').css({ 'background-color': '#33d8ba' });
        $('#m4s9img16').attr('src', '/static/images/m4s9img16.png');
      }
      if (id == 9) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(8)').show();
        $('.m4s9mcq ol li:eq(9)').show();
        $('.m4s9mcq ol li:eq(10)').show();
        st_color();
        $('#stepd6').css({ 'background-color': '#33d8ba' });
        $('#m4s9img16').attr('src', '/static/images/m4s9img16.png');
      }
      if (id == 10) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(8)').show();
        $('.m4s9mcq ol li:eq(9)').show();
        $('.m4s9mcq ol li:eq(10)').show();
        st_color();
        $('#stepd6').css({ 'background-color': '#33d8ba' });
        $('#m4s9img16').attr('src', '/static/images/m4s9img16.png');
      }

      if (id == 11) {
        $('.m4s9mcq ol li').hide();
        st_color();
        $('#stepd7').css({ 'background-color': '#33d8ba' });
        $('#m4s9img16').attr('src', '/static/images/m4s9img16.png');
        $('.left1').show();
        $('.right1').hide();
      }
      //app.Page2=id;
      app.Page1 = id;
      app.Page2 = id;
      app.Page3 = id;
      return false;
    }

    $('#my-Carousel1').on('slid.bs.carousel', function (e) {
      $('#my-Carousel1 .item .ans').removeClass('Dis');
      var id = parseInt(e.relatedTarget.id);
      //alert(id);

      if (id == 0) {
        $('.left1').hide();
        $('.right1').hide();
      } else if (id == 11) {
        $('.left1').show();
        $('.right1').hide();
      } else {
        $('.left1').show();
        $('.right1').show();
      }
      ShowCarousel(id);

      setMsgBoxHeight();


    });

    $(function () {
      setMsgBoxHeight();
    });

    function setMsgBoxHeight() {
      var f_height = 0;
      var msgboxHeight = $(".carousel .active .row-eq-height").height();
      var l = $(".carousel .active .ans").length;
      for (var i = 1; i <= l; i++) {
        var h = $(".carousel .active .row-eq-height div:nth-child(" + i + ") .ans").css("height");
        var h1 = h.split('p');
        if (f_height < Number(h1[0])) {
          f_height = h1[0];
        }
      }
      $(".carousel .active .ans").css("height", f_height + "px");
    }

    function TryA(obj) {
      $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
      $(obj).closest('.item').find('.row-eq-height').removeClass('Dis');
    }




    $("#my-Carousel1 .additem").on("swipeleft", function () {
      //debugger;
      if (app.isMobile) {
        var i = $(this).children("div.item.active").index() + 1;
        var l = $(this).children("div.item").length;

        //var id = $(this).children("div.item.active")[0].id;
        $("#my-Carousel1 .carousel-indicators li").removeClass("active");
        $(this).children("div.item").removeClass("active");
        if (i == l) {
          $("#my-Carousel1 .carousel-indicators li:nth-child(1)").addClass("active");
          $("#my-Carousel1 .additem div.item:nth-child(1)").addClass("active");
          ShowCarousel(0);
        }
        else {
          i++;
          $("#my-Carousel1 .carousel-indicators li:nth-child(" + i + ")").addClass("active");
          $("#my-Carousel1 .additem div.item:nth-child(" + i + ")").addClass("active");
          ShowCarousel(i - 1);
        }

        //alert(i);



        setMsgBoxHeight();
      }
    });
    $("#my-Carousel1 .additem").on("swiperight", function () {
      //debugger;
      if (app.isMobile) {
        var i = $(this).children("div.item.active").index() + 1;
        var l = $(this).children("div.item").length;
        $("#my-Carousel1 .carousel-indicators li").removeClass("active");
        $(this).children("div.item").removeClass("active");
        if (i == 1) {
          $("#my-Carousel1 .carousel-indicators li:nth-child(" + l + ")").addClass("active");
          $("#my-Carousel1 .additem div.item:nth-child(" + l + ")").addClass("active");
          ShowCarousel(11);
        }
        else {
          i--;
          $("#my-Carousel1 .carousel-indicators li:nth-child(" + i + ")").addClass("active");
          $("#my-Carousel1 .additem div.item:nth-child(" + i + ")").addClass("active");
          ShowCarousel(i - 1);
        }
        //ShowCarousel(i-1);  
        setMsgBoxHeight();
      }
    });


    $(document).ready(function () {
      //fun_hide();
      //$('#slide1,#slides1').show();

      //st_color();
      hideFun();
      doctPop();

      $('#step1').css({ 'background-color': '#33d8ba' });
      setMsgBoxHeight();
      if (app.Page2 != null && app.Page2 != -1) {
        $("#my-Carousel1 .carousel-indicators li").removeClass("active");
        $("#my-Carousel1 .additem div.item").removeClass("active");
        if (app.Page2 == 0) {
          $('.left1').hide();
          $('.right1').hide();
        }
        else {
          $('.left1').show();
          $('.right1').show();
        }
        $("#my-Carousel1 .carousel-indicators li:nth-child(" + (app.Page2 + 1) + ")").addClass("active");
        $("#my-Carousel1 .additem div.item:nth-child(" + (app.Page2 + 1) + ")").addClass("active");
        ShowCarousel(app.Page2);
      }
    });

  });


  //---------------------------------------------------------------------------------------------------
  $('#pain, .m4s9img2_2bg').on('click', function () {
    $('#pain').removeClass('bgc');
    $('#pain').addClass('bgc3');
    $('#cancer').removeClass('bgc1');
    $('#diabetes, #cancer').addClass('bgc');
    $('.m4s9img2_0bg, .m4s9img2_1bg, .m4s9img2_2bg, #m4s9img2_0, #m4s9img2_1, #m4s9img2_2').hide();
    $('.left1, .right1').hide();

    $("#m4s9-slider-steps").html(sessionStorage.getItem("pain_html"));

    function doctPop() {
      $("#step3c_1, #step3c_2, #step3c_3, #step3c_4, #step3c_5, #step3c_6, #step3c_7, #step3c_8, #step3c_9, #step3c_10").hide();
    }
    $("#step4_1").click(function () {
      $('#myMd1').modal();
      $('#m4s9img21').attr('src', '/static/images/m4s9img21_1.png');
    });
    $("#step4_2").click(function () {
      $('#myMd2').modal();
      $('#m4s9img21').attr('src', '/static/images/m4s9img21_2.png');
    });
    $("#step4_3").click(function () {
      $('#myMd3').modal();
      $('#m4s9img21').attr('src', '/static/images/m4s9img21_3.png');
    });
    $("#step4_4").click(function () {
      $('#myMd4').modal();
      $('#m4s9img21').attr('src', '/static/images/m4s9img21_4.png');
    });

    /*$("#chall_M1 .col-sm-6").click(function(){
      $('#myMd5').modal();         
    });*/

    $("#m4s9img22, #m4s9img22a").click(function () {
      $('#myMd8').modal();
    });
    $("#m4s9img13").click(function () {
      $('#myMd9').modal();
    });

    $("#stepp2").click(function () {
      $('#myMd10').modal();
      app.Page1 = 1;
      app.Page2 = 1;
      app.Page3 = 1;
    });



    $("#stepn3_1").click(function () {
      doctPop();
      $("#step3c_0").hide();
      $("#step3c_1").show();
      $('#m4s9img20').attr('src', '/static/images/m4s9img20_1.png');
    });
    $("#stepn3_2").click(function () {
      doctPop();
      $("#step3c_0").hide();
      $("#step3c_2").show();
      $('#m4s9img20').attr('src', '/static/images/m4s9img20_2.png');
    });
    $("#stepn3_3").click(function () {
      doctPop();
      $("#step3c_0").hide();
      $("#step3c_3").show();
      $('#m4s9img20').attr('src', '/static/images/m4s9img20_3.png');
    });
    $("#stepn3_4").click(function () {
      doctPop();
      $("#step3c_0").hide();
      $("#step3c_4").show();
      $('#m4s9img20').attr('src', '/static/images/m4s9img20_4.png');
    });
    $("#stepn3_5").click(function () {
      doctPop();
      $("#step3c_0").hide();
      $("#step3c_5").show();
      $('#m4s9img20').attr('src', '/static/images/m4s9img20_5.png');
    });
    $("#stepn3_6").click(function () {
      doctPop();
      $("#step3c_0").hide();
      $("#step3c_6").show();
      $('#m4s9img20').attr('src', '/static/images/m4s9img20_6.png');
    });
    $("#stepn3_7").click(function () {
      doctPop();
      $("#step3c_0").hide();
      $("#step3c_7").show();
      $('#m4s9img20').attr('src', '/static/images/m4s9img20_7.png');
    });
    $("#stepn3_8").click(function () {
      doctPop();
      $("#step3c_0").hide();
      $("#step3c_8").show();
      $('#m4s9img20').attr('src', '/static/images/m4s9img20_8.png');
    });
    $("#stepn3_9").click(function () {
      doctPop();
      $("#step3c_0").hide();
      $("#step3c_9").show();
      $('#m4s9img20').attr('src', '/static/images/m4s9img20_9.png');
    });
    $("#stepn3_10").click(function () {
      doctPop();
      $("#step3c_0").hide();
      $("#step3c_10").show();
      $('#m4s9img20').attr('src', '/static/images/m4s9img20_10.png');
    });


    /* step function */

    function st_color() {
      $('#stepp1,#stepp2,#stepp3,#stepp4,#stepp5,#stepp6,#stepp7').css({ 'background-color': '#f0f0f0' });
    }

    $('#stepp1').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #0').addClass('active');
      $('.m4s9mcq ol li').hide();
      //app.Page3=0;
      app.Page1 = 0;
      app.Page2 = 0;
      app.Page3 = 0;
      st_color();
      $('#stepp1').css({ 'background-color': '#e4c72b' });
      $('.left1, .right1').hide();
      $('#m4s9img21').attr('src', '/static/images/m4s9img21.png');
      $('#T1').show();
      $('#T2').hide();
    });

    $('#exp3, #stepp2').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #1').addClass('active');
      $('.m4s9mcq ol li').hide();
      $('.m4s9mcq ol li:eq(1)').show();
      $('.m4s9mcq ol li:eq(2)').show();
      $('.m4s9mcq ol li').removeClass('active');
      $('.m4s9mcq ol li:eq(1)').addClass('active');
      st_color();
      $('#myMd10').modal();
      //app.Page3=1;    
      app.Page1 = 1;
      app.Page2 = 1;
      app.Page3 = 1;
      $('#stepp2').css({ 'background-color': '#e4c72b' });
      $('.left1, .right1').show();
      $('#m4s9img21').attr('src', '/static/images/m4s9img21.png');
      $('#T1').hide();
      $('#T2').show();
    });


    $('#stepp3').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #3').addClass('active');
      $('.m4s9mcq ol li').hide();
      st_color();
      //app.Page3=3;
      app.Page1 = 3;
      app.Page2 = 3;
      app.Page3 = 3;
      $('#stepp3').css({ 'background-color': '#e4c72b' });
      $('.left1, .right1').show();
      $('#m4s9img21').attr('src', '/static/images/m4s9img21.png');
      $('#T1').hide();
      $('#T2').show();
    });

    $('#stepp4').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #4').addClass('active');
      $('.m4s9mcq ol li').hide();
      st_color();
      //app.Page3=4;
      app.Page1 = 4;
      app.Page2 = 4;
      app.Page3 = 4;
      $('#stepp4').css({ 'background-color': '#e4c72b' });
      $('.left1, .right1').show();
      $('#m4s9img21').attr('src', '/static/images/m4s9img21.png');
      $('#T1').hide();
      $('#T2').show();
    });
    $('#stepp5').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #5').addClass('active');
      $('.m4s9mcq ol li').hide();
      $('.m4s9mcq ol li:eq(5)').show();
      $('.m4s9mcq ol li:eq(6)').show();
      $('.m4s9mcq ol li:eq(7)').show();
      $('.m4s9mcq ol li').removeClass('active');
      $('.m4s9mcq ol li:eq(5)').addClass('active');
      st_color();
      //app.Page3=6;  
      app.Page1 = 6;
      app.Page2 = 6;
      app.Page3 = 6;
      $('#stepp5').css({ 'background-color': '#e4c72b' });
      $('.left1, .right1').show();
      $('#m4s9img21').attr('src', '/static/images/m4s9img21.png');
      $('#T1').hide();
      $('#T2').show();
    });

    $('#stepp6').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #8').addClass('active');
      $('.m4s9mcq ol li').hide();
      $('.m4s9mcq ol li:eq(8)').show();
      $('.m4s9mcq ol li:eq(9)').show();
      $('.m4s9mcq ol li:eq(10)').show();
      $('.m4s9mcq ol li').removeClass('active');
      $('.m4s9mcq ol li:eq(8)').addClass('active');
      st_color();
      //app.Page3=8; 
      app.Page1 = 8;
      app.Page2 = 8;
      app.Page3 = 8;
      $('#stepp6').css({ 'background-color': '#e4c72b' });
      setMsgBoxHeight();
      $('.left1, .right1').show();
      $('#m4s9img21').attr('src', '/static/images/m4s9img21.png');
      $('#T1').hide();
      $('#T2').show();
    });

    $('#stepp7').on('click', function () {
      $('.m4s9mcq .item').removeClass('active');
      $('.m4s9mcq #11').addClass('active');
      $('.m4s9mcq ol li').hide();
      st_color();
      //app.Page3=11; 
      app.Page1 = 11;
      app.Page2 = 11;
      app.Page3 = 11;
      $('#stepp7').css({ 'background-color': '#e4c72b' });
      $('.left1').show();
      $('.right1').hide();
      $('#m4s9img21').attr('src', '/static/images/m4s9img21.png');
      $('#T1').hide();
      $('#T2').show();
    });


    function hideFun() {
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




    function ShowCarousel(id) {
      //debugger;
      //alert(id);
      if (id == undefined) {
        return false;
      }
      if (id == 0) {
        st_color();
        $('.m4s9mcq ol li').hide();
        $('#stepp1').css({ 'background-color': '#e4c72b' });
        $('#m4s9img21').attr('src', '/static/images/m4s9img21.png');
      }
      if (id == 1) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(1)').show();
        $('.m4s9mcq ol li:eq(2)').show();
        st_color();
        $('#stepp2').css({ 'background-color': '#e4c72b' });
        $('#m4s9img21').attr('src', '/static/images/m4s9img21.png');
      }

      if (id == 2) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(1)').show();
        $('.m4s9mcq ol li:eq(2)').show();
        st_color();
        $('#stepp2').css({ 'background-color': '#e4c72b' });
        $('#m4s9img21').attr('src', '/static/images/m4s9img21.png');
      }

      if (id == 3) {
        $('.m4s9mcq ol li').hide();
        st_color();
        $('#stepp3').css({ 'background-color': '#e4c72b' });
        $('#m4s9img21').attr('src', '/static/images/m4s9img21.png');
      }
      if (id == 4) {
        $('.m4s9mcq ol li').hide();
        st_color();
        $('#stepp4').css({ 'background-color': '#e4c72b' });
        $('#m4s9img21').attr('src', '/static/images/m4s9img21.png');
      }
      if (id == 5) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(5)').show();
        $('.m4s9mcq ol li:eq(6)').show();
        $('.m4s9mcq ol li:eq(7)').show();
        st_color();
        $('#stepp5').css({ 'background-color': '#e4c72b' });
        $('#m4s9img21').attr('src', '/static/images/m4s9img21.png');
      }

      if (id == 6) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(5)').show();
        $('.m4s9mcq ol li:eq(6)').show();
        $('.m4s9mcq ol li:eq(7)').show();
        st_color();
        $('#stepp5').css({ 'background-color': '#e4c72b' });
        $('#m4s9img21').attr('src', '/static/images/m4s9img21.png');
      }
      if (id == 7) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(5)').show();
        $('.m4s9mcq ol li:eq(6)').show();
        $('.m4s9mcq ol li:eq(7)').show();
        st_color();
        $('#stepp5').css({ 'background-color': '#e4c72b' });
        $('#m4s9img21').attr('src', '/static/images/m4s9img21.png');
      }

      if (id == 8) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(8)').show();
        $('.m4s9mcq ol li:eq(9)').show();
        $('.m4s9mcq ol li:eq(10)').show();
        st_color();
        $('#stepp6').css({ 'background-color': '#e4c72b' });
        $('#m4s9img21').attr('src', '/static/images/m4s9img21.png');
      }
      if (id == 9) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(8)').show();
        $('.m4s9mcq ol li:eq(9)').show();
        $('.m4s9mcq ol li:eq(10)').show();
        st_color();
        $('#stepp6').css({ 'background-color': '#e4c72b' });
        $('#m4s9img21').attr('src', '/static/images/m4s9img21.png');
      }
      if (id == 10) {
        $('.m4s9mcq ol li').hide();
        $('.m4s9mcq ol li:eq(8)').show();
        $('.m4s9mcq ol li:eq(9)').show();
        $('.m4s9mcq ol li:eq(10)').show();
        st_color();
        $('#stepp6').css({ 'background-color': '#e4c72b' });
        $('#m4s9img21').attr('src', '/static/images/m4s9img21.png');
      }

      if (id == 11) {
        $('.m4s9mcq ol li').hide();
        st_color();
        $('#stepp7').css({ 'background-color': '#e4c72b' });
        $('#m4s9img21').attr('src', '/static/images/m4s9img21.png');
        $('.left1').show();
        $('.right1').hide();
      }
      //app.Page3=id;
      app.Page1 = id;
      app.Page2 = id;
      app.Page3 = id;
      return false;
    }

    $('#my-Carousel1').on('slid.bs.carousel', function (e) {
      $('#my-Carousel1 .item .ans').removeClass('Dis');
      var id = parseInt(e.relatedTarget.id);
      //alert(id);

      if (id == 0) {
        $('.left1').hide();
        $('.right1').hide();
      } else if (id == 11) {
        $('.left1').show();
        $('.right1').hide();
      } else {
        $('.left1').show();
        $('.right1').show();
      }
      ShowCarousel(id);

      setMsgBoxHeight();


    });

    $(function () {
      setMsgBoxHeight();
    });

    function setMsgBoxHeight() {
      var f_height = 0;
      var msgboxHeight = $(".carousel .active .row-eq-height").height();
      var l = $(".carousel .active .ans").length;
      for (var i = 1; i <= l; i++) {
        var h = $(".carousel .active .row-eq-height div:nth-child(" + i + ") .ans").css("height");
        var h1 = h.split('p');
        if (f_height < Number(h1[0])) {
          f_height = h1[0];
        }
      }
      $(".carousel .active .ans").css("height", f_height + "px");
    }

    function TryA(obj) {
      $(obj).closest('.item.active').find('div').removeClass("incorrect").removeClass("selectedAns");
      //$('.item.active div').removeClass("incorrect").removeClass("selectedAns");
      $(obj).closest('.item').find('.row-eq-height').removeClass('Dis');
    }



    $("#my-Carousel1 .additem").on("swipeleft", function () {
      // debugger;
      if (app.isMobile) {
        var i = $(this).children("div.item.active").index() + 1;
        var l = $(this).children("div.item").length;

        //var id = $(this).children("div.item.active")[0].id;
        $("#my-Carousel1 .carousel-indicators li").removeClass("active");
        $(this).children("div.item").removeClass("active");
        if (i == l) {
          $("#my-Carousel1 .carousel-indicators li:nth-child(1)").addClass("active");
          $("#my-Carousel1 .additem div.item:nth-child(1)").addClass("active");
          ShowCarousel(0);
        }
        else {
          i++;
          $("#my-Carousel1 .carousel-indicators li:nth-child(" + i + ")").addClass("active");
          $("#my-Carousel1 .additem div.item:nth-child(" + i + ")").addClass("active");
          ShowCarousel(i - 1);
        }

        //alert(i);



        setMsgBoxHeight();
      }
    });
    $("#my-Carousel1 .additem").on("swiperight", function () {
      //debugger;
      if (app.isMobile) {
        var i = $(this).children("div.item.active").index() + 1;
        var l = $(this).children("div.item").length;
        $("#my-Carousel1 .carousel-indicators li").removeClass("active");
        $(this).children("div.item").removeClass("active");
        if (i == 1) {
          $("#my-Carousel1 .carousel-indicators li:nth-child(" + l + ")").addClass("active");
          $("#my-Carousel1 .additem div.item:nth-child(" + l + ")").addClass("active");
          ShowCarousel(11);
        }
        else {
          i--;
          $("#my-Carousel1 .carousel-indicators li:nth-child(" + i + ")").addClass("active");
          $("#my-Carousel1 .additem div.item:nth-child(" + i + ")").addClass("active");
          ShowCarousel(i - 1);
        }
        //ShowCarousel(i-1);      

        setMsgBoxHeight();
      }
    });


    $(document).ready(function () {
      $('#m4s9img20').attr('src', '/static/images/m4s9img20.png');
      //fun_hide();
      //$('#slide1,#slides1').show();

      // st_color();
      hideFun();
      doctPop();

      $('#step1').css({ 'background-color': '#e4c72b' });
      setMsgBoxHeight();
      if (app.Page3 != null && app.Page3 != -1) {
        $("#my-Carousel1 .carousel-indicators li").removeClass("active");
        $("#my-Carousel1 .additem div.item").removeClass("active");
        if (app.Page3 == 0) {
          $('.left1').hide();
          $('.right1').hide();
        }
        else {
          $('.left1').show();
          $('.right1').show();
        }
        $("#my-Carousel1 .carousel-indicators li:nth-child(" + (app.Page3 + 1) + ")").addClass("active");
        $("#my-Carousel1 .additem div.item:nth-child(" + (app.Page3 + 1) + ")").addClass("active");
        ShowCarousel(app.Page3);
      }
    });

  });

} 