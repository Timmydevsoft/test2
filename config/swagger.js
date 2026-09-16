export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Express Auth & Posts API",
    version: "1.0.0",
    description: "API documentation for User authentication, profile management, and posts."
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local server"
    }
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter your JWT token in the format: Bearer <token>"
      },
      CookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "accessToken",
        description: "Access token stored in HTTP-only cookie"
      }
    },
    schemas: {
      LoginInput: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "user@example.com"
          },
          password: {
            type: "string",
            format: "password",
            example: "secretPassword123"
          }
        }
      },
      CreateUserInput: {
        type: "object",
        required: ["username", "email", "password"],
        properties: {
          username: {
            type: "string",
            example: "johndoe"
          },
          email: {
            type: "string",
            format: "email",
            example: "johndoe@example.com"
          },
          password: {
            type: "string",
            format: "password",
            example: "secretPassword123"
          }
        }
      },
      UpdateUserInput: {
        type: "object",
        properties: {
          username: {
            type: "string",
            example: "johndoe_updated"
          },
          email: {
            type: "string",
            format: "email",
            example: "johndoe_updated@example.com"
          },
          password: {
            type: "string",
            format: "password",
            example: "newPassword123"
          }
        }
      },
      UserResponse: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "650000000000000000000001"
          },
          username: {
            type: "string",
            example: "johndoe"
          },
          email: {
            type: "string",
            example: "johndoe@example.com"
          },
          createdAt: {
            type: "string",
            format: "date-time"
          },
          updatedAt: {
            type: "string",
            format: "date-time"
          }
        }
      },
      AuthResponse: {
        type: "object",
        properties: {
          token: {
            type: "string",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          },
          _id: {
            type: "string",
            example: "650000000000000000000001"
          },
          username: {
            type: "string",
            example: "johndoe"
          },
          email: {
            type: "string",
            example: "johndoe@example.com"
          }
        }
      },
      CreatePostInput: {
        type: "object",
        required: ["title", "body"],
        properties: {
          title: {
            type: "string",
            example: "My First Post"
          },
          body: {
            type: "string",
            example: "This is the body content of my post."
          }
        }
      },
      UpdatePostInput: {
        type: "object",
        properties: {
          title: {
            type: "string",
            example: "Updated Title"
          },
          body: {
            type: "string",
            example: "Updated body content."
          }
        }
      },
      PostResponse: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "650000000000000000000002"
          },
          title: {
            type: "string",
            example: "My First Post"
          },
          body: {
            type: "string",
            example: "This is the body content of my post."
          },
          userId: {
            type: "string",
            example: "650000000000000000000001"
          },
          createdAt: {
            type: "string",
            format: "date-time"
          },
          updatedAt: {
            type: "string",
            format: "date-time"
          }
        }
      },
      ErrorResponse: {
        type: "object",
        properties: {
          successfull: {
            type: "boolean",
            example: false
          },
          statusCode: {
            type: "integer",
            example: 400
          },
          message: {
            type: "string",
            example: "Error message details"
          }
        }
      }
    }
  },
  paths: {
    "/api/signin": {
      post: {
        tags: ["Auth"],
        summary: "Sign in a user",
        description: "Validates credentials, returns an auth token, and sets an HTTP-only accessToken cookie.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginInput"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Successful login",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AuthResponse"
                }
              }
            }
          },
          "401": {
            description: "Invalid password",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "403": {
            description: "Email or password cannot be empty",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "404": {
            description: "User not found",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/user": {
      post: {
        tags: ["Users"],
        summary: "Create a user account",
        description: "Registers a new user.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateUserInput"
              }
            }
          }
        },
        responses: {
          "201": {
            description: "User account created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "string",
                  example: "User account creacted succesfully"
                }
              }
            }
          },
          "400": {
            description: "Email is already taken",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "email is already taken"
                    }
                  }
                }
              }
            }
          },
          "401": {
            description: "Required fields missing",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },
    "/api/user/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get user profile by ID",
        description: "Fetches user details by ID. Only the authenticated user can access their own details.",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "MongoDB ObjectId of the user",
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          "200": {
            description: "User details retrieved",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/UserResponse"
                }
              }
            }
          },
          "401": {
            description: "Unauthorized or attempting to view another user's details",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "403": {
            description: "No such user",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "No such user"
                    }
                  }
                }
              }
            }
          }
        }
      },
      put: {
        tags: ["Users"],
        summary: "Update user account by ID",
        description: "Updates user account fields. Only the authenticated user can update their own account.",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "MongoDB ObjectId of the user",
            schema: {
              type: "string"
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateUserInput"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "User updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "User updated sucessful"
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "No such user",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      },
      delete: {
        tags: ["Users"],
        summary: "Delete user account by ID",
        description: "Deletes a user account. Only the authenticated user can delete their own account.",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "MongoDB ObjectId of the user",
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          "200": {
            description: "Account deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Account deleted successfully"
                    }
                  }
                }
              }
            }
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "403": {
            description: "No such user",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "No such user"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/post": {
      post: {
        tags: ["Posts"],
        summary: "Create a new post",
        description: "Creates a new post authored by the authenticated user.",
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreatePostInput"
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Post created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "string",
                  example: "post creacted succesfully"
                }
              }
            }
          },
          "401": {
            description: "Title or body missing, or unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      },
      get: {
        tags: ["Posts"],
        summary: "Get all posts for authenticated user",
        description: "Fetches all posts created by the currently authenticated user.",
        security: [{ BearerAuth: [] }],
        responses: {
          "200": {
            description: "List of user posts",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/PostResponse"
                  }
                }
              }
            }
          },
          "401": {
            description: "User does not have a post, or unauthorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "user does not have a post"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/post/{id}": {
      get: {
        tags: ["Posts"],
        summary: "Get post by ID",
        description: "Fetches a single post by ID. Users can only fetch posts they authored.",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "MongoDB ObjectId of the post",
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          "200": {
            description: "Post retrieved successfully",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/PostResponse"
                }
              }
            }
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "403": {
            description: "Post not found or unauthorized to view another user's post",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "No such post"
                    }
                  }
                }
              }
            }
          }
        }
      },
      put: {
        tags: ["Posts"],
        summary: "Update post by ID",
        description: "Updates a post title or body. Users can only update their own posts.",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "MongoDB ObjectId of the post",
            schema: {
              type: "string"
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdatePostInput"
              }
            }
          }
        },
        responses: {
          "200": {
            description: "Post updated successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "successful"
                    }
                  }
                }
              }
            }
          },
          "401": {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          },
          "403": {
            description: "No such post or can only update own post",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      },
      delete: {
        tags: ["Posts"],
        summary: "Delete post by ID",
        description: "Deletes a post by ID. Users can only delete their own posts.",
        security: [{ BearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "MongoDB ObjectId of the post",
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          "200": {
            description: "Post deleted successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "Deleted successfully"
                    }
                  }
                }
              }
            }
          },
          "400": {
            description: "No such post",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                      example: "No such post"
                    }
                  }
                }
              }
            }
          },
          "401": {
            description: "Unauthorized or can only delete own post",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    }
  }
};
