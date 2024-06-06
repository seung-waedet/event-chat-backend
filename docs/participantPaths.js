// docs/participantPaths.js

/**
 * @swagger
 * tags:
 *   name: Participants
 *   description: Participant management
 */

/**
 * @swagger
 * /api/participants:
 *   get:
 *     summary: Get all participants
 *     tags: [Participants]
 *     security:
 *      - jwtAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved participants
 *       500:
 *         description: Error fetching participants
 */

/**
 * @swagger
 * /api/participants/{id}:
 *   get:
 *     summary: Get a participant by ID
 *     tags: [Participants]
 *     security:
 *      - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The participant ID
 *     responses:
 *       200:
 *         description: Successfully retrieved participant
 *       404:
 *         description: Participant not found
 *       500:
 *         description: Error fetching participant
 */

/**
 * @swagger
 * /api/participants:
 *   post:
 *     summary: Create a new participant
 *     tags: [Participants]
 *     security:
 *      - jwtAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Participant'
 *     responses:
 *       201:
 *         description: Participant created successfully
 *       500:
 *         description: Error creating participant
 */

/**
 * @swagger
 * /api/participants/{id}:
 *   patch:
 *     summary: Update a participant by ID
 *     tags: [Participants]
 *     security:
 *      - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The participant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateParticipant'
 *     responses:
 *       200:
 *         description: Participant updated successfully
 *       404:
 *         description: Participant not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/participants/{id}:
 *   delete:
 *     summary: Delete a participant by ID
 *     tags: [Participants]
 *     security:
 *      - jwtAuth: []
 *     parameters:
 *       - in: path
 *         name: ids
 *         schema:
 *           type: string
 *         required: true
 *         description: The participant ID
 *     responses:
 *       200:
 *         description: Participant deleted successfully
 *       404:
 *         description: Participant not found
 *       500:
 *         description: Error deleting participant
 */
