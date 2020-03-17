(() => {

    "use strict";
    let user;
    
    const apiUrl = "https://artgal-app-api.herokuapp.com/users/";

    function loadUserForm() {
        event.preventDefault();
        const uName = $('input[name="email"]').val();
        const password = $('input[name="psw"]').val();
        const passwordr = $('input[name="psw-repeat"]').val();

        //$('#registerbtn').on('click',checkPassword(uName,password,passwordr));
        if(password != passwordr){
            alert('passwords don`t match');
            window.location.href = "Register.html";
        }
        createUser(populateUser(uName,password));
        
    }


    function populateUser(Username, Password){
        
        const userObject = {
            username: Username,
            password: Password
        };
        return userObject;
    }

    function createUser(user) {
        console.log("creating");
        $.ajax({
            url: apiUrl,
            type: 'POST',
            data: user,
            dataType: 'JSON',
            success:  (data) => {
                console.log(user);
                if (data) {
                    console.log(data);
                    window.location.href = "index.html";
                } else {
                    console.log("register failed");
                }
            },
            error:  (request, status, error) => {
                console.log(user);
                console.log(error, status, request);
            }
        });
    }

    $(document).ready( () => {
        $("#registerbtn").click(loadUserForm);
    });

})();