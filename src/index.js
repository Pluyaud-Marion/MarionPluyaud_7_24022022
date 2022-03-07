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
sortRecipesByTag(tagSelect)

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


function sortRecipesByTag(tagSelect) {
  const selectAll = [selectIngredients, selectDevice, selectUstensils ]
  let allRecipes = []

  const divTag = document.createElement("div");
  filter.prepend(divTag)
  divTag.className = "tag"

  for (const select of selectAll) {
    select.addEventListener("input", e => {
      let divTagSpanImg = document.createElement('div');
      divTag.appendChild(divTagSpanImg)
      let spanTag = document.createElement('span')
      divTagSpanImg.appendChild(spanTag)
      spanTag.innerHTML = e.target.value
      let imgTag = document.createElement('img');
      divTagSpanImg.appendChild(imgTag)
      imgTag.src = "../assets/close-tag.png"
      imgTag.id = e.target.value //donne comme id à l'img le nom du tag
      imgTag.className = "close-tag"

      if (select.id === 'ingredients'){
        divTagSpanImg.className = 'tag-ingredients'
        divTagSpanImg.id = e.target.value
        //imgTag.id = e.target.value
      }else if (select.id === 'devices'){
        divTagSpanImg.className = 'tag-device'
        divTagSpanImg.id = e.target.value
        //imgTag.id = e.target.value
      }else if (select.id === 'ustensils'){
        divTagSpanImg.className = 'tag-ustensils'
        divTagSpanImg.id = e.target.value
        //divTagSpanImg.id = e.target.value
      }
      
      tagSelect.push(e.target.value) //tableau contient tous les tags selectionnés
    
      allRecipes = recipes.filter(recipe => 
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
      optionDevice.innerHTML = "Appareils"
      selectDevice.prepend(optionDevice)
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

      closeTag()
      
    })
  }
}

function closeTag() {
  const close = document.getElementsByClassName("close-tag")
  const tagsIngredients = document.querySelectorAll(".tag-ingredients")
  const tagsUstensils = document.querySelectorAll(".tag-ustensils")
  const tagsDevices = document.querySelectorAll(".tag-device")
  
  for (const item of close) {
    for (const tagIngredient of tagsIngredients) {
      item.addEventListener("click", () => {
        let arrayTag = []

        tagSelect.forEach(tag => arrayTag.push(tag))
        let index = arrayTag.indexOf(item.id)
        arrayTag.splice(index, 1)

        if (item.id === tagIngredient.id) {
          tagIngredient.remove()
        }
        
        //sortRecipesByTag(arrayTag)
      })
    }
  }
 
  for (const item of close) {
    for (const tagDevice of tagsDevices) {
      item.addEventListener("click", () => {
        let arrayTag = []
        tagSelect.forEach(tag => arrayTag.push(tag))
        let index = arrayTag.indexOf(item.id)
        arrayTag.splice(index, 1)
        if (item.id === tagDevice.id) {
          tagDevice.remove()
        }
    
        //sortRecipesByTag(arrayTag)
      })
    }
  }
  for (const item of close) {
    for (const tagUstensil of tagsUstensils) {
      item.addEventListener("click", () => {
        let arrayTag = []
        tagSelect.forEach(tag => arrayTag.push(tag))
        let index = arrayTag.indexOf(item.id)
        arrayTag.splice(index, 1)
        if (item.id === tagUstensil.id) {
          tagUstensil.remove()
        }
        console.log(arrayTag);
        sortRecipesByTag(arrayTag)
      })

    }
    
  }
  
  
//   for (const item of close) {
//     for (const tagIngredient of tagsIngredients) {
//       item.addEventListener("click", () => {
    
//         let arrayTag = []
//         tagSelect.forEach(tag => arrayTag.push(tag))
    
//         let index = arrayTag.indexOf(item.id)
        
//         arrayTag.splice(index, 1)

//         if (item.id === tagIngredient.id) {
//           tagIngredient.remove()
//         }
       
 
//         sortRecipesByTag(arrayTag)
//       })
//     }

// }
  
}
main()
