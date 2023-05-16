const { useState, useEffect } = React;
export function MailSidebarFilter({ filterBy, onSetFilter }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  useEffect(() => {
    onSetFilter(filterByToEdit);
  }, [filterByToEdit]);

  function changeFolder(updateFolder) {
    setFilterByToEdit((prevFilter) => ({
      ...prevFilter,
      folder: updateFolder,
    }));
  }
  return (
    <section className="sidenav">
      {/* <button className="filter-btn">Compose</button> */}
      <button onClick={() => changeFolder("inbox")} className="filter-btn btn">
        Inbox
      </button>
      <button className="filter-btn btn">Strarred</button>
      <button className="filter-btn btn">Snoozed</button>
      <button className="filter-btn btn">Important</button>
      <button onClick={() => changeFolder("sent")} className="filter-btn btn">
        Sent
      </button>
      <button className="filter-btn btn">Drafts</button>
      <button onClick={() => changeFolder("trash")} className="filter-btn btn">
        Trash
      </button>
    </section>
  );
}
