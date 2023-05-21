var express = require('express');
var router = express.Router();
var authController = require('./auth.controller');
var authSchema = require('./auth.schema');

/**
 * @swagger
 *  /auth/login:
 *    post:
 *      summary: Login user
 *      tags: [Auth]
 *      responses:
 *        "200":
 *          description: User logged in successfully.
 *          content:
 *            application/json:
 *             schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      required: true
 *                  password:
 *                      type: string
 *                      required: true
 *        "400":
 *          description: Bad request
 *        "401":
 *          description: Unauthorized user
 *        "403":
 *          description: Authentication failed
 */

router.post('/login', authController.login);

/**
 * @swagger
 *  /auth/signup:
 *    post:
 *      summary: Creates new user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      required: true
 *                  email:
 *                      type: string
 *                      required: true
 *                  password:
 *                      type: string
 *                      required: true
 *                  
 *      responses:
 *        "200":
 *          description: User successfully signed up.
 *        "401":
 *          description: Unauthorized request.
 *        "403":
 *          description: Access denied.
 *        "409":
 *          description: Email exists.
 */
router.post('/signup', authSchema.createUser, authController.signup);



module.exports = router;