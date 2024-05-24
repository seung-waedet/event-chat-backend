// docs/eventPaths.js

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management and participation
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved events
 *       500:
 *         description: Error fetching events
 */

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Successfully retrieved event
 *       404:
 *         description: Event not found
 *       500:
 *         description: Error fetching event
 */

/**
 * @swagger
 * /join-event-registered:
 *   post:
 *     summary: Join an event as a registered user
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JoinEventRegistered'
 *     responses:
 *       201:
 *         description: User added as participant
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /join-event-unregistered:
 *   post:
 *     summary: Join an event as an unregistered user
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JoinEventUnregistered'
 *     responses:
 *       201:
 *         description: Participant added
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created successfully
 *       500:
 *         description: Error creating event
 */

/**
 * @swagger
 * /events/{id}:
 *   patch:
 *     summary: Update an event by ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Events]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Error deleting event
 */
