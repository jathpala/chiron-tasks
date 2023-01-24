<!--
/register

Show new user registration screen

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
  import { auth } from "$lib/firebase"
  import { goto } from "$app/navigation"
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

  import Loader from "$components/Loader.svelte"

  let email
  let password
  let error

  let loading = false

  async function register() {
    error = null
    loading = true
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      goto("/tasks")
    } catch (err) {
      if (err.message.includes("auth/email-already-in-use")) {
        error = "Unable to register user"
      } else {
        error = "Problem with registration"
      }
    }
  }
</script>

<section>

  {#if loading}
    <Loader fontSize="2rem" dotSize="0.5rem">Signing In...</Loader>
  {:else}
    <main>
      <h1>Chiron Tasks</h1>
      <form>
        {#if error}
          <span class="flash">{error}</span>
        {/if}
        <fieldset>
          <label for="email">Email</label>
          <input id="email" type="email" name="username" bind:value={email} size="1" required/>
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            bind:value={password}
            size="1"
            required
          />
        </fieldset>
        <button
          type="submit"
          on:click|preventDefault={register}>
          Register
        </button>
      </form>
    </main>
  {/if}
</section>

<style lang="scss">
@use "$styles/variables" as *;

section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  main {
    display: flex;
    flex-direction: column;
    row-gap: 1.5rem;
    width: 100%;
    padding: 1rem;

    h1 {
      font: $brand-font;
      color: $brand-color;
      text-align: center;
      text-decoration: underline;
      text-decoration-color: $accent-color;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 1.5rem;

      fieldset {
        border: none;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        padding: 0;
        width: 100%;
        min-width: 5em;
        max-width: 20em;

        label {
          font-size: 1.6rem;
          margin-bottom: 0.2rem;

          &:after {
            content: ":";
          }
        }

        input {
          font: $primary-font;
          color: $primary-color;
          font-size: 1.4rem;
          margin-bottom: 1.4rem;
          height: 2em;
          margin-left: 0.2rem;
          margin-right: 0.2rem;
          border-style: solid;
          border-width: 1px;
          border-color: $accent-color;
          border-radius: 0.25em;
          width: auto;

          &:focus {
            outline-style: solid;
            outline-width: 2px;
            outline-color: $accent-color;
            border-color: transparent;
          }
        }
      }

      button {
        font: $primary-font;
        font-size: 1.4rem;
        width: fit-content;
        align-self: center;
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

        &:hover, &:active, &:focus {
          outline: none;
          cursor: pointer;
          background-color: $accent-color;
          color: $background-color;
        }
      }

      span.flash {
        text-align: center;
        font-size: 1.4rem;
        margin-bottom: 1.2rem;
        color: $error-color;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  section {
    align-items: center;

    main {
      padding: 2rem;
      row-gap: 1rem;
      text-decoration: none;
      border-style: solid;
      border-width: 4px;
      border-color: $accent-color;
      border-radius: 1rem;
      outline-style: solid;
      outline-color: $background-color;
      outline-width: 0.5rem;
      box-shadow: 0 0 24px 12px rgba(0, 0, 0, 0.5);
      min-width: 20em;
      max-width: 25em;
      width: 50%;

      h1 {
        text-decoration: none;
      }

      form {

        fieldset{
          max-width: 100%;
        }
      }
    }
  }
}

@media screen and (min-width: 1024px) {

}
</style>
