// Userlist data array for filling in info box
var userListData = [];
var questsListData = [];
var QuestsRatingTable = [];

// DOM Ready =============================================================
$(document).ready(function() {

	EmailToSms();
	
	CreateSMSByPassPhoneVerifyCode();

});

// Functions =============================================================


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
    
    
    
// Create SMS By Pass Phone Verify ode

function CreateSMSByPassPhoneVerifyCode(event) {
	
	function ByPassPhoneVerifyCode() {
    	var length = 5,
        	charset = "abcdefghijklmnopqrstuvwxyz0123456789",
        	retVal = "";
    	for (var i = 0, n = charset.length; i < length; ++i) {
        	retVal += charset.charAt(Math.floor(Math.random() * n));
    	}
    	return retVal;
	} 
	
	var ByPassPhoneVerifyCode = ByPassPhoneVerifyCode();  
	  
	var dateFormat = 'YYYY-MM-DD HH:mm:ss';
	var ChangeTime = moment().format(dateFormat);  
    
    var url = '/EmailToSms/addSMSByPassPhoneVerifyCode/';
    
    
        var ByPassPhoneVerifyCodeRecord = {
            'ByPassPhoneVerifyCode': ByPassPhoneVerifyCode,
            'ChangeTime': ChangeTime
        }


        // If they did, do our delete
        $.ajax({
            type: 'POST',
            data: ByPassPhoneVerifyCodeRecord,
            url: url,
            dataType: 'JSON'
        }).done(function( response ) {
            

        });    
           

   
        

    };
    




// Send SMS function
function EmailToSms(event) {
     
	var UserPhoneNumber = getUrlParameter('PhoneToVerifyID');   
	  
    var PasswordStr = getUrlParameter('PasswordStr');  

    var KabalaNo = getUrlParameter('KabalaNo'); 
    
    var url = '/EmailToSms/SendSMS/';
    
    /*
        var SMSRecord = {
            'Subject': 'הודעת מערכת',
            'MessageBody': ' נא להקיש את קוד האימות בחלונית המתאימה',
            'code': PasswordStr,
            'KabalaNo': KabalaNo,
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
*/


    

    
        var SMSXml = '<Inforu><User><Username>menasheg</Username><Password>GezelMen30</Password> </User><Content Type="sms"><Message>זוהי הודעת fdsfdsfdsfdsfds ניסיון 123</Message></Content><Recipients><PhoneNumber>0549959409;</PhoneNumber></Recipients><Settings><Sender>035613000</Sender> </Settings></Inforu>';
        var ParsedXML = $.parseXML( SMSXml );
        console.log(ParsedXML);
        var $xml = $(ParsedXML);
        var XMLurl = 'http://api.inforu.co.il/SendMessageXml.ashx?InforuXML=' + ParsedXML;
        //var XMLurl = 'http://api.inforu.co.il/SendMessageXml.ashx?InforuXML=';

        // If they did, do our delete
        $.ajax({
            type: 'POST',
            contentType: "text/xml; charset=utf-8",                
            dataType: "text",
             crossDomain: true,
                 headers: {
                    'Access-Control-Allow-Origin': '*'
                },            
            url: XMLurl
        }).done(function( response ) {

            console.log(response);
            

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




