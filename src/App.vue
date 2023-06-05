<template>
  <div class="main-app">
    <the-header></the-header>
    <main class="content">
      <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
      <error-view :show="!!error" @close="handleError">
        <p>{{ error }}</p>
      </error-view>
    </main>
    <the-footer></the-footer>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import TheHeader from './components/ui/TheHeader.vue';
import TheFooter from './components/ui/TheFooter.vue';
import ErrorView from './components/ui/ErrorView.vue';

export default {
  components: {
    TheHeader,
    TheFooter,
    ErrorView,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    store.dispatch('tryLogin');

    const didAutoLogout = computed(function () {
      return store.state.auth.didAutoLogout;
    });
    watch(didAutoLogout, function (curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        router.replace('/coaches');
      }
    });
    const error = computed(() => store.getters.getError);
    function handleError() {
      store.dispatch('handleError');
    }
    return { error, handleError };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 10px;
}

body {
  font-family: 'Roboto Slab', sans-serif;
  line-height: 1;
  font-weight: 400;
  font-size: 1.25rem;
  color: #555;
  display: flex;
  flex-direction: column;
}

input,
textarea {
  color: #333;
  border: 2px solid #570080;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #eee6f2;
}

.main-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}

/* Reuseable components */
.container {
  max-width: 120rem;
  margin: 0 auto;
  padding: 0 3.2rem;
}

.grid {
  display: grid;
}

.grid--2-cols {
  grid-template-columns: repeat (2, 1fr);
}

.grid--3-cols {
  grid-template-columns: repeat (2, 1fr);
}

.flex-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 9.6rem;
  overflow: hidden;
  background-color: #ab80c0;
  padding: 0 2rem;
  margin-bottom: 1.2rem;
  border-bottom: 0.2rem solid #570080;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 9.6rem;
  overflow: hidden;
  background-color: #ab80c0;
  border-top: 0.2rem solid #570080;
  padding: 0 2rem;
  margin-top: 1.2rem;
  bottom: 0;
  width: 100%;
  flex-shrink: 0;
}

.heading-primary {
  text-align: center;
  font-size: 30px;
  letter-spacing: 4px;
  width: 100%;
  padding-bottom: 1.2rem;
  margin-bottom: 2.4rem;
  border-bottom: 4px dashed #9a66b3;
}

.heading-secondary {
  font-size: 2.44rem;
  font-weight: 700;
  letter-spacing: 0.08rem;
  margin-bottom: 2.4rem;
  color: #555;
}
.heading-tertiary {
  font-size: 1.95rem;
}

.tag {
  display: inline-block;
  padding: 0.4rem 0.8rem;
  font-size: 1.25rem;
  text-transform: uppercase;
  color: #333;
  border-radius: 100px;
  font-weight: 600;
  border: 1px solid #333;
  margin-right: 1.2rem;

  text-align: center;
}

.tag-teacher {
  background-color: #eee6f2;
}
.tag-frontend {
  background-color: #cdb3d9;
}
.tag-backend {
  background-color: #bc99cc;
}

.margin-bottom-sm {
  margin-bottom: 0.8rem;
}

.margin-top-sm {
  margin-bottom: 0.8rem;
}

.box-shadow {
  box-shadow: 0 1.2rem 2.4rem rgba(0, 0, 0, 0.1);
}

.btn-eye {
  width: 3.4rem;
  height: 3.4rem;
  font-weight: 600;
  border-radius: 0.8rem;
  text-align: center;
  background-color: #fff;
  padding: 0.1rem;
  color: #333;
}

.btn-eye:hover,
.btn-login-form-close:hover,
.btn-eye:active,
.btn-login-form-close:active {
  background-color: #ddcce6;
  transition: ease-in;
  transition-duration: 300ms;
}

.btn-submit {
  margin-top: 1.2rem;
}

.router-nav-link,
.router-nav-link:link,
.router-nav-link:visited {
  display: block;
  text-decoration: none;
  margin-bottom: 10px;
  font-size: 1.56rem;
  font-weight: 600;
  background-color: #570080;
  color: white;
  border-radius: 0.8rem;
  padding: 0.8rem 1.6rem;
  width: 15rem;
  text-align: center;
  cursor: pointer;
}

.router-nav-link:hover,
.router-nav-link:active {
  background-color: #220031;
  transition: ease-in;
  transition-duration: 300ms;
}

.input-error {
  margin-top: 0.3rem;
  color: red;
  font-weight: 500;
  margin-bottom: 1.2rem;
  display: inline-block;
}

/* Transitions */
.route-enter-from {
  opacity: 0;
  transform: translateX(100rem);
}
.route-enter-active {
  transition: all 0.3s ease-in;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateX(0rem);
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100rem);
}

.header-btn {
  margin-top: 0.8rem;
}
</style>
