// docs/participantPaths.js

/**
 * @swagger
 * tags:
 *   name: Participants
 *   description: Participant management
 */

/**
 * @swagger
 * /participants:
 *   get:
 *     summary: Get all participants
 *     tags: [Participants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved participants
 *       500:
 *         description: Error fetching participants
 */

/**
 * @swagger
 * /participants/{id}:
 *   get:
 *     summary: Get a participant by ID
 *     tags: [Participants]
 *     security:
 *       - bearerAuth: []
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
 * /participants:
 *   post:
 *     summary: Create a new participant
 *     tags: [Participants]
 *     security:
 *       - bearerAuth: []
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
 * /participants/{id}:
 *   patch:
 *     summary: Update a participant by ID
 *     tags: [Participants]
 *     security:
 *       - bearerAuth: []
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
 * /participants/{id}:
 *   delete:
 *     summary: Delete a participant by ID
 *     tags: [Participants]
 *     security:
 *       - bearerAuth: []
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
