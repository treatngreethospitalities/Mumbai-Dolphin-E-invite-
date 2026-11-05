MUMBAI DOLPHINS - VVIP INVITATION (plain HTML / CSS / JS)

FILES
  index.html   -> the text and sections (change wording here)
  style.css    -> colours, fonts, sizes (colours are at the very top)
  script.js    -> your details are at the very top (RSVP number, venue, time)
  images/      -> the two logos

HOW TO OPEN
  Just double-click index.html. (Opening animation works without any setup.)

BEFORE SENDING - EDIT THESE IN script.js (top of file)
  1. RSVP_WHATSAPP  -> e.g. "919999999999"   (or put a form link in RSVP_LINK)
  2. VENUE_NAME / VENUE_ADDRESS -> check with the District page
  3. END time for the calendar file (3 hours is only a guess)
  4. SITE_URL -> your website address after you deploy

DEPLOY
  Drag the whole folder into Netlify Drop (app.netlify.com/drop) or upload to Vercel.
  After deploying, change the og:image line in index.html to your full address:
  https://your-site.vercel.app/images/mumbai-dolphins-logo.jpg

PERSONAL LINK
  your-site.com/?guest=Mr. Sharma   ->  shows "Dear Mr. Sharma,"

UPDATING GITHUB AFTER YOU CHANGE A FILE
  Website way: open your repo -> click the file -> pencil icon (Edit) or "Add file > Upload files"
               -> upload with the SAME file name -> "Commit changes". Vercel redeploys in ~1 minute.
  Command way: git add .   then   git commit -m "update invitation"   then   git push
