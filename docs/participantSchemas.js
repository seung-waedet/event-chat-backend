// docs/participantSchemas.js

/**
 * @swagger
 * components:
 *   securitySchemes:
 *    jwtAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT  
 *   schemas:
 *     Participant:
 *       type: object
 *       required:
 *         - type
 *         - displayName
 *         - isHost
 *         - isAnon
 *         - eventId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the participant
 *         type:
 *           type: string
 *           description: The type of participant
 *         displayName:
 *           type: string
 *           description: The display name of the participant
 *         isHost:
 *           type: boolean
 *           description: Indicates if the participant is a host
 *         isAnon:
 *           type: boolean
 *           description: Indicates if the participant is anonymous
 *         eventId:
 *           type: string
 *           description: The ID of the event the participant is associated with
 *         userId:
 *           type: string
 *           description: The ID of the user (optional for unregistered users)
 *       example:
 *         id: d5fE_asz
 *         type: attendee
 *         displayName: John Doe
 *         isHost: false
 *         isAnon: true
 *         eventId: 60d0fe4f5311236168a109ca
 *         userId: 60d0fe4f5311236168a109ca
 *     UpdateParticipant:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *         displayName:
 *           type: string
 *         isHost:
 *           type: boolean
 *         isAnon:
 *           type: boolean
 *         eventId:
 *           type: string
 *         userId:
 *           type: string
 *       example:
 *         type: speaker
 *         displayName: Jane Doe
 *         isHost: true
 *         isAnon: false
 *         eventId: 60d0fe4f5311236168a109ca
 *         userId: 60d0fe4f5311236168a109ca
 */
