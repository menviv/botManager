// Userlist data array for filling in info box


// DOM Ready =============================================================
$(document).ready(function() {


 

  

});

// Authorization Functions =============================================================




// login Function =====================================================================



// Signin Function
function Signin() {


    // jQuery AJAX call for JSON
    
    var emailField = localStorage.getItem('emailField');
    var passwordField = localStorage.getItem('passwordField');
    var LoginParameters = emailField + '/' + passwordField;
    
    localStorage.removeItem('emailField');
    localStorage.removeItem('passwordField');    
       
    
    var url = '/UsersEngine/Signin/' + LoginParameters;
    
    $.getJSON( url, function( data ) { 
    
      if (data.length>0) {

         
        $.each(data, function(){
                
			localStorage.setItem('CurrentLoggedInUser', this.UserFullName);
			localStorage.setItem('CurrentLoggedInUserEmail', this.email);
			localStorage.setItem('CurrentLoggedInUserID', this._id);
			localStorage.setItem('UserSessionID', this._id);
			localStorage.setItem('ShowUpdateDetails', this.ShowUpdateDetails);
			localStorage.setItem('UserProfile', this.profile);
  			
        	
        	document.querySelector('x-Login').LoginSuccess();
        	
			
        });           
         
    
     } else {
     
     		localStorage.setItem('SinginStatus', 'no'); 
     		
     		document.querySelector('x-MainNav').LoginEvaluation();
     		
     		console.log('SinginStatus: Failed');
     
     }


 });


};