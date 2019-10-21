/* Javascript for Animatedslidem8s10XBlock. */
function Animatedslidem8s10XBlock(runtime, element) {
    $(function ($) {
        /* Here's where you'd do things on page load. */
        $('#0,#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14').hide(); 
      //$('#14').show(); 
     var clickDisabled = false;
     $('#ripdiv').click(function(){
        if (clickDisabled){
        $('.a').ripples({onclick: false,
            resolution: 512,
            dropRadius: 20,
            perturbance: 1.04,
            interactive:true
        });
           return;}
  
          $('#ripdiv2').show();
  
        clickDisabled = true;
        setTimeout(function(){clickDisabled = false;$('#ripdiv2').hide();}, 5000);
    });
  
    $('.additem-hide').click(function(){
     $('#ripdiv2').hide();
    });
  
  
  
  $('.a').ripples({onclick: true, onmove:false,resolution: 512,
    dropRadius: 20,
    perturbance: 1.04,interactive:true});
  
  
      //$('#14').show(); 
      $("#bt12").click(function(){
      if($('#ans1').val()=='') {
      $('#e1').show();
      } else {
      $('#11').hide();
      $('#12').fadeIn(1600);
      }
      });	
      $("#bt13").click(function(){
      if($('#ans2').val()=='' || $('#ans3').val()=='' || $('#ans4').val()=='') {
      $('#e2').show();
      } else {
      $('#12').hide();
      $('#13').fadeIn(500);
      
      $('#txt1').text($('#ans1').val());
      $('#txt2').text($('#ans2').val());
      $('#txt3').text($('#ans3').val());
      $('#txt4').text($('#ans4').val());
      
      
      
      
           var ans1= $('#ans1').val();
           var ans2= $('#ans2').val();
           var ans3= $('#ans3').val();
           var ans4= $('#ans4').val();
           // $("#wait2").show();
           var data = "ans1="+ans1+"&ans2="+ans2+"&ans3="+ans3+"&ans4="+ans4;
           //alert(data);
           $('#14').fadeIn(500);	
              $('html, body').animate({
            scrollTop: $("#14").offset().top
             }, 1000);
           
          return false;
      }
      });	
      
      $("#bt14").click(function(){
  
        $('html, body').animate({
          scrollTop: $("#14").offset().top
      }, 1000);
      });	
  $('.left').click(function(v){
  var ab=$(this).parent().closest('.item').attr('id');
  var previd=ab-1;
  $('#'+ab).hide();
  $('#'+previd).fadeIn(1600);
  });
  
  $('.next').click(function(v){
  var ab=$(this).attr('id');
  ab=parseInt(ab);
  var nid=ab+1;
  $('#'+ab).hide();
  $('#'+nid).fadeIn(1600);
   $('#ripdiv2').show();
  });
  
  $("#bt15").click(function(){
      $('#ans1').val('');
      $('#ans2').val('');
      $('#ans3').val('');
      $('#ans4').val('');
      $('#0,#1,#2,#3,#4,#5,#6,#7,#8,#9,#10,#11,#12,#13,#14,#e1,#e2').hide();	
      $('#-1').fadeIn(1600);
  });
  
  $("#followupbtn").click(function(){		
    var femail= $('#femail').val();  
    if(!validateEmail(femail) || femail=='')
  {
    $('#erroremail').html("<font color='red'>*This field is required.</font>");
   return false;
   }
  else
  {
  $('#erroremail').hide();
//   var data="femail="+femail;
//    $.ajax({
//               url: "m8s10_reminder.php",
//               data: data, 
//               success: function(html) 
//               {
//               $('#remform').hide();	$('#remform2').hide();
//               $('#remmsg').html("<button type='button' class='close' data-dismiss='modal' style='color: #ffffff;  font-size: 20px; margin-top: -30px;'>&times;</button><h4 class='modal-title text-center boldT'>Reminder scheduled!</h4>");
//               }
//               });
  }
  
  });
  function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test( $email );
  }
    });
}
