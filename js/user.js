(() => {

    "use strict";
    let user;
    const apiUrl = "https://artgal-app-api.herokuapp.com/users/";

    function loadAndDisplayUser() {
        let userToStoreString, error = false;
        try {
            userToStoreString = sessionStorage.getItem("currentUser");
        } catch (e) {
            alert("Error when reading from Session Storage " + e);
            error = true;
            window.location = "MyGallery.html";
        }
        if (!error) {
            // user._id = JSON.parse(userToStoreString);
            getUserById(userToStoreString);
        }
    }

    function loadUserForm() {

        $('#newUserName').attr("value", user.name);

        $('#newAddress').attr("value", user.emailAddress);
       
        $('#hiredPublishier').attr("value", user.hiredBy);
        $('#personal').attr("value", user.hiredBy);

        $('#favorite').val(user.favoriteGenre);
        
        $('#update-registration').on('click', editUserInfo);
    }

    function getUserById(userToStoreString) {
        $.ajax({
            url: apiUrl + userToStoreString,
            type: 'GET',
            dataType: 'JSON',
            success:  (data) => {
                if (data) {
                    user = data;
                    loadUserForm();
                } else {
                    console.log("user not found");
                }
            },
            error:  (request, status, error) => {
                console.log(error, status, request);
            }
        });
    }
    function editUserInfo() {
        console.log("loading");
        event.preventDefault();

        const Username = $('input[name="newUserName"]').val();
        const emailAddress = $('input[name="newAddress"]').val();
        const hiredBy = $('input[name="hiredPublishier"]').val();

        const favorite = $('#favorite option:selected').text();
        console.log(favorite);
        const newArt = $('input[name="newArt"]').val();
        
        updateUserArt(populateUser(Username, emailAddress,favorite,hiredBy,newArt));

    }
    

    function populateUser(Username, emailAddress,favorite,hiredBy,newArt){
        user.artpieces.push(newArt);
        const userObject = {
            name: Username,
            username: user.Username,
            password: user.Password,
            emailAddress: emailAddress || user.emailAddress,
            gender: user.gender,
            address: user.address || user.address,
            favoriteGenre: favorite || user.favoriteGenre,
            hiredBy: hiredBy || user.hiredBy,
            artpieces: user.artpieces
        };
        if(user && user._id){
            userObject._id = user._id;
        }
        return userObject;
    }
    
    function updateUserArt(user) {

        console.log(user);

        $.ajax({
            url: apiUrl + user._id,
            type: 'PUT',
            data: user,
            dataType: 'JSON',
            success:  (data) => {
                if (data) {
                    console.log(data);
                    window.location.href = "MyGallery.html";
                } else {
                    console.log("wrong value");
                }
            },
            error:  (request, status, error) => {
                console.log(error, status, request);
            }
        });
    }


    $(document).ready( () => {
        //$("#update-registration").click(loadAndDisplayUser);
        loadAndDisplayUser();
    });
})();
