# Things to do

## Notes for next steps:
   - [x] Move dispatched actions to use login saga to fix refresh bugs
   - [ ] Update `<p>` tags at the top of each page to include relevant information / instructions etc.
   - [ ] Add a JOIN for service providers to bring forward user information

Polish/Styling:
   - [ ] Ensure all buttons have `w3-rounded`
   - [ ] Ensure all buttons have consistent styling/shadows
   - [x] Add support for w3 alert to login/register error message
      (See `LoginForm.jsx` for example)
   - [ ] Add background image to Login/Register page as example
   - [ ] Style login page
   - [ ] Style the register page
   - [ ] Build the 'About' page (public facing)
   - [ ] Build the 'Info' page (protected behind login)
   - [ ] Update the 'Landing' page (`Home/Home.jsx`)
   - [ ] Add styled alert to replace vanilla alerts

Cleanup:
   - [ ] Make sure all buttons in the project are styled
      - [ ] Welcome Page, Login, Register, etc.
   - [ ] 
   - [ ] Favicon (public/index.html)

   - `w3-content` will let things inside of it be centered, small
   - `w3-auto` is a little bit bigger, still centered

Color Scheme:
   - `w3-green` for save/submit buttons
   - `w3-khaki` for cancel/back buttons
   - `w3-teal` for primary links/actions (link a link to a sub-page)
   - `w3-blue-grey` for secondary links/actions (like a link to a form)

As long as it's in a container, this should work:
`className="w3-col m12 l4"`

Bug: 
    - [x] Reloading on the Service Partner Update Screen does not re-populate the form.
            example on ServicePartnerForm - line 20