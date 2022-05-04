# User Stories

## Users

### Sign Up

As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form.

* When I'm on the /signup page:
  * I would like to be able to enter my email, username, first name, last name, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
    * So that I can seamlessly access the site's functionality
* When I enter invalid data on the sign-up form:
  * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
  * So that I can try again without needing to refill forms I entered valid data into.

### Log in

As a registered and unauthorized user, I want to be able to log in to the website via a log-in form.

* When I'm on the /login page:
  * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the log-in form.
    * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-in form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

As an unregistered and unauthorized user, I would like an easy to find and clear button on both the /signup and /login pages to allow me to visit the site as a guest without signing up or logging in.

* When I'm on either the /signup or /login pages:
  * I can click on a Demo User button to log me in and allow me access as a normal user.
  * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

As a logged in user, I want to log out via an easy to find log out button on the navigation bar.

* While on any page of the site:
  * I can log out of my account and be redirected to a page displaying recent songs.
  * So that I can easily log out to keep my information secure.

## Playlists

### Create Playlists

As a logged in user, I want to be able to post new playlists.

* When I'm on the /new-playlist page:
  * I can title and submit playlist image for a new playlist via a clear form.
  * So that I can add songs to it and have for my personal use or share with my friends.
* When I enter an invalid playlist title in the new playlist form:
  * I would like the website to inform me of the validations I failed to pass.
  * So that I can try again to correct the invalid data.

### Viewing Playlists

As a logged in or logged out user, I want to be able to view the playlists created by an individual artist/user.

* When I'm on the /artists/:artistId/playlists page:
  * I can view the ten most recently posted playlists by that artist/user.
  * So that I can view and listen to the playlists from my favorite artist or my friends.

As a logged in user, I want to be able to view my playlists.

* When I'm on the /my/playlists page:
  * I can view my ten most recently posted playlists.
  * So that I can view, edit, and listen to my playlists.

As a logged in or logged out user, I want to be able to view a specific playlist and its associated songs.

* When I'm on the /playlists/:playlistId page:
  * I can view the title and image of the playlist, as well as the associated songs.
  * So that I can listen to the playlist created by my favorite artist or my friends, and be able to navigate to a song's detail page.

### Editing a Playlist

As a logged in user, I want to be able to edit my playlists by clicking an Edit button associated with the playlist anywhere that playlist appears.

* When I'm on the /playlists, /playlists/:playlistId, or /my/playlists pages:
  * I can click "Edit" to make permanent changes to playlists I have posted.
  * So that I can edit the title or image of my playlists.

As a logged in user, I want to be able to add songs to my playlists by clicking an "Add to Playlist" button that appears next to anywhere songs appear.

* When I'm on the /songs, /artists/:artistId/songs, /songs/:songId, /albums/:albumId, or /playlists/:playlistId pages or on the Audio Control Panel:
  * I can click on "Add to Playlist" to bring up a list of my playlists to which I can add the song.
  * So that I can populate my playlists with songs that I already like or newly discover.

### Deleting a Playlist

As a logged in user, I want to be able to delete my playlists by clicking a Delete button associated with the playlist anywhere that playlist appears.

* When I'm on the /playlists, /playlists/:id, or /my/playlists pages:
  * I can click "Delete" to permanently delete a playlist I have posted.
  * So that when my taste in music changes I can remove playlists I am no longer interested in.

## Songs

As a logged in or logged out user, I want to be able to view the details of a particular song.

* When I'm on the /songs/:songId page:
  * I can view the song details
  * Click the "Play" button to begin listening to a song's audio immediately
  * I can add the song to my Song Queue with a "Add to Queue" button.
    * So that I can view and listen to songs in the order that I please.

## Audio Control Panel

As a logged in or logged out user, I want to be able to control the audio any time I am on the app.

* When I am on any page:
  * I can see a panel along the bottom of my browser window that allows me to control the audio coming from the app.

### Play/Pause button

As a logged in or logged out user, I want to be able to stop or start the audio from the app.

* When I am on any page, in the control panel:
  * I can see a Play button that will start the audio when no audio is currently playing from the app.
  * I can see a Pause button the will pause the audio when there is audio playing from the app.
    * So that I can stop or start my music at any time.

### Seek Slider

As a logged in or logged out user, I want to be able to jump to another point in time in the song I am playing.

* When I am on any page, in the control panel:
  * I can see a slider showing the progress through the current song's audio with the current time to the left of the slider and the song's total duration to the right of the slider.
    * So that I can easily navigate to my favorite part of a song.

### Volume Slider

As a logged in or logged out user, I want to be able to adjust the volume of the current song.

* When I am on any page, in the control panel:
  * I can see a volume button that, when clicked by the user, opens a slider that allows me to adjust the volume of the current song.

### Song Queue

As a logged in or logged out user, I want to be able to view the list of previously played songs, the current song, and any upcoming songs in my Song Queue.

* When I am on any page, in the control panel:
  * I can see a Queue button that, when clicked by the user, creates a modal which shows the list of previously played songs, the current song, and any upcoming songs.
    * I can use a Remove from Queue button on each song to remove the song from my Queue.
      * So that I can customize order and selection of songs that I can listen to on the app.
  * My Queue should automatically be populated with the subsequent tracks of a playlist when I select to play a song from a playlist view.
    * So that the next songs in a playlist will start to play automatically.

### Forward and Back Buttons

As a logged in or logged out user, I want to be able to quickly navigate to the next or previous song from my Song Queue.

* When I am on any page, in the control panel:
  * I can see forward and back buttons to the right and left, respectively, of the play button
    * The forward button skips to the next song in the Song Queue when clicked by the user.
    * The back button skips to the beginning of a song when clicked once by a user, and to the previously played song when clicked twice by a user.
      * So that I can skip songs I do not like and repeat songs I do like.

### Add to Playlist Button

As a logged in user, I want  to be able to quickly add the current song to one of my playlists.

* When I am on any page, in the control panel:
  * I can see an Add to Playlist button that, when clicked, opens a modal which shows a list of my playlists.
    * Each playlist has an Add button which adds the current song to that playlist.
      * So that I can quickly add a new favorite song to one of my playlists.
