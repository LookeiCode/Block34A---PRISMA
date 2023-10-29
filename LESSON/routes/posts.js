const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET ALL POSTS + JOIN AUTHOR (TABLE) ASSOCIATED TO THAT POST
router.get('/', async (req, res) => {

    try {
        const blogPosts = await prisma.post.findMany({
            include: {
                author: true
            }
        })
        res.json(blogPosts);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Something went wrong getting blog posts'});
    }
})

// L10-14 basically joins the author table into the posts table when you make a get request
// Returns all the posts that exist + if you include (L11) "author: true" it'll bring information about the author of that post in the request
// If you got rid of L11-L13 it would just be a normal GET request

// Notice how on L10 it has prisma.POST - that's how it's referencing the post table + findMany is finding all the posts associated with the post table



// GET POST BY ID - (CAN'T GET IT TO WORK IDK)
// router.get('/:id', async (req, res) => {

//     try {
//         const postId = parseInt(req.params.id);
//         const blogPosts = await prisma.post.findMany({
//             where: {
//                 post: {
//                     id: postId
//                 }
//             }
//         });

//        return res.json(blogPosts);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({error: 'Something went wrong getting blog post by ID'});
//     }
// })



// GET POST BY AUTHOR NAME
router.get('/byAuthor/:authorName', async (req, res) => {

    try {
        const authorName = req.params.authorName;
        const blogPosts = await prisma.post.findMany({
            where: {
                author: {
                    name: authorName
                }
            }
        });
        return res.json(blogPosts);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Something went wrong getting author blog posts'});
    }
})



// CREATE A NEW POST
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
        res.status(500).json({error: 'Something went wrong making a post'});
    }
});

// You'll notice that we're using a bunch of objects. Not important, but just so you know what you're working with
// Each column is also considered a "field" - like there's fields to input information/values

// L77 connects whatever you write in the body in Postman to the columns specified
// L78 creates a new post table (with the data from L8)
// L82-83 basically allows you to specify which author is related to the new post you make
// L83 We also want to make sure we do a PARSEINT on the authorId so it returns as an integer, otherwise PostgreSQL will return it as a string (it "stringifys" things by default)



// UPDATE AN EXISTING POST
router.put('/:id', async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const { title, content } = req.body;

        const updatePost = await prisma.post.update({
            where: {id: parseInt(postId)},
            data: {
                title,
                content
            }
        });
       return  res.json(updatePost);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Something went wrong updating a post'});
    }
})



// DELETE A POST
router.delete('/:id', async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        await prisma.post.delete({
            where: {id: postId}
        })
        return res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Something went wrong deleting a post'});
    }
})



module.exports = router;