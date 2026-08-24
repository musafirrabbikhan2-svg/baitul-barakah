/* =========================================================
   এই ফাইলে দুইটা লিংক বসাতে হবে — নিচের ধাপ অনুযায়ী।
   এই লিংক বসানোর পর members.html ও rules.html পেজ
   automatically আপনার Google Sheet থেকে তথ্য নিয়ে আসবে।

   ধাপগুলো README.txt ফাইলে বিস্তারিত লেখা আছে।
   ========================================================= */

const SHEET_CONFIG = {
  // Google Sheet এর "Members" ট্যাব publish করে পাওয়া CSV লিংক এখানে বসান
  MEMBERS_CSV_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTHtSXpCZZDM3AO3Q7uBv8RvTDsHehY0DCwFWpnQtV3iwuTBAG6hGGenyrgW_PMCA/pub?gid=2116650967&single=true&output=csv",

  // Google Sheet এর "Rules" ট্যাব publish করে পাওয়া CSV লিংক এখানে বসান
  RULES_CSV_URL: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTHtSXpCZZDM3AO3Q7uBv8RvTDsHehY0DCwFWpnQtV3iwuTBAG6hGGenyrgW_PMCA/pub?gid=1998537499&single=true&output=csv"
};

/* =========================================================
   জিমেইল সাইন-ইন ও ভিজিটর তালিকা — এই দুইটা জিনিস বসাতে হবে।
   কীভাবে পাবেন তা README.txt এর "জিমেইল সাইন-ইন" অংশে লেখা আছে।
   ========================================================= */
const AUTH_CONFIG = {
  // Google Cloud Console থেকে পাওয়া Client ID এখানে বসান
  GOOGLE_CLIENT_ID: "",

  // Apps Script "Web app" ডিপ্লয় করে পাওয়া লিংক এখানে বসান
  // (এটাই ভিজিটরদের নাম/ইমেইল/সময় Sheet এ লিখে রাখবে)
  VISITOR_LOG_URL: ""
};
