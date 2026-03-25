export const emptyBookForm = {
  title: "",
  author: "",
  genre: "",
  isbn: "",
  total_copies: 1
};

export const emptyAuthForm = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: ""
};

export const initialState = {
  auth: {
    authForm: emptyAuthForm,
    authMode: "login",
    user: null
  },
  books: {
    items: [],
    query: "",
    form: emptyBookForm,
    editingBookId: null
  },
  borrowings: {
    items: []
  },
  dashboard: {
    data: null
  },
  ui: {
    error: "",
    loading: true,
    message: ""
  }
};

const uiHandlers = {
  "app/loading": (state, action) => ({
    ...state,
    ui: { ...state.ui, loading: action.payload }
  }),
  "ui/reset_alerts": (state) => ({
    ...state,
    ui: { ...state.ui, error: "", message: "" }
  }),
  "ui/set_error": (state, action) => ({
    ...state,
    ui: { ...state.ui, error: action.payload, message: "" }
  }),
  "ui/set_message": (state, action) => ({
    ...state,
    ui: { ...state.ui, message: action.payload, error: "" }
  })
};

const authHandlers = {
  "auth/set_mode": (state, action) => ({
    ...state,
    auth: { ...state.auth, authMode: action.payload }
  }),
  "auth/set_form": (state, action) => ({
    ...state,
    auth: { ...state.auth, authForm: action.payload }
  }),
  "auth/set_user": (state, action) => ({
    ...state,
    auth: { ...state.auth, user: action.payload }
  }),
  "auth/reset_form": (state) => ({
    ...state,
    auth: { ...state.auth, authForm: emptyAuthForm }
  })
};

const booksHandlers = {
  "books/set_items": (state, action) => ({
    ...state,
    books: { ...state.books, items: action.payload }
  }),
  "books/set_query": (state, action) => ({
    ...state,
    books: { ...state.books, query: action.payload }
  }),
  "books/set_form": (state, action) => ({
    ...state,
    books: { ...state.books, form: action.payload }
  }),
  "books/start_edit": (state, action) => ({
    ...state,
    books: {
      ...state.books,
      editingBookId: action.payload.id,
      form: action.payload.form
    }
  }),
  "books/reset_form": (state) => ({
    ...state,
    books: {
      ...state.books,
      editingBookId: null,
      form: emptyBookForm
    }
  })
};

const borrowingsHandlers = {
  "borrowings/set_items": (state, action) => ({
    ...state,
    borrowings: { items: action.payload }
  })
};

const dashboardHandlers = {
  "dashboard/set_data": (state, action) => ({
    ...state,
    dashboard: { data: action.payload }
  })
};

const sessionHandlers = {
  "session/reset": (state) => ({
    ...state,
    auth: { ...state.auth, user: null },
    books: { ...state.books, items: [], editingBookId: null, form: emptyBookForm },
    borrowings: { items: [] },
    dashboard: { data: null }
  })
};

const actionHandlers = {
  ...uiHandlers,
  ...authHandlers,
  ...booksHandlers,
  ...borrowingsHandlers,
  ...dashboardHandlers,
  ...sessionHandlers
};

export function appReducer(state, action) {
  return actionHandlers[action.type]?.(state, action) || state;
}
