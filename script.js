// Theme Toggle
function toggleTheme() {
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}





document.addEventListener("DOMContentLoaded", function () {
    const recipes = [
        { title: "Spaghetti Bolognese", image: "images/spaghetti.jpg", cuisine: "Italian", difficulty: "Medium", time: "30 min" },
        { title: "Chicken Curry", image: "images/chicken-curry.jpg", cuisine: "Indian", difficulty: "Hard", time: "45 min" },
        { title: "Vegetable Stir-fry", image: "images/veg-stirfry.jpg", cuisine: "Asian", difficulty: "Easy", time: "20 min" }
    ];

    const recipeContainer = document.getElementById("recipe-container");
    const searchInput = document.getElementById("searchInput");
    const filterCuisine = document.getElementById("filterCuisine");
    const filterDifficulty = document.getElementById("filterDifficulty");
    const loading = document.getElementById("loading");

    function displayRecipes() {
        recipeContainer.innerHTML = "";
        loading.style.display = "block";

        setTimeout(() => {
            loading.style.display = "none";
            recipes.forEach(recipe => {
                const recipeCard = document.createElement("div");
                recipeCard.classList.add("recipe-card");

                recipeCard.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <h2>${recipe.title}</h2>
                    <div class="info">
                        <span>${recipe.time}</span>
                        <span>${recipe.difficulty}</span>
                    </div>
                    <button class="favorite-btn">❤️ Favorite</button>
                `;

                recipeContainer.appendChild(recipeCard);

                // Add favorite button functionality
                recipeCard.querySelector(".favorite-btn").addEventListener("click", function () {
                    this.classList.toggle("active");
                });
            });
        }, 1000); // Simulated loading delay
    }

    // Search & Filter Recipes
    function filterRecipes() {
        const searchText = searchInput.value.toLowerCase();
        const selectedCuisine = filterCuisine.value;
        const selectedDifficulty = filterDifficulty.value;

        const filteredRecipes = recipes.filter(recipe => {
            return (
                recipe.title.toLowerCase().includes(searchText) &&
                (selectedCuisine === "" || recipe.cuisine === selectedCuisine) &&
                (selectedDifficulty === "" || recipe.difficulty === selectedDifficulty)
            );
        });

        recipeContainer.innerHTML = "";
        filteredRecipes.forEach(recipe => {
            const recipeCard = document.createElement("div");
            recipeCard.classList.add("recipe-card");

            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.title}">
                <h2>${recipe.title}</h2>
                <div class="info">
                    <span>${recipe.time}</span>
                    <span>${recipe.difficulty}</span>
                </div>
                <button class="favorite-btn">❤️ Favorite</button>
            `;

            recipeContainer.appendChild(recipeCard);
        });
    }

    // Event Listeners
    searchInput.addEventListener("input", filterRecipes);
    filterCuisine.addEventListener("change", filterRecipes);
    filterDifficulty.addEventListener("change", filterRecipes);

    displayRecipes();
});


document.addEventListener("DOMContentLoaded", function () {
    const recipes = [
        { title: "Spaghetti Bolognese", image: "images/spaghetti.jpg", cuisine: "Italian", difficulty: "Medium", time: "30 min" },
        { title: "Chicken Curry", image: "images/chicken-curry.jpg", cuisine: "Indian", difficulty: "Hard", time: "45 min" },
        { title: "Vegetable Stir-fry", image: "images/veg-stirfry.jpg", cuisine: "Asian", difficulty: "Easy", time: "20 min" }
        // Add more recipes here
    ];

    let currentPage = 1;
    const recipesPerPage = 6;
    let isInfiniteScroll = false;
    
    const recipeContainer = document.getElementById("recipe-container");
    const loading = document.getElementById("loading");
    const pageIndicator = document.getElementById("pageIndicator");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const toggleScroll = document.getElementById("toggleScroll");

    function displayRecipes(page = 1) {
        recipeContainer.innerHTML = "";
        loading.style.display = "block";

        setTimeout(() => {
            loading.style.display = "none";
            const startIndex = (page - 1) * recipesPerPage;
            const selectedRecipes = recipes.slice(startIndex, startIndex + recipesPerPage);

            selectedRecipes.forEach(recipe => {
                const recipeCard = document.createElement("div");
                recipeCard.classList.add("recipe-card");

                recipeCard.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <h2>${recipe.title}</h2>
                    <div class="info">
                        <span>${recipe.time}</span>
                        <span>${recipe.difficulty}</span>
                    </div>
                    <button class="favorite-btn">❤️ Favorite</button>
                `;

                recipeContainer.appendChild(recipeCard);
            });

            pageIndicator.textContent = `Page ${currentPage}`;
        }, 1000);
    }

    function handlePagination(action) {
        if (action === "next" && currentPage * recipesPerPage < recipes.length) {
            currentPage++;
        } else if (action === "prev" && currentPage > 1) {
            currentPage--;
        }
        displayRecipes(currentPage);
    }

    function handleInfiniteScroll() {
        if (isInfiniteScroll && window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            currentPage++;
            displayRecipes(currentPage);
        }
    }

    toggleScroll.addEventListener("change", () => {
        isInfiniteScroll = toggleScroll.checked;
        prevPageBtn.style.display = isInfiniteScroll ? "none" : "inline-block";
        nextPageBtn.style.display = isInfiniteScroll ? "none" : "inline-block";
        if (isInfiniteScroll) {
            window.addEventListener("scroll", handleInfiniteScroll);
        } else {
            window.removeEventListener("scroll", handleInfiniteScroll);
        }
    });

    prevPageBtn.addEventListener("click", () => handlePagination("prev"));
    nextPageBtn.addEventListener("click", () => handlePagination("next"));

    displayRecipes();
});
