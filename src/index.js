import recipes from "./recipes.js" // import de l'ensemble de la constante

const selectIngredients = document.getElementById("ingredients") // récupère la balise select (sans options)
const selectUstensils = document.getElementById("ustensils") // récupère le select avec id ustensils
const selectDevice = document.getElementById("devices")
const filter = document.querySelector(".filter-tag")
const containerArticleRecipes = document.querySelector(".container-article")

function main() {
displayAllRecipes(recipes)
displaySelectIngredients()
displaySelectUstensils()
displaySelectDevice()
displayTag()
searchInput()
}

function displayAllRecipes(recipes) {
  const containerArticle = document.querySelector(".container-article")

  for (const recipe of recipes) {
    const tagArticle = document.createElement("article");
    containerArticle.appendChild(tagArticle)
    tagArticle.className = "article-recipe"

    const tagImg = document.createElement("img")
    tagArticle.appendChild(tagImg)
    tagImg.src = "../assets/picture-recipe.jpg"

    const tagContainer = document.createElement("div")
    tagArticle.appendChild(tagContainer)
    tagContainer.className = "container-text-title"

    const h2 = document.createElement("h2")
    tagContainer.appendChild(h2)
    h2.className = "title"
    h2.innerHTML = recipe.name

    const tagContainerTime = document.createElement("div")
    tagContainer.appendChild(tagContainerTime)
    tagContainerTime.className = "icon-time"

    const tagI = document.createElement("i")
    tagContainerTime.appendChild(tagI)
    tagI.className = "far fa-clock"

    const tagSpanTime = document.createElement("span")
    tagContainerTime.appendChild(tagSpanTime)
    tagSpanTime.className = "time"
    tagSpanTime.innerHTML = recipe.time + " min"

    const tagContainerInfos = document.createElement("div")
    tagArticle.appendChild(tagContainerInfos);
    tagContainerInfos.className = "container-ingredient-recipe"

    const tagIngredient = document.createElement("div")
    tagContainerInfos.appendChild(tagIngredient)
    tagIngredient.className = "ingredient"
    
    const recipeIngredients = recipe.ingredients
    for( const ingredient of recipeIngredients) {
      
      const containerIngredient = document.createElement("div")
      tagIngredient.appendChild(containerIngredient)
      containerIngredient.className = "container-ingredient"
      const aliment = document.createElement("span");
      containerIngredient.appendChild(aliment)
      aliment.className = "aliment"

      aliment.innerHTML = ingredient.ingredient
      const quantity = document.createElement("span")
      containerIngredient.appendChild(quantity)
      quantity.className = "quantity"

      if(!ingredient.quantity) {
        quantity.innerHTML = ""
      } else {
        quantity.innerHTML = " : "+`${ingredient.quantity}`
      }
      
      const unit = document.createElement("span")
      containerIngredient.appendChild(unit)
      unit.className = "unit"

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
  }
}

function displaySelectIngredients() {
  const ingredientArray = [] //défini tableau d'ingrédients vide
  let arrayIngredientFinish = [] //défini tableau final vide


  // boucle sur les recettes
  for (const recipe of recipes){
    const ingredientsElement = recipe.ingredients //récupère des tableaux avec tous les éléments d'une recette
  
    //boucle sur chaque ingrédients des tableaux
    for (const ingredient of ingredientsElement) {
      const ingredientsAll = ingredient.ingredient //récupère tous les ingrédients individuellement
      ingredientArray.push(ingredientsAll.toLowerCase()) //insère dans tableau ingredientArray chaque ingrédient, en minuscule
      const uniqueSet = new Set(ingredientArray) // utilisation de l'objet Set qui ne stocke que des valeurs uniques
      arrayIngredientFinish = Array.from(uniqueSet)// conversion de uniqueSet en tableau

     // filterArray = ingredientArray.filter((ingredient, index) => ingredientArray.indexOf(ingredient) !== index)
    }
  }
  //boucle sur chaque élément du tableau trié pour créer les balises option et insérer les éléments
  for (const element of arrayIngredientFinish) {
    const tagOptionIngredient = document.createElement("option") //créé une balise option pour chaque ingrédient
    selectIngredients.appendChild(tagOptionIngredient)
    tagOptionIngredient.value = element
    tagOptionIngredient.innerHTML = element
  }

  
}

function displayTag() {
  const divTag = document.createElement("div");
  filter.prepend(divTag)
  divTag.className = "tag"

  selectIngredients.addEventListener("change", () => {
    let tagIngredient = selectIngredients.value
  
    const spanTag = document.createElement("span")
    divTag.appendChild(spanTag)
      
    spanTag.className = "tag-ingredients"
    spanTag.innerHTML = tagIngredient
  })

  selectUstensils.addEventListener("change", () => {
    let tagUstensil = selectUstensils.value
    const spanTag = document.createElement("span")
    divTag.appendChild(spanTag)
    spanTag.className = "tag-ustensils"
    spanTag.innerHTML = tagUstensil
  })

  selectDevice.addEventListener("change", () => {
    let tagDevice = selectDevice.value
    const spanTag = document.createElement("span")
    divTag.appendChild(spanTag)
    spanTag.className = "tag-device"
    spanTag.innerHTML = tagDevice
  })
}


function displaySelectUstensils() {
  const ustensilArray = [] //défini tableau d'ustensils vide
  let arrayUstensilFinish = [] //défini tableau final vide

  //boucle sur chaque recette pour récupérer tous les ustensils
  for (const recipe of recipes){
    const ustensilsElement = recipe.ustensils
    //pour chaque ustenstil = création nouveau tableau sans doublon
    for (const ustensils of ustensilsElement) {
      ustensilArray.push(ustensils.toLowerCase()) // remplissage du tableau avec chaque ustensils : nom en minuscule
      const uniqueSet = new Set(ustensilArray) // utilisation de l'objet Set qui ne stocke que des valeurs uniques
      //arrayFinish = [...uniqueSet] // conversion de uniqueSet en tableau
      arrayUstensilFinish = Array.from(uniqueSet) // conversion de uniqueSet en tableau
    }
  }
  //pour chaque élément du nouveau tableau sans doublon : création balise option + ajout valeur
  for (const ustensil of arrayUstensilFinish) {
    const tagOptionUstensils = document.createElement("option") 
    selectUstensils.appendChild(tagOptionUstensils)
    tagOptionUstensils.innerHTML = ustensil
    tagOptionUstensils.value = ustensil
  }
}

function displaySelectDevice() {
  const deviceArray = []
  let arrayDeviceFinish = [];
  for (const recipe of recipes) {
    const deviceElement = recipe.appliance // string

    deviceArray.push(deviceElement.toLowerCase())
    const uniqueSet = new Set(deviceArray)
    arrayDeviceFinish = Array.from(uniqueSet)
  }
  for (const device of arrayDeviceFinish) {
    const tagOptionDevice = document.createElement("option")
    selectDevice.appendChild(tagOptionDevice)
    tagOptionDevice.innerHTML = device
    tagOptionDevice.value = device
  }
}

function searchInput() {

  const searchBar = document.querySelector(".search")

  searchBar.addEventListener("input", e => {
    const valueInput = e.target.value //récupération de la valeur de l'input
    if (valueInput.length > 2) {
      containerArticleRecipes.innerHTML = "" //vide le dom des recettes

     // const filterRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(valueInput.toLowerCase()))
      //const filterRecipes = recipes.filter(recipe => recipe.description.toLowerCase().includes(valueInput.toLowerCase()))

      // const filterRecipes = recipes.filter(recipe => recipe.name.toLowerCase().includes(valueInput.toLowerCase()) || recipe.description.toLowerCase().includes(valueInput.toLowerCase()))
      

      const filterRecipes = recipes.filter(recipe => {
        for (const item of recipe.ingredients) {
          return recipe.name.toLowerCase().includes(valueInput.toLowerCase()) || recipe.description.toLowerCase().includes(valueInput.toLowerCase()) || item.ingredient.toLowerCase().includes(valueInput.toLowerCase())
        }
      })

      // const filterRecipes = recipes.filter(recipe => {
      //   //console.log(recipe.ingredients);
      //  for (let i=0; i<recipe.ingredients.length; i++) {
      //     //console.log(item.ingredient);
      //   //console.log(item);
      //   //   const ingredient = item.ingredient
      //   // console.log(ingredient);
      //     return recipe.ingredients[i].ingredient.toLowerCase().includes(valueInput.toLowerCase())
      //    }
         
      // })
      console.log(filterRecipes);
     
  
    
      
      
      //for (const item of filterRecipes) {
        //console.log(item)
      displayAllRecipes(filterRecipes) // appelle à nouveau la fonction pour afficher les recettes avec en paramètre le nouveau tableau trié
      //}


    } else {
      console.log("il n'y a pas 3 lettres");
    }
  })
}
main()
