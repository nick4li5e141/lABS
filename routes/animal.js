const express = require('express');
const router = express.Router();
const animalController = require('../controllers/animalController');

// GET request to show the home page
router.get('/', animalController.showHomePage);

// GET request to list all animals
router.get('/animals/all-animals', animalController.showAllAnimals);

// GET request to display the form to add a new animal
router.get('/animals/entry-form', animalController.showCreateAnimalForm);

// POST request to add a new animal
router.post('/animals/add', animalController.createAnimal);

// GET request to display the form for editing an existing animal
router.get('/animals/edit/:id', animalController.EditAnimalForm);

// POST request to update an animal
router.post('/animals/update/:id', animalController.updateAnimal);

// POST request to delete an animal
router.post('/animals/delete/:id', animalController.deleteAnimal);

module.exports = router;
