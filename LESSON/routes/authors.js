const express = require('express');
const router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', async (req, res) => {

    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Something went wrong getting blog posts'});
    }
})


router.post('/newAuthor', async (req, res) => {

    try {

    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Something went wrong getting blog posts'});
    }
})