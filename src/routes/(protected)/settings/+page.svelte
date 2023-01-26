<!--
/settings

User settings


Copyright (C) 2023 Jath Palasubramaniam

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->


<script>
import { EmailAuthProvider, updatePassword, reauthenticateWithCredential } from "firebase/auth"
import { user } from "$stores/user"

import { EyeIcon, EyeOffIcon } from "svelte-feather-icons"
import Spinner from "$components/Spinner.svelte"

let oldPassword
let newPassword
let repeatPassword

let error = null
let success = null

let loadingChangePassword = false

let showPassword = false
$: inputType = showPassword ? "text" : "password"

function toggleShowPassword() {
  showPassword = !showPassword
}

async function changePassword() {
  error = null
  success = null
  loadingChangePassword = true
  let updatedPassword = null
  if (oldPassword.value.trim() === "") {
    error = "Please enter old password"
    loadingChangePassword = false
    return
  }
  if (newPassword.value.trim() === "") {
    error = "Please enter a new password"
    loadingChangePassword = false
    return
  }
  if (newPassword.value != repeatPassword.value) {
    error = "Passwords don't match"
    loadingChangePassword = false
    return
  } else {
    // Save the new password here in case the field value gets changed between
    // this check and the call to updatePassword (which might be delayed because
    // of the network check to verify the old password).
    updatedPassword = newPassword.value
  }
  try {
    const credential = EmailAuthProvider.credential($user.firebase.email, oldPassword.value)
    await reauthenticateWithCredential($user.firebase, credential)
    await updatePassword($user.firebase, updatedPassword)
    oldPassword.value = newPassword.value = repeatPassword.value = ""
    success = "Password updated"
    console.log("Password updated")
  } catch (err) {
    if (["auth/wrong-password"].some(
        substr => err.message.includes(substr)
        )) {
      error = "Incorrectly entered current password"
    } else if (["auth/weak-password"].some(
        substr => err.message.includes(substr)
        )) {
      error = "New password must be at least 6 characters long"
    } else {
      console.log(err)
    }
  } finally {
    loadingChangePassword = false
  }
}
</script>

<main>
  <section class="password loading">
    <h1>Change Password</h1>
    {#if error}
      <span class="flash" on:click={() => error = null}>{error}</span>
    {/if}
    {#if success}
      <span class="flash success" on:click={() => success = null}>{success}</span>
    {/if}
    <form>
      <label for="old-password">Old Password</label>
      <span class="overlay">
        <input
          bind:this={oldPassword}
          id="new-password"
          type={inputType}
          name="new_password"
          placeholder="New Password"
          size="1"
          value="">
        <button type="button" on:click|preventDefault={toggleShowPassword} tabindex="-1">
          {#if showPassword}
            <EyeOffIcon />
          {:else}
            <EyeIcon />
          {/if}
        </button>
      </span>
      <label for="new-password">New Password</label>
      <span class="overlay">
        <input
          bind:this={newPassword}
          id="new-password"
          type={inputType}
          name="new_password"
          placeholder="New Password"
          size="1"
          value="">
        <button type="button" on:click|preventDefault={toggleShowPassword} tabindex="-1">
          {#if showPassword}
            <EyeOffIcon />
          {:else}
            <EyeIcon />
          {/if}
        </button>
      </span>
      <label for="repeat-password">Confirm Password</label>
      <span class="overlay">
        <input
          bind:this={repeatPassword}
          id="repeat-password"
          type={inputType}
          name="repeat_password"
          placeholder="New Password"
          size="1"
          value="">
        <button type="button" on:click|preventDefault={toggleShowPassword} tabindex="-1">
          {#if showPassword}
            <EyeOffIcon />
          {:else}
            <EyeIcon />
          {/if}
        </button>
      </span>
      <button
        class="controls"
        class:loading={loadingChangePassword}
        type="submit"
        name="submit"
        value="submit"
        on:click|preventDefault={changePassword}>
        <span class="text">Update</span>
        <span class="spinner"><Spinner show={loadingChangePassword}/></span>
      </button>
  </section>
</main>


<style lang="scss">
@use "$styles/variables" as *;

main {
  display: flex;
  flex-direction: column;
  row-gap: 2rem;

  section {
    font: $primary-font;
    font-size: 1.2rem;
    border-style: solid;
    border-color: $accent-color;
    border-width: 2px;
    border-radius: 0.5rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin-left: auto;
    margin-right: auto;

    h1 {
      font: $major-heading-font;
      margin-bottom: 1.5rem;
      font-style: italic;

      &:after {
        content: ":";
      }
    }

    span.flash {
      text-align: center;
      font-size: 1rem;
      margin-bottom: 1.2rem;
      color: $error-color;
      display: block;
      cursor: default;

      &.success {
        color: $success-color;
      }
    }

    &.password {
      form {
        margin-top: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;

        label {
          margin-top: 1.2rem;
          margin-bottom: 0.4rem;

          &:first-of-type {
            margin-top: 0;
          }

          &:after {
            content: ":";
          }
        }

        span.overlay {
          display: grid;
          align-items: center;
          min-width: 5em;
          width: 100%;
          max-width: 15em;

          input {
            grid-column-start: 1;
            grid-row-start: 1;
            font: $primary-font;
            color: $primary-color;
            font-size: 1.2rem;
            height: 1.8em;
            border-style: solid;
            border-width: 1px;
            border-color: $accent-color;
            border-radius: 0.25em;
            padding-left: 0.4rem;
            padding-right: 0.4rem;

            &:focus {
              outline-style: solid;
              outline-width: 2px;
              outline-color: $accent-color;
              border-color: transparent;
            }
          }

          button {
            grid-column-start: 1;
            grid-row-start: 1;
            justify-self: end;
            margin-right: 0.4rem;
            display: flex;
            justify-content: center;
            color: $accent-color;
            cursor: pointer;
            background-color: transparent;
            border: none;
          }
        }

        button.controls {

          font: $primary-font;
          font-size: 1.4rem;
          font-weight: 800;
          padding-top: 0.3em;
          padding-bottom: 0.3em;
          padding-left: 0.5em;
          padding-right: 0.5em;
          background-color: $background-color;
          color: $accent-color;
          border-width: 2px;
          border-style: solid;
          border-color: $accent-color;
          border-radius: 0.3em;
          margin-top: 2rem;
          align-self: flex-end;
          display: grid;

          &:hover, &:active, &:focus {
            outline: none;
            cursor: pointer;
            background-color: $accent-color;
            color: $background-color;
          }

          &.loading {
            outline: none;
            cursor: pointer;
            background-color: $accent-color;
            color: $background-color;

            span.text {
              color: transparent;
              background-color: $accent-color;
            }
          }

          span.text {
            grid-column-start: 1;
            grid-row-start: 1;
          }

          span.spinner {
            grid-column-start: 1;
            grid-row-start: 1;
          }
        }
      }
    }
  }
}


@media screen and (min-width: 768px) {
  main {

    section {
      margin-left: 0;
      margin-right: 0;
      font-size: 1.4rem;
      width: max-content;

      &.password {
        form {
          display: grid;
          grid-template-columns: auto auto;
          column-gap: 1rem;
          row-gap: 1rem;
          align-items: center;

          label {
            margin-top: 0;
            margin-bottom: 0;
            text-align: right;
          }

          span.overlay {
            input {
              font-size: 1.4rem;
              width: 12em;
            }
          }

          button.controls {
            grid-column-end: 3;
            justify-self: end;
            margin-top: 1rem;
          }
        }
      }
    }
  }


}

@media screen and (min-width: 1024px) {

}
</style>
