document.addEventListener('DOMContentLoaded', (event) => {
    // focus login
    let _inputUsername = document.getElementById('_inputUsername')
    let _inputPass = document.getElementById('_inputPass')
    let iconLogin = document.querySelectorAll('.icon-login')
    for(let i = 0; i< iconLogin.length; i++){
        _inputUsername.addEventListener('focusin', (event) => {
            iconLogin[i].classList.add('resizeHeight')    
        });
        _inputUsername.addEventListener('focusout', (event) => {
            iconLogin[i].classList.remove('resizeHeight')    
        });
    }
})