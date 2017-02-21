// Userlist data array for filling in info box
var TagItem='';

// DOM Ready =============================================================
$(document).ready(function() {

});

// Functions =============================================================


// Start Hoshen Functions =============================================================



 






/*
 * Create / Register new user
 */ 
 
function RegisterNewUser(event) {

		var dNow = new Date();
		var utcdate= (dNow.getMonth()+ 1) + '/' + dNow.getDate() + '/' + dNow.getFullYear();
		localStorage.setItem('CurrentDate', utcdate);


        var JSONRegisterDataParsed = $.parseJSON(localStorage.getItem('JSONRegisterData'));
        JSONRegisterDataParsed.CreatedDate = localStorage.getItem('CurrentDate');


        $.ajax({
            type: 'POST',
            data: JSONRegisterDataParsed,
            url: '/AppEngine/RegisterNewUser',
            dataType: 'JSON'
        }).done(function( response ) {

            if (response.msg === '') {
            
                localStorage.setItem('CreateUserStatusMessage', 'שגיאת מערכת: נא לנסות שנית או לפנות למנהל המערכת');
                
                document.querySelector('x-CreateUser').CreateUserStatus();

            } else {
 
                localStorage.setItem('CurrentLoggedInUserID', response.oid);
                
                localStorage.setItem('CreateUserStatusMessage', 'משתמש חדש נוצר בהצלחה');
                
                document.querySelector('x-CreateUser').CreateUserStatus();
                
            }
           
        });
	
};







// End Hoshen Functions =============================================================



