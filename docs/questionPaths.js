// docs/questionPaths.js

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Question management
 */

/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: Get all questions
 *     tags: [Questions]
 *     security:
 *      - jwtAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved questions
 *       500:
 *         description: Error fetching questions
 */

/**
 * @swagger
 * /api/questions/{id}:
 *   get:
 *     summary: Get a question by ID
 *     tags: [Questions]
 *     security:
 *      - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The question ID
 *     responses:
 *       200:
 *         description: Successfully retrieved question
 *       404:
 *         description: Question not found
 *       500:
 *         description: Error fetching question
 */

/**
 * @swagger
 * /api/questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: Question created successfully
 *       500:
 *         description: Error creating question
 */

/**
 * @swagger
 * /api/ask-questions:
 *   post:
 *     summary: Ask a question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AskQuestion'
 *     responses:
 *       201:
 *         description: Question asked successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/questions/{id}:
 *   patch:
 *     summary: Update a question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The question ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateQuestion'
 *     responses:
 *       200:
 *         description: Question updated successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/questions/{id}:
 *   delete:
 *     summary: Delete a question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The question ID
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Error deleting question
 */
