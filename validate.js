const pass1 = document.getElementById("pass");
const pass2 = document.getElementById("pass-confirm");
const button = document.querySelector(".submit-button");
const className = "no-match";
let check2 = false;
let focusTimer = -1;

// Per-character password match validation except when going immediately from 
// PASSWORD to CONFIRM PASSWORD as long as the partial string matches.
// Submit button is disabled if passwords don't match.
pass2.addEventListener("input", function() {
    comparePass(true, !(check2 
        || pass2.value != pass1.value.slice(0, pass2.value.length)), false, true);
});

pass2.addEventListener("focus", function() {
    if (!pass2.value.length && check2 && focusTimer > 0 
                && new Date().getTime() - focusTimer < 10) {
        pass2.classList.remove(className);
        check2 = false;
        focusTime = -1;
    }
});

pass2.addEventListener("focusout", function() {
    comparePass(true, false, true, true);
});

pass1.addEventListener("input", function() {
    comparePass(true, !pass2.value.length, true, true);
});

pass1.addEventListener("focusout", function() {
    if (!comparePass(true, document.activeElement == pass2, true, false)) {
        focusTimer = new Date().getTime();
    }
});

function comparePass(_and, _or, _setCheck, _setDisabled) {
    let condition = (pass1.value === pass2.value && _and) || _or;
    if (condition) {
        pass2.classList.remove(className);
        if (_setCheck) check2 = false;
        button.removeAttribute("disabled");
    } else {
        pass2.classList.add(className);
        if (_setCheck) check2 = true;
        if (_setDisabled) button.setAttribute("disabled", "");
    }
    return condition;
}