// Userlist data array for filling in info box
var userListData = [];
var questsListData = [];
var QuestsRatingTable = [];
var DateFormat = "YYYY-MM-DD HH:mm:ss";

// DOM Ready =============================================================
$(document).ready(function() {


});


// Functions =============================================================



///////////// Start Hoshen functions /////////////////////////////////////////////////

// Report New Bug

function CreateNewTicket(event) {

		var dNow = new Date();
		var utcdate= (dNow.getMonth()+ 1) + '/' + dNow.getDate() + '/' + dNow.getFullYear();
		localStorage.setItem('CurrentDate', utcdate);


        var JSONReportNewBugrDataParsed = $.parseJSON(localStorage.getItem('JSONTicketData'));
        localStorage.removeItem('JSONTicketData');
        JSONReportNewBugrDataParsed.CreatedDate = localStorage.getItem('CurrentDate');
        JSONReportNewBugrDataParsed.UpdateDate = localStorage.getItem('CurrentDate');
        JSONReportNewBugrDataParsed.TicketType = 'Bug';
        JSONReportNewBugrDataParsed.HandledBy = 'אדמין';
        JSONReportNewBugrDataParsed.Status = 'New';
        JSONReportNewBugrDataParsed.StatusIcon = 'icons:markunread';
        JSONReportNewBugrDataParsed.Owner = localStorage.getItem('CurrentLoggedInUserID');


        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: JSONReportNewBugrDataParsed,
            url: '/AppEngine/CreateNewTicket',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
            
                localStorage.setItem('CreateUserStatusMessage', 'שגיאת מערכת: נא לנסות שנית או לפנות למנהל המערכת');
                
                document.querySelector('x-BugReport').CreateUserStatus();

            } else {
 
                localStorage.setItem('CreateTicketStatusMessageID', response[0]._id);
                
                localStorage.setItem('CreateTicketStatusMessage', 'תודה על הדיווח, מספר הקריאה למעקב הוא:');
                
                document.querySelector('x-BugReport').CreateTicketStatus();
                
            }
           
        });
	
};

/*

function CreateNewPhase(event) {

		var dNow = new Date();
		var utcdate= (dNow.getMonth()+ 1) + '/' + dNow.getDate() + '/' + dNow.getFullYear();
		localStorage.setItem('CurrentDate', utcdate);


        var JSONReportNewPhaseDataParsed = $.parseJSON(localStorage.getItem('JSONPhasedata'));
        localStorage.removeItem('JSONPhasedata');
        JSONReportNewPhaseDataParsed.CreatedDate = localStorage.getItem('CurrentDate');
        JSONReportNewPhaseDataParsed.StatusIcon = '/icons/phase.png';


        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: JSONReportNewPhaseDataParsed,
            url: '/processEngine/CreateNewPhase',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
            
                localStorage.setItem('CreateUserStatusMessage', 'שגיאת מערכת: נא לנסות שנית או לפנות למנהל המערכת');
                
                document.querySelector('x-Phase').CreatePhaseStatus();

            } else {
 
				localStorage.setItem('PhaseID', response[0]._id);  
				
				localStorage.setItem('PhaseLabel', response[0].Label); 
				
				document.querySelector('x-Phase').PopulatePhase();
				      			
       			document.querySelector('x-Phase').PopulatePhaseList();
       			
       			document.querySelector('x-Phase').hidePhaseOne();
                
            }
           
        });
	
};

*/

// Add Activity
function CreateNewActivity(event) {

		var jsonDate = (new Date(localStorage.getItem('CurrentDate'))).toJSON();

    // Check and make sure errorCount's still at zero


        // If it is, compile all user info into one object
        var newActivity = localStorage.getItem('JSONdata');
        var newActivityobj = $.parseJSON(newActivity);
        var CreatedDate = moment().format("DD-MM-YYYY");
        var jsonActivityDate = newActivityobj.Date;
        
        jsonActivityDate = moment(jsonActivityDate).format(DateFormat);
		
        newActivityobj.Date = jsonActivityDate;
        newActivityobj.ActivityCreatedDate = CreatedDate;
        
    	newActivityobj.IsoCreatedDate = CreatedDate;   
        
        newActivityobj.ActivityCreatedBy = localStorage.getItem('CurrentLoggedInUser');
        newActivityobj.ActivityType = localStorage.getItem('CurrentActivityFilter');
        localStorage.removeItem('CurrentActivityFilter');
        newActivityobj.ActivityStatus = "Active";
        

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newActivityobj,
            url: '/AppEngine/addActivity',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                $('.paper-input-container-0 .input-content.paper-input-container input').val('');

            }
            else {

                 $('.paper-input-container-0 .input-content.paper-input-container input').val('');
                console.log(response.oid);
                localStorage.setItem('CurrentActivity', response[0]._id);
                localStorage.setItem('NewActivity', response[0]._id);
 
 				document.querySelector('x-createActivity').GoToActivity();
 
            }
        });

};





// User to Join Activity

function AskToJoinActivity(event) {


        // If it is, compile all user info into one object
        var RequestByUserToJoinActivityRecord = {
            'UserName': localStorage.getItem('CurrentLoggedInUser'),
            'UserID': localStorage.getItem('CurrentLoggedInUserID'),
            'ActivityID': localStorage.getItem('JoinToActivityID'),
            'ActivityTitle': localStorage.getItem('JoinToActivityTitle'),
            'RequestToJoinDate': localStorage.getItem('CurrentDate'),
            'RequestComment': localStorage.getItem('RequestComment'),
            'RequestBtnClass': 'invisible',
            'RequestStatus': 'pending',
        }


        // If they did, do our delete
        $.ajax({
            type: 'POST',
            data: RequestByUserToJoinActivityRecord,
            url: '/AppEngine/AskToJoinActivity/'+localStorage.getItem('JoinToActivityID') + '/' + localStorage.getItem('CurrentLoggedInUserID'),
            dataType: 'JSON'
        }).done(function( response ) {

           
        });

    };


// User to Manage Activity

function AskToManageActivity(event) {


        // If it is, compile all user info into one object
        var RequestByUserToManageActivityRecord = {
            'UserName': localStorage.getItem('CurrentLoggedInUser'),
            'UserID': localStorage.getItem('CurrentLoggedInUserID'),
            'ActivityID': localStorage.getItem('ManageToActivityID'),
            'ActivityTitle': localStorage.getItem('ManageToActivityTitle'),
            'RequestToManageDate': localStorage.getItem('CurrentDate'),
            'ManageRequestComment': localStorage.getItem('RequestComment'),
            'RequestBtnClass': 'invisible',
            'RequestStatus': 'pending',
        }


        // If they did, do our delete
        $.ajax({
            type: 'POST',
            data: RequestByUserToManageActivityRecord,
            url: '/AppEngine/AskToManageActivity/'+localStorage.getItem('ManageToActivityID') + '/' + localStorage.getItem('CurrentLoggedInUserID'),
            dataType: 'JSON'
        }).done(function( response ) {

			document.querySelector('x-RequestActivity').BackToActivityList();
           
        });

    };



// User to Watch Activity

function AskToWatchActivity(event) {


        // If it is, compile all user info into one object
        var RequestByUserToWatchActivityRecord = {
            'UserName': localStorage.getItem('CurrentLoggedInUser'),
            'UserID': localStorage.getItem('CurrentLoggedInUserID'),
            'ActivityID': localStorage.getItem('WatchToActivityID'),
            'ActivityTitle': localStorage.getItem('WatchToActivityTitle'),
            'RequestToWatchDate': localStorage.getItem('CurrentDate'),
            'WatchRequestComment': localStorage.getItem('RequestComment'),
            'RequestBtnClass': 'invisible',
            'RequestStatus': 'pending',
        }


        // If they did, do our delete
        $.ajax({
            type: 'POST',
            data: RequestByUserToWatchActivityRecord,
            url: '/AppEngine/AskToWatchActivity/'+localStorage.getItem('WatchToActivityID') + '/' + localStorage.getItem('CurrentLoggedInUserID'),
            dataType: 'JSON'
        }).done(function( response ) {

			document.querySelector('x-RequestActivity').BackToActivityList();
           
        });

    };




// Approve User To Join Activity

function ApproveUserToJoinActivity(event) {


        // If it is, compile all user info into one object
        var ApproveUserToJoinActivityRecord = {
            'ApprovedToJoinDate': localStorage.getItem('CurrentDate'),
            'UserID': localStorage.getItem('UserIDtoApprove'),
            'ActivityID': localStorage.getItem('CurrentActivity'),
            'RequestStatus': 'approved',
        }


        // If they did, do our delete
        $.ajax({
            type: 'POST',
            data: ApproveUserToJoinActivityRecord,
            url: '/AppEngine/ApproveUserToJoinActivity/',
            dataType: 'JSON'
        }).done(function( response ) {

           document.querySelector('x-ActivityPage').PopulatedActivityByRequest();
            

        });

    };



// Approve User To Watch Activity

function ApproveUserToWatchActivity(event) {


        // If it is, compile all user info into one object
        var ApproveUserToWatchActivityRecord = {
            'ApprovedToWatchDate': localStorage.getItem('CurrentDate'),
            'UserID': localStorage.getItem('UserIDtoApprove'),
            'ActivityID': localStorage.getItem('CurrentActivity'),
            'RequestStatus': 'approved',
        }


        // If they did, do our delete
        $.ajax({
            type: 'POST',
            data: ApproveUserToWatchActivityRecord,
            url: '/AppEngine/ApproveUserToWatchActivity/',
            dataType: 'JSON'
        }).done(function( response ) {
            

        });

    };



// Approve User To Manage Activity

function ApproveUserToManageActivity(event) {


        // If it is, compile all user info into one object
        var ApproveUserToManageActivityRecord = {
            'ApprovedToManageDate': localStorage.getItem('CurrentDate'),
            'UserID': localStorage.getItem('UserIDtoApprove'),
            'ActivityID': localStorage.getItem('CurrentActivity'),
            'RequestStatus': 'approved',
        }


        // If they did, do our delete
        $.ajax({
            type: 'POST',
            data: ApproveUserToManageActivityRecord,
            url: '/AppEngine/ApproveUserToManageActivity/',
            dataType: 'JSON'
        }).done(function( response ) {
            

        });

    };






// Decline User To Join Activity

function DeclineUserToJoinActivity(event) {


        // If it is, compile all user info into one object
        var DeclineUserToJoinActivityRecord = {
            'DeclinedToJoinDate': localStorage.getItem('CurrentDate'),
            'UserID': localStorage.getItem('UserIDtoDecline'),
            'ActivityID': localStorage.getItem('CurrentActivity'),
            'RequestStatus': 'declined',
        }


        // If they did, do our delete
        $.ajax({
            type: 'POST',
            data: DeclineUserToJoinActivityRecord,
            url: '/AppEngine/DeclineUserToJoinActivity/',
            dataType: 'JSON'
        }).done(function( response ) {

        });

    };





// Decline User To Watch Activity

function DeclineUserToWatchActivity(event) {


        // If it is, compile all user info into one object
        var DeclineUserToWatchActivityRecord = {
            'DeclinedToWatchDate': localStorage.getItem('CurrentDate'),
            'UserID': localStorage.getItem('UserIDtoDecline'),
            'ActivityID': localStorage.getItem('CurrentActivity'),
            'RequestStatus': 'declined',
        }


        // If they did, do our delete
        $.ajax({
            type: 'POST',
            data: DeclineUserToWatchActivityRecord,
            url: '/AppEngine/DeclineUserToWatchActivity/',
            dataType: 'JSON'
        }).done(function( response ) {
            

        });

    };





// Decline User To Manage Activity

function DeclineUserToManageActivity(event) {


        // If it is, compile all user info into one object
        var DeclineUserToManageActivityRecord = {
            'DeclinedToManageDate': localStorage.getItem('CurrentDate'),
            'UserID': localStorage.getItem('UserIDtoDecline'),
            'ActivityID': localStorage.getItem('CurrentActivity'),
            'RequestStatus': 'declined',
        }


        // If they did, do our delete
        $.ajax({
            type: 'POST',
            data: DeclineUserToManageActivityRecord,
            url: '/AppEngine/DeclineUserToManageActivity/',
            dataType: 'JSON'
        }).done(function( response ) {
            

        });

    };




//Archive Activity

function ArchiveActivity(event) {


        // If they did, do our delete
        $.ajax({
            type: 'POST',
            url: '/AppEngine/ArchiveActivity/' + localStorage.getItem('CurrentActivity')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            document.querySelector('x-ActivitiesList').PopulateActivity();

        });
    
};



// Delete Activity
function deleteActivity(event) {

    //event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this Quest?');

    // Check and make sure the user confirmed
    if (confirmation === true) {
    
        

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/AppEngine/deleteActivity/' + localStorage.getItem('ActivityIDToDelete')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            document.querySelector('x-ActivitiesList').PopulateActivity();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};



///////////// End Hoshen functions /////////////////////////////////////////////////








// Define State Info
function DefineState(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve quest id from link rel attribute
    var thisCurrentUser = $(this).attr('rel');
    
    		// Set LocalStorage Current Quest ID
    		localStorage.setItem('CurrentQuestID', thisQuestid); 
   
    document.location="/questArea";

};





// Fill table with data
function populateQuestsTable() {
  
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    //$.getJSON( '/AppEngine/questsList', function( data ) {
    $.getJSON( '/AppEngine/questsList', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
        
            // Stick our user data array into a userlist variable in the global object
    		questsListData = data;

            //tableContent += '<a href="#"  class="linkshowQuestInfo" rel="' + this._id + '">' + this.Quest + '</a>';
            //tableContent += '&#10{QuestName:' + this.Quest + '},';

        });
        
        //tableContent += '</div>';

        // Inject the whole content string into our existing HTML table
        //$('#itemsList').html(tableContent);
 
 
  
  
  		tableContent='';
  		
  		tableContent += '<template is="dom-bind">';
  		
  		tableContent += '<iron-list id="list">';
  		
  		tableContent += '</iron-list>';
  		
  		tableContent += '</template>';
  		
        
        //$('#questlist').html(tableContent);
        
        

    }); 
    

};



// Fill table with data
function populateQuestsRatingTable() {


    // Empty content string
    var tableContent = '';
    
    var QuestID = localStorage.getItem('CurrentQuestID');
    
    var url = '/AppEngine/UserQuestsList/' + QuestID;

    //$.getJSON( '/AppEngine/questsList', function( data ) {
    $.getJSON( url, function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
        
            // Stick our user data array into a userlist variable in the global object
    		QuestsRatingTable = data;
        
            tableContent += '<tr>';
            tableContent += '<td>' + this._id + '</td>';
            tableContent += '<td>' + this.quest + '</td>';
            tableContent += '</tr>';
        });        
        
          
        // Inject the whole content string into our existing HTML table
        $('#userInfo table#questsRatingList tbody').html(tableContent);

    }); 
    
            var LikeURL = '<a href="#" class="linkAssignLikeQuestTouser" rel="' + QuestID + '">Like</a>';
            $('#LikeURL').html(LikeURL);
            var LoveURL = '<a href="#" class="linkAssignLoveQuestTouser" rel="' + QuestID + '">Love</a>';
            $('#LoveURL').html(LoveURL);
            var HateURL = '<a href="#" class="linkAssignHateQuestTouser" rel="' + QuestID + '">Hate</a>'; 
            $('#HateURL').html(HateURL);
  
};
 



// Get Post List by Discussion Link
function populateStepDiscussion() {

	
    // Empty content string
    var tableContent = '';
        
    
    var StepID = $(this).attr('rel');
    
    //var stepJSON = '{"CurrentStepID":"' + StepID + '","BlaBla": "Bla_Bla"}';
    var stepJSON = '{"CurrentStepID": "'+StepID+'"}';
    
    localStorage.setItem('CurrentStepID',StepID);
    localStorage.setItem('CurrentStepJSON',stepJSON);
    
    var tableContent2 = '<template><x-custom StepID="'+StepID+'" hidden$="[[!showSelection]]" response-data={{responseData}} ></x-custom></template>'; 

    
   
    
    var url = '/AppEngine/questsPostsList/' + StepID;
    
    $.getJSON( url, function( data ) {    

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
        
            // Stick our user data array into a userlist variable in the global object
    		QuestsRatingTable = data;
        	tableContent += '<div class="PostContainer">';
            tableContent += '<div class="Owner">' + this.User + '</div>';
            tableContent += '<div class="TextBaloon">' + this.Text + '</div>';
            tableContent += '<div class="LikeAction">34</div>';
            tableContent += '<div class="LoveAction">64</div>';
            tableContent += '<div class="HateAction">94</div>';
            tableContent += '<div class="PostDate">' + this.PostDate + '</div>';
            tableContent += '</div>';

        });        
        
          
        // Inject the whole content string into our existing HTML table
        $('#PageParameters ').html(tableContent2);



    });  
  
};



// Get Post List - Refresh Ajax
function populateStepDiscussionAjax() {


    // Empty content string
    var tableContent = '';
    
    $('div#secDiscussionHeader').css("display", "block");
    
    var StepID = localStorage.getItem('CurrentStepID');
    
    
    
    var url = '/AppEngine/questsPostsList/' + StepID;
    
    $.getJSON( url, function( data ) {    

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
        
            // Stick our user data array into a userlist variable in the global object
    		QuestsRatingTable = data;
        	tableContent += '<div class="PostContainer">';
            tableContent += '<div class="Owner">' + this.User + '</div>';
            tableContent += '<div class="TextBaloon">' + this.Text + '</div>';
            tableContent += '<div class="LikeAction">34</div>';
            tableContent += '<div class="LoveAction">64</div>';
            tableContent += '<div class="HateAction">94</div>';
            tableContent += '<div class="PostDate">' + this.PostDate + '</div>';            
            tableContent += '</div>';
        });        
        
          
        // Inject the whole content string into our existing HTML table
        //$('#questsPostList').html(tableContent);

    });  
  
};





// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/userlist', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
        
            // Stick our user data array into a userlist variable in the global object
    		userListData = data;
        
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.Goal + '">' + this.Goal + '</a></td>';
            tableContent += '<td>' + this.Step1 + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};




// Show Quest Info
function showQuestInfo(event) {

    // Prevent Link from Firing
    //event.preventDefault();
    //$('#userInfo').css("display", "block");
    
    $('#userInfo').animate({
       left: '300px',
       opacity: '1'
    });
    
    

    // Retrieve username from link rel attribute
    var thisQuestid = $(this).attr('rel');
    
    // Set LocalStorage Current Quest ID
    localStorage.setItem('CurrentQuestID', thisQuestid); 


    populateQuestsRatingTable();
    populateQuestsStepList();


    // Get Index of object based on id value
    var arrayPosition = questsListData.map(function(arrayItem) { return arrayItem._id; }).indexOf(thisQuestid);

    // Get our User Object
    var thisUserObject = questsListData[arrayPosition];
    
	console.log(questsListData);
    

    //Populate Info Box
    $('#Quest').text(thisUserObject.Quest);
    $('#QuestType').text(thisUserObject.QuestType);
    $('#QuestCreatedBy').text(thisUserObject.QuestCreatedBy);
    $('#QuestCreatedDate').text(thisUserObject.QuestCreatedDate);
    
    var ShowStepsURL = '<a href="#" class="linkShowStepList" rel="' + thisQuestid + '">Show Step List</a>';
    $('#ShowStepsURL').html(ShowStepsURL);
    
    var DeleteQuestURL = '<a href="#" class="linkdeleteuser" rel="' + thisQuestid + '">delete</a>';
    $('#DeleteQuestURL').html(DeleteQuestURL);    
    
    
};










// Add Quest
function AddQuest(event) {
    //event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    
    var errorCount = 0;
    $('#AddQuest input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newQuest = localStorage.getItem('JSONdata');
        var newQuestobj = $.parseJSON(newQuest);
        newQuestobj.QuestCreatedDate = localStorage.getItem('CurrentDate');
        newQuestobj.QuestCreatedBy = localStorage.getItem('CurrentLoggedInUser');
        newQuestobj.QuestType = "Personal";
        newQuestobj.QuestStatus = "Active";
        
        

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newQuestobj,
            url: '/AppEngine/addQuest',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                $('.paper-input-container-0 .input-content.paper-input-container input').val('');

            }
            else {

                 $('.paper-input-container-0 .input-content.paper-input-container input').val('');
                console.log(response.oid);
                localStorage.setItem('CurrentActivity', response.oid);
                localStorage.setItem('NewActivity', response.oid);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};


// Add Quest Step
function addQuestStep(event) {
    	
    	var JSONnewStepdata = localStorage.getItem('JSONnewStepdata');
        var newStepobj = $.parseJSON(JSONnewStepdata);
        newStepobj.CreatedDate = localStorage.getItem('CurrentDate');
        newStepobj.CreatedBy = localStorage.getItem('CurrentLoggedInUser');
        newStepobj.QuestID = localStorage.getItem('CurrentQuest');
        newStepobj.Status = 'Active';

 console.log(newStepobj);


        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newStepobj,
            url: '/AppEngine/addQuestStep',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#userInfo fieldset input').val('');

                // Update the table
                // populateQuestsStepList();

            }
           
        });
    }






// Fill Steps table with data
function populateQuestsStepList() {


    // Empty content string
    var tableContent = '';

    var QuestID = localStorage.getItem('CurrentQuestID');
    
    var url = '/AppEngine/questsStepList/' + QuestID;
    
    $.getJSON( url, function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
        
            // Stick our user data array into a userlist variable in the global object
    		QuestsRatingTable = data;
        
			tableContent += '<div>'
            tableContent += '<div>' + this.StepTitle + '</div>';
            tableContent += '<div><a href="#" class="linkdeleteStep" rel="' + this._id + '">Delete</a></div>';
            tableContent += '<div><a href="#" stepidData$="{{' + this._id + '}}"  class="linkOpenStep" rel="' + this._id + '">Discussion</a></div>';
            tableContent += '<paper-button on-click="dataFunction" dataFunction="' + this._id + '">ID</paper-button>';
            tableContent += '</div>'

        });        
       



          
        // Inject the whole content string into our existing HTML table
        //$('#userInfo table#questsStepList tbody').html(tableContent);
        $('#steplist').html(tableContent);

    });  
  
};





  











// Delete Quest Item From My QuestList
function DeleteItemFromMyQuestList(event) {

    //event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to remove this Quest from your list?');

    // Check and make sure the user confirmed
    if (confirmation === true) {
    
        

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/AppEngine/deleteQuestFromMyList/' + localStorage.getItem('QuestToDelete')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            //populateQuestsTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};










// Delete Step
function deleteStep(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this Step?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/AppEngine/deleteStep/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            populateQuestsStepList();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};



// User to Join Quest

function JoinToQuest(event) {


        // If it is, compile all user info into one object
        var newUserQuestRecord = {
            'UserName': localStorage.getItem('CurrentLoggedInUser'),
            'UserID': localStorage.getItem('CurrentLoggedInUserID'),
            'QuestID': localStorage.getItem('CurrentQuest'),
            'QuestTitle': localStorage.getItem('CurrentQuestTitle'),
            'JoinDate': localStorage.getItem('CurrentDate'),
        }


        // If they did, do our delete
        $.ajax({
            type: 'POST',
            data: newUserQuestRecord,
            url: '/AppEngine/JoinToQuest/',
            dataType: 'JSON'
        }).done(function( response ) {


            console.log("User Joined to Quest");
            document.querySelector('x-GridQuestsCollaps').PopulateMyQuestListGrid();
            

        });

    };











// Assign User Rating Quest
function AssignLikeUserToQuest(event) {

    event.preventDefault();

        // If it is, compile all user info into one object
        var newUserQuestRecord = {
            'User': localStorage.getItem('CurrentUser'),
            'RateByUser': 'Like',
            'QuestID': localStorage.getItem('CurrentQuestID'),
        }


        // If they did, do our delete
        $.ajax({
            type: 'POST',
            data: newUserQuestRecord,
            url: '/AppEngine/AssignUserToQuest/' + $(this).attr('rel'),
            dataType: 'JSON'
        }).done(function( response ) {



            // Update the table
            populateQuestsRatingTable();

        });

    };


function AssignLoveUserToQuest(event) {

    event.preventDefault();


        // If it is, compile all user info into one object
        var newUserQuestRecord = {
            'User': localStorage.getItem('CurrentUser'),
            'RateByUser': 'Love',
            'QuestID': localStorage.getItem('CurrentQuestID'),
        }


        // If they did, do our delete
        $.ajax({
            type: 'POST',
            data: newUserQuestRecord,
            url: '/AppEngine/AssignUserToQuest/' + $(this).attr('rel'),
            dataType: 'JSON'
        }).done(function( response ) {



            // Update the table
            populateQuestsRatingTable();

        });

    };


function AssignHateUserToQuest(event) {

    event.preventDefault();


        // If it is, compile all user info into one object
        var newUserQuestRecord = {
            'User': localStorage.getItem('CurrentUser'),
            'RateByUser': 'Hate',
            'QuestID': localStorage.getItem('CurrentQuestID'),
        }


        // If they did, do our delete
        $.ajax({
            type: 'POST',
            data: newUserQuestRecord,
            url: '/AppEngine/AssignUserToQuest/' + $(this).attr('rel'),
            dataType: 'JSON'
        }).done(function( response ) {



            // Update the table
            populateQuestsRatingTable();

        });

    };
    



// Add Step Post
function AddPost(event) {

        // If it is, compile all user info into one object
        var newPost = localStorage.getItem('JSONPostdata');
        var newPostobj = $.parseJSON(newPost);
        newPostobj.PostDate = localStorage.getItem('CurrentDate');
        newPostobj.User = localStorage.getItem('CurrentLoggedInUser');
        newPostobj.UserID = localStorage.getItem('CurrentLoggedInUserID');
        newPostobj.StepID = localStorage.getItem('CurrentStep');
        newPostobj.QuestID = localStorage.getItem('CurrentQuest');



        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newPostobj,
            url: '/AppEngine/addQuestStepPost',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('.paper-input-container-0 .input-content.paper-input-container input').val('');

                // Update the table
                document.querySelector('x-Gridpostlist').GetPostsByRequest();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });


};



