const Model = require("../../models/");
const Todo = Model.Todo;
const User = Model.User;

async function getTasks(req, res, next) {
    try {
        if (!req.params.userId || isNaN(req.params.userId))
            return res.status(400).json({ message: "Invalid ID" });

        let user = await User.findOne({
            where: {
                id: req.params.userId
            },
            returning: true,
            plain: true
        });

        if (!user)
            return res.status(404).json({ message: 'No user found with this id!' });

        let todos = await Todo.findAll({
            where: {
                UserId: req.params.userId
            }
        });

        // Added cache control headers to prevent browser from caching API response and returning old data with 304 status code
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        
        return res.status(200).json(todos);
    } catch (error) {
        next(error);
    }
};

async function createTask(req, res, next) {
    try {
        if (!req.params.userId || isNaN(req.params.userId))
            return res.status(400).json({ message: "Invalid ID" });

        let user = await User.findOne({
            where: {
                id: req.params.userId
            },
            returning: true,
            plain: true
        });

        if (!user)
            return res.status(404).json({ message: 'No user found with this id!' });

        const createdTodo = await Todo.create({
            title: req.body.title,
            status: req.body.status,
            UserId: req.params.userId
        });

        return res.status(201).json({ message: "New todo task successfully created!", data: createdTodo });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

async function updateTask(req, res, next) {
    try {
        if (!req.params.userId || isNaN(req.params.userId))
            return res.status(400).json({ message: "Invalid ID" });

        let todos = await Todo.findAll({
            where: {
                id: req.params.taskId
            },
            include: [{
                model: User,
                where: {
                    id: req.params.userId
                }
            }]
        });

        if (!todos || !todos.length)
            return res.status(404).json({ message: 'No user or task found with this id!' });

        let updatedTodo = await Todo.update(req.body, {
            where: {
                id: req.params.taskId,
                UserId: req.params.userId
            },
            returning: true,
            plain: true
        });

        return res.status(200).json({ message: "Task successfully updated!", data: updatedTodo });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

async function deleteTask(req, res, next) {
    try {
        if (!req.params.userId || isNaN(req.params.userId))
            return res.status(400).json({ message: "Invalid ID" });

        let task = await Todo.findAll({
            where: {
                id: req.params.taskId
            },
            include: [{
                model: User,
                where: {
                    id: req.params.userId
                }
            }]
        });
    
        if (!task || !task.length)
            return res.status(404).json({ message: 'No user or task found with this id!' });

        await Todo.destroy({
            where: {
                id: req.params.taskId,
                UserId: req.params.userId
            },
        });
        
        return res.status(200).json({ message: "Successfully deleted!"});
    } catch (error) {
        console.log(error);
        next(error);
    }
};


module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}