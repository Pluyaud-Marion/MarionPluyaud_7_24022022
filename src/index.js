import recipes from "./recipes.js" // import de l'ensemble de la constante

const selectIngredients = document.getElementById("ingredients")
const selectUstensils = document.getElementById("ustensils") 
const selectDevices = document.getElementById("devices")
const filter = document.querySelector(".filter-tag")
const containerArticleRecipes = document.querySelector(".container-article")
let tagSelect = []

/**
 * Main function calling all functions at loading page
 */
function main() {
displayAllRecipes(recipes)
displaySelectIngredients(recipes)
displaySelectUstensils(recipes)
displaySelectDevice(recipes)
displayTag()
}

/**
 * Build DOM recipes cards and display recipes (all or filtered) based on params  
 * Accessibility
 * @param {array} recipes - allRecipes or recipes filtered 
 */
function displayAllRecipes(recipes) {
  const containerArticle = document.querySelector(".container-article")

  for (const recipe of recipes) {
    const tagArticle = document.createElement("article");
    containerArticle.appendChild(tagArticle)
    tagArticle.className = "article-recipe"
    tagArticle.tabIndex = 0   
    tagArticle.ariaLabel = "Recettes filtrées suite à la recherche dans la barre de recherche et/ou dans les tags"

    const tagImg = document.createElement("img")
    tagArticle.appendChild(tagImg)
    tagImg.src = "./assets/picture-recipe.jpg"
    tagImg.alt = "image de fruits"
    tagImg.ariaLabel = "image de fruits illustrant la recette"
    tagImg.tabIndex = 0

    const tagContainer = document.createElement("div")
    tagArticle.appendChild(tagContainer)
    tagContainer.className = "container-text-title"

    const h2 = document.createElement("h2")
    tagContainer.appendChild(h2)
    h2.className = "title"
    h2.innerHTML = recipe.name
    h2.tabIndex = 0

    const tagContainerTime = document.createElement("div")
    tagContainer.appendChild(tagContainerTime)
    tagContainerTime.className = "icon-time"

    const tagI = document.createElement("i")
    tagContainerTime.appendChild(tagI)
    tagI.className = "far fa-clock"
    tagI.tabIndex = 0
    tagI.ariaLabel = "horloge pour illustrer le temps de cuisson"

    const tagSpanTime = document.createElement("span")
    tagContainerTime.appendChild(tagSpanTime)
    tagSpanTime.className = "time"
    tagSpanTime.innerHTML = recipe.time + " min"
    tagSpanTime.tabIndex = 0

    const tagContainerInfos = document.createElement("div")
    tagArticle.appendChild(tagContainerInfos);
    tagContainerInfos.className = "container-ingredient-recipe"

    const tagIngredient = document.createElement("div")
    tagContainerInfos.appendChild(tagIngredient)
    tagIngredient.className = "ingredient"
    tagIngredient.tabIndex = 0
    
    const recipeIngredients = recipe.ingredients
    for (const ingredient of recipeIngredients) {
      
      const containerIngredient = document.createElement("div")
      tagIngredient.appendChild(containerIngredient)
      containerIngredient.className = "container-ingredient"
      const aliment = document.createElement("span");
      containerIngredient.appendChild(aliment)
      aliment.className = "aliment"
      aliment.tabIndex = 0

      aliment.innerHTML = ingredient.ingredient
      const quantity = document.createElement("span")
      containerIngredient.appendChild(quantity)
      quantity.className = "quantity"
      quantity.tabIndex = 0

      if(!ingredient.quantity) {
        quantity.innerHTML = ""
      } else {
        quantity.innerHTML = " : "+`${ingredient.quantity}`
      }
      
      const unit = document.createElement("span")
      containerIngredient.appendChild(unit)
      unit.className = "unit"
      unit.tabIndex = 0

      if(!ingredient.unit) {
        unit.innerHTML = ""
      } else {
        unit.innerHTML = ingredient.unit
      }
    }
    
    const tagRecipe = document.createElement("div")
    tagContainerInfos.appendChild(tagRecipe)
    tagRecipe.className = "infos-recipe"
    tagRecipe.innerHTML = recipe.description
    tagRecipe.tabIndex = 0
  }
}

/**
 * Build DOM select ingredient and display select ingredient based on params (all select ingredient if all recipes / select ingredient filtered if recipes filtered)
 * Accessibility
 * @param {array} recipes - allRecipes or recipes filtered 
 */
function displaySelectIngredients(recipes) {
  const ingredientArray = [] //défini tableau d'ingrédients vide
  let arrayIngredientFinish = [] //défini tableau final vide

  // boucle sur les recettes
  for (const recipe of recipes){
    const ingredientsElement = recipe.ingredients 
    for (const ingredient of ingredientsElement) {
      const ingredientsAll = ingredient.ingredient 
      ingredientArray.push(ingredientsAll.toLowerCase()) 
      const uniqueSet = new Set(ingredientArray) // utilisation de l'objet Set qui ne stocke que des valeurs uniques
      arrayIngredientFinish = Array.from(uniqueSet)// conversion de uniqueSet en tableau
    }
  }
  
  for (const element of arrayIngredientFinish) {
    const tagOptionIngredient = document.createElement("option") 
    selectIngredients.appendChild(tagOptionIngredient)
    tagOptionIngredient.value = element
    tagOptionIngredient.innerHTML = element
    tagOptionIngredient.ariaLabel = `sélectionner l'ingrédient ${element}`
  }
}

/**
 * Build DOM select ustensils and display select ustensils based on params (all select ustensils if all recipes / select ustensils filtered if recipes filtered)
 * Accessibility
 * @param {array} recipes - allRecipes or recipes filtered 
 */
function displaySelectUstensils(recipes) {
  const ustensilArray = [] 
  let arrayUstensilFinish = [] 

  for (const recipe of recipes){
    const ustensilsElement = recipe.ustensils 
    for (const ustensils of ustensilsElement) {
      ustensilArray.push(ustensils.toLowerCase()) 
      const uniqueSet = new Set(ustensilArray) // utilisation de l'objet Set qui ne stocke que des valeurs uniques
      arrayUstensilFinish = Array.from(uniqueSet) // conversion de uniqueSet en tableau
    }
  }

  for (const ustensil of arrayUstensilFinish) {
    const tagOptionUstensils = document.createElement("option") 
    selectUstensils.appendChild(tagOptionUstensils)
    tagOptionUstensils.innerHTML = ustensil
    tagOptionUstensils.value = ustensil
    tagOptionUstensils.ariaLabel = `sélectionner l'ustensil ${ustensil}`
  }
}

/**
 * Build DOM select device and display select device based on params (all select device if all recipes / select device filtered if recipes filtered)
 * Accessibility
 * @param {array} recipes - allRecipes or recipes filtered 
 */
function displaySelectDevice(recipes) {
  const deviceArray = []
  let arrayDeviceFinish = [];
  
  for (const recipe of recipes) {
    const deviceElement = recipe.appliance 
    deviceArray.push(deviceElement.toLowerCase())
    const uniqueSet = new Set(deviceArray)
    arrayDeviceFinish = Array.from(uniqueSet)
  }

  for (const device of arrayDeviceFinish) {
    const tagOptionDevice = document.createElement("option")
    selectDevices.appendChild(tagOptionDevice)
    tagOptionDevice.innerHTML = device
    tagOptionDevice.value = device
    tagOptionDevice.ariaLabel = `sélectionner l'appareil ${device}`
  }
}


/**
 * Build and display tags - Add in tagSelect (array) all tags selected
 * Accessibility
 * Call functions sortRecipesByTag() and closeTag()
 */
function displayTag() {
  const selectAll = [selectIngredients, selectDevices, selectUstensils ]

  const divTag = document.createElement("div");
  filter.prepend(divTag)
  divTag.className = "tag"

  for (const select of selectAll) {
    select.addEventListener("change", e => {
      let divTagSpanImg = document.createElement('div');
      divTag.appendChild(divTagSpanImg)
      let spanTag = document.createElement('span')
      divTagSpanImg.appendChild(spanTag)
      spanTag.innerHTML = e.target.value
      let imgTag = document.createElement('img');
      divTagSpanImg.appendChild(imgTag)
      imgTag.src = "./assets/close-tag.png"
      imgTag.id = e.target.value //donne comme id à l'img le nom du tag
      imgTag.className = "close-tag"
      imgTag.alt = "croix pour fermer le tag"
      imgTag.ariaLabel = "icone d'une croix pour fermer le tag sélectionné"
      imgTag.tabIndex = 1

      if (select.id === 'ingredients'){
        divTagSpanImg.className = 'tag-ingredients'
        divTagSpanImg.id = e.target.value
        divTagSpanImg.tabIndex = 1
        divTagSpanImg.ariaLabel = `filtre les recettes avec ingrédient ${e.target.value}`
      } else if (select.id === 'devices'){
        divTagSpanImg.className = 'tag-device'
        divTagSpanImg.id = e.target.value
        divTagSpanImg.tabIndex = 1
        divTagSpanImg.ariaLabel = `filtre les recettes avec appareil ${e.target.value}`
      } else if (select.id === 'ustensils'){
        divTagSpanImg.className = 'tag-ustensils'
        divTagSpanImg.id = e.target.value
        divTagSpanImg.tabIndex = 1
        divTagSpanImg.ariaLabel = `filtre les recettes avec ustensil ${e.target.value}`
      }
      tagSelect.push(e.target.value) //tableau contient tous les tags selectionnés
      sortRecipesByTag(recipes) //appel de la fonction qui trie par tag avec en paramètre le tableau des tags sélectionnés
      closeTag(recipes)
    })
  }
}

/**
 * sort recipes by tag based on tag selected by user and return allRecipes (new array with recipes filtered)
 * Call again functions displayAllRecipes() / displaySelectDevice() / displaySelectIngredients() / displaySelectUstensils() with params allRecipes
 * @param {array} recipes - allRecipes or recipes filtered 
 */
function sortRecipesByTag(recipes) {
  let allRecipes = []
  let filterDevice = ""
  let filterIngredient = ""
  let filterUstensil = ""
  const tagsUstensils = document.querySelectorAll(".tag-ustensils")
  const tagsDevices = document.querySelectorAll(".tag-device")
  const tagsIngredients = document.querySelectorAll(".tag-ingredients")
  
  /*
  filter sur tableau des recettes avec every pour cibler chaque tag. 
  Boucle sur toutes les balises tagustensils
  Défini par défaut fitlerustensil sur false
  Boucle sur tous les ustensils des recettes
  Si l'un des ustensils des recettes incluent le tag ET que l'id de la balise tagustensil (id = intitulé du tag) est égal à l'un des ustensils qu'on trouve dans les recettes -> on passe filterUstensil à true
  Idem pour chacun des 3 selects, on retourne les résultats (true / false) = les recettes filtrées --> allRecipes
  */
  allRecipes = recipes.filter(recipe => 
    tagSelect.every(tag => {  
      filterUstensil = false
      for (const itemUstensil of recipe.ustensils) {
        const ustensil = itemUstensil.toLowerCase()
        for (const tagUstensil of tagsUstensils) {
          if (ustensil.includes(tag.toLowerCase()) && tagUstensil.id === ustensil) {
            filterUstensil = true
          }
        }
      }
    
      filterIngredient = false
      for (const itemIngredient of recipe.ingredients) {
        const ingredient = itemIngredient.ingredient.toLowerCase()
        for (const tagIngredient of tagsIngredients) {
          if (ingredient.includes(tag.toLowerCase()) && tagIngredient.id === ingredient) {
            filterIngredient = true
          }
        }
      }
      
      filterDevice = false
      for (const tagDevice of tagsDevices) {
        if (recipe.appliance.toLowerCase().includes(tag) && tagDevice.id === recipe.appliance.toLowerCase()) {
          return true
        }
      }
      return filterDevice || filterUstensil || filterIngredient
    })
  )
   
  containerArticleRecipes.innerHTML = ""
  displayAllRecipes(allRecipes)

  selectDevices.innerHTML = ""
  const optionDevice = document.createElement("option")
  optionDevice.innerHTML = "Appareils"
  selectDevices.prepend(optionDevice)
  displaySelectDevice(allRecipes)

  selectIngredients.innerHTML = ""
  const optionIngredient = document.createElement("option")
  selectIngredients.prepend(optionIngredient)
  optionIngredient.innerHTML = "Ingredients"
  displaySelectIngredients(allRecipes)

  selectUstensils.innerHTML = ""
  const optionUstensil = document.createElement("option")
  selectUstensils.prepend(optionUstensil)
  optionUstensil.innerHTML = "Ustensiles"
  displaySelectUstensils(allRecipes)
}


/**
 * Allows to close the tag on click (or keydown Enter) and sort again recipes (display recipes and display selects)
 * Update tagSelect array 
 * @param {array} recipes - allRecipes or recipes filtered
 */
function closeTag(recipes) {
  const close = document.getElementsByClassName("close-tag")
  
  for (const item of close) {
    item.addEventListener("click", () => {
      const tagsIngredients = document.querySelectorAll(".tag-ingredients")
      const tagsUstensils = document.querySelectorAll(".tag-ustensils")
      const tagsDevices = document.querySelectorAll(".tag-device")
      
      for (const tagIngredient of tagsIngredients) {
        if (item.id === tagIngredient.id) { //si l'id de l'élément cliqué est le même que l'id de la croix cliqué -> on retire du dom la balise
          tagIngredient.remove()
          let index = tagSelect.indexOf(tagIngredient.id) //dans le tableau récupération de l'index de l'élément cliqué
          tagSelect.splice(index, 1) //suppression de cet élément par son index
        }
      }
      for (const tagDevice of tagsDevices) {
        if (item.id === tagDevice.id) {
          tagDevice.remove()
          let index = tagSelect.indexOf(tagDevice.id) 
          tagSelect.splice(index, 1) 
        }
      }
      for (const tagUstensil of tagsUstensils) {
        if (item.id === tagUstensil.id) {
          tagUstensil.remove()
          let index = tagSelect.indexOf(tagUstensil.id) 
          tagSelect.splice(index, 1) 
        }
      }
      
      if (tagSelect.length === 0) {
        displaySelectDevice(recipes)
        displaySelectIngredients(recipes)
        displaySelectUstensils(recipes)
        displayAllRecipes(recipes)
      } else { 
        sortRecipesByTag(recipes)
      }
    })
  
    item.addEventListener("keydown", e => {
      item.focus()
      const tagsIngredients = document.querySelectorAll(".tag-ingredients")
      const tagsUstensils = document.querySelectorAll(".tag-ustensils")
      const tagsDevices = document.querySelectorAll(".tag-device")
      if (e.key === "Enter") {
        for (const tagIngredient of tagsIngredients) {
          if (item.id === tagIngredient.id) { 
            tagIngredient.remove()
            let index = tagSelect.indexOf(tagIngredient.id) 
            tagSelect.splice(index, 1) 
          }
        }
        for (const tagDevice of tagsDevices) {
          if (item.id === tagDevice.id) {
            tagDevice.remove()
            let index = tagSelect.indexOf(tagDevice.id) 
            tagSelect.splice(index, 1) 
          }
        }
        for (const tagUstensil of tagsUstensils) {
          if (item.id === tagUstensil.id) {
            tagUstensil.remove()
            let index = tagSelect.indexOf(tagUstensil.id) 
            tagSelect.splice(index, 1) 
          }
        }
        
        if (tagSelect.length === 0) {
          displaySelectDevice(recipes)
          displaySelectIngredients(recipes)
          displaySelectUstensils(recipes)
          displayAllRecipes(recipes)
        } else { 
          sortRecipesByTag(recipes)
        }
      }
    })
  }
}

main()
