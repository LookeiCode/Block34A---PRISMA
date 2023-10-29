const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// SEE ALL THE AUTHORS
router.get('/', async (req, res) => {

    try {
        const authors = await prisma.author.findMany()
        res.json(authors);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Something went wrong finding authors'});
    }
})



// CREATE A NEW AUTHOR
router.post('/new', async (req, res) => {

    try {
        const { name, email } = req.body;
        const newAuthor = await prisma.author.create({
            data: {
                name,
                email
            }
        })
        res.json(newAuthor);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Something went wrong creating a new author'});
    }
})



// CREATE A NEW AUTHOR + A NEW POST
router.post('/newPost', async (req, res) => {

    try {
        const { name, email } = req.body;
        const newAuthor = await prisma.author.create({
            data: {
                posts: {
                    create: {
                        title: "Hello world",
                        content: "Some stuff"
                    },
                },
                name,
                email
            }
        })
        res.json(newAuthor);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Something went wrong creating a new author'});
    }
})



// DELETE AN AUTHORS
router.delete('/:id', async (req, res) => {

    try {
        const authorId = req.params.id
        await prisma.author.delete({
            where: {
                id: parseInt(authorId)
            }
        });
        return res.json({message: 'Author deleted'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Something went wrong deleting an author'});
    }
})

module.exports = router;