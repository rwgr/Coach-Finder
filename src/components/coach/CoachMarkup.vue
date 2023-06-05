<template>
  <div class="flex-column">
    <ul
      v-for="{ firstName, lastName, rate, areas, id } in coaches"
      :key="id"
      class="list-item box-shadow"
    >
      <div class="list-item-name">{{ firstName }} {{ lastName }}</div>
      <div class="list-item-text-rate">Rate: ${{ rate }}/hour</div>
      <div class="list-item-text-areas">
        Areas of Expertise:&nbsp;
        <span
          class="tag"
          :class="[
            areas[0] === 'Teacher'
              ? 'tag-teacher'
              : areas[0] === 'Frontend'
              ? 'tag-frontend'
              : areas[0] === 'Backend'
              ? 'tag-backend'
              : null,
          ]"
          >{{ areas[0] }}</span
        >
        <span
          class="tag"
          :class="[
            areas[1] === 'Teacher'
              ? 'tag-teacher'
              : areas[1] === 'Frontend'
              ? 'tag-frontend'
              : areas[1] === 'Backend'
              ? 'tag-backend'
              : null,
          ]"
          v-if="areas.length > 1"
          >{{ areas[1] }}</span
        >
        <span
          class="tag"
          :class="[
            areas[2] === 'Teacher'
              ? 'tag-teacher'
              : areas[2] === 'Frontend'
              ? 'tag-frontend'
              : areas[2] === 'Backend'
              ? 'tag-backend'
              : null,
          ]"
          v-if="areas.length > 2"
          >{{ areas[2] }}</span
        >
      </div>
      <img
        :src="`../../images/${firstName}.jpg`"
        alt="Image of coach"
        class="img-coach2"
      />
      <nav class="btn-view-details">
        <router-link class="router-nav-link" :to="'/coaches/' + id"
          >View Details</router-link
        >
      </nav>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['coaches'],
};
</script>

<style scoped>
.list-item {
  font-size: 1.56rem;
  line-height: 1.2;
  border: 2px solid #570080;
  padding: 0 2.4rem;
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
  max-width: 80rem;
  margin-bottom: 2.4rem;
  width: 100%;
  align-items: center;
  justify-items: space-between;
  border-radius: 0.8rem;
}
.list-item-name {
  font-size: 2.44rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  grid-column: 1/3;
}

.list-item-text-areas {
  grid-column: 2 / 4;
  grid-row: 2;
  font-size: 1.56rem;
  font-weight: 600;
  margin-left: 1.2rem;
}

.list-item-text-rate {
  grid-column: 3;
  font-size: 1.56rem;
  font-weight: 600;
  margin-right: 0.2rem;
}

.img-coach2 {
  width: 12rem;
  height: 12rem;
  grid-row: span 2;
  grid-column: 4;
  justify-self: end;
  padding: 0;
  border-radius: 0.8rem;
}

.btn-view-details {
  margin-top: 0.8rem;
  grid-row: 2;
}
</style>
