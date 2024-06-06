// docs/eventSchemas.js

/**
 * @swagger
 * components:
 *   securitySchemes:
 *    jwtAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT  
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - code
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the event
 *         name:
 *           type: string
 *           description: The name of the event
 *         description:
 *           type: string
 *           description: The description of the event
 *         isLive:
 *           type: boolean
 *           description: Indicates if the event is live
 *         createdBy:
 *           type: string
 *           description: The ID of the user who created the event
 *         code:
 *           type: string
 *           description: The unique code for the event
 *         speakers:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 description: The type of participant
 *               isHost:
 *                 type: boolean
 *                 description: Indicates if the participant is a host
 *               userId:
 *                 type: string
 *                 description: The ID of the user
 *       example:
 *         id: d5fE_asz
 *         name: Annual Tech Conference
 *         description: A conference about the latest in technology.
 *         isLive: true
 *         createdBy: 60d0fe4f5311236168a109ca
 *         code: ATC2021
 *         speakers:
 *           - type: speaker
 *             isHost: true
 *             userId: 60d0fe4f5311236168a109ca
 *     JoinEventRegistered:
 *       type: object
 *       required:
 *         - code
 *         - userId
 *       properties:
 *         code:
 *           type: string
 *           description: The event code
 *         userId:
 *           type: string
 *           description: The ID of the registered user
 *       example:
 *         code: ATC2021
 *         userId: 60d0fe4f5311236168a109ca
 *     JoinEventUnregistered:
 *       type: object
 *       required:
 *         - code
 *         - displayName
 *         - isAnon
 *       properties:
 *         code:
 *           type: string
 *           description: The event code
 *         displayName:
 *           type: string
 *           description: The display name of the unregistered user
 *         isAnon:
 *           type: boolean
 *           description: Indicates if the user is anonymous
 *       example:
 *         code: ATC2021
 *         displayName: John Doe
 *         isAnon: true
 */
