const Animal = require('../model/Animal');


function showHomePage(req, res) {
    res.render("index.ejs");
}



    async function showAllAnimals(req, res) {
        console.log("Accessing all animals");
        try {
            const animals = await Animal.find();
            res.render('animals/all-animals', { title: 'Animal List', animals: animals });

        } catch (error) {
            console.error("Error all animals not working : ", error);
            res.status(500).send({ message: "Some error occurred while retrieving animals." });
        }
    }
    

    function showCreateAnimalForm(req, res) {
        
        res.render('animals/entry-form', { title: 'Add New Animal', animal: {}, error: null });
    }
    
    async function createAnimal(req, res) {
        
        const newAnimal = new Animal({
            zoo: req.body.zoo,
            scientificName: req.body.scientificName,
            commonName: req.body.commonName,
            givenName: req.body.givenName,
            gender: req.body.gender,
            dateOfBirth: new Date(req.body.dateOfBirth), 
            age: parseInt(req.body.age), 
            isTransportable: req.body.isTransportable === 'true' 
        });
    
        try {
            
            await newAnimal.save();
            res.redirect('/animals/all-animals'); 
        } catch (error) {
            
            console.error("Error with creating the animal: ", error);
            res.status(500).render('animals/entry-form', { title: 'Add New Animal', animal: req.body, error: "Failed to create animal. Please check the data provided." });
        }
    }
    
    
//  the form to edit an existing animal
async function EditAnimalForm(req, res) {
    try {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            return res.status(404).send({ message: "Animal not found with id " + req.params.id });
        }
        res.render('animals/edit-animal', { title: 'Edit Animal', animal: animal }); 
    } catch (error) {
        console.error("Error with retrieving animal: ", error);
        res.status(500).send({ message: "Error retrieving animal with id " + req.params.id });
    }
}

// Handle updating an animal
async function updateAnimal(req, res) {
    try {
        await Animal.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/all-animals'); 
    } catch (error) {
        console.error("Error with updating animal: ", error);
        res.status(500).send({ message: "Error updating animal with id " + req.params.id });
    }
}

// Handle deleting an animal
async function deleteAnimal(req, res) {
    try {
        await Animal.findByIdAndRemove(req.params.id);
        res.redirect('/all-animals'); 
    } catch (error) {
        console.error("Error with deleting animal: ", error);
        res.status(500).send({ message: "Could not delete animal with id " + req.params.id });
    }
}

module.exports = {
    showHomePage,
    showAllAnimals,
    showCreateAnimalForm,
    createAnimal,
    EditAnimalForm,
    updateAnimal,
    deleteAnimal
};