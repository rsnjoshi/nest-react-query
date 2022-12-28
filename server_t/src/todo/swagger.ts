export default {
  getTask: {
    operation: {
      summary: 'Get request to get all tasks associated with a user',
    },
    response: {
      err_401: {
        status: 401,
        description: 'unauthorized',
      },
      err_400: {
        status: 400,
        description: 'Bad Request ["not valid"]',
      },
      task_200: {
        status: 201,
        description: 'Successfully received tasks',
        schema: {
          type: 'object',
          properties: {
            complete: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  delete: {
                    type: 'boolean',
                    example: false,
                  },
                  description: {
                    type: 'string',
                    example: 'I will try to be good human',
                  },
                  fileLocation: {
                    type: 'string',
                    example: 'file://xyz/skdfjks.jpg',
                  },
                  id: {
                    type: 'integer',
                    example: 2,
                  },
                  status: {
                    type: 'string',
                    example: 'COMPLETE',
                  },
                  title: {
                    type: 'string',
                    example: 'Be Good Human',
                  },
                  userId: {
                    type: 'integer',
                    example: 1,
                  },
                },
              },
            },
            notStarted: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  delete: {
                    type: 'boolean',
                    example: false,
                  },
                  description: {
                    type: 'string',
                    example: 'I will try to be SUPERMAN',
                  },
                  fileLocation: {
                    type: 'string',
                    example: 'file://xyz/skdfjks.jpg',
                  },
                  id: {
                    type: 'integer',
                    example: 3,
                  },
                  status: {
                    type: 'string',
                    example: 'NOT_STARTED',
                  },
                  title: {
                    type: 'string',
                    example: 'Be SUPERMAN',
                  },
                  userId: {
                    type: 'integer',
                    example: 1,
                  },
                },
              },
            },
          },
        },
      },
    },
    param: {
      name: 'id',
      type: 'string',
      description: 'unique user id',
      required: true,
    },
    body: {
      schema: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            example: 'xyz@example.com',
            description: 'registered email address',
          },
          password: {
            type: 'string',
            example: '12$dfs&*?',
            description: 'registered password',
          },
        },
      },
    },
  },
  createTask: {
    operation: {
      summary: 'Post request to create a new task',
    },
    response: {
      err_401: {
        status: 401,
        description: 'unauthorized',
      },
      err_400: {
        status: 400,
        description: 'Bad Request ["not valid"]',
      },
      created_201: {
        status: 201,
        description: 'Successfully created task',
        schema: {
          type: 'object',
          properties: {
            delete: {
              type: 'boolean',
              example: false,
            },
            description: {
              type: 'string',
              example: 'I will try to be good human',
            },
            fileLocation: {
              type: 'string',
              example: 'file://xyz/skdfjks.jpg',
            },
            id: {
              type: 'integer',
              example: 2,
            },
            status: {
              type: 'string',
              example: 'COMPLETE',
            },
            title: {
              type: 'string',
              example: 'Be Good Human',
            },
            userId: {
              type: 'integer',
              example: 1,
            },
          },
        },
      },
    },
    body: {
      schema: {
        type: 'object',
        properties: {
          delete: {
            type: 'boolean',
            example: false,
          },
          description: {
            type: 'string',
            example: 'I will try to be good human',
          },
          fileLocation: {
            type: 'string',
            example: 'file://xyz/skdfjks.jpg',
          },
          id: {
            type: 'integer',
            example: 2,
          },
          status: {
            type: 'string',
            example: 'COMPLETE',
          },
          title: {
            type: 'string',
            example: 'Be Good Human',
          },
          userId: {
            type: 'integer',
            example: 1,
          },
        },
      },
    },
  },
  updateTask: {
    operation: {
      summary: 'Put request for task update',
    },
    body: {
      schema: {
        type: 'object',
        properties: {
          description: {
            type: 'string',
            example: 'I will try to be good human',
          },
          fileLocation: {
            type: 'string',
            example: 'file://xyz/skdfjks.jpg',
          },
          status: {
            type: 'string',
            example: 'COMPLETE',
          },
          title: {
            type: 'string',
            example: 'Be Good Human',
          },
        },
      },
    },
    response: {
      err_401: {
        status: 401,
        description: 'unauthorized',
      },
      err_400: {
        status: 400,
        description: 'Bad Request ["not valid"]',
      },
      updated_200: {
        status: 200,
        description: 'Successfully created task',
        schema: {
          type: 'object',
          properties: {
            delete: {
              type: 'boolean',
              example: false,
            },
            description: {
              type: 'string',
              example: 'I will try to be good human',
            },
            fileLocation: {
              type: 'string',
              example: 'file://xyz/skdfjks.jpg',
            },
            id: {
              type: 'integer',
              example: 2,
            },
            status: {
              type: 'string',
              example: 'COMPLETE',
            },
            title: {
              type: 'string',
              example: 'Be Good Human',
            },
            userId: {
              type: 'integer',
              example: 1,
            },
          },
        },
      },
    },
    param: {
      name: 'id',
      type: 'string',
      description: 'unique task id',
      required: true,
    },
  },
  deleteTask: {
    operation: {
      summary: 'Delete request for task delete',
    },
    response: {
      err_401: {
        status: 401,
        description: 'unauthorized',
      },
      err_400: {
        status: 400,
        description: 'Bad Request ["not valid"]',
      },
      deleted_200: {
        status: 200,
        description: 'Successfully created task',
        schema: {
          type: 'object',
          properties: {
            delete: {
              type: 'boolean',
              example: true,
            },
            description: {
              type: 'string',
              example: 'I will try to be good human',
            },
            fileLocation: {
              type: 'string',
              example: 'file://xyz/skdfjks.jpg',
            },
            id: {
              type: 'integer',
              example: 2,
            },
            status: {
              type: 'string',
              example: 'COMPLETE',
            },
            title: {
              type: 'string',
              example: 'Be Good Human',
            },
            userId: {
              type: 'integer',
              example: 1,
            },
          },
        },
      },
    },
    param: {
      name: 'id',
      type: 'string',
      description: 'unique task id',
      required: true,
    },
  },
};
