const { Fragment, useState } = React;
const { Link } = ReactRouterDOM;

export function MailPreview({ mail, onDeleteMail }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Fragment>
      <tr
        onClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
        className=""
      >
        <td className="mail-container">
          <h4>
            {mail.from}
            <span className="mail-option">
              <button
                onClick={(event) => onDeleteMail(event, mail.id)}
                className="btn "
              >
                X
              </button>
            </span>
          </h4>

          <h5>{mail.subject}</h5>
        </td>

        {/* <td>
                    <Link to={`/mail/${mail.id}`}>Details</Link> |
                    <Link to={`/mail/edit/${mail.id}`}>Edit</Link>
                </td> */}
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan="3">
            {/* <img src={`../assets/img/${mail.vendor}.png`} style={{ maxWidth: '100px' }} /> */}
            <p>{mail.body}</p>
          </td>
        </tr>
      )}
    </Fragment>
  );
}
