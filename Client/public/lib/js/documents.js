document.addEventListener('DOMContentLoaded', (event) => {
    openCity = (evt, title) => {
        let i;
        let tabContent;
        let tabLinks;
        tabContent = document.getElementsByClassName("tab-content");
        for (i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
        }
        tabLinks = document.getElementsByClassName("tab-links");
        for (i = 0; i < tabLinks.length; i++) {
            tabLinks[i].className = tabLinks[i].className.replace(" active", "");
        }
        
        title = title !== '' ? title: document.getElementById('_selectTab').value;
        document.getElementById(title).style.display = "block";
        evt.currentTarget.className += " active";
    }

    document.getElementById("_defaultOpen").click();
})