const express = require('express');
const router = express.Router();
const todoController = require('./todo.controller');
const { validateTodoBody, validateUserId, validateTaskId } = require('./todo.schema');

/**
 * @swagger
 *  /todo/{userId}:
 *    get:
 *      summary: Get all todo tasks of a user
 *      tags: [Todo]
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - in: path
 *          name: userId
 *          type: string
 *      responses:
 *        "200":
 *          description: Successfully retrieved all todo tasks. 
 *        "401":
 *          description: Unauthorized user.
 *        "403":
 *          description: Access denied.
 *        "404":
 *          description: 
 */
router.get('/:userId', validateUserId, todoController.getTasks);

/**
 * @swagger
 * /todo/{userId}:
 *   post:
 *    summary: Creates new todo task
 *    tags: [Todo]
 *    security:
 *      - ApiKeyAuth: []
 *    parameters:
 *        - in: path
 *          name: userId
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                title:
 *                    type: string
 *                    required: true
 *                status:
 *                    type: boolean
 *                    required: false
 *    responses:
 *      "200":
 *        description: Successfully created a new todo task.
 *      "401":
 *        description: Unauthorized request.
 *      "403":
 *        description: Access denied.
 *      "409":
 *        description: Name exists.
 */
router.post('/:userId', validateUserId, validateTodoBody, todoController.createTask);

/**
 * @swagger
 *  /todo/{userId}/{taskId}:
 *    put:
 *      summary: Updates todo
 *      tags: [Todo]
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - in: path
 *          name: userId
 *          type: string
 *        - in: path
 *          name: taskId
 *          type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                    type: string
 *                    required: true
 *                status:
 *                    type: boolean
 *                    required: false
 *      responses:
 *        "200":
 *          description: Updated task.
 *        "401":
 *          description: Unauthorized request.
 *        "403":
 *          description: Access denied.
 */
router.put('/:userId/:taskId', validateUserId, validateTaskId, validateTodoBody, todoController.updateTask);

/**
 * @swagger
 *  /todo/{userId}/{taskId}:
 *    delete:
 *      summary: Delete task
 *      tags: [Todo]
 *      security:
 *        - ApiKeyAuth: []
 *      parameters:
 *        - in: path
 *          name: userId
 *          type: string
 *        - in: path
 *          name: taskId
 *          type: string
 *      responses:
 *        "200":
 *          description: Successfully deleted task.
 *        "401":
 *          description: Unauthorized request.
 *        "403":
 *          description: Access denied.
 *        "404":
 *          description: Not found.
 *        "400":
 *          description: Bad Request
 */
router.delete('/:userId/:taskId', validateUserId, validateTaskId, todoController.deleteTask);

/**
 * @swagger
 * tags:
 *   name: Todo
 *   components:
 *     schemas:
 *       Todo:
 *         type: object
 *         description: 
 *         properties:
 *           id:
 *             type: number
 *             description: identifier
 *             readOnly: true
 *           title:
 *             type: string
 *             description: task description
 *           status:
 *             type: boolean
 *             description: task status
 *           UserId:
 *             type: number
 *             description: Foreing key to Userfk 
 */


module.exports = router;