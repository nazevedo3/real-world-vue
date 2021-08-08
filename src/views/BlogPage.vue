<template>
  <div>
    <h1>{{ blogPost.title }}</h1>
    <p>{{ blogPost.text }}</p>
    <router-link :to="`/blog/${blogPost.id}/edit`" tag="button">
      Edit
    </router-link>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: ["id"],
  computed: {
    ...mapGetters(["findPost"]),
    blogPost() {
      return this.findPost(this.id) || {};
    },
  },
};
</script>
