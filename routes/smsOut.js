var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var request = require("request");
var utf8 = require('utf8');


// Database
var mongo = require('mongodb');
var assert = require('assert');
var connString = 'mongodb://menashe:menashe@ds035006.mlab.com:35006/sms2fax';
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var dbm;
var collTextOut;


// Initialize connection once

mongo.MongoClient.connect(connString, function(err, database) {
  if(err) throw err;

  dbm = database;
  collTextOut = dbm.collection('TextOut');

});




/*
 * POST: Create new sms message 
 */
router.post('/CreateSmsMessage', function(req, res) {

	var doc = req.body; 

	var PhoneNumber = doc.Phone;

	collTextOut.insert(req.body, function(err, result){
	
      

      var encodedMessageInURL = 'http://www.textyourbless.com?id='+ result[0]._id;

      var PhoneToText = PhoneNumber + '@sms.inforu.co.il';

      var SMSXml = '<Inforu><User><Username>menasheg</Username><Password>GezelMen30</Password> </User><Content Type="sms"><Message>     הודעה מפרחי ויולט אריאל להזמנה שבוצעה ממספר:  ' + PhoneNumber + '   לעריכת ברכה שתצורף למשלוח: <URL><![CDATA[' + encodedMessageInURL + ']]></URL> </Message></Content><Recipients><PhoneNumber>' + PhoneToText + '</PhoneNumber></Recipients><Settings><Sender>035613000</Sender> </Settings></Inforu>';

      var UTFsmsXml = utf8.encode(SMSXml);
                   
      var url = 'http://api.inforu.co.il/SendMessageXml.ashx?InforuXML=' + UTFsmsXml;


        request(url, function(error, response) {
        console.log('ok');
        });

        res.json(result);

	
	});

 
    
});





/*
 * POST: Create Email Message to Fax
 */
router.post('/CreateEmailMessageToFax', function(req, res) {

    var doc = req.body;
    var MessageSubject = "הודעת פקס לחנות הפרחים"; 
    var MessageID = doc.MessageID; 
    var MessagePhone = doc.MessagePhone;
    var MessageEmailArray = '0097239368123@fax.tc'; 
    var currentEmailBody = doc.MessageBody; 
  



// create reusable transporter object using the default SMTP transport 
var transporter = nodemailer.createTransport('smtps://menashe.gezelkopy@gmail.com:Morovus30@smtp.gmail.com');
 
// setup e-mail data with unicode symbols 
var mailOptions = {
    from: '"Menashe" <menashe.gezelkopy@gmail.com>', // sender address 
    to:  MessageEmailArray,  // list of receivers 
    subject: MessageSubject, // Subject line 
    html:  '</div><div style="font - family: alef; direction: rtl; position:absolute; top: 50px; left:50px;" ><img style="width:80px; height:80px;" src="http://morovus-client.cloudapp.net/website/PublisherImg/violet.png" /></div><div style="font - family: alef; direction: rtl; float:right; margin-top:200px; margin-right:50px;"><pre>' + currentEmailBody + '</pre></div><div style="font - family: alef; width:100%; text-align: center; font-weight:600; direction: rtl; position:absolute; bottom: 70px;" > פרחי ויולט אריאל - מרכז מסחרי רובע א׳ - 054-2226943 או 03-9368123 </div><div style="font - family: alef; direction: rtl; position:absolute; bottom: 20px;" > טלפון המזמין:  ' + MessagePhone  + '</div>',

};




transporter.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("fax sent: " + response);

        res.send('Sending fax OK');


    }

});




});







/*
 * POST: Update Message Body
 */
router.post('/UpdateMessageBody/', function(req, res) {

    var doc = req.body;
    var MessageID = doc.MessageID; 
    var MessageBody = doc.MessageBody; 
    var Status = doc.Status; 
    var ChangedDate = doc.ChangedDate; 
    var o_id = new mongo.ObjectID(MessageID);
  
   collTextOut.update(
   { '_id': o_id },
   { $set: { 'MessageBody': MessageBody, 'ChangedDate': ChangedDate, 'Status': Status } },
   function(err, results){res.json(results)}
)

});



/*
 * Get Out Message By ID 
 */
router.get('/GetAllOutMessages/', function(req, res) {

    var cursor = collTextOut.find({});
    var result = [];
    cursor.each(function(err, doc) {
        if(err)
            throw err;
        if (doc === null) {
            // doc is null when the last document has been processed
            res.send(result);
            return;
        }
        // do something with each doc, like push Email into a results array
        result.push(doc);
    });


});


/*
 * Get Out Message By ID 
 */
router.get('/GetOutMessageByID/:id', function(req, res) {

    var OutMessageID = req.params.id;
    var o_id = new mongo.ObjectID(OutMessageID);


    var cursor = collTextOut.find({'_id': o_id });
    var result = [];
    cursor.each(function(err, doc) {
        if(err)
            throw err;
        if (doc === null) {
            // doc is null when the last document has been processed
            res.send(result);
            return;
        }
        // do something with each doc, like push Email into a results array
        result.push(doc);
    });


});



module.exports = router;