import { storageService } from "../../../services/storage.service.js";
import { asyncStorageService } from "../../../services/async-storage.service.js";
import { utilService } from "../../../services/util.service.js";

const MAIL_KEY = "mailDB";
const loggedinUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus",
};
// const criteria = {
//   status: "inbox/sent/trash/draft",
//   txt: "puki", // no need to support complex text search
//   isRead: true, // (optional property, if missing: show all)
//   isStared: true, // (optional property, if missing: show all)
//   lables: ["important", "romantic"], // has any of the labels
// };
_createMails();

export const mailService = {
  query,
  get,
  remove,
  save,
  getDefaultFilter,
  //   getNextCarId,
  //   getPrevCarId,
};

function query(filterBy = {}) {
  // console.log('filterBy service:', filterBy)
  return asyncStorageService.query(MAIL_KEY).then((mails) => {
    if (filterBy.folder === "inbox" || filterBy.folder === "") {
      mails = mails.filter(
        (mail) => mail.to === loggedinUser.email && mail.isRemoved === false
      );
    }
    if (filterBy.folder === "sent") {
      mails = mails.filter((mail) => mail.from === loggedinUser.email);
    }
    if (filterBy.folder === "trash") {
      mails = mails.filter((mail) => mail.isRemoved === true);
    }

    if (filterBy.search) {
      const regExp = new RegExp(filterBy.search, "i");
      mails = mails.filter(
        (mail) =>
          regExp.test(mail.subject) ||
          regExp.test(mail.from) ||
          regExp.test(mail.body) ||
          regExp.test(mail.sentAt)
      );
    }

    // if (filterBy.minSpeed) {
    //   mails = mails.filter((mail) => mail.maxSpeed >= filterBy.minSpeed);
    // }
    console.log(mails);
    return mails;
  });
}

function get(mailId) {
  return asyncStorageService.get(MAIL_KEY, mailId);
  // return axios.get(MAIL_KEY, mailId)
}

function remove(mailId) {
  return asyncStorageService.remove(MAIL_KEY, mailId);
}

function save(mail) {
  if (mail.id) {
    return asyncStorageService.put(MAIL_KEY, mail);
  } else {
    return asyncStorageService.post(MAIL_KEY, mail);
  }
}

// function getNextmailId(carId) {
//   return storageService.query(MAIL_KEY).then((cars) => {
//     let carIdx = cars.findIndex((car) => car.id === carId);
//     if (carIdx === cars.length - 1) carIdx = -1;
//     return cars[carIdx + 1].id;
//   });
// }
// function getPrevCarId(carId) {
//   return storageService.query(MAIL_KEY).then((cars) => {
//     let carIdx = cars.findIndex((car) => car.id === carId);
//     if (carIdx === 0) carIdx = cars.length;
//     return cars[carIdx - 1].id;
//   });
// }

function getDefaultFilter(searchParams = { get: () => {} }) {
  return {
    search: searchParams.get("search") || "",
    folder: searchParams.get("folder") || "",
  };
}

function _createMails() {
  let mails = storageService.loadFromStorage(MAIL_KEY);
  if (!mails || !mails.length) {
    mails = [
      {
        id: utilService.makeId(),
        subject: "Miss you!",
        body: "Would love to catch up sometimes",
        isRead: false,
        isSpam: false,
        type: "updates",
        sentAt: 1551133930594,
        isRemoved: false,
        removedAt: null,
        from: "momo@momo.com",
        to: "user@appsus.com",
      },
      {
        id: utilService.makeId(),
        subject: "hola!",
        body: "que tal",
        isRead: false,
        isSpam: false,
        type: "social network",
        sentAt: 2551133930594,
        isRemoved: false,
        removedAt: null,
        from: "momo@momo.com",
        to: "user@appsus.com",
      },
      {
        id: utilService.makeId(),
        subject: "hi",
        body: "eat code repeat",
        isRead: false,
        isSpam: true,
        type: "sales & promotions",
        sentAt: 3551133930594,
        isRemoved: false,
        removedAt: null,
        from: "popo@momo.com",
        to: "user@appsus.com",
      },
      {
        id: utilService.makeId(),
        subject: "hi",
        body: "eat code repeat",
        isRead: false,
        isSpam: true,
        type: "sales & promotions",
        sentAt: 3551133930594,
        isRemoved: false,
        removedAt: null,
        from: "user@appsus.com",
        to: "popo@momo.com",
      },
    ];
    console.log(mails);
    storageService.saveToStorage(MAIL_KEY, mails);
  }
}
