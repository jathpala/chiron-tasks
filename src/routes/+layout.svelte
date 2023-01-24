<!--
Layout: Root

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
  import "$styles/main.scss"
</script>

<svelte:head>
  <title>Chiron Tasks</title>
</svelte:head>

<div>
  <slot />
</div>

<style lang="scss">
@use "$styles/variables" as *;

div {
  min-width: 360px;
}
</style>
