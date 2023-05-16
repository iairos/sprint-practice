const { useEffect, useState } = React;
const { Link, useSearchParams } = ReactRouterDOM;

import { mailService } from "../../mail/services/mail.service.js";
import {
  showSuccessMsg,
  showErrorMsg,
} from "../../../services/event-bus.service.js";
import { MailList } from "../cmps/mail-list.jsx";
import { MailSearchFilter } from "../cmps/mail-search-filter.jsx";
import { MailSidebarFilter } from "../cmps/mail-sidebar-filter.jsx";
import { EmailCompose } from "../cmps/email-compose.jsx";

export function MailIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mails, setMails] = useState([]);
  const [filterBy, setFilterBy] = useState(
    mailService.getDefaultFilter(searchParams)
  );

  useEffect(() => {
    loadMails();
    console.log(searchParams, filterBy);
    setSearchParams(filterBy);
    // showSuccessMsg("Welcome to mail index!");
  }, [filterBy]);

  function loadMails() {
    mailService.query(filterBy).then((mails) => setMails(mails));
    // carService.query().then(setCars)
  }
  function onDeleteMail(ev, mailId) {
    ev.stopPropagation();
    mailService.get(mailId).then((mail) => {
      if (mail.isRemoved) {
        console.log("remove");
        mailService.remove(mailId).then(() => {
          const updatedMails = mails.filter((mail) => mail.id !== mailId);
          setMails(updatedMails);
        });
      } else {
        console.log("unRemove");
        mail.isRemoved = true;
        mailService.save(mail).then(() => {
          const newMails = mails.map((mail) => {
            if (mail.id === mailId) mail.isRemoved = true;
            return mail;
          });
          loadMails();
        });
      }
    });
  }

  function onSetFilter(filterBy) {
    console.log("filterByFromIdx: ", filterBy);
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, ...filterBy }));
  }

  return (
    <section className="mail-index">
      <MailSearchFilter onSetFilter={onSetFilter} filterBy={filterBy} />
      <EmailCompose />
      <MailSidebarFilter onSetFilter={onSetFilter} filterBy={filterBy} />
      <MailList mails={mails} onDeleteMail={onDeleteMail} />
    </section>
  );
}
