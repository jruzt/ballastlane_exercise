import { useEffect, useReducer } from "react";
import { apiRequest, requestCollection, requestResource } from "../lib/api";
import { endpoints } from "../lib/endpoints";
import { appReducer, initialState } from "../state/appReducer";

export function useAppController() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    initializeApp();
  }, []);

  async function initializeApp() {
    try {
      const currentUser = await requestResource(endpoints.me.show);
      dispatch({ type: "auth/set_user", payload: currentUser });
      await loadAppData();
    } catch {
      dispatch({ type: "auth/set_user", payload: null });
    } finally {
      dispatch({ type: "app/loading", payload: false });
    }
  }

  async function loadAppData(searchValue = state.books.query) {
    const booksResponse = await requestCollection(endpoints.books.index(searchValue));
    const borrowingsResponse = await requestCollection(endpoints.borrowings.index);
    const dashboardResponse = await requestResource(endpoints.dashboard.show);

    dispatch({ type: "books/set_items", payload: booksResponse.data });
    dispatch({ type: "borrowings/set_items", payload: borrowingsResponse.data });
    dispatch({ type: "dashboard/set_data", payload: dashboardResponse });
  }

  function resetAlerts() {
    dispatch({ type: "ui/reset_alerts" });
  }

  function setErrorMessage(message) {
    dispatch({ type: "ui/set_error", payload: message });
  }

  function setSuccessMessage(message) {
    dispatch({ type: "ui/set_message", payload: message });
  }

  function setAuthMode(mode) {
    dispatch({ type: "auth/set_mode", payload: mode });
  }

  function setAuthForm(form) {
    dispatch({ type: "auth/set_form", payload: form });
  }

  function setBookForm(form) {
    dispatch({ type: "books/set_form", payload: form });
  }

  function setQuery(query) {
    dispatch({ type: "books/set_query", payload: query });
  }

  function resetBookForm() {
    dispatch({ type: "books/reset_form" });
  }

  function startEdit(book) {
    dispatch({
      type: "books/start_edit",
      payload: {
        id: book.id,
        form: {
          title: book.title,
          author: book.author,
          genre: book.genre,
          isbn: book.isbn,
          total_copies: book.total_copies
        }
      }
    });
  }

  async function handleAuthSubmit(event) {
    event.preventDefault();
    resetAlerts();

    const authMode = state.auth.authMode;
    const authForm = state.auth.authForm;
    const path = authMode === "login" ? endpoints.auth.signIn : endpoints.auth.signUp;
    const body = authMode === "login"
      ? { user: { email: authForm.email, password: authForm.password } }
      : { user: authForm };

    try {
      const response = await requestResource(path, {
        method: "POST",
        body: JSON.stringify(body)
      });

      dispatch({ type: "auth/set_user", payload: response });
      dispatch({ type: "auth/reset_form" });
      await loadAppData("");
      setSuccessMessage(authMode === "login" ? "Welcome back." : "Account created successfully.");
    } catch (requestError) {
      setErrorMessage(requestError.message);
    }
  }

  async function handleLogout() {
    resetAlerts();

    try {
      await apiRequest(endpoints.auth.signOut, { method: "DELETE" });
      dispatch({ type: "session/reset" });
      setSuccessMessage("You have been logged out.");
    } catch (requestError) {
      setErrorMessage(requestError.message);
    }
  }

  async function handleSearch(event) {
    event.preventDefault();
    resetAlerts();

    try {
      await loadAppData(state.books.query);
    } catch (requestError) {
      setErrorMessage(requestError.message);
    }
  }

  async function handleBorrow(bookId) {
    resetAlerts();

    try {
      await apiRequest(endpoints.borrowings.create, {
        method: "POST",
        body: JSON.stringify({ book_id: bookId })
      });
      await loadAppData();
      setSuccessMessage("Book borrowed successfully.");
    } catch (requestError) {
      setErrorMessage(requestError.message);
    }
  }

  async function handleReturn(borrowingId) {
    resetAlerts();

    try {
      await apiRequest(endpoints.borrowings.returnBook(borrowingId), { method: "PATCH" });
      await loadAppData();
      setSuccessMessage("Book marked as returned.");
    } catch (requestError) {
      setErrorMessage(requestError.message);
    }
  }

  async function handleBookSubmit(event) {
    event.preventDefault();
    resetAlerts();

    const editingBookId = state.books.editingBookId;
    const bookForm = state.books.form;
    const path = editingBookId ? endpoints.books.update(editingBookId) : endpoints.books.create;
    const method = editingBookId ? "PATCH" : "POST";

    try {
      await apiRequest(path, {
        method,
        body: JSON.stringify({
          book: {
            ...bookForm,
            total_copies: Number(bookForm.total_copies)
          }
        })
      });
      resetBookForm();
      await loadAppData();
      setSuccessMessage(editingBookId ? "Book updated." : "Book created.");
    } catch (requestError) {
      setErrorMessage(requestError.message);
    }
  }

  async function handleDeleteBook(bookId) {
    resetAlerts();

    try {
      await apiRequest(endpoints.books.destroy(bookId), { method: "DELETE" });
      if (state.books.editingBookId === bookId) {
        resetBookForm();
      }
      await loadAppData();
      setSuccessMessage("Book deleted.");
    } catch (requestError) {
      setErrorMessage(requestError.message);
    }
  }

  return {
    state,
    actions: {
      handleAuthSubmit,
      handleBookSubmit,
      handleBorrow,
      handleDeleteBook,
      handleLogout,
      handleReturn,
      handleSearch,
      resetBookForm,
      setAuthForm,
      setAuthMode,
      setBookForm,
      setQuery,
      startEdit
    }
  };
}
