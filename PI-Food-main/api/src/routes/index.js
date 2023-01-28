require('dotenv').config();
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios")
const { API_KEY } = process.env;
const { Recipe, Diet } = require('../db')


const router = Router();
const getApi = async () => {

    try {
        const apiUrl = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5")
    //  const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
     const apiRecipe = await apiUrl.data.results.map(x => {
         return {
             name: x.title,
             id: x.id,
             image: x.image,
             summary: x.summary,
             healthScore: x.healthScore,
             diets: x.diets,
             steps:( x.analyzedInstructions[0]?.steps?.map(item => item.step)) //x.analyzedInstructions.map(p => p.steps),
 
             
 
         };
     } )
 
     return apiRecipe;
 } catch(error) {
     console.error("Error al obtener los datos de la api", error)
 }
}


const getDb = async () => {
    try{
    const dbInfo = await Recipe.findAll({
        include:{
            model: Diet,
            attributes: ["name"],
            through: {
                attributes: []
            },
        }
    })
    
    var dato = JSON.parse(JSON.stringify(dbInfo, null, 2))
      dato.forEach(el=>el.diets = el.diets.map(el=> el.name))

      return dato
 }  catch(error) {
    console.error("Error al obtener los datos de la db", error)
}

}

const totalGet = async () => {
    try{
    const infoApi = await getApi();
    const infoDb = await getDb();
    const infoTotal = infoApi.concat(infoDb);
    return infoTotal;
    }
    catch (error) {
        console.error("Error al concatenar los datos", error)
    }
}

router.get("/recipes", async (req, res) => {
    const name = req.query.name;
    const recipesTotal = await totalGet();
    if (name) {
        let nameRecipes = await recipesTotal.filter(x => x.name.toLowerCase().includes(name.toLowerCase()));
        nameRecipes.length ? 
        res.status(200).send(nameRecipes) :
        res.status(200).send(["La receta no existe"]);

    }
    else{
        res.status(200).send(recipesTotal)
    }

})

router.get("/recipes/:id", async (req, res) => {
    const id = req.params.id;
    const rTotal = await totalGet();
    if (id) {
        let nameRecipes = await rTotal.filter(x => x.id == id)
        nameRecipes.length ? 
        res.status(200).send(nameRecipes) :
        res.status(404).send("No se puede acceder al detalle");
    }

})
 
router.get("/diets", async(req, res) =>{
    const laApi = await getApi();
    var elementos = [
        'gluten free',
        'dairy free',
        'lacto ovo vegetarian',
        'vegan',
        'paleolithic',
        'primal',
        'whole 30',
        'pescatarian',
        'ketogenic',
        'vegetarian',
        'fodmap friendly'
    ]


    // const lasDietas =  laApi.map(x => x.diets)
    // const dietas =  lasDietas.map(x => {
    //   for (let i = 0; i < x.length; i++) {
    //       if(!elementos.includes(x[i]) )
    //       elementos.push(x[i])}});
  
    elementos.forEach(el => {
      Diet.findOrCreate({
          where:{
              name: el
          }
      })
  }); 
  
    console.log(elementos)
    const allDiets = await Diet.findAll();
    res.send(allDiets)
  })
  

router.post("/recipes", async(req, res) => {
    let {
             name,
             image,
             summary,
             healthScore,
             diets,
             steps,
             createdIndb
    } = req.body
    let recipeCreate = await Recipe.create({
        name,
        image,
        summary,
        healthScore,
        steps,
        createdIndb
    })
    let getDiets = await Diet.findAll({
        where: {
            name: diets
        } 
    }); console.log(getDiets)

    recipeCreate.addDiet(getDiets);
    console.log(getDiets)
    res.send("Receta creada con exito")


})
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;

