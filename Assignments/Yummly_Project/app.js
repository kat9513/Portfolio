$(document).ready(function () {

        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBM3amdbJlNtEQFOdj66O43gTjN9i-GqkI",
            authDomain: "geocuisine-dc633.firebaseapp.com",
            databaseURL: "https://geocuisine-dc633.firebaseio.com",
            projectId: "geocuisine-dc633",
            storageBucket: "geocuisine-dc633.appspot.com",
            messagingSenderId: "677498067510"
        };
        firebase.initializeApp(config);
    
        var database = firebase.database();
        var ingredientsRef = database.ref("/ingredients");

        //initial variable

        var addIngredient = "";
    
    function buildQueryURL(userSearch, userSelect) {

        var queryURL = "http://api.yummly.com/v1/api/recipes?_app_id=5e18238c&_app_key=544f6e5d2d082b6920da1b1b3da50628&q=" + userSearch + "&allowedCuisine[]=cuisine^cuisine-" + userSelect;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            for (var i = 0; i < response.matches.length; i++) {
                var imageUrl = response.matches[i].imageUrlsBySize[90];
                var ingredients = response.matches[i].ingredients;
                var recipeName = response.matches[i].recipeName;
                var recipeID = response.matches[i].id;
                //Div to hold receipes
                var foodsDiv = $("<div class='foods'>");
                //Element for holding the information
                var imageOne = $("<img class = 'picture'>").attr("src", imageUrl);
                var title = $("<p class= 'name'>").text(recipeName);
                foodsDiv.append(imageOne, title);
                var buttonDiv = $("<div class = 'ingredients'>").text("Ingredients: ");
                for (var k = 0; k < ingredients.length; k++) {
                    var button = $("<button>").addClass("btn btn-primary");
                    button.addClass("ingredient");
                    button.text(ingredients[k]);
                    buttonDiv.append(button);
                }

                foodsDiv.append(buttonDiv);
                //console.log(recipeID);

                $("#results").append(foodsDiv);
                $(".picture").wrap($('<a>', {
                    href: 'http://www.yummly.com/recipe/' + recipeID,
                    target: '_blank'
                }));
            }
            $(".ingredient").on("click", function (event){
                event.preventDefault();
                addIngredient = $(this).text();
                //console.log(addIngredient);
            
                ingredientsRef.push({
                    addIngredient: addIngredient, 
                })

            })

            $("#attribution").html(response.attribution.html);
        })
    }
    
    ingredientsRef.on("child_added", function(childSnapshot){
        var addedIngredient = childSnapshot.val().addIngredient.toString();
        console.log(addedIngredient);
        var t = $("#table").DataTable();
        t.row.add([addedIngredient, ""]).draw();
    })

    $(".close").click(function (){
        $("#alertInfo").removeClass("show")
    }) 
    //handles button click//
    $("#submit-button").on("click", function (event) {
        event.preventDefault();
        $("#results").text("")
        var userSearch = $("#user-search").val().trim().toString().toLowerCase();
        var userSelect = $("#user-select").val().toString().toLowerCase();
        if (userSearch === "" || userSelect === "") {
            $("#alertInfo").addClass("show")
            $("#attribution").text("")
        } else {
            buildQueryURL(userSearch, userSelect)
        }
        $("#user-search").val("");
        // buildQueryURL()
        //console.log(userSearch);
        
    
    });
});