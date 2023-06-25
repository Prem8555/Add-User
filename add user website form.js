let formEl = document.getElementById("addUserForm");
let nameInputEl = document.getElementById("name");
let emailInputEl = document.getElementById("email");
let nameErrMsgEl = document.getElementById("nameErrMsg");
let emailErrMsgEl = document.getElementById("emailErrMsg");
let statusEl = document.getElementById("status");
let genderMaleEl = document.getElementById("genderMale");
let genderFemaleEl = document.getElementById("genderFemale");

let formData = {
    name: "",
    email: "",
    status: "Active",
    gender: "Male"
};

nameInputEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        nameErrMsgEl.textContent = "Required*";
    } else {
        nameErrMsgEl.textContent = "";
    }
    formData.name = event.target.value;
});
emailInputEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        emailErrMsgEl.textContent = "Required*";
    } else {
        emailErrMsgEl.textContent = "";
    }
    formData.email = event.target.value;

});

statusEl.addEventListener("change", function(event) {
    formData.status = event.target.value;
});

statusEl.addEventListener("change", function(event) {
    formData.status = event.target.value;
});
genderMaleEl.addEventListener("change", function(event) {
    formData.gender = event.target.value;
});
genderFemaleEl.addEventListener("change", function(event) {
    formData.gender = event.target.value;
});

function validateForm(formData) {
    let {
        name,
        email
    } = formData;
    if (name === "") {
        nameErrMsgEl.textContent = "Required*";
    }
    if (email === "") {
        emailErrMsgEl.textContent = "Required*";
    }
}

function submitForm(formData) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "Application/json",
            Accept: "Application/json",
            Authorization: "Bearer caa95641c3733e5311225c8f114abf11eb6e8de3572a14f893966bc84e7d769a",
        },
        body: JSON.stringify(formData)
    };

    let url = "https://gorest.co.in/public-api/users";
    fetch(url, options)

        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === "has already been taken") {
                    emailErrMsgEl.textContent = "Email Already Exists";

                }

            }
        });
}



formEl.addEventListener("submit", function(event) {
    event.preventDefault();
    validateForm(formData);
    submitForm(formData);
});