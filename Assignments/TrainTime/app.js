$( document ).ready(function() {
    console.log( "ready!" );
    //Initialize Firebase
    var config = {
        apiKey: "AIzaSyA37UryvGde_Y_0qnnDkRmwEgT9iI-bc4w",
        authDomain: "traintime-8a815.firebaseapp.com",
        databaseURL: "https://traintime-8a815.firebaseio.com",
        projectId: "traintime-8a815",
        storageBucket: "",
        messagingSenderId: "195130423084"
      };
    firebase.initializeApp(config);
    
    var database = firebase.database();
    var trainsRef = database.ref("/Trains");


    //Initial Variables
    var TrainName = "";
    var TrainDestination = "";
    var TrainFrequency = 0;
    var TrainFirstTime= "00:00";

    var NextArrival= 0;
    var MinutesAway= 0;

    //button click
    $("#add-user").on("click", function(event) {
        event.preventDefault();
        TrainName=$("#name-input").val().trim();
        TrainDestination=$("#destination-input").val().trim();
        //TrainFirstTime=$("#time-input").val().trim();
        //TrainFrequency = $("#frequency-input").val().trim();


       //MOMENT
        // Assumptions
        TrainFrequency = $("#frequency-input").val().trim();

        
        TrainFirstTime=$("#time-input").val().trim();

        console.log(TrainFirstTime);
        console.log(TrainFrequency);


        trainsRef.push({
            TrainName: TrainName,
            TrainDestination: TrainDestination,
            TrainFirstTime: TrainFirstTime,
            TrainFrequency: TrainFrequency,

        });


    });

    trainsRef.on("child_added", function(childSnapshot){
        console.log(childSnapshot.val());

        var name = childSnapshot.val().TrainName;
        var destination = childSnapshot.val().TrainDestination;
        var frequency = childSnapshot.val().TrainFrequency;
        var firstTime = childSnapshot.val().TrainFirstTime;

        console.log(name);
        console.log(destination);
        console.log(frequency);
        console.log(firstTime);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = frequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");

        // Create the new row
        var newRow = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(destination),
            $("<td>").text(frequency + " minutes"),
            $("<td>").text(nextTrain),
            $("<td>").text(tMinutesTillTrain),
        );

        // Append the new row to the table
        $("#train-table").append(newRow);
    })

    database.ref().on("value", function (snapshot) {

        
        // Log everything that's coming out of snapshot
        console.log(snapshot.val());
        console.log(snapshot.val().TrainName);
        console.log(snapshot.val().TrainDestination);
        console.log(snapshot.val().TrainFirstTime);
        console.log(snapshot.val().TrainFrequency);

    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

});