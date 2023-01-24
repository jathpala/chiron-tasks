<!--
Layout: Protected

Controls access to restricted pages. Security is actually provided by
firebase security rules. This layout handles the frontend display of these
authentication checks.

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
  import { onMount } from "svelte"
  import { goto } from "$app/navigation"

  import { onAuthStateChanged, signOut } from "firebase/auth"
  import { doc, getDoc } from "firebase/firestore"

  import { auth, db } from "$lib/firebase"
  import { user } from "$stores/user"

  import { MenuIcon, XIcon, SettingsIcon } from "svelte-feather-icons"

  import Loader from "$components/Loader.svelte"
  import Drawer from "$components/Drawer.svelte"

  let drawerOpen = false
  onMount(async () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const d = await getDoc(doc(db, "users", currentUser.uid))
        if (d.exists() && d.data().authorised) {
          user.set({
            firebase: currentUser,
            isAuthenticated: true
          })
          return
        } else {
          user.set({
            firebase: currentUser,
            isAuthenticated: false
          })
        }
      } else {
        user.set({
          firebase: null,
          isAuthenticated: false
        })
      }
      logout()
      goto("/")
    })
  })

  async function logout() {
    try {
      await signOut(auth)
    } catch (err) {
      console.log("Error logging out")
    }
  }
</script>

{#if $user.isAuthenticated }
  <header>
    <h1>Chiron Tasks</h1>
    <nav>
      <ul class="primary">
        <li><a href="/tasks">All Tasks</a></li>
      </ul>
      <ul class="secondary">
        <li><a href="/logout" on:click|preventDefault={logout}>Sign Out</a></li>
        <li><a href="/settings" class="icon"><SettingsIcon /></a></li>
      </ul>
    </nav>
    <button class="menu" on:click={() => drawerOpen = true}><MenuIcon size="2.5x" /></button>
  </header>
  <Drawer open={drawerOpen} size="50%" placement="right" on:clickAway={() => drawerOpen = false}>
    <nav>
      <button class="menu" on:click={() => drawerOpen = false}><XIcon size="3x" /></button>
      <ul class="primary">
        <li><a href="/tasks">All Tasks</a></li>
        <li><a href="/settings/add-location">+ Add Location</a></li>
      </ul>
      <ul class="secondary">
        <li><a href="/settings">Settings</a></li>
        <li><a href="/logout" on:click|preventDefault={logout}>Sign Out</a></li>
      </ul>
    </nav>
  </Drawer>
  <main>
    <slot />
  </main>
{:else}
  <section class="loading">
    <Loader fontSize="2rem" dotSize="0.5rem">Loading...</Loader>
  </section>
{/if}

<style lang="scss">
@use "$styles/variables" as *;

header {
  background-color: $background-accent-color;
  display: flex;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 16px 4px rgba(0, 0, 0, 0.5);

  h1 {
    font: $brand-font;
    color: $brand-color;
    font-size: 1.5rem;
  }

  nav {
    display: none;
    flex-grow: 1;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    margin-left: 2rem;

    ul {
      align-items: center;
      font-size: 1.6rem;
      column-gap: 1rem;
      flex-direction: row;
      margin-bottom: 0;

      &.secondary {
        font-size: 1.3rem;

        a {
          display: flex;
          padding: 0.3rem;

          &.icon:hover {
            border-radius: 50%;
            background-color: $accent-color;
            color: $background-accent-color;
          }
        }
      }
    }
  }
}

main {
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

nav {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  row-gap: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;

  button.menu {
    align-self: flex-end;
  }

  ul {
    list-style-type: none;
    padding: 0;
    font: $nav-font;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    align-items: center;
    margin-bottom: 2rem;
    align-items: stretch;

    a {
      color: $accent-color;
      text-underline-offset: 0.2em;
    }
  }
}

section.loading {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font: $major-heading-font;
    color: $accent-color;
  }
}

button.menu {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  background-color: transparent;
  border-style: none;
  cursor: pointer;
  color: $accent-color;
}

@media screen and (min-width: 768px) {
  header {
    h1 {
      font-size: 2.5rem;
    }

    nav {
      display: flex;
    }

    button.menu {
      display: none;
    }
  }
}

@media screen and (min-width: 1024px) {
  // TODO: Fully lay out options as a side panel
}

</style>
