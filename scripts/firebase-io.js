
let recipes;
let recipe;

function readMenuFromFirebase() {
    return firebase.database().ref('recipes').once('value').then(function(snapshot) {
        recipes = snapshot;

        snapshot.forEach(function(childSnapshot) {
            recipe = childSnapshot.val();
            visualiseRecipeLink(document.querySelector("#recipes"), recipe.naam, recipe.id);
        });
        
    });
}

function readAdminMenuFromFirebase() {
    return firebase.database().ref('recipes').once('value').then(function(snapshot) {
        recipes = snapshot;

        snapshot.forEach(function(childSnapshot) {
            recipe = childSnapshot.val();
            visualiseAdminRecipeLink(document.querySelector("#recipes"), recipe.naam, recipe.id);
        });
        
    });
}

function readRecipeFromFirebase() {
    return firebase.database().ref('recipes').once('value').then(function(snapshot) {
        recipes = snapshot;

        const urlParams = new URLSearchParams(window.location.search);
        let recipeId = urlParams.get('select');

        snapshot.forEach(function(childSnapshot) {
            recipe = childSnapshot.val();
            if (recipeId == null || recipeId == recipe.id) {
                document.querySelector("#recipeName").innerHTML = childSnapshot.val().naam;
                visualiseIngredients(document.querySelector("#ingredients"), childSnapshot.val());
                visualiseProcess(document.querySelector("#brewingProcess"), childSnapshot.val());
                visualiseSteps(document.querySelector("main"), createBrewingStepsJSON(childSnapshot.val()));
                return true;
            }
        });
        
    });
}

function readRecipeToFormFromFirebase() {
    return firebase.database().ref('recipes').once('value').then(function(snapshot) {
        recipes = snapshot;

        const urlParams = new URLSearchParams(window.location.search);
        let recipeId = urlParams.get('select');

        let valueFound = snapshot.forEach(function(childSnapshot) {
            recipe = childSnapshot.val();
            if (recipeId == recipe.id) {
                fillForm(recipe);
                return true;
            }
        });

        if (valueFound === false) {
            fillForm();
        }
        
    });
}


function saveToFirebase(JSONrecipe) {
    firebase.database().ref('recipes').child(JSONrecipe.id).set(JSONrecipe)
        .then(function(snapshot) {
            //success(); // some success method
        }, function(error) {
            console.log('error' + error);
            //error(); // some error method
        });
}