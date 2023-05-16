const { useState, useEffect } = React;
export function MailSearchFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    const field = target.name;
    const value = target.value;
    console.log(value);
    setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [field]: value }));
  }

  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilter(filterByToEdit);
  }
  const { search } = filterByToEdit;

  return (
    <section className="mail-filter full main-layout">
      <form onSubmit={onSubmitFilter}>
        <input
          value={search}
          onChange={handleChange}
          name="search"
          id="search"
          type="search"
          placeholder="search on email"
        />

        <button>Filter Mails</button>
      </form>
    </section>
  );
}
