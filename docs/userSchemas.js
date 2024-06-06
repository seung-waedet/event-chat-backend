// docs/userSchemas.js

/**
 * @swagger
 * components:
 *   securitySchemes:
 *    jwtAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT  
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - displayName
 *         - email
 *         - password
 *         - bio
 *         - userType
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         displayName:
 *           type: string
 *           description: The user's display name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         displayImage:
 *           type: string
 *           description: The user's display image
 *         bio:
 *           type: string
 *           description: The user's bio
 *         userType:
 *           type: string
 *           enum: [admin, speaker, attendee]
 *           description: The type of user
 *       example:
 *         id: d5fE_asz
 *         displayName: John Doe
 *         email: johndoe@example.com
 *         password: password123
 *         displayImage: http://example.com/image.jpg
 *         bio: Software Engineer
 *         userType: attendee
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *       example:
 *         email: johndoe@example.com
 *         password: password123
 */
