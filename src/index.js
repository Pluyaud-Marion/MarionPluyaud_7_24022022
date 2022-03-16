import recipes from "./recipes.js" // import de l'ensemble de la constante

/**
 * @file Documentation de la branche algorithme1 (Utilisation de Filter pour implémentation de l'algorithme) du projet Les petits plats.
 */

const containerArticleRecipes = document.querySelector(".container-article")
const inputDevice = document.getElementById("devices")
const inputUstensil = document.getElementById("ustensils")
const inputIngredient = document.getElementById("ingredients")
const ulDevices = document.querySelector('.list-devices')
const ulUstensils = document.querySelector('.list-ustensils')
const ulIngredients = document.querySelector('.list-ingredients')
let tagSelect = []
let arrayDevices = []
let arrayIngredients = []
let arrayUstensils = []

/**
 *  Main function calling all functions at loading page
 */
function main() {
displayAllRecipes(recipes)
displaySelectIngredients(recipes)
displaySelectUstensils(recipes)
displaySelectDevice(recipes)
toogleDevices()
toogleUstensils()
toogleIngredients()
displayTag()
displayRecipesBySearchInput()
searchInIngredients(arrayIngredients)
searchInUstensils(arrayUstensils)
searchInDevices(arrayDevices)
}

/**
 * Build DOM recipes cards and display recipes (all or filtered) based on params
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

      quantity.innerHTML = !ingredient.quantity ? "" : " : "+`${ingredient.quantity}`
      
      const unit = document.createElement("span")
      containerIngredient.appendChild(unit)
      unit.className = "unit"
      unit.tabIndex = 0

      unit.innerHTML = !ingredient.unit ? '' : ingredient.unit
    }
    const tagRecipe = document.createElement("div")
    tagContainerInfos.appendChild(tagRecipe)
    tagRecipe.className = "infos-recipe"
    tagRecipe.innerHTML = recipe.description
    tagRecipe.tabIndex = 0
  }
}

/**
 * Build DOM and display li ingredients. Based on params (all li ingredients if all recipes / li ingredients filtered if recipes filtered)
 * sort by alphabetical order and remove duplicates li
 * @param {array} recipes - allRecipes or recipes filtered 
 */

 function displaySelectIngredients(recipes) {
  const ingredientArray = [] 
  let arrayIngredientFinish = [] 

  for (const recipe of recipes){
    const ingredientsElement = recipe.ingredients 
    for (const ingredient of ingredientsElement) {
      const ingredientsAll = ingredient.ingredient 
      ingredientArray.push(ingredientsAll.toLowerCase())
      const uniqueSet = new Set(ingredientArray) // utilisation de l'objet Set qui ne stocke que des valeurs uniques
      arrayIngredientFinish = Array.from(uniqueSet)// conversion de uniqueSet en tableau
    }
  }
  const containerInputIngredient = document.querySelector(".container-input-ingredients")
  containerInputIngredient.appendChild(ulIngredients)
  
  arrayIngredientFinish.sort()
  for (const element of arrayIngredientFinish) {
    const tagOptionIngredient = document.createElement("li") 
    ulIngredients.appendChild(tagOptionIngredient)
    tagOptionIngredient.innerHTML = element
    tagOptionIngredient.className = "element-ingredient"
    tagOptionIngredient.ariaLabel = `sélectionner l'ingrédient ${element}`
  }
  searchInIngredients(arrayIngredientFinish)
}

/**
 * Search function in li, with input search
 * Call function displayTag() for display tag if user click li
 */
function searchInIngredients(arrayIngredients) {
  const allElementsIngredients = document.querySelectorAll(".element-ingredient")
  arrayIngredients = []
  let newLi = []
  for (const ingredient of allElementsIngredients) {
    arrayIngredients.push(ingredient.innerHTML)
  }
  
  inputIngredient.addEventListener("input", e => {
    newLi = arrayIngredients.filter(li => li.includes(e.target.value.trim()))
    ulIngredients.innerHTML = ""
    for (const li of newLi) {
      const tagLi = document.createElement("li")
      ulIngredients.appendChild(tagLi)
      tagLi.className = "element-ingredient"
      tagLi.innerHTML = li
    }
    displayTag();
  })
}

/**
 * Function toogle div container-input-ingredients
 */
function toogleIngredients() {
  const chevronIngredient = document.getElementById("chevron-ingredient")
  const containerInputIng = document.querySelector(".container-input-ing")

  ulIngredients.style.display = "none"

  containerInputIng.addEventListener("click", () => {
    if (ulIngredients.style.display === "flex") {
      ulIngredients.style.display = "none"
      inputIngredient.placeholder = "Ingrédients"
      inputIngredient.style.width = "120px"
      containerInputIng.style.width = "200px"
      inputIngredient.style.opacity = "1"
      chevronIngredient.style.transform = "rotate(360deg)"
    } else if (ulIngredients.style.display === "none"){
      ulIngredients.style.display = "flex"
      inputIngredient.placeholder = "Rechercher un ingrédient"
      containerInputIng.style.width = "578px"
      inputIngredient.style.width = "528px"
      inputIngredient.style.opacity = "0.5"
      chevronIngredient.style.transform = "rotate(180deg)"
    }
  })
}

/**
 * Build DOM and display li ustensils. Based on params (all li ustensils if all recipes / li ustensils filtered if recipes filtered)
 * sort by alphabetical order and remove duplicates li
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
  const containerInputUstensil= document.querySelector(".container-input-ustensils")
  containerInputUstensil.appendChild(ulUstensils)

  arrayUstensilFinish.sort()
  for (const ustensil of arrayUstensilFinish) {
    const tagOptionUstensils = document.createElement("li") 
    ulUstensils.appendChild(tagOptionUstensils)
    tagOptionUstensils.innerHTML = ustensil
    tagOptionUstensils.className = "element-ustensil"
    tagOptionUstensils.ariaLabel = `sélectionner l'ustensil ${ustensil}`
  }
  searchInUstensils(arrayUstensilFinish)
}

/**
 * Search function in li, with input search
 * Call function displayTag() for display tag if user click li
 */
function searchInUstensils(arrayUstensils) {
  const allElementsUstensils = document.querySelectorAll(".element-ustensil")
  arrayUstensils = []
  let newLi = []
  for (const ustensil of allElementsUstensils) {
    arrayUstensils.push(ustensil.innerHTML)
  }
  inputUstensil.addEventListener("input", e => {
    newLi = arrayUstensils.filter(li => li.includes(e.target.value.trim()))
    ulUstensils.innerHTML = ""
    console.log(newLi);
    for (const li of newLi) {
      const tagLi = document.createElement("li")
      ulUstensils.appendChild(tagLi)
      tagLi.className = "element-ustensil"
      tagLi.innerHTML = li
    }
    displayTag()
  })
}

/**
 * Function toogle div container-input-ustensils
 */
function toogleUstensils() {
  const chevronUstensils = document.getElementById("chevron-ustensil")
  const containerInputUst = document.querySelector(".container-input-ust")
  ulUstensils.style.display = "none"

  containerInputUst.addEventListener("click", () => {
    if (ulUstensils.style.display === "flex") {
      ulUstensils.style.display = "none"
      inputUstensil.placeholder = "Ustensiles"
      inputUstensil.style.width = "120px"
      containerInputUst.style.width = "200px"
      inputUstensil.style.opacity = "1"
      chevronUstensils.style.transform = "rotate(360deg)"
    } else if (ulUstensils.style.display === "none"){
      ulUstensils.style.display = "flex"
      inputUstensil.placeholder = "Rechercher un ustensile"
      inputUstensil.style.width = "528px"
      containerInputUst.style.width = "578px"
      inputUstensil.style.opacity = "0.5"
      chevronUstensils.style.transform = "rotate(180deg)"
    }
  })
}

/**
 * Build DOM and display li devices. Based on params (all li devices if all recipes / li devices filtered if recipes filtered)
 * sort by alphabetical order and remove duplicates li
 * @param {array} recipes - allRecipes or recipes filtered
 */
 function displaySelectDevice(recipes) {
  const deviceArray = []
  let arrayDeviceFinish = [];
  
  for (const recipe of recipes) {
    const deviceElement = recipe.appliance // string
    deviceArray.push(deviceElement.toLowerCase())
    const uniqueSet = new Set(deviceArray)
    arrayDeviceFinish = Array.from(uniqueSet)
  }

  const containerInputDevice= document.querySelector(".container-input-devices")
  containerInputDevice.appendChild(ulDevices)

  arrayDeviceFinish.sort()

  for (const device of arrayDeviceFinish) {
    const tagOptionDevice = document.createElement("li")
    ulDevices.appendChild(tagOptionDevice)
    tagOptionDevice.innerHTML = device
    tagOptionDevice.className = "element-device"
    tagOptionDevice.ariaLabel = `sélectionner l'appareil ${device}`
  }
  searchInDevices(arrayDeviceFinish)
}

/**
 * Search function in li, with input search
 * Call function displayTag() for display tag if user click li
 */
function searchInDevices(arrayDevices) {
  const allElementsDevices = document.querySelectorAll(".element-device")
  arrayDevices = []
  let newLi = []
  for (const device of allElementsDevices) {
    arrayDevices.push(device.innerHTML)
  }
  console.log(arrayDevices);
  inputDevice.addEventListener("input", e => {
    newLi = arrayDevices.filter(li => li.includes(e.target.value.trim()))
    ulDevices.innerHTML = ""
  
    for (const li of newLi) {
      const tagLi = document.createElement("li")
      ulDevices.appendChild(tagLi)
      tagLi.className = "element-device"
      tagLi.innerHTML = li
    }
    displayTag()
  })
}

/**
 * Function toogle div container-input-devices
 */
function toogleDevices() {
  const chevronDevices = document.getElementById("chevron-device")
  const containerInputDev = document.querySelector(".container-input-dev")
  ulDevices.style.display = "none"
  
  containerInputDev.addEventListener("click", () => {
    if (ulDevices.style.display === "flex") {
      ulDevices.style.display = "none"
      inputDevice.placeholder = "Appareils"
      inputDevice.style.width = "120px"
      containerInputDev.style.width = "200px"
      inputDevice.style.opacity = "1"
      chevronDevices.style.transform = "rotate(180deg)"
    } else if (ulDevices.style.display === "none"){
      ulDevices.style.display = "flex"
      inputDevice.placeholder = "Rechercher un appareil"
      inputDevice.style.width = "528px"
      containerInputDev.style.width = "578px"
      inputDevice.style.opacity = "0.5"
    }
  })
}
  

/**
 * Build and display tags - Add in tagSelect (array) all tags selected
 * Call functions sortRecipesByTag() and closeTag()
 */
function displayTag() {
  const allElementsIngredients = document.querySelectorAll(".element-ingredient")
  const allElementsDevices = document.querySelectorAll(".element-device")
  const allElementsUstensils = document.querySelectorAll(".element-ustensil")

  const allElements = [allElementsIngredients, allElementsDevices, allElementsUstensils]
  const divTag = document.querySelector('.tag')

  for (const element of allElements) {
    element.forEach(el => {
      el.addEventListener("click", (e) => {
        let divTagSpanImg = document.createElement('div');
        divTag.appendChild(divTagSpanImg)
        let spanTag = document.createElement('span')
        divTagSpanImg.appendChild(spanTag)
        spanTag.innerHTML = e.target.innerHTML
        let imgTag = document.createElement('img');
        divTagSpanImg.appendChild(imgTag)
        imgTag.src = "./assets/close-tag.png"
        imgTag.id = e.target.innerHTML //donne comme id à l'img le nom du tag
        imgTag.className = "close-tag"
        imgTag.alt = "croix pour fermer le tag"
        imgTag.ariaLabel = "icone d'une croix pour fermer le tag sélectionné"
        imgTag.tabIndex = 1

        if (el.className === 'element-ingredient'){
          divTagSpanImg.className = 'tag-ingredients'
          divTagSpanImg.id = e.target.innerHTML
          divTagSpanImg.tabIndex = 1
          divTagSpanImg.ariaLabel = `filtre les recettes avec ingrédient ${el.innerHTML}`

        } else if (el.className === 'element-device' ){
          divTagSpanImg.className = 'tag-device'
          divTagSpanImg.id = e.target.innerHTML
          divTagSpanImg.tabIndex = 1
          divTagSpanImg.ariaLabel = `filtre les recettes avec appareil ${el.innerHTML}`
        
        } else if (el.className === 'element-ustensil'){
          divTagSpanImg.className = 'tag-ustensils'
          divTagSpanImg.id = e.target.innerHTML
          divTagSpanImg.tabIndex = 1
          divTagSpanImg.ariaLabel = `filtre les recettes avec ustensil ${el.innerHTML}`
        }
        
        
        const containerInputIng = document.querySelector(".container-input-ing")
        ulIngredients.style.display = "none"
        inputIngredient.placeholder = "Ingrédients"
        inputIngredient.style.width = "120px"
        containerInputIng.style.width = "200px"
        inputIngredient.style.opacity = "1"

        const containerInputDev = document.querySelector(".container-input-dev")
        ulDevices.style.display = "none"
        inputDevice.placeholder = "Appareils"
        inputDevice.style.width = "120px"
        containerInputDev.style.width = "200px"
        inputDevice.style.opacity = "1"

      
        const containerInputUst = document.querySelector(".container-input-ust")
        ulUstensils.style.display = "none"
        inputUstensil.placeholder = "Ustensiles"
        inputUstensil.style.width = "120px"
        containerInputUst.style.width = "200px"
        inputUstensil.style.opacity = "1"

        tagSelect.push(e.target.innerHTML)

        for (el of allElementsUstensils) {
          if (el.innerHTML === e.target.innerHTML){
            console.log(el);
            el.remove()
          }
        }
        sortRecipesByTag(recipes) //appel de la fonction qui trie par tag avec en paramètre le tableau des tags sélectionnés
        closeTag(recipes)
       
      })
    })
  }
}
 
/**
 * sort recipes by tag based on tag selected by user and return allRecipes (new array with recipes filtered)
 * Call again functions displayAllRecipes() / displaySelectDevice() / displaySelectIngredients() / displaySelectUstensils() with params allRecipes / displayTag()
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
  Si l'un des ustensils des recettes incluent le tag ET que l'id de la balise tagustensil (id = intitulé du tag) est égale à l'un des ustensils qu'on trouve dans les recettes -> on passe filterUstensil à true
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
  
  const ulDevices = document.querySelector(".list-devices")
  const ulUstensils = document.querySelector(".list-ustensils")
  const ulIngredients = document.querySelector(".list-ingredients")

  ulDevices.innerHTML = '';
  displaySelectDevice(allRecipes)

  ulIngredients.innerHTML='';
  displaySelectIngredients(allRecipes)

  ulUstensils.innerHTML = '';
  displaySelectUstensils(allRecipes)
  
  displayTag()
}

/**
 * Allows to close the tag on click and sort again recipes 
 * Update tagSelect array 
 * @param {recipes} recipes - allRecipes or recipes filtered 
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
      
      // if (tagSelect.length === 0) {
      //   console.log("vide");
      //   displaySelectDevice(recipes)
      //   displaySelectIngredients(recipes)
      //   displaySelectUstensils(recipes)
      //   displayAllRecipes(recipes)
        
      // } else { 
      //   sortRecipesByTag(recipes)
      // }
      sortRecipesByTag(recipes)
    })
  }
}

/**
 * Sort recipes by search bar with FILTER - return filterRecipes (new array with recipes filtered) 
 * Call again functions displayAllRecipes() / displaySelectDevice() / displaySelectIngredients() / displaySelectUstensils() with params filterRecipes
 * Add sortByTag
 */
function displayRecipesBySearchInput() {
  const searchBar = document.querySelector(".search")
  const ulDevices = document.querySelector(".list-devices")
  const ulUstensils = document.querySelector(".list-ustensils")
  const ulIngredients = document.querySelector(".list-ingredients")

  let filterRecipes = []

  searchBar.addEventListener("input", e => {
    const valueInput = e.target.value.toLowerCase().trim() //récupération de la valeur de l'input
    console.log(valueInput);
    if (valueInput.length > 2) {
      containerArticleRecipes.innerHTML = "" 
          filterRecipes = recipes.filter(recipe => {
          let filterIngredient = false 
          for (const item of recipe.ingredients) {
            const ingredient = item.ingredient.toLowerCase();
            if (ingredient.includes(valueInput)) {
              filterIngredient = true
            }
          }
          return recipe.name.toLowerCase().includes(valueInput) ||
          recipe.description.toLowerCase().includes(valueInput) || filterIngredient
      })
      displayAllRecipes(filterRecipes) // appelle à nouveau la fonction pour afficher les recettes avec en paramètre le nouveau tableau trié

      ulIngredients.innerHTML = "" 
      displaySelectIngredients(filterRecipes) 
      
      ulDevices.innerHTML = "" 
      displaySelectDevice(filterRecipes) 

      ulUstensils.innerHTML = "" 
      displaySelectUstensils(filterRecipes) 
      
      /*
      recherche sur barre de recherche d'abord puis avec les tags
      Ecouteur sur les balises ul + au click appel de la fonction tri
      */
      const allUls = [ulIngredients, ulDevices, ulUstensils]
      for(const ul of allUls){
        ul.addEventListener('click', () => {
          sortRecipesByTag(filterRecipes)
          closeTag(filterRecipes)
        })
      }
      displayTag()

      if (filterRecipes.length === 0) {
        containerArticleRecipes.innerHTML = 'Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes", "poisson", etc.'
      }
     
    } else {
      containerArticleRecipes.innerHTML = ""
      displayAllRecipes(recipes)
      console.log("il n'y a pas 3 lettres")
    }
  })
}

main()
