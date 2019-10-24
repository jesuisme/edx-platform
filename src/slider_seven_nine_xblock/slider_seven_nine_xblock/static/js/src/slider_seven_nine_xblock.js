/* Javascript for SliderSevenNineXBlock. */
var resultJSON = {
	"Sec9Report": {
		"Category": [
			{
				"item": [
					{
						"Point": {
							"_color": "green",
							"__text": "15"
						},
						"Explanation": "Following Tom's interview, you broke down what he was saying to show you understook what he was saying and allowed him to continue speaking. This helps establish and build rapport as well as provide Tom the opportunity to provide you with valuable information.",
						"_name": "G1"
					},
					{
						"Point": {
							"_color": "red",
							"__text": "0"
						},
						"Explanation": "Following Tom's interview, you missed an opportunity to show him you understood what he was saying and allow him to continue speaking. Doing so would have helped build rapport with Tom and potentially obtain valuable information.",
						"_name": "R1"
					}
				],
				"_title": "DISTILL AND CONTINUE LISTENING"
			},
			{
				"item": [
					{
						"Point": {
							"_color": "green",
							"__text": "15"
						},
						"Explanation": "Tom's devotion to his children and his belief that engaging with them is essential to growing a strong relationship with them drives both his desire to get rid of the pain and his belief that opaites are the answer. By affirming and relating to his desire and allowing him to express it, you've done a great job on fostering trust and showing you understand his beliefs, which is essential in learning how to communicate effectively with him.",
						"_name": "G2"
					},
					{
						"Point": {
							"_color": "red",
							"__text": "0"
						},
						"Explanation": "You missed the opportunity to find out what makes Tom special and to really discover what led to his desire for opiates. This might have helped inform your decisions on how to approach the issue. Understanding the patient's desire and beliefs will help you learn how to effectively communicate with him or her.",
						"_name": "R2"
					}
				],
				"_title": "AFFIRMATION OF PATIENT'S SPECIAL ATTRIBUTES AND ELICITING BELIEFS"
			},
			{
				"item": [
					{
						"Point": {
							"_color": "green",
							"__text": "15"
						},
						"Explanation": "More than anything, patients want to feel understood and taken seriously. You did this for Tom by using the phrase \"What I hear you saying\" and rephrasing what he had told you as well acknowleding the need to get it taken care of.",
						"_name": "G3"
					},
					{
						"Point": {
							"_color": "red",
							"__text": "0"
						},
						"Explanation": "More than anything, patients want to feel understood and taken seriously. Using phrases like \"What I hear you saying\" followed by a restatement of their concerns and desires and a confirmation of your commitment to help provides assurance and builds trust. Try to keep this in mind with patients in the future.",
						"_name": "R3"
					}
				],
				"_title": "SUMMARIZE AND LEGITIMIZE CONCERNS"
			},
			{
				"item": [
					{
						"Point": {
							"_color": "green",
							"__text": "15"
						},
						"Explanation": "It's important to appreciate patient's intitative when he or she discloses positive coping mechanisms. Patients need to feel encouraged to continue and increase their use of these mechnaisms as needed, and Tom's participation in yoga is the perfect strategy to help him keep active and combat his pain. In providing Tom assurance of this, you've helped empower him to take control of his life and health.",
						"_name": "G4"
					},
					{
						"Point": {
							"_color": "red",
							"__text": "0"
						},
						"Explanation": "It's important to celebrate your patient’s initiative when he or she discloses positive coping mechanisms. Patients need to feel encouraged to continue and increase their use of these mechnaisms as needed, and Tom's participation in yoga is the perfect strategy to help him keep active and combat his pain. Remember: providing assurance of this is key to empowering Tom to take control of his life and health.",
						"_name": "R4"
					}
				],
				"_title": "AFFIRM RESILIENCE"
			},
			{
				"item": [
					{
						"Point": {
							"_color": "green",
							"__text": "15"
						},
						"Explanation": "When establishing treatment plan, it is very important to do so collaboratively with the patient. This helps to support buy-in and adherence with the plan and builds trust between the clinician and the patient. You did a great job of ensuring Tom was a partner in deciding his treatment plan!",
						"_name": "G5"
					},
					{
						"Point": {
							"_color": "red",
							"__text": "0"
						},
						"Explanation": "When establishing treatment plan, it is very important to do so collaboratively with the patient. This helps to support buy-in and adherence with the plan and builds trust between the clinician and the patient. By dictating the plan without eliciting this participation, it's likely Tom felt brushed off and not highly invested in what you had determined to be the best protocol.",
						"_name": "R5"
					}
				],
				"_title": "CREATE PARTNERSHIP AND INVITE PARTICIPATION"
			},
			{
				"item": [
					{
						"Point": {
							"_color": "green",
							"__text": "15"
						},
						"Explanation": "Before a patient leaves the office, ask him or her to repeat your mutually agreed upon plan using their own words. By letting Tom rephrase the plan, you made completely sure that you were understood and that you were both on the same page. If necessary, it would have also allowed you to clarify or add information where necessary. In addition, Tom didn't feel as though you ended the appointment abruptly without giving him the chance to ask questions or address concerns.",
						"_name": "G6"
					},
					{
						"Point": {
							"_color": "red",
							"__text": "0"
						},
						"Explanation": "Before Tom left your office, it would have been a good idea to repeat your mutually agreed plan by using his own words. This would have allowed you to really make sure that you were understood and that you were both on the same page. It would also have allowed you to clarify or add information where necessary. Tom may have felt as though you ended the appointment abruptly without giving him the chance to ask questions or address concerns.",
						"_name": "R6"
					}
				],
				"_title": "TEACHBACK"
			},
			{
				"item": [
					{
						"Point": {
							"_color": "green",
							"__text": "10"
						},
						"Explanation": "In general, clinicians interrupt their patient's opening interview within 18 seconds. Uninterrupted, a patient will discuss his or her concern and symptoms within two minutes, while Tom statement lasted less than 40 seconds. Allowing Tom to speak uninterrupted established rapport and helped you garner valuable information that could aid in diagnosis and treatment. Good job allowing him to finish!",
						"_name": "Bonus"
					},
					{
						"Point": {
							"_color": "red",
							"__text": "0"
						},
						"Explanation": "In general, clinicians interrupt their patient's opening interview within 18 seconds. Uninterrupted, a patient will typically discuss his or her concerns and symptoms in under two minutes, while Tom’s statement lasted less than 40 seconds. Allowing the patient to speak uninterrupted will establish rapport and garner valuable information that can aid in diagnosis, treatment, and grow the clinician-patient partnership.",
						"_name": "No-Bonus"
					}
				],
				"_title": "BONUS - NO INTERRUPTION"
			}
		]
	}
};

function SliderSevenNineXBlock(runtime, element) {
    $(function ($) {
        /* Here's where you'd do things on page load. */
        $(".lnkBreakdown").click(function () {
            $('html, body').animate({
                scrollTop: $("#all_report").offset().top
            }, 1000);
        });
    });
}
    var app_2 = {
        score:0,
        wrongAttempt:0,  
        Attempt:false,
        timeOutId:null,
        arrClicked:[],
        ConfigXML:null,
        Flag:false,
        isReportOpen:false,
        IsIntrupt:false,
        init: function () {
          this.Events();
          $("#HiTom,#HiTom2,#Tom_story,#First_step,#glad,#glad1,#glad2,#Second_step,#Tom_story2,#Tom_story3").hide();
          $("#Second_step_1,#Green2_Text,#Yellow2_Text,#Wrong2_Text,#3rd_step,#3rd_step_1").hide();
          $("#Green3Text,#Yellow3Text,#Red3Text,#whiteText,#4th_step").hide();
          $('#commonMSg,#5th_step,#5th_step_text,#6th_step,#5th_step_Y,#5th_step_Ytext').hide();
          $('#6th_step_1,#6th_step_2,#Gree6Text,#Yellow6Text,#Wrong6Text,#Wrong6_1Text').hide();
          $('#7th_step,#7th_step_1,#7th_step_2,#Gree7_2Text').hide();	
          $('#Green7Text,#Yellow7Text,#Wrong7Text,#Green7Text_1,#Green7Text_2,#6th_step_3').hide();
          $('#all_report').hide();
          $('#all_report P.Y1,#all_report P.R1,#all_report P.G1').hide();
           //setInterval(function(){app_2.ErrorReport();},10000);
           //app_2.Breakdown();
        },
        
       //// app_2.HideAll();
        HideAll: function(){
          clearTimeout(app_2.timeOutId);
          $("#HiTom,#HiTom2,#Tom_story,#First_step,#glad,#glad1,#glad2,#Second_step,#Tom_story2,#Tom_story3").hide();
          $("#Second_step_1,#Green2_Text,#Yellow2_Text,#Wrong2_Text,#3rd_step,#3rd_step_1").hide();
          $("#Green3Text,#Yellow3Text,#Red3Text,#whiteText,#4th_step").hide();
          $('#commonMSg,#5th_step,#5th_step_text,#6th_step,#5th_step_Y,#5th_step_Ytext').hide();
          $('#6th_step_1,#6th_step_2,#Gree6Text,#Yellow6Text,#Wrong6Text,#Wrong6_1Text').hide();
          $('#7th_step,#7th_step_1,#7th_step_2,#Gree7_2Text').hide();	
          $('#Green7Text,#Yellow7Text,#Wrong7Text,#Green7Text_1,#Green7Text_2,#6th_step_3').hide();
          //$('#all_report').hide();
          //$('#all_report P.Y1,#all_report P.R1,#all_report P.G1').hide();
        },
        
        
        
        First_step: function(){
          clearTimeout(app_2.timeOutId);
          $('#Tom_story').hide(); 
          $('#First_step').show();
        },
       Events:function(){ 
           $("#Konck").click(function(e){
             $("#Konck").hide(); $("#knockdoortext1").hide(); $("#knockdoortext2").show(); 
             $("#HiTom").show();
              });
          
          
          $('#TomStart').click(function(e){	
              $("#HiTom").hide();
               $("#HiTom2").show();
               app_2.timeOutId=setTimeout(function(){
                  $("#HiTom2").hide();
                  $('#Tom_story').show();			
              }, 3000);
          });	
             
          $("#intrupt").click(function(e){
              clearTimeout(app_2.timeOutId);
              app_2.IsIntrupt=false;
              app_2.arrClicked.push('No-Bonus');
              //app_2.First_step();
               $("#Tom_story").hide();
               $("#Tom_story3").show();
               /*  app_2.timeOutId=setTimeout(function(){
                          $("#Tom_story3").hide();
                          app_2.First_step();
                      }, 3000); */
           });
           
           $("#intrupt_continue").click(function(e){
              clearTimeout(app_2.timeOutId);
              if(app_2.score==0)
              {
                  app_2.score=app_2.score+10;		
                  app_2.arrClicked.push('Bonus');
                  app_2.IsIntrupt=true;
              }
              $("#Tom_story").hide();
               $("#Tom_story2").show();
               /* app_2.timeOutId=setTimeout(function(){
                   $("#Tom_story2").hide();
                   app_2.First_step();
                      }, 30000); */
           });
      ///////////////////////////	 
          $("#skip").click(function(e){
              clearTimeout(app_2.timeOutId);
               //$("#Tom_story2").hide();
               app_2.HideAll();
               $("#First_step").show();
             });
             $("#skip0").click(function(e){
             clearTimeout(app_2.timeOutId);
             //$('#HiTom2').hide(); $("#HiTom").hide();
              app_2.HideAll();
             $('#Tom_story').show();	
             });
            $("#skip01").click(function(e){	
            // $('#Tom_story3').hide();
            // $('#Tom_story').hide();	
              app_2.HideAll();
               $("#First_step").show();
             });
             
            $("#skip1").click(function(e){
              //$('#expiration').hide();
              app_2.HideAll(); $('#glad').show();  $('#expiration').hide();	
             $('#expiration_txt').show();	
             });
             
            $("#skip2").click(function(e){
            // $('#glad').hide();
            // $('#expiration').hide();
            // $('#expiration_txt').hide();
              app_2.HideAll();
             $('#Second_step').show();
             });
             
            $("#skip3").click(function(e){
             app_2.HideAll();
             //$('#glad1').hide(); $('#glad').hide(); $('#Tom_story').hide();	
             $('#Second_step').show();
             });
             
            $("#skip4").click(function(e){
             // $('#glad2').hide();
              app_2.HideAll();
              $('#Second_step_1').show();
             });
             $("#skip5").click(function(e){
              //$('#Green2_Text').hide();
              app_2.HideAll();
              $('#3rd_step').show();
              });
              
              $("#skip6").click(function(e){
              $('#Yellow2_Text').hide();
              //app_2.HideAll();
              $('#whiteText').show();
              });
              $("#skip7").click(function(e){
              //$('#Wrong2_Text').hide();
              app_2.HideAll();
              $('#3rd_step_1').show();
              });
              
              $("#skip8").click(function(e){
              clearTimeout(app_2.timeOutId);
              $('#Green3Text').hide();
              $('#whiteText').show();
              /* app_2.timeOutId=setTimeout(function(){
                  $('#whiteText').hide();
                  $('#commonMSg').show();
                  app_2.timeOutId=setTimeout(function(){
                      $('#commonMSg').hide();
                      $('#6th_step_1').show();
                  },7000);
              },13000); */
              });
              
              $("#skip9").click(function(e){
              //$('#Red3Text').hide();
              app_2.HideAll();
              $('#4th_step').show();
              });
              
              $("#skip10").click(function(e){
              clearTimeout(app_2.timeOutId);
                  $('#whiteText').hide();
                  $('#commonMSg').show();
                  /* app_2.timeOutId=setTimeout(function(){
                      $('#commonMSg').hide();
                      $('#6th_step_1').show();
                  },7000); */
              });
              
              $("#skip11").click(function(e){
              //$('#commonMSg').hide();
              app_2.HideAll();
              $('#6th_step_1').show();
              });
              $("#skip12").click(function(e){
              //$('#5th_step_text').hide();
              app_2.HideAll();
              $('#6th_step').show();
              });
              $("#skip13").click(function(e){
              //$('#5th_step_Ytext').hide();
              app_2.HideAll();
              $('#6th_step_3').show();
              });
              $("#skip14").click(function(e){
              //$('#Gree6Text').hide();
              app_2.HideAll();
              $('#7th_step').show();
              });
              $("#skip15").click(function(e){
              //$('#Yellow6Text').hide();
              app_2.HideAll();
              $('#7th_step_1').show();
              });
              
              $("#skip17").click(function(e){
              //$('#Wrong6_1Text').hide();
              app_2.HideAll();
              $('#7th_step_2').show();
              });
              $("#skip18").click(function(e){
              //$('#Gree7_2Text').hide();
              app_2.HideAll();
              $('#6th_step').show();
              });
              $("#skip19").click(function(e){
              clearTimeout(app_2.timeOutId);
              //$('#Green7Text').hide();	
              $('#Green7Text').hide();
              $('#Green7Text_1').show();
              app_2.timeOutId=setTimeout(function(){
                  $('#Green7Text_1').hide();
                  $('#Green7Text_2').show();
                  app_2.GenerateReport();
              },15000);
                //$('#Green7Text_1').show();
              });
              
              $("#skip22").click(function(e){
              clearTimeout(app_2.timeOutId);
                  $('#Green7Text_1').hide();
                  app_2.HideAll();
                  $('#Green7Text_2').show();
                  app_2.GenerateReport();
              }); 
      ////////////////////////////////	 
        },
          
        first_click:function(){
        clearTimeout(app_2.timeOutId);
          app_2.score=app_2.score+15;
          app_2.arrClicked.push('G1');
          $('#First_step').hide();
          $('#expiration_txt').hide();
          $('#glad').show();
          $('#expiration').show();
          /* app_2.timeOutId=setTimeout(function(){
          $('#expiration').hide();
          $('#expiration_txt').show();
          app_2.timeOutId=setTimeout(function(){
              $('#glad').hide();
              $('#Second_step').show();
          }, 20000);
          }, 4000); */
        },
        Second_click:function(){
          clearTimeout(app_2.timeOutId);
          $('#First_step').hide();
          $('#glad1').show();	
          /* app_2.timeOutId=setTimeout(function(){
              $('#glad1').hide();
              $('#Second_step').show();
          }, 5000); */
        },
        third_click:function(){
          clearTimeout(app_2.timeOutId);
          app_2.wrongAttempt++;
          app_2.arrClicked.push('R1');
          $('#First_step').hide();
          $('#glad2').show();
          app_2.ErrorReport();
          /* app_2.timeOutId=setTimeout(function(){
              $('#glad2').hide();
              $('#Second_step_1').show();
          }, 10000); */
        },
        Green2:function(){
          app_2.score=app_2.score+15;
          app_2.arrClicked.push('G2');
          clearTimeout(app_2.timeOutId);
          $('#Second_step').hide();
          $('#Green2_Text').show();
          /* app_2.timeOutId=setTimeout(function(){
              $('#Green2_Text').hide();
              $('#3rd_step').show();
          },6000); */
        },
        Yellow2:function(){
          clearTimeout(app_2.timeOutId);
          $('#Second_step,#Second_step_1,#3rd_step,#3rd_step_1').hide();
          $('#Yellow2_Text').show();
          
          /* app_2.timeOutId=setTimeout(function(){
              $('#Yellow2_Text').hide();
              $('#whiteText').show();
              app_2.timeOutId=setTimeout(function(){
                  $('#whiteText').hide();
                  $('#commonMSg').show();
                  app_2.timeOutId=setTimeout(function(){
                      $('#commonMSg').hide();
                      $('#6th_step_1').show();
                  },17000);
              },17000);
          },7000); */
        },
        Wrong2:function(){
          clearTimeout(app_2.timeOutId);
          $('#Second_step_1,#Second_step').hide();
          $('#Wrong2_Text').show();
          app_2.arrClicked.push('R2');
          app_2.wrongAttempt++;
          /* app_2.timeOutId=setTimeout(function(){
              $('#Wrong2_Text').hide();
              $('#3rd_step_1').show();
          },9000); */
          app_2.ErrorReport();
        },
        Green3:function(){
          clearTimeout(app_2.timeOutId);
          app_2.score=app_2.score+15;
          app_2.arrClicked.push('G3');
          $('#3rd_step,#3rd_step_1,#4th_step').hide();	
          $('#Green3Text').show();
          /* app_2.timeOutId=setTimeout(function(){
              $('#Green3Text').hide();
              $('#whiteText').show();
              app_2.timeOutId=setTimeout(function(){
                  $('#whiteText').hide();
                  $('#commonMSg').show();
                  app_2.timeOutId=setTimeout(function(){
                      $('#commonMSg').hide();
                      $('#6th_step_1').show();
                  },7000);
              },13000);
          },3000); */
        },
        Wrong3:function(){
          app_2.wrongAttempt++;
          app_2.arrClicked.push('R3');
          clearTimeout(app_2.timeOutId);
          $('#3rd_step,#3rd_step_1,#4th_step').hide();	
          $('#Red3Text').show();
          /* app_2.timeOutId=setTimeout(function(){
              $('#Red3Text').hide();
              $('#4th_step').show();
              
          },9000); */
          app_2.ErrorReport();
        },
        Wrong3_1:function(){
          app_2.wrongAttempt++;
          app_2.arrClicked.push('R3');
          $('#4th_step,#3rd_step_1').hide();
          clearTimeout(app_2.timeOutId);
          $('#whiteText').show();
          /* app_2.timeOutId=setTimeout(function(){
              $('#whiteText').hide();
              $('#commonMSg').show();
              app_2.timeOutId=setTimeout(function(){
                  $('#commonMSg').hide();
                  $('#6th_step_1').show();
              },9000);
          },14000); */
          app_2.ErrorReport();
        },
        Green4:function(){
          clearTimeout(app_2.timeOutId);
          app_2.score=app_2.score+15;
          app_2.arrClicked.push('G4');
          $('#5th_step,#6th_step_1').hide();
          $('#5th_step_text').show();
          /* app_2.timeOutId=setTimeout(function(){
              $('#5th_step_text').hide();
              $('#6th_step').show();
          },9000); */
        },
        Yellow5:function(){
          clearTimeout(app_2.timeOutId);
          $('#5th_step_Y,#6th_step_1').hide();
          $('#5th_step_Ytext').show();
          /* app_2.timeOutId=setTimeout(function(){
              $('#5th_step_Ytext').hide();
              $('#6th_step_3').show();
          
          },9000); */
        },
        Green6:function(){
          clearTimeout(app_2.timeOutId);
          app_2.score=app_2.score+15;
          app_2.arrClicked.push('G5');
          $('#6th_step,#6th_step_3').hide();
          $('#Gree6Text').show();
          /* app_2.timeOutId=setTimeout(function(){
              $('#Gree6Text').hide();
              $('#7th_step').show();
          },9000); */
        },
        Yellow6:function(){
          clearTimeout(app_2.timeOutId);
          $('#6th_step,#6th_step_3').hide();
          $('#Yellow6Text').show();
          /* app_2.timeOutId=setTimeout(function(){	
              $('#Yellow6Text').hide();
              $('#7th_step_1').show();
          },9000); */
        },
        Wrong6:function(){
          app_2.wrongAttempt++;
          app_2.arrClicked.push('R5');
          clearTimeout(app_2.timeOutId);
          $('#6th_step,#6th_step_2').hide();
          $('#Wrong6Text').show();
          $('#7th_step_2').hide();
          app_2.GenerateReport();
          app_2.ErrorReport();
        },
        Wrong6_1:function(){
          app_2.wrongAttempt++;
          app_2.arrClicked.push('R4');
          clearTimeout(app_2.timeOutId);
          $('#6th_step_1').hide();
          $('#Wrong6_1Text').show();
          /* app_2.timeOutId=setTimeout(function(){	
              $('#Wrong6_1Text').hide();
              $('#7th_step_2').show();
          },9000);  */ 
          app_2.ErrorReport();
        },
        Green7_2:function(){
          clearTimeout(app_2.timeOutId);
          $('#7th_step_2').hide();
          $('#Gree7_2Text').show();
          /* app_2.timeOutId=setTimeout(function(){
              $('#Gree7_2Text').hide();
              $('#6th_step').show();
          },9000); */ 
        },
        Green7:function(){
          clearTimeout(app_2.timeOutId);
          app_2.score=app_2.score+15;
          app_2.arrClicked.push('G6');
          $('#7th_step').hide();
          $('#Green7Text').show();
          /* app_2.timeOutId=setTimeout(function(){
              $('#Green7Text').hide();
              $('#Green7Text_1').show();
              app_2.timeOutId=setTimeout(function(){
                  $('#Green7Text_1').hide();
                  $('#Green7Text_2').show();
                  app_2.GenerateReport();
              },10000);
          },10000); */
        },
        Yellow7:function(){
          clearTimeout(app_2.timeOutId);
          $('#7th_step,#7th_step_1').hide();
          $('#Yellow7Text').show();
          app_2.GenerateReport();
        },
        Wrong7:function(){
          clearTimeout(app_2.timeOutId);
          app_2.wrongAttempt++;
          app_2.arrClicked.push('R6');
          $('#7th_step,#7th_step_1').hide();
          $('#Wrong7Text').show();
          app_2.ErrorReport();
          app_2.GenerateReport();
          
        },
        
        
        GenerateReport:function()
        {
          clearTimeout(app_2.timeOutId);
          $('#marks').removeClass('red');
          $('#marks').removeClass('yellow');
          $('#marks').removeClass('green');
          if ((app_2.score <= 69) && (app_2.score >= 0))
          {
              $('#FeedBack1').show();
              $('.displayBlock').show();
              $('#marks').addClass('red');
              $('#all_report P.R1').show();
              app_2.Breakdown();
          }
          else if ((app_2.score <= 79) && (app_2.score >= 70)){
              $('#FeedBack2').show();
              $('.displayBlock').show();
              $('#marks').addClass('yellow');
              $('#all_report P.Y1').show();
              app_2.Breakdown();
          }
          else{
              $('#FeedBack3').show();
              $('.displayBlock').show();
              $('#marks').addClass('green');
              $('#all_report P.G1').show();
              app_2.Breakdown();
          }
        },
       ErrorReport:function()
        {
          if(app_2.wrongAttempt>=3 && app_2.Flag!=true)
          {
              clearTimeout(app_2.timeOutId);
              app_2.Flag=true;
              app_2.GenerateReport();
              $('#FeedBack1').show();
              $('.displayBlock').show();
          } 
        },
        
        
       Breakdown:function()
        {
         if(app_2.isReportOpen!=true){
          app_2.isReportOpen=true;
            //app_2.LoadConfig();		
            var Rtext='';
              // var xPath="//Sec9Report/Category";
              // var nodes= app_2.ConfigXML.evaluate(xPath, app_2.ConfigXML, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
              var jsonData = resultJSON.Sec9Report.Category;
              console.log(jsonData);
              for ( var i=0 ; i < jsonData.length; i++ )
              {
                var resTitle = null;
                  var point=null;
                  var resColor=null;
                  var resDesc = null;
                  
                  /* if(app_2.arrClicked.indexOf(nodes.snapshotItem(i).children[0].attributes['name'].value)!=-1)
                  {
                      Temp=nodes.snapshotItem(i).children[0];
                  }
                  else if(app_2.arrClicked.indexOf(nodes.snapshotItem(i).children[1].attributes['name'].value)!=-1)
                  {
                      Temp=nodes.snapshotItem(i).children[1];				
                  }
                  else
                  {
                      Temp=nodes.snapshotItem(i).children[1];
                  }
                  point=Temp.children[0];
                  explain=Temp.children[1]; */
                  console.log(jsonData[i]);
                  if(app_2.arrClicked.indexOf(jsonData[i].item[0]._name)!=-1)
                  {
                    resColor = jsonData[i].item[0].Point._color;
                    point = jsonData[i].item[0].Point.__text;
                    resDesc = jsonData[i].item[0].Explanation;
                  }
                  else if(app_2.arrClicked.indexOf(jsonData[i].item[1]._name)!=-1)
                  {
                    resColor = jsonData[i].item[1].Point._color;
                    point = jsonData[i].item[1].Point.__text;
                    resDesc = jsonData[i].item[1].Explanation;				
                  }else{
                    resColor = jsonData[i].item[1].Point._color;
                    point = jsonData[i].item[1].Point.__text;
                    resDesc = jsonData[i].item[1].Explanation;	
                  }
                  
                  resTitle = jsonData[i]._title;

                  Rtext+='<div class="row">';
                  Rtext+='<div class="col-xs-2 pd1"><div class="marks1 '+resColor+'"><p>'+point+'</p><span>POINTS</span></div></div>';
                  Rtext+='<div class="col-xs-10 pd1"><f><h5>'+resTitle+'</h5></f>';
                  Rtext+='<f><p>'+resDesc+'</p></f></div></div>';
                  
              }
          
          $('#marks').html(app_2.score+'%');
          $('#report_details').html(Rtext);
          $('#all_report').show();
          }
          /*    $('html, body').animate({
              scrollTop: $("#all_report").offset().top
          }, 1000);*/
        },
       
         BreakdownLink:function()
         {
         $('#all_report').show();
         $('html, body').animate({
              scrollTop: $("#all_report").offset().top
          }, 1000);
          },
        
        LoadConfig:function(){
          var xmlhttp;
          if (window.XMLHttpRequest) {
              xmlhttp = new XMLHttpRequest();
          } else {
              // code for older browsers
              xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
          }
          xmlhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {
                  app_2.ConfigXML=xmlhttp.responseXML;
              }
          };
          xmlhttp.open("GET", "Section9Report.xml", true);
          xmlhttp.send();
          },
          ResetFun1:function(){
              app_2.timeOutId=null;
              app_2.arrClicked=[];
              app_2.ConfigXML=null;
              app_2.score= 0,
              app_2.wrongAttempt=0,
              app_2.IsIntrupt=false;
              $('#FeedBack1,#FeedBack2,#FeedBack3').hide();
              $('.displayBlock').hide();
              $("#Konck").show();
              app_2.init();
              app_2.Flag=false;
              app_2.isReportOpen=false;
          }
      }
      $(window).load(function () {
        app_2.init();  
      });
