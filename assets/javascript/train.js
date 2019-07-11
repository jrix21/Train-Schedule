
var firebaseConfig = {
    apiKey: "AIzaSyA12l38Qjgtd-l8RJu5AyPJlf7GE3j7X3E",
    authDomain: "train-schedule-1f35d.firebaseapp.com",
    databaseURL: "https://train-schedule-1f35d.firebaseio.com",
    projectId: "train-schedule-1f35d",
    storageBucket: "train-schedule-1f35d.appspot.com",
    messagingSenderId: "337201750284",
    appId: "1:337201750284:web:10b0608db17bfb6a"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $("#run-submit").on("click", function(event) {
	event.preventDefault();

	var trainName = $("#train-name").val().trim();
	var destination = $("#destination").val().trim();
	var arrivalTime = moment($("#arrival-time").val().trim(), "HH:mm").subtract(1, "years").format("X");
	var trainFrequency = $("#train-frequency").val().trim();

var newTrain = {
	name: trainName,
	destination: destination,
	arrive: arrivalTime,
	frequency: trainFrequency
	};

database.ref().push(newTrain);


$("#train-name").val("");
$("#destination").val("");
$("#arrival-time").val("");
$("#train-frequency").val("");

return false;

})  

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().destination;
	var arrivalTime = childSnapshot.val().arrive;
	var trainFrequency = childSnapshot.val().frequency;

	var diffTimes = moment().diff(moment.unix(arrivalTime), "minutes");
	var remainder = moment().diff(moment.unix(arrivalTime), "minutes") % trainFrequency;
    
    //arrival is currently only showing current time: Need time from last arrival + frequency minutes converted to hh:mm A format
	var arrival = moment().add(minutes, "m").format("hh:mm A"); 
    
    //minutes = current time - arrival time converted to minutes
    var minutes = moment().get('hour') - remainder; 


 $("#trains-table> tbody").prepend("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  "every " + trainFrequency + " min" + "</td><td>" + arrival + "</td><td>" + minutes + " mins away" + "</td>");
}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });