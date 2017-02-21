// Userlist data array for filling in info box
var userListData = [];
var questsListData = [];
var QuestsRatingTable = [];

// DOM Ready =============================================================
$(document).ready(function() {



});

// Functions =============================================================







// Signin Function
function SearchTestByCode() {


    // jQuery AJAX call for JSON
    
    var codeField = localStorage.getItem('codeField');
    
    localStorage.removeItem('codeField');
       
    
    var url = '/SFDC/SearchTestByCode/' + codeField;
    
    $.getJSON( url, function( data ) { 
    
      if (data.length>0) {

         
        $.each(data, function(){
                
			localStorage.setItem('Id', this.Id);
			localStorage.setItem('KabalaNumber__c', this.KabalaNumber__c);

        	//document.querySelector('x-LiveResultsLogin').LoginSuccess();
        	
			
        });           
         
    
     } else {
     
     		
     		console.log('SearchStatus: Failed');
     
     }


 });


};


// Create new Live Config record

function CreateLRConfigRecord(event) {

	document.querySelector('.StatusLabel').innerHTML = "השינויים נשמרו";
	
	var e = document.getElementById("LiveResultsEngineStatus");
	var LiveEngine = e.options[e.selectedIndex].value;
     	
	//var ChangeBy = getUrlParameter('ChangeBy');   
	var ChangeBy = 'Menashe';    
	  
	var dateFormat = 'YYYY-MM-DD HH:mm:ss';
	var ChangeTime = moment().format(dateFormat);  
    
    var url = '/EmailToSms/addLRConfigRecord/';
    
    
        var LiveEngineConfigRecord = {
            'LiveEngine': LiveEngine,
            'ChangeBy': ChangeBy,
            'ChangeTime': ChangeTime
        }


        // If they did, do our delete
        $.ajax({
            type: 'POST',
            data: LiveEngineConfigRecord,
            url: url,
            dataType: 'JSON'
        }).done(function( response ) {
            

        });    
           

     
         setTimeout(function () { 
             
             document.querySelector('.StatusLabel').innerHTML = ""; 
             
         
         }, 2000);
   
        

    };





// Create new SMS config record

function CreateSMSConfigRecord(event) {

	document.querySelector('.StatusLabel').innerHTML = "השינויים נשמרו";
	
	var e = document.getElementById("SMSEngineStatus");
	var SMSEngine = e.options[e.selectedIndex].value;
     	
	//var ChangeBy = getUrlParameter('ChangeBy');   
	var ChangeBy = 'Menashe';    
	  
	var dateFormat = 'YYYY-MM-DD HH:mm:ss';
	var ChangeTime = moment().format(dateFormat);  
    
    var url = '/EmailToSms/addSMSConfigRecord/';
    
    
        var SMSEngineConfigRecord = {
            'SMSEngine': SMSEngine,
            'ChangeBy': ChangeBy,
            'ChangeTime': ChangeTime
        }


        // If they did, do our delete
        $.ajax({
            type: 'POST',
            data: SMSEngineConfigRecord,
            url: url,
            dataType: 'JSON'
        }).done(function( response ) {
            

        });    
           

     
         setTimeout(function () { 
             
             document.querySelector('.StatusLabel').innerHTML = ""; 
             
         
         }, 2000);
   
        

    };




// Send SMS function
function EmailToSms(event) {
     
	var UserPhoneNumber = getUrlParameter('PhoneToVerifyID');   
	  
    var PasswordStr = getUrlParameter('PasswordStr');  
    
    var url = '/EmailToSms/SendSMS/';
    
    
        var SMSRecord = {
            'Subject': 'הודעת מערכת',
            'MessageBody': 'נא להקיש את קוד האימות בחלונית המתאימה',
            'code': PasswordStr,
            'recipient': UserPhoneNumber
        }


        // If they did, do our delete
        $.ajax({
            type: 'POST',
            data: SMSRecord,
            url: url,
            dataType: 'JSON'
        }).done(function( response ) {
            

        });    
           
        

    };


// Get URL parameters
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};