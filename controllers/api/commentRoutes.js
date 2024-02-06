const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({})
        res.json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', withAuth, async (req, res) => {
        try {
            const CommentData = await Comment.findOne({
            where: {
                user_id: req.params.id,
            },
        });

        res.json(CommentData);
    }
        catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.post('/:blog_id', withAuth, async (req, res) => {
    console.log('Received Post');
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required for a comment.' });
        }

        const newComment = await Comment.create({
            title,
            content,
            blog_id: req.params.blog_id,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        console.error(err);
        res.status(400).json(err);
    }
});


router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedComment = await Comment.update({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(updatedComment);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No Comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
