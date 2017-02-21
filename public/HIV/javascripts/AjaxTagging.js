// Userlist data array for filling in info box


// DOM Ready =============================================================
$(document).ready(function() {


});



// Autocomplete Tagging search ========================================================



// End Autocomplete Tagging search ======================================================





// General Functions =============================================================



// Delete Activity Tag

function DeleteActivityTag(event) {
    	
    	var TagID = localStorage.getItem('DeleteActivityTagIDtoDel');


        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'DELETE',
            url: '/AppEngine/DelActivityTag/' + TagID,
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
            


            }
           
        });
	
};


// Delete Hasmacha Tag

function DeleteHasmachaTag(event) {
    	
    	var TagID = localStorage.getItem('DeleteHasmachaTagIDtoDel');


        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'DELETE',
            url: '/AppEngine/DelHasmachaTag/' + TagID,
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
            


            }
           
        });
	
};




// Add Volunteer Pref Tag Function
function CreateVolunteerPreferenceTag(event) {

		var dNow = new Date();
		var utcdate= (dNow.getMonth()+ 1) + '/' + dNow.getDate() + '/' + dNow.getFullYear();
		localStorage.setItem('CurrentDate', utcdate);


        var JSONTagDataParsed = $.parseJSON('{}');
        JSONTagDataParsed.ActivityTagType = 'VolunteerPref';
        JSONTagDataParsed.ActivityTagIcon = 'social:people';
        JSONTagDataParsed.ActivityTagTitle = localStorage.getItem('CreateVolunteerPref');
        JSONTagDataParsed.CreatedDate = localStorage.getItem('CurrentDate');
        JSONTagDataParsed.ActivityTagCreatedBy = localStorage.getItem('CurrentLoggedInUser');


        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: JSONTagDataParsed,
            url: '/AppEngine/CreateActivityTag',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
            


            }
           
        });
	
};



// Add Gender Tag Function
function CreateGenTag(event) {

		var dNow = new Date();
		var utcdate= (dNow.getMonth()+ 1) + '/' + dNow.getDate() + '/' + dNow.getFullYear();
		localStorage.setItem('CurrentDate', utcdate);


        var JSONTagDataParsed = $.parseJSON('{}');
        JSONTagDataParsed.ActivityTagType = 'Gender';
        JSONTagDataParsed.ActivityTagIcon = 'editor:merge-type';
        JSONTagDataParsed.ActivityTagTitle = localStorage.getItem('CreateGender');
        JSONTagDataParsed.CreatedDate = localStorage.getItem('CurrentDate');
        JSONTagDataParsed.ActivityTagCreatedBy = localStorage.getItem('CurrentLoggedInUser');


        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: JSONTagDataParsed,
            url: '/AppEngine/CreateActivityTag',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
            


            }
           
        });
	
};



// Add Location Tag Function
function CreateLocTag(event) {

		var dNow = new Date();
		var utcdate= (dNow.getMonth()+ 1) + '/' + dNow.getDate() + '/' + dNow.getFullYear();
		localStorage.setItem('CurrentDate', utcdate);


        var JSONTagDataParsed = $.parseJSON('{}');
        JSONTagDataParsed.ActivityTagType = 'Location';
        JSONTagDataParsed.ActivityTagIcon = 'maps:place';
        JSONTagDataParsed.ActivityTagTitle = localStorage.getItem('CreateLocation');
        JSONTagDataParsed.CreatedDate = localStorage.getItem('CurrentDate');
        JSONTagDataParsed.ActivityTagCreatedBy = localStorage.getItem('CurrentLoggedInUser');


        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: JSONTagDataParsed,
            url: '/AppEngine/CreateActivityTag',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
            


            }
           
        });
	
};



// Add Customer Tag Function
function CreateCustTag(event) {

		var dNow = new Date();
		var utcdate= (dNow.getMonth()+ 1) + '/' + dNow.getDate() + '/' + dNow.getFullYear();
		localStorage.setItem('CurrentDate', utcdate);


        //var TagValue = localStorage.getItem('TagValue');
        //var JSONTagDataParsed = JSONTagData;
        var JSONTagDataParsed = $.parseJSON('{}');
        JSONTagDataParsed.ActivityTagType = 'Customer';
        JSONTagDataParsed.ActivityTagIcon = 'icons:face';
        JSONTagDataParsed.ActivityTagTitle = localStorage.getItem('CreateCustomerTag');
        JSONTagDataParsed.CreatedDate = localStorage.getItem('CurrentDate');
        JSONTagDataParsed.ActivityTagCreatedBy = localStorage.getItem('CurrentLoggedInUser');


        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: JSONTagDataParsed,
            url: '/AppEngine/CreateActivityTag',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
            


            }
           
        });
	
};



// Add Type Tag Function
function CreateType_Tag(event) {

		var dNow = new Date();
		var utcdate= (dNow.getMonth()+ 1) + '/' + dNow.getDate() + '/' + dNow.getFullYear();
		localStorage.setItem('CurrentDate', utcdate);


        //var TagValue = localStorage.getItem('TagValue');
        //var JSONTagDataParsed = JSONTagData;
        var JSONTagDataParsed = $.parseJSON('{}');
        JSONTagDataParsed.ActivityTagType = 'Type';
        JSONTagDataParsed.ActivityTagIcon = 'icons:loyalty';
        JSONTagDataParsed.ActivityTagTitle = localStorage.getItem('CreateTypeTag');
        JSONTagDataParsed.CreatedDate = localStorage.getItem('CurrentDate');
        JSONTagDataParsed.ActivityTagCreatedBy = localStorage.getItem('CurrentLoggedInUser');


        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: JSONTagDataParsed,
            url: '/AppEngine/CreateActivityTag',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
            


            }
           
        });
	
};



// Add Hasmacha Tag 
function CreateHasmacha_Tag(event) {

		var dNow = new Date();
		var utcdate= (dNow.getMonth()+ 1) + '/' + dNow.getDate() + '/' + dNow.getFullYear();
		localStorage.setItem('CurrentDate', utcdate);


        //var TagValue = localStorage.getItem('TagValue');
        //var JSONTagDataParsed = JSONTagData;
        var JSONTagDataParsed = $.parseJSON('{}');
        JSONTagDataParsed.HasmachaTagType = 'Default';
        JSONTagDataParsed.HasmachaTagTitle = localStorage.getItem('CreateNewHasmachaTag');
        JSONTagDataParsed.HasmachaTagCreatedDate = localStorage.getItem('CurrentDate');
        JSONTagDataParsed.HasmachaTagCreatedBy = localStorage.getItem('CurrentLoggedInUserID');


        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: JSONTagDataParsed,
            url: '/AppEngine/CreateHasmachaTag',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
            


            }
           
        });
	
};









// Retrive Location Tag - while user types Function

function SearchAndSaveLocationTagByRequest(event) {

    var SearchLocationTagItem = localStorage.getItem('SearchLocationTagItem');
    
    var url = '/AppEngine/SearchActivityTag/' + SearchLocationTagItem;

    $.getJSON( url, function( data ) {
    
    
            $.each(data, function(){
            	TagItem = $('#TagLocationResult').html();
        		TagItem += '<div class="Tag">' + this.ActivityTagTitle + '<iron-icon class="TagIcon" icon="label"></iron-icon></div>';
				console.log(TagItem);
				
				var JSONTagData = $.parseJSON('{}');
				//JSONTagData._id = localStorage.getItem('CurrentActivity');
        		JSONTagData.LocationActivityTagID = this._id;
        		JSONTagData.LocationActivityTagTitle = this.ActivityTagTitle;

        		$.ajax({
            		type: 'post',
            		data: JSONTagData,
            		url: '/AppEngine/UpdateTagForActivity/' + localStorage.getItem('CurrentActivity'),
            		dataType: 'JSON'
        		}).done(function( response ) {

            	if (response.msg === '') {


            	}
           
        		});



        });
    	
		$('#TagLocationResult').html(TagItem);

    }); 
    

};




// Retrive Customer Tag - while user types Function

function SearchAndSaveCustomerTagByRequest(event) {

    var SearchCustomerTagItem = localStorage.getItem('SearchCustomerTagItem');
    
    var url = '/AppEngine/SearchActivityTag/' + SearchCustomerTagItem;

    $.getJSON( url, function( data ) {
    
    
            $.each(data, function(){
            	TagItem = $('#TagCustomerResult').html();
        		TagItem += '<div class="Tag">' + this.ActivityTagTitle + '<iron-icon class="TagIcon" icon="label"></iron-icon></div>';
				console.log(TagItem);
				
				var JSONTagData = $.parseJSON('{}');
				//JSONTagData._id = localStorage.getItem('CurrentActivity');
        		JSONTagData.CustomerActivityTagID = this._id;
        		JSONTagData.CustomerActivityTagTitle = this.ActivityTagTitle;

        		$.ajax({
            		type: 'post',
            		data: JSONTagData,
            		url: '/AppEngine/UpdateTagForActivity/' + localStorage.getItem('CurrentActivity'),
            		dataType: 'JSON'
        		}).done(function( response ) {

            	if (response.msg === '') {


            	}
           
        		});



        });
    	
		$('#TagCustomerResult').html(TagItem);

    }); 
    

};


// Retrive TYPE Tag - while user types Function

function SearchAndSaveTYPETagByRequest(event) {

    var SearchTYPETagItem = localStorage.getItem('SearchTypeTagItem');
    
    var url = '/AppEngine/SearchActivityTag/' + SearchTYPETagItem;

    $.getJSON( url, function( data ) {
    
    
            $.each(data, function(){
            	TagItem = $('#TagTYPEResult').html();
        		TagItem += '<div class="Tag">' + this.ActivityTagTitle + '<iron-icon class="TagIcon" icon="label"></iron-icon></div>';
				console.log(TagItem);
				
				var JSONTagData = $.parseJSON('{}');
				//JSONTagData._id = localStorage.getItem('CurrentActivity');
        		JSONTagData.TypeActivityTagID = this._id;
        		JSONTagData.TypeActivityTagTitle = this.ActivityTagTitle;
        		JSONTagData.TypeActivityTagIcon = this.ActivityTagIcon;

        		$.ajax({
            		type: 'post',
            		data: JSONTagData,
            		url: '/AppEngine/UpdateTagForActivity/' + localStorage.getItem('CurrentActivity'),
            		dataType: 'JSON'
        		}).done(function( response ) {

            	if (response.msg === '') {


            	}
           
        		});



        });
    	
		$('#TagTYPEResult').html(TagItem);

    }); 
    

};




// Retrive Hasmachot Tags after user's search


function SearchAndSaveHasmachaTagByRequest(event) {

    var SearchHasmachaTagItem = localStorage.getItem('SearchHasmachaTagItem');
    
    var url = '/AppEngine/SearchHasmachotTag/' + SearchHasmachaTagItem;

    $.getJSON( url, function( data ) {
    
    
            $.each(data, function(){
            	TagItem = $('#TagHasmachaResult').html();
        		TagItem += '<div class="Tag" HasmachaTagID$="{{item._id}}" HasmachaTagTitle$="{{item.HasmachaTagTitle}}">' + this.HasmachaTagTitle + '<iron-icon class="TagIcon" icon="label"></iron-icon><iron-icon icon="icons:clear" on-click="DeleteHasmachaToUser" HasmachaTagID$="{{item._id}}" HasmachaTagTitle$="{{item.HasmachaTagTitle}}"></iron-icon></div>';
				console.log(TagItem);
				 				

				var JSONTagData = $.parseJSON('{}');
				//JSONTagData._id = localStorage.getItem('CurrentActivity');
        		JSONTagData.HasmachaTagID = this._id;
        		JSONTagData.HasmachaTagTitle = this.HasmachaTagTitle;

        		$.ajax({
            		type: 'post',
            		data: JSONTagData,
            		url: '/AppEngine/UpdateTagForUser/' + localStorage.getItem('CurrentLoggedInUserID'),
            		dataType: 'JSON'
        		}).done(function( response ) {

            	if (response.msg === '') {


            	}
           
        		});



        });
    	
		$('#UserTagHasmachaResult').html(TagItem);

    }); 
    

};







// Search and Save Hasmachot Tags to Activity

function SearchAndSaveHasmachaToActivityTagByRequest(event) {

    var SearchHasmachaTagItem = localStorage.getItem('SearchHasmachaTagItem');
    
    var url = '/AppEngine/SearchHasmachotTag/' + SearchHasmachaTagItem;

    $.getJSON( url, function( data ) {
    
    
            $.each(data, function(){
            	TagItem = $('#TagHasmachaResult').html();
        		TagItem += '<div class="Tag" HasmachaTagID$="{{item._id}}" HasmachaTagTitle$="{{item.HasmachaTagTitle}}">' + this.HasmachaTagTitle + '<iron-icon class="TagIcon" icon="label"></iron-icon><iron-icon icon="icons:clear" on-click="DeleteHasmachaToUser" HasmachaTagID$="{{item._id}}" HasmachaTagTitle$="{{item.HasmachaTagTitle}}"></iron-icon></div>';
				console.log(TagItem);
				 				

				var JSONTagData = $.parseJSON('{}');
				//JSONTagData._id = localStorage.getItem('CurrentActivity');
        		JSONTagData.HasmachaTagID = this._id;
        		JSONTagData.HasmachaTagTitle = this.HasmachaTagTitle;

        		$.ajax({
            		type: 'post',
            		data: JSONTagData,
            		url: '/AppEngine/UpdateHasmachotTagForActivity/' + localStorage.getItem('CurrentActivity'),
            		dataType: 'JSON'
        		}).done(function( response ) {

            	if (response.msg === '') {


            	}
           
        		});



        });
    	
		$('#TagHasmachaResult').html(TagItem);

    }); 
    

};







// End Hoshen Functions =============================================================





// AddQuestTag Function
function AddQuestTag(event) {

		var dNow = new Date();
		var utcdate= (dNow.getMonth()+ 1) + '/' + dNow.getDate() + '/' + dNow.getFullYear();
		localStorage.setItem('CurrentDate', utcdate);


        //var TagValue = localStorage.getItem('TagValue');
        //var JSONTagDataParsed = JSONTagData;
        var JSONTagDataParsed = $.parseJSON('{}');
        JSONTagDataParsed.TagValue = localStorage.getItem('TagValue');
        JSONTagDataParsed.CreatedDate = localStorage.getItem('CurrentDate');
        JSONTagDataParsed.QuestCreatedBy = localStorage.getItem('CurrentLoggedInUser');
        JSONTagDataParsed.QuestID = localStorage.getItem('CurrentQuest');


        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: JSONTagDataParsed,
            url: '/AppEngine/addQuestTag',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
            
            	//var URL = '/questarea';

				//Response.Redirect=URL;
				//window.location.href=URL;


            }
           
        });
	
};





// Retrive Tag list per Quest Function
function GetQuestTagList(event) {

    var QuestID = localStorage.getItem('NewQuest');
    
    var url = '/AppEngine/GetQuestTagList/' + QuestID;

    $.getJSON( url, function( data ) {

		console.log('Getting some Tags data');
		var TagListdata = data;
		console.log(TagListdata);

    }); 

};


// AddQuestTag Function
function AddUserTag(event) {

		var dNow = new Date();
		var utcdate= (dNow.getMonth()+ 1) + '/' + dNow.getDate() + '/' + dNow.getFullYear();
		localStorage.setItem('CurrentDate', utcdate);


        //var TagValue = localStorage.getItem('TagValue');
        //var JSONTagDataParsed = JSONTagData;
        var JSONuserTagDataParsed = $.parseJSON('{}');
        JSONuserTagDataParsed.TagValue = localStorage.getItem('userTag');
        JSONuserTagDataParsed.CreatedDate = localStorage.getItem('CurrentDate');
        JSONuserTagDataParsed.QuestCreatedBy = localStorage.getItem('CurrentLoggedInUser');
        JSONuserTagDataParsed.QuestCreatedByID = localStorage.getItem('NewUserID');


        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: JSONuserTagDataParsed,
            url: '/AppEngine/addUserTag',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
            
            	//var URL = '/questarea';

				//Response.Redirect=URL;
				//window.location.href=URL;


            }
           
        });
	
};




