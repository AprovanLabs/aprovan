import type { ToolRuntimeMetadataMap } from "../client.js";

export const toolMetadata = {
  "updatePet": {
    "accessPath": [
      "updatePet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "name",
      "category",
      "photoUrls",
      "tags",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v3/pet",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update an existing pet."
  },
  "addPet": {
    "accessPath": [
      "addPet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "name",
      "category",
      "photoUrls",
      "tags",
      "status"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v3/pet",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Add a new pet to the store."
  },
  "findPetsByStatus": {
    "accessPath": [
      "findPetsByStatus"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v3/pet/findByStatus",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "status"
    ],
    "description": "Finds Pets by status.",
    "parameterDescriptions": {
      "status": "Status values that need to be considered for filter"
    }
  },
  "findPetsByTags": {
    "accessPath": [
      "findPetsByTags"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v3/pet/findByTags",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "tags"
    ],
    "description": "Finds Pets by tags.",
    "parameterDescriptions": {
      "tags": "Tags to filter by"
    }
  },
  "getPetById": {
    "accessPath": [
      "getPetById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v3/pet/{petId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "petId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Find pet by ID.",
    "parameterDescriptions": {
      "petId": "ID of pet to return"
    }
  },
  "updatePetWithForm": {
    "accessPath": [
      "updatePetWithForm"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v3/pet/{petId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "petId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "name",
      "status"
    ],
    "description": "Updates a pet in the store with form data.",
    "parameterDescriptions": {
      "petId": "ID of pet that needs to be updated",
      "name": "Name of pet that needs to be updated",
      "status": "Status of pet that needs to be updated"
    }
  },
  "deletePet": {
    "accessPath": [
      "deletePet"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [
      "api_key"
    ],
    "method": "DELETE",
    "routeTemplate": "/api/v3/pet/{petId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "petId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Deletes a pet.",
    "parameterDescriptions": {
      "petId": "Pet id to delete"
    }
  },
  "uploadFile": {
    "accessPath": [
      "uploadFile"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v3/pet/{petId}/uploadImage",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "petId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "additionalMetadata"
    ],
    "description": "Uploads an image.",
    "parameterDescriptions": {
      "petId": "ID of pet to update",
      "additionalMetadata": "Additional Metadata"
    }
  },
  "getInventory": {
    "accessPath": [
      "getInventory"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v3/store/inventory",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Returns pet inventories by status."
  },
  "placeOrder": {
    "accessPath": [
      "placeOrder"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "petId",
      "quantity",
      "shipDate",
      "status",
      "complete"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v3/store/order",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Place an order for a pet."
  },
  "getOrderById": {
    "accessPath": [
      "getOrderById"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v3/store/order/{orderId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "orderId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Find purchase order by ID.",
    "parameterDescriptions": {
      "orderId": "ID of order that needs to be fetched"
    }
  },
  "deleteOrder": {
    "accessPath": [
      "deleteOrder"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v3/store/order/{orderId}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "orderId"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete purchase order by identifier.",
    "parameterDescriptions": {
      "orderId": "ID of the order that needs to be deleted"
    }
  },
  "createUser": {
    "accessPath": [
      "createUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "username",
      "firstName",
      "lastName",
      "email",
      "password",
      "phone",
      "userStatus"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v3/user",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Create user."
  },
  "createUsersWithListInput": {
    "accessPath": [
      "createUsersWithListInput"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "raw",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "POST",
    "routeTemplate": "/api/v3/user/createWithList",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Creates list of users with given input array."
  },
  "loginUser": {
    "accessPath": [
      "loginUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v3/user/login",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [
      "username",
      "password"
    ],
    "description": "Logs user into the system.",
    "parameterDescriptions": {
      "username": "The user name for login",
      "password": "The password for login in clear text"
    }
  },
  "logoutUser": {
    "accessPath": [
      "logoutUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v3/user/logout",
    "pathConflictKeys": [],
    "pathParameterKeys": [],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Logs out current logged in user session."
  },
  "getUserByName": {
    "accessPath": [
      "getUserByName"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "GET",
    "routeTemplate": "/api/v3/user/{username}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "username"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Get user by user name.",
    "parameterDescriptions": {
      "username": "The name that needs to be fetched. Use user1 for testing"
    }
  },
  "updateUser": {
    "accessPath": [
      "updateUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "properties",
    "bodyPropertyKeys": [
      "id",
      "username",
      "firstName",
      "lastName",
      "email",
      "password",
      "phone",
      "userStatus"
    ],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "PUT",
    "routeTemplate": "/api/v3/user/{username}",
    "pathConflictKeys": [
      "username"
    ],
    "pathParameterKeys": [
      "username"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Update user resource.",
    "parameterDescriptions": {
      "username": "name that need to be deleted"
    }
  },
  "deleteUser": {
    "accessPath": [
      "deleteUser"
    ],
    "bodyAllowsAdditionalProperties": false,
    "bodyKind": "none",
    "bodyPropertyKeys": [],
    "contentType": "application/json",
    "headerParameterKeys": [],
    "method": "DELETE",
    "routeTemplate": "/api/v3/user/{username}",
    "pathConflictKeys": [],
    "pathParameterKeys": [
      "username"
    ],
    "queryConflictKeys": [],
    "queryParameterKeys": [],
    "description": "Delete user resource.",
    "parameterDescriptions": {
      "username": "The name that needs to be deleted"
    }
  }
} satisfies ToolRuntimeMetadataMap;
