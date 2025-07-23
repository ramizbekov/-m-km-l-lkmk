async function fetchUsers() {
    const res = await fetch("https://randomuser.me/api/?results=100");
    const data = await res.json();
    return data.results;
}

function render(users) {
    const usersContainer = document.getElementById("users");
    usersContainer.innerHTML = "";
    users.forEach(user => {  
        const card = document.createElement("div");
        card.classList.add("user-card");
        card.innerHTML = `
            <img src="${user.picture.medium}" alt="${user.name.first}">
            <h3>${user.name.first} ${user.name.last}</h3>
            <p><strong>Yosh:</strong> ${user.dob.age}</p>  
            <p><strong>Telefon:</strong> ${user.phone}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Manzil:</strong> ${user.location.city}, ${user.location.country}</p>
        `;
        usersContainer.appendChild(card);
    });
}


function sortUsers(users, type){
    return users.sort((a, b) =>{
        if(type === "name"){
            return a.name.first.localeCompare(b.name.first)
        } else{
            return a.name.last.localeCompare(b.name.last)
        }
    })
}

function search(users, query){
    return users.filter(user =>
        user.name.first.toLowerCase().includes(query.toLowerCase()) ||
        user.name.last.toLowerCase().includes(query.toLowerCase())
    );
}

let users = [];

document.addEventListener("DOMContentLoaded", async () =>{
    const usersContainer = document.getElementById("users");
    const loader = document.getElementById("loader");
    const sortSelect = document.getElementById("sortOption");
    const searchInput = document.getElementById("search");

    showLoader();
    users = await fetchUsers();
    render(users);
    hideLoader();

    sortSelect.addEventListener("change", (e) =>{
        showLoader();
        setTimeout(() => {
            users = sortUsers(users, e.target.value);
            render(users)
            hideLoader();
        }, 500);
    });

    searchInput.addEventListener("input", (e) => {
        showLoader();
        setTimeout(() => {
            const filteredUsers = search(users, e.target.value);
            render(filteredUsers);
            hideLoader();
        }, 500);
    });

    function showLoader(){
        loader.style.display = "block";
        usersContainer.style.opacity = "0.5s";
    }

    function hideLoader(){
        loader.style.display = "none";
        usersContainer.style.opacity = "1";
    }
})

const container = document.getElementById("con");
const card = document.getElementById("users");
const h2 = document.getElementById("h2");

