document.addEventListener('DOMContentLoaded', (e) => {
    // colon setInterval
    let colon = document.getElementsByClassName('colon');
    setInterval(()=>{
        colon[0].style.color === "rgb(255, 255, 255)" ? colon[0].style.color = "red": colon[0].style.color = "rgb(255, 255, 255)"
        colon[1].style.color === "rgb(255, 255, 255)" ? colon[1].style.color = "red": colon[1].style.color = "rgb(255, 255, 255)"
        colon[2].style.color === "rgb(255, 255, 255)" ? colon[2].style.color = "red": colon[2].style.color = "rgb(255, 255, 255)"
        colon[3].style.color === "rgb(255, 255, 255)" ? colon[3].style.color = "red": colon[3].style.color = "rgb(255, 255, 255)"
    }, 1000)
})