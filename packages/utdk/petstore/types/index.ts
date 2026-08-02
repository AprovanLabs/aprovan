import type { ApiResponse, Category, Order, Pet, Tag, User } from "./schemas.js";

export type PetstoreClient = {
  /**
   * Update an existing pet.
   */
  updatePet: (input: {
    id?: number;
    name: string;
    category?: Category;
    photoUrls: (string)[];
    tags?: (Tag)[];
    /** pet status in the store */
    status?: "available" | "pending" | "sold";
  }) => Promise<Pet>;

  /**
   * Add a new pet to the store.
   */
  addPet: (input: {
    id?: number;
    name: string;
    category?: Category;
    photoUrls: (string)[];
    tags?: (Tag)[];
    /** pet status in the store */
    status?: "available" | "pending" | "sold";
  }) => Promise<Pet>;

  /**
   * Finds Pets by status.
   */
  findPetsByStatus: (input: {
    /** Status values that need to be considered for filter */
    status: "available" | "pending" | "sold";
  }) => Promise<(Pet)[]>;

  /**
   * Finds Pets by tags.
   */
  findPetsByTags: (input: {
    /** Tags to filter by */
    tags: (string)[];
  }) => Promise<(Pet)[]>;

  /**
   * Find pet by ID.
   */
  getPetById: (input: {
    /** ID of pet to return */
    petId: number;
  }) => Promise<Pet>;

  /**
   * Updates a pet in the store with form data.
   */
  updatePetWithForm: (input: {
    /** ID of pet that needs to be updated */
    petId: number;
    /** Name of pet that needs to be updated */
    name?: string;
    /** Status of pet that needs to be updated */
    status?: string;
  }) => Promise<Pet>;

  /**
   * Deletes a pet.
   */
  deletePet: (input: {
    /** Pet id to delete */
    petId: number;
  }, options?: { headers?: { api_key?: string } }) => Promise<unknown>;

  /**
   * Uploads an image.
   */
  uploadFile: (input: {
    body?: string;
    /** ID of pet to update */
    petId: number;
    /** Additional Metadata */
    additionalMetadata?: string;
  }) => Promise<ApiResponse>;

  /**
   * Returns pet inventories by status.
   */
  getInventory: () => Promise<{ [key: string]: number | undefined }>;

  /**
   * Place an order for a pet.
   */
  placeOrder: (input: {
    id?: number;
    petId?: number;
    quantity?: number;
    shipDate?: string;
    /** Order Status */
    status?: "placed" | "approved" | "delivered";
    complete?: boolean;
  }) => Promise<Order>;

  /**
   * Find purchase order by ID.
   */
  getOrderById: (input: {
    /** ID of order that needs to be fetched */
    orderId: number;
  }) => Promise<Order>;

  /**
   * Delete purchase order by identifier.
   */
  deleteOrder: (input: {
    /** ID of the order that needs to be deleted */
    orderId: number;
  }) => Promise<unknown>;

  /**
   * Create user.
   */
  createUser: (input: {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    /** User Status */
    userStatus?: number;
  }) => Promise<User>;

  /**
   * Creates list of users with given input array.
   */
  createUsersWithListInput: (input: {
    body?: (User)[];
  }) => Promise<User>;

  /**
   * Logs user into the system.
   */
  loginUser: (input: {
    /** The user name for login */
    username?: string;
    /** The password for login in clear text */
    password?: string;
  }) => Promise<string>;

  /**
   * Logs out current logged in user session.
   */
  logoutUser: () => Promise<unknown>;

  /**
   * Get user by user name.
   */
  getUserByName: (input: {
    /** The name that needs to be fetched. Use user1 for testing */
    username: string;
  }) => Promise<User>;

  /**
   * Update user resource.
   */
  updateUser: (input: {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phone?: string;
    /** User Status */
    userStatus?: number;
  }, options: { params: { username: string } }) => Promise<unknown>;

  /**
   * Delete user resource.
   */
  deleteUser: (input: {
    /** The name that needs to be deleted */
    username: string;
  }) => Promise<unknown>;
};

export * from "./schemas.js";
