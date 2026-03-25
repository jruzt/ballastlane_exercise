export const endpoints = {
  auth: {
    signIn: "/api/v1/auth/sign_in",
    signOut: "/api/v1/auth/sign_out",
    signUp: "/api/v1/auth/sign_up"
  },
  me: {
    show: "/api/v1/me"
  },
  books: {
    create: "/api/v1/books",
    destroy: (id) => `/api/v1/books/${id}`,
    index: (query = "") => `/api/v1/books${query ? `?q=${encodeURIComponent(query)}` : ""}`,
    update: (id) => `/api/v1/books/${id}`
  },
  borrowings: {
    create: "/api/v1/borrowings",
    index: "/api/v1/borrowings",
    returnBook: (id) => `/api/v1/borrowings/${id}/return`
  },
  dashboard: {
    show: "/api/v1/dashboard"
  }
};
