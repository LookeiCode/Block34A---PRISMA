const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/new', async (req, res) => {
    try {
        const {title, content, authorId} = req.body;
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                author: {
                    connect: {id: parseInt(authorId)}
                }
            }
        })
        return res.json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Something went wrong'});
    }
});

// You'll notice that we're using a bunch of objects. Not important, but just so you know what you're working with
// Each column is also considered a "field" - like you there's fields to input information/values

// L8 connects whatever you write in the body in Postman to the columns specified
// L9 creates a new post table (with the data from L8)
// L13-14 basically allows you to specify which author is related to the new post you make
// L14 We also want to make sure we do a PARSEINT on the authorId so it returns as an integer, otherwise PostgreSQL will return it as a string (it "stringifys" things by default)

module.exports = router;