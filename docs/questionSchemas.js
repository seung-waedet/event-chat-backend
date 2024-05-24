// docs/questionSchemas.js

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       required:
 *         - content
 *         - eventId
 *         - participantId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the question
 *         content:
 *           type: string
 *           description: The content of the question
 *         assignedTo:
 *           type: string
 *           description: The ID of the user to whom the question is assigned
 *         isAnswered:
 *           type: boolean
 *           description: Indicates if the question has been answered
 *         eventId:
 *           type: string
 *           description: The ID of the event the question is associated with
 *         participantId:
 *           type: string
 *           description: The ID of the participant who asked the question
 *       example:
 *         id: d5fE_asz
 *         content: What is the schedule for the event?
 *         assignedTo: 60d0fe4f5311236168a109ca
 *         isAnswered: false
 *         eventId: 60d0fe4f5311236168a109ca
 *         participantId: 60d0fe4f5311236168a109cb
 *     AskQuestion:
 *       type: object
 *       required:
 *         - content
 *         - eventId
 *         - participantId
 *       properties:
 *         content:
 *           type: string
 *           description: The content of the question
 *         assignedTo:
 *           type: string
 *           description: The ID of the user to whom the question is assigned (optional)
 *         eventId:
 *           type: string
 *           description: The ID of the event the question is associated with
 *         participantId:
 *           type: string
 *           description: The ID of the participant who asked the question
 *       example:
 *         content: What is the schedule for the event?
 *         assignedTo: 60d0fe4f5311236168a109ca
 *         eventId: 60d0fe4f5311236168a109ca
 *         participantId: 60d0fe4f5311236168a109cb
 *     UpdateQuestion:
 *       type: object
 *       properties:
 *         content:
 *           type: string
 *           description: The content of the question
 *         assignedTo:
 *           type: string
 *           description: The ID of the user to whom the question is assigned
 *         isAnswered:
 *           type: boolean
 *           description: Indicates if the question has been answered
 *       example:
 *         content: Updated question content
 *         assignedTo: 60d0fe4f5311236168a109ca
 *         isAnswered: true
 */
