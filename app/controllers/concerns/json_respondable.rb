module JsonRespondable
  def json_response(resource:, serializer:, **options)
    serializer.new(resource, options).serializable_hash
  end

  def json_error_response(status:, title:, detail:, pointer: nil)
    error = {
      status: Rack::Utils.status_code(status).to_s,
      title: title,
      detail: detail
    }
    error[:source] = { pointer: pointer } if pointer.present?

    { errors: [ error ] }
  end

  def json_validation_error_response(record)
    {
      errors: record.errors.map do |error|
        {
          status: "422",
          title: "Validation failed",
          detail: error.full_message,
          source: { pointer: "/data/attributes/#{error.attribute}" }
        }
      end
    }
  end
end
