function addTask(inputText) {
    if (!inputText) {
        alert("Add something!");
        return;
    }

    const listContainer = document.querySelector(".list-container");
    listContainer.style.display = "block";

    const newListElement = document.createElement("li");
    newListElement.textContent = inputText;

    const closeButton = document.createElement("span");
    closeButton.classList.add("close-btn");
    closeButton.textContent = "\u00D7";

    closeButton.addEventListener("click", () => {
        closeButton.parentElement.remove();

        const existingList = JSON.parse(sessionStorage.getItem("taskList") || "[]");
        const taskIndex = existingList.indexOf(inputText);

        if (taskIndex !== -1) {
            existingList.splice(taskIndex, 1);
            sessionStorage.setItem("taskList", JSON.stringify(existingList));
        }

        if (!listContainer.querySelectorAll("li").length) {
            listContainer.style.display = "none";
        }
    });

    newListElement.append(closeButton);
    document.querySelector(".list").append(newListElement);

    document.querySelector("#input-box").value = "";

    const existingList = JSON.parse(sessionStorage.getItem("taskList") || "[]");
    existingList.push(inputText);
    sessionStorage.setItem("taskList", JSON.stringify(existingList));
}

// Load data from local storage on page load (optional)
window.onload = function () {
    const storedList = JSON.parse(sessionStorage.getItem("taskList") || "[]");
    storedList.forEach(element => {
        const listContainer = document.querySelector(".list-container");
        listContainer.style.display = "block";

        const newListElement = document.createElement("li");
        newListElement.textContent = storedList;

        const closeButton = document.createElement("span");
        closeButton.classList.add("close-btn");
        closeButton.textContent = "\u00D7";

        closeButton.addEventListener("click", () => {
            closeButton.parentElement.remove();
            if (!listContainer.querySelectorAll("li").length) {
                listContainer.style.display = "none";
            }
        });

        newListElement.append(closeButton);
        document.querySelector(".list").append(newListElement);

        document.querySelector("#input-box").value = "";
    });
};

// Add event listener to toggle "strikethrough" class on list item click
document.querySelector(".list").addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("strikethrough");
    }
});

// Add event listener to the "Add" button or input box to capture input
document.querySelector("#add-button").addEventListener("click", function () {
    const inputBox = document.querySelector("#input-box").value;
    addTask(inputBox);
});

document.querySelector("#input-box").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask(this.value);
    }
});