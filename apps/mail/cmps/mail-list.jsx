import { MailPreview } from "./mail-preview.jsx";

export function MailList({ mails, onDeleteMail }) {
  return (
    <section className="mail-list">
      <table>
        <tbody>
          {mails.map((mail) => (
            <MailPreview
              key={mail.id}
              mail={mail}
              onDeleteMail={onDeleteMail}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}
