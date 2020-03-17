(function(){
    "use strict";
    let user;
    let allusers;
    const apiUrl = "https://artgal-app-api.herokuapp.com/users/";


    function loadAndDisplayUser() {
        let userToStoreString, error = false;
        try {
            userToStoreString = sessionStorage.getItem("currentUser");
        } catch (e) {
            alert("Error when reading from Session Storage " + e);
            error = true;
            window.location = "myFeed2345.html";
        }
        if (!error) {
            // user._id = JSON.parse(userToStoreString);
            getUserById(userToStoreString);
        }
    }



    function getUserById(userToStoreString) {
        $.ajax({
            url: apiUrl + userToStoreString,
            type: 'GET',
            dataType: 'JSON',
            success:  (data) => {
                // console.log("huang");
                if (data) {
                    user = data;
                    displayUser();
                } else {
                    console.log("No User");
                    displayUserError("No User");
                }
            },
            error:  (request, status, error) => {
                console.log(user);
                console.log(error, status, request);
            }
        });
    }

    function displayUser() {
        //console.log(user.favoriteGenre);
        //const userDisplayLocation = $("#subContent").empty();

        //let currentNameDiv,currentBioDiv,currentTagDiv,currentArtDiv;

        //$('<div>hello</div>').appendTo('#subContent');

        // currentNameDiv = $("<div>").addClass("name").attr("id", user._id);
        // currentBioDiv = $("<div>").addClass("bio");
        // currentTagDiv = $("<div>").addClass("tag");
        // currentArtDiv = $("<div>").addClass("art");

        
        // $('<div>' + user.name + '<div>').appendTo('#name');

        // $('<div>' + user.gender + '<div>').appendTo("#bio");
        // $('<div>' + user.favoriteGenre + '<div>').appendTo("#tag");
        // //currentArtDiv.append('<div>'+ displayArtpieces(user.artpieces) + '<div>');

        // userDisplayLocation.append($('<div>' + user.name + '<div>').appendTo('#name') + 
        // $('<div>' + user.gender + '<div>').appendTo("#bio") + 
        // $('<div>' + user.favoriteGenre + '<div>').appendTo("#tag"));
        
        //$('#subContent#name').append('<div>hello</div>');
        console.log(user.name);
        $('#userName').text(`User Name: ${user.username}`);
        $('#todayGenre').text(`User's tag: ${user.favoriteGenre}`);

        $.ajax({
            url: apiUrl,
            type: 'GET',
            dataType: 'JSON',
            success:  (data) => {
                // console.log("huang");
                if (data) {
                    allusers = data;
                    allusers.forEach((currentuser) =>{
                        if(currentuser.favoriteGenre === user.favoriteGenre && currentuser.username !== user.username){
                            displayArtpieces(currentuser.artpieces);
                        }
                    }
                    );


                } else {
                    console.log("No User");
                    displayUserError("No User");
                }
            },
            error:  (request, status, error) => {
                console.log(user);
                console.log(error, status, request);
            }
        });

        // console.log(displayArtpieces(user.artpieces));
        //$('#artPieces').append($('<img>',{class:'theImg', src:displayArtpieces(user.artpieces)}));
        //$('#artPieces').attr('src', displayArtpieces(user.artpieces));
        console.log(user);
        displayArtpieces(user.artpieces);
        console.log(user.artpieces);
    }

    // function myDraw(item, index){
    //     //let result;
    //     count++;
    //     console.log(count);
    //     var img = $('<img class="dynamic">'); 
    //     console.log(item);
    //     img.attr('src', item);
    //     img.appendTo($('div')).appendTo('#artPieces');
    // }
    function displayArtpieces(artpieces) {

        const imgs = $('#picture');
        if(artpieces){
            artpieces.forEach((link) => {
                imgs.append($(`<img src = ${link} />`));
            });
        }
    }

    function displayUserError(message) {
        const userDisplayLocation = $(".content").empty();
        userDisplayLocation.append(`<h3 class="error">${message}</h3>`);
    }

    $(document).ready( () => {
        $("#myFeed").click(loadAndDisplayUser);
        //getUserById();
        //loadAndDisplayUser();
    });

})();