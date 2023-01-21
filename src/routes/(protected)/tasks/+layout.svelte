<script>
  import { onMount } from "svelte"
  import { goto } from "$app/navigation"

  import { onAuthStateChanged, signOut } from "firebase/auth"
  import { doc, getDoc } from "firebase/firestore"

  import { auth, db } from "$lib/firebase"
  import { user } from "$stores/user"

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
      <ul>
        <li><a href="/tasks">Tasks</a></li>
      </ul>
    </nav>
    <nav>
      <ul>
        <li><a href="/logout" on:click|preventDefault={logout}>Sign Out</a></li>
      </ul>
    </nav>
  </header>
  <main>
    <slot />
  </main>
{:else}
  <section class="loading">
    <h1>Loading...</h1>
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
  column-gap: 3rem;
  box-shadow: 0 2px 16px 4px rgba(0, 0, 0, 0.5);

  h1 {
    font: $brand-font;
    color: $brand-color;
    font-size: 2.5rem;
  }

  nav {
    ul {
      list-style-type: none;
      padding: 0;
      font: $nav-font;
      display: flex;
      align-items: center;

      a {
        color: $background-color;
        text-underline-offset: 0.4em;
      }
    }

    &:first-of-type {
      flex-grow: 1;
    }

    &:last-of-type {
      ul {
        font-size: 1.2rem;
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
</style>
