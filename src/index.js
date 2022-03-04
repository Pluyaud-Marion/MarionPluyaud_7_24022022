import recipes from "./recipes.js" // import de l'ensemble de la constante

const selectIngredients = document.getElementById("ingredients") // récupère la balise select (sans options)
const selectUstensils = document.getElementById("ustensils") // récupère le select avec id ustensils
const selectDevice = document.getElementById("devices")
const filter = document.querySelector(".filter-tag")
const containerArticleRecipes = document.querySelector(".container-article")

function main() {
displayAllRecipes(recipes)
displaySelectIngredients(recipes)
displaySelectUstensils(recipes)
displaySelectDevice(recipes)
displayTag()
sortRecipesByTag()
// sortRecipesByTagIngredient()
// sortRecipesByTagUstensil()
// sortRecipesByTagDevice()
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

function displaySelectIngredients(recipes) {
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

function displaySelectUstensils(recipes) {
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

function displaySelectDevice(recipes) {
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

let tagSelect = []
//let allRecipes = []

function sortRecipesByTag() {
  const selectAll = [selectIngredients, selectDevice, selectUstensils ]
  //let allRecipes = []

  for (const select of selectAll) {
    select.addEventListener("input", e => {
    
      tagSelect.push(e.target.value) //tableau contient tous les tags selectionnés
    
      const allRecipes = recipes.filter(recipe => 
        tagSelect.every( tag => {  
          let filterUstensil = false
          for (const itemUstensil of recipe.ustensils) {
            const ustensil = itemUstensil.toLowerCase()
            if (ustensil.includes(tag.toLowerCase())) {
              filterUstensil = true
            }
          }
          let filterIngredient = false
          for (const itemIngredient of recipe.ingredients) {
            const ingredient = itemIngredient.ingredient.toLowerCase()
            if (ingredient.includes(tag.toLowerCase())) {
              filterIngredient = true
            }
          }
        return recipe.appliance.toLowerCase().includes(tag) || filterUstensil || filterIngredient
        })
      )
      containerArticleRecipes.innerHTML = ""
      displayAllRecipes(allRecipes)


      selectDevice.innerHTML = ""
      const optionDevice = document.createElement("option")
      selectDevice.appendChild(optionDevice)
      optionDevice.innerHTML = "Appareils"
      console.log(optionDevice);
      displaySelectDevice(allRecipes)

      selectIngredients.innerHTML = ""
      // const optionIngredient = document.createElement("option")
      // selectIngredients.appendChild(optionIngredient)
      // optionIngredient.innerHTML = "Ingredients"
      displaySelectIngredients(allRecipes)


      selectUstensils.innerHTML = ""
      // const optionUstensil = document.createElement("option")
      // selectUstensils.appendChild(optionUstensil)
      // optionUstensil.innerHTML = "Ustensiles"
      displaySelectUstensils(allRecipes)
    })
  }
 
}

// console.log(tagSelect);
//     //const recipesSortByIngredient = recipes.filter(recipe => {
//       allRecipes = recipes.filter(recipe => {
//       let filterIngredient = false

//       for (const itemIngredient of recipe.ingredients) {
//         const ingredient = itemIngredient.ingredient.toLowerCase()
//         if (ingredient.includes(tagIngredient.toLowerCase())) {
//           filterIngredient = true
//         }
//       }
//       console.log(filterIngredient);
//       return filterIngredient
      
//     })
//     containerArticleRecipes.innerHTML = ""
//     //displayAllRecipes(recipesSortByIngredient)
//     displayAllRecipes(allRecipes)

//   })

//   selectUstensils.addEventListener("change", () => {
//     let tagUstensil = selectUstensils.value
//     // filter sur toutes les recettes pour récupérer dans recipesSortByUstensil un nouveau tableau ne contenant que les recettes correspondant aux ustensils choisis
//      allRecipes = recipes.filter(recipe => {
//       let filterUstensil = false

//       //boucle sur chaque ustensil pour rentrer dans le tableau
//       for (const itemUstensil of recipe.ustensils) {
//         const ustensil = itemUstensil.toLowerCase()
//         if (ustensil.includes(tagUstensil.toLowerCase())) {
//           filterUstensil = true
//         }
//       }
//       return { filterUstensil, allRecipes }
//     })
//     containerArticleRecipes.innerHTML = "";
//     displayAllRecipes(allRecipes)
//     //console.log(recipesSortByUstensil);
//   })

//   selectDevice.addEventListener("change", () => {
//     let tagDevice = selectDevice.value
//     // Tri sur toutes les recettes pour récupérer celles qui ont comme appliance la valeur sélectionnée
//     allRecipes = recipes.filter(recipe => {
//       return recipe.appliance.toLowerCase().includes(tagDevice.toLowerCase())
//     })
//     containerArticleRecipes.innerHTML = "";
//     displayAllRecipes(allRecipes);
//     //console.log(recipesSortByDevice);
//   })
  
//   // let recipesTagFilter = []
//   // let element = []
//   // recipesTagFilter = recipes.filter(recipe => {
//   //   element.every(el => {
//   //     for(const ingredient of recipe.ingredients){
//   //       return (recipe.ustensils.includes(el) || recipe.appliance.includes(el) || ingredient.ingredient.includes(el))
//   //     }
//   //   })
//   //   console.log(recipesTagFilter);
//   // })
  
//   displayAllRecipes(allRecipes)
// }


// function sortRecipesByTagIngredient() {
//   selectIngredients.addEventListener("change", () => {
//     let tagIngredient = selectIngredients.value
//     const recipesSortByIngredient = recipes.filter(recipe => {
//       let filterIngredient = false

//       for (const itemIngredient of recipe.ingredients) {
//         const ingredient = itemIngredient.ingredient.toLowerCase()
//         if (ingredient.includes(tagIngredient.toLowerCase())) {
//           filterIngredient = true
//         }
//       }
//       return filterIngredient
//     })
//     containerArticleRecipes.innerHTML = ""
//     displayAllRecipes(recipesSortByIngredient)
//     console.log(recipesSortByIngredient);
//   })
// }

// function sortRecipesByTagUstensil() {
//   selectUstensils.addEventListener("change", () => {
//     let tagUstensil = selectUstensils.value
//     // filter sur toutes les recettes pour récupérer dans recipesSortByUstensil un nouveau tableau ne contenant que les recettes correspondant aux ustensils choisis
//     const recipesSortByUstensil = recipes.filter(recipe => {
//       let filterUstensil = false

//       //boucle sur chaque ustensil pour rentrer dans le tableau
//       for (const itemUstensil of recipe.ustensils) {
//         const ustensil = itemUstensil.toLowerCase()
//         if (ustensil.includes(tagUstensil.toLowerCase())) {
//           filterUstensil = true
//         }
//       }
//       return filterUstensil
//     })
//     containerArticleRecipes.innerHTML = "";
//     displayAllRecipes(recipesSortByUstensil)
//     console.log(recipesSortByUstensil);
//   })
// }

// function sortRecipesByTagDevice() {
//   selectDevice.addEventListener("change", () => {
//     let tagDevice = selectDevice.value
//     // Tri sur toutes les recettes pour récupérer celles qui ont comme appliance la valeur sélectionnée
//     const recipesSortByDevice = recipes.filter(recipe => {
//       return recipe.appliance.toLowerCase().includes(tagDevice.toLowerCase())
//     })
//     containerArticleRecipes.innerHTML = "";
//     displayAllRecipes(recipesSortByDevice);
//     console.log(recipesSortByDevice);
//   })
// }



main()
