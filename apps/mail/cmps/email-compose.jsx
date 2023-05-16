const { Fragment, useState } = React;

export function EmailCompose() {
  const [isCompose, setIsCompose] = useState(false);
  function handleChange({ target }) {
    const field = target.name;
    const value = target.type === "number" ? +target.value || "" : target.value;
    console.log(value);
  }
  function onSubmitEmail(ev) {
    ev.preventDefault();
    // onSetFilter(filterByToEdit);
  }
  return (
    <Fragment>
      <section>
        <div
          onClick={() => setIsCompose((prevIsCompose) => !prevIsCompose)}
          className="compose-btn-container"
        >
          <button className="compose-btn">Compose</button>
        </div>
        {isCompose && (
          <div className="form-container">
            <form onSubmit={onSubmitEmail}>
              <div>
                <h3>New message</h3>
              </div>
              <label htmlFor="from">from: </label>
              <input
                onChange={handleChange}
                type="email"
                value={"user@appsus.com"}
              />
              <label htmlFor="to">To: </label>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                id="to"
                placeholder="somone@mail.com"
              />
              <label htmlFor="subject">Subject: </label>
              <input type="text" name="subject" id="subject" maxLength="80" />
              <label htmlFor="body">Body: </label>
              <textarea
                name="body"
                id="body"
                rows="6"
                maxLength="4000"
              ></textarea>
              <button>send</button>
            </form>
          </div>
        )}
      </section>
    </Fragment>
  );
}
