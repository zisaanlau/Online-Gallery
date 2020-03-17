(function() {

    "use strict";

    
    const apiUrl = "https://artgal-app-api.herokuapp.com/users/uname/";

    function checkLogin() {
        console.log("checking");
       
        event.preventDefault();
        const uName = $('input[name="uname"]').val();
        const password = $('input[name="psw"]').val();
        console.log(uName);
        checkUser(uName, password);
    }

    function checkUser(uName, password) {

        $.ajax({
            url: apiUrl + uName,
            type: 'GET',
            dataType: 'JSON',
            success: (data) => {
                if (data) {
                    if(data.length) {
                        const user = data[0];
                        if (password != user.password) {
                            alert("Password Incorrect");
                        } else {
                            sessionStorage.setItem('currentUser', user._id);
                            // sessionStorage.setItem('reachUser', user._id);
                            console.log( sessionStorage.getItem("currentUser"));
                            window.location = "MyGallery.html";
                        }
                    } else {
                        alert("Wrong uName address");
                    }
                } else {
                    console.log("User log in failed");
                }
            },
            error: (req, status, err) => {
                console.log('problem with GET req');
                console.log(err, status, req);
            }
            
        });
    }

    $(document).ready(() => {
        $("#login").on('click', checkLogin);

    });


})();