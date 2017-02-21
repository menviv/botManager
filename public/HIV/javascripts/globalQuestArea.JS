// Userlist data array for filling in info box
var userListData = [];
var questsListData = [];
var QuestsRatingTable = [];

// DOM Ready =============================================================
$(document).ready(function() {




});

// Functions =============================================================



// Get Quest Data
function GetQuestData(event) {

    event.preventDefault();
    
    

        
        
     var tableContent = '';

    // jQuery AJAX call for JSON
    
    var QuestID = localStorage.getItem('id');
    
    var url = '/questArea/questAreaDetails/' + QuestID;
    
    $.getJSON( url, function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
        
            // Stick our user data array into a userlist variable in the global object
    		questsListData = data;
        
            tableContent += '<tr>';
            tableContent += '<td>' + this.Goal + '</td>';
            tableContent += '<td>' + this.Step1 + '</td>';
            tableContent += '<td>' + this.Step2 + '</td>';
            tableContent += '<td>' + this.Step3 + '</td>';
            tableContent += '<td>' + this.Step4 + '</td>';
            tableContent += '</tr>';
        });
        
   

        // Inject the whole content string into our existing HTML table
        $('#QueststableInfo table tbody').html(tableContent);

    });        
        
        
        
        
        
        

    }










// Fill table with data
function populateQuestStructureTable() {
console.log("inside populateQuestStructureTable function");  
    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/questArea/questAreaDetails', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
        
            // Stick our user data array into a userlist variable in the global object
    		questsListData = data;
        
            tableContent += '<tr>';
            tableContent += '<td>' + this.Goal + '</td>';
            tableContent += '<td>' + this.Step1 + '</td>';
            tableContent += '<td>' + this.Step2 + '</td>';
            tableContent += '<td>' + this.Step3 + '</td>';
            tableContent += '<td>' + this.Step4 + '</td>';
            tableContent += '</tr>';
        });
        
   

        // Inject the whole content string into our existing HTML table
        $('#QueststableInfo table tbody').html(tableContent);

    }); 

};


// Add Step Post
function AddPost(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#AddQuestPost input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newQuest = {
            'Goal': $('#AddQuestPost fieldset input#inputGoal').val(),
            'Step': $('#AddQuestPost fieldset input#inputStep').val(),
            'User': $('#AddQuestPost fieldset input#inputUser').val(),
            'Text': $('#AddQuestPost fieldset input#inputText').val(),
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newQuest,
            url: '/questArea/addQuestStepPost',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#AddQuestPost fieldset input').val('');

                // Update the table
                populateQuestsPostList();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};
