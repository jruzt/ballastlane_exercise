module Api
  module V1
    class DashboardsController < BaseController
      def show
        authorize :dashboard, :show?

        dashboard = current_user.librarian? ? librarian_dashboard : member_dashboard
        render json: json_response(resource: dashboard,
                                   serializer: Dashboard::Serializer,
                                   include: dashboard_includes(dashboard))
      end

      private

      def librarian_dashboard
        overdue_members = User.member
                              .joins(:borrowings)
                              .merge(Borrowing.overdue)
                              .distinct

        Dashboard.new(
          id: current_user.id,
          role: User.roles[:librarian],
          totals: {
            total_books: Book.count,
            total_borrowed_books: Borrowing.active.count,
            books_due_today: Borrowing.due_today.count
          },
          overdue_members: overdue_members
        )
      end

      def member_dashboard
        borrowings = current_user.borrowings.active.includes(:book).order(:due_on)

        Dashboard.new(
          id: current_user.id,
          role: User.roles[:member],
          borrowings: borrowings,
          overdue_count: borrowings.count(&:overdue?)
        )
      end

      def dashboard_includes(dashboard)
        return [ :overdue_members ] if dashboard.role == User.roles[:librarian]

        [ "borrowings.book" ]
      end
    end
  end
end
