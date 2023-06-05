<template>
  <footer class="footer">
    <router-link to="/">
      <img src="../../images/icon.png" alt="coach finder icon" class="logo" />
    </router-link>
    <nav>
      <ul class="router-nav">
        <li>
          <router-link class="router-nav-link" to="/coaches"
            >View Coaches</router-link
          >
        </li>
        <li>
          <router-link class="router-nav-link" to="/requests"
            >View Requests
          </router-link>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<style scoped>
.router-nav {
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3.6rem;
}

.logo {
  height: 20rem;
}
</style>
