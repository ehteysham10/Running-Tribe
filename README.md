# Running Tribe

Running Tribe is a full-stack running app where users can track runs, join events, create posts, chat with others, and manage memberships.

## Features
- User authentication (Email/Password + Google OAuth)
- Create and join running events
- Track and save running routes
- Social features: posts, comments, and likes
- Real-time chat with Socket.IO
- Stripe payments for premium membership
- Notifications using Firebase
- Admin and membership middleware for role-based access

## Tech Stack
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: Passport.js (local + Google OAuth)
- Real-time: Socket.IO
- Payments: Stripe API
- Notifications: Firebase Admin
- Testing: Jest



```
running-tribe
├─ package-lock.json
├─ package.json
├─ README.md
└─ src
   ├─ config
   │  ├─ db.js
   │  ├─ firebaseAdmin.js
   │  └─ passportGoogle.js
   ├─ controllers
   │  ├─ authController.js
   │  ├─ eventController.js
   │  ├─ googleController.js
   │  ├─ messageController.js
   │  ├─ paymentController.js
   │  ├─ postController.js
   │  ├─ routeController.js
   │  ├─ runController.js
   │  └─ userController.js
   ├─ middleware
   │  ├─ admin.js
   │  ├─ auth.js
   │  ├─ membership.js
   │  └─ upload.js
   ├─ models
   │  ├─ Event.js
   │  ├─ Message.js
   │  ├─ Post.js
   │  ├─ Route.js
   │  ├─ Run.js
   │  └─ User.js
   ├─ routes
   │  ├─ authRoutes.js
   │  ├─ eventsRoutes.js
   │  ├─ googleRoutes.js
   │  ├─ messageRoutes.js
   │  ├─ paymentRoutes.js
   │  ├─ postsRoutes.js
   │  ├─ routesRoutes.js
   │  ├─ runsRoutes.js
   │  └─ userRoutes.js
   ├─ server.js
   ├─ services
   │  ├─ emailService.js
   │  ├─ notificationService.js
   │  ├─ paymentService.js
   │  └─ tokenService.js
   ├─ socket
   │  └─ chatSocket.js
   ├─ tests
   │  ├─ notificationTest.js
   │  ├─ socketEventGroupTest.js
   │  └─ socketTest.js
   └─ utils
      ├─ passwordValidator.js
      ├─ Scheduler.js
      └─ seedRoutes.js

```
```
running-tribe
├─ package-lock.json
├─ package.json
├─ README.md
└─ src
   ├─ config
   │  ├─ db.js
   │  ├─ firebaseAdmin.js
   │  └─ passportGoogle.js
   ├─ constants
   │  └─ membershipConstant.js
   ├─ controllers
   │  ├─ authController.js
   │  ├─ eventController.js
   │  ├─ googleController.js
   │  ├─ messageController.js
   │  ├─ paymentController.js
   │  ├─ postController.js
   │  ├─ routeController.js
   │  ├─ runController.js
   │  └─ userController.js
   ├─ middleware
   │  ├─ admin.js
   │  ├─ auth.js
   │  ├─ membership.js
   │  └─ upload.js
   ├─ models
   │  ├─ Event.js
   │  ├─ Message.js
   │  ├─ Post.js
   │  ├─ Route.js
   │  ├─ Run.js
   │  └─ User.js
   ├─ routes
   │  ├─ authRoutes.js
   │  ├─ eventsRoutes.js
   │  ├─ googleRoutes.js
   │  ├─ messageRoutes.js
   │  ├─ paymentRoutes.js
   │  ├─ postsRoutes.js
   │  ├─ routesRoutes.js
   │  ├─ runsRoutes.js
   │  └─ userRoutes.js
   ├─ server.js
   ├─ services
   │  ├─ emailService.js
   │  ├─ notificationService.js
   │  ├─ paymentService.js
   │  └─ tokenService.js
   ├─ socket
   │  └─ chatSocket.js
   ├─ tests
   │  ├─ notificationTest.js
   │  ├─ socketEventGroupTest.js
   │  └─ socketTest.js
   └─ utils
      ├─ passwordValidator.js
      ├─ Scheduler.js
      └─ seedRoutes.js

```
```
running-tribe
├─ package-lock.json
├─ package.json
├─ README.md
└─ src
   ├─ config
   │  ├─ db.js
   │  ├─ firebaseAdmin.js
   │  └─ passportGoogle.js
   ├─ constants
   │  └─ membershipConstant.js
   ├─ controllers
   │  ├─ authController.js
   │  ├─ eventController.js
   │  ├─ googleController.js
   │  ├─ messageController.js
   │  ├─ paymentController.js
   │  ├─ postController.js
   │  ├─ routeController.js
   │  ├─ runController.js
   │  └─ userController.js
   ├─ middleware
   │  ├─ admin.js
   │  ├─ auth.js
   │  ├─ membership.js
   │  └─ upload.js
   ├─ models
   │  ├─ Event.js
   │  ├─ Message.js
   │  ├─ Post.js
   │  ├─ Route.js
   │  ├─ Run.js
   │  └─ User.js
   ├─ routes
   │  ├─ authRoutes.js
   │  ├─ eventsRoutes.js
   │  ├─ googleRoutes.js
   │  ├─ messageRoutes.js
   │  ├─ paymentRoutes.js
   │  ├─ postsRoutes.js
   │  ├─ routesRoutes.js
   │  ├─ runsRoutes.js
   │  └─ userRoutes.js
   ├─ server.js
   ├─ services
   │  ├─ emailService.js
   │  ├─ notificationService.js
   │  ├─ paymentService.js
   │  └─ tokenService.js
   ├─ socket
   │  └─ chatSocket.js
   ├─ tests
   │  ├─ notificationTest.js
   │  ├─ socketEventGroupTest.js
   │  └─ socketTest.js
   └─ utils
      ├─ passwordValidator.js
      ├─ Scheduler.js
      └─ seedRoutes.js

```