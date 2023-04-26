const body = document.body;

function toggle(button)
{
    button.innerHTML.charCodeAt(0) == 0xe518 ? button.innerHTML = "&#xe51c;" : button.innerHTML = "&#xe518;";

    body.classList.toggle("dark_mode");
    button.classList.toggle("dark_mode");
}