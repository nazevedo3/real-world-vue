<template>
  <div>
    <h1>Editing "{{ blogPost.title }}"</h1>
    <PostForm
      :savePost="updatePost"
      :editablePost="editablePost"
      :cancel="cancel"
      submitText="Update Post"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostForm from "@/components/PostForm.vue";

export default {
  components: {
    PostForm,
  },
  props: ["id"],
  computed: {
    ...mapGetters(["findPost"]),
    blogPost() {
      return this.findPost(this.id) || {};
    },
    editablePost() {
      return { ...this.blogPost };
    },
  },
  methods: {
    async updatePost() {
      let updatedPost = await this.$store.dispatch(
        "updatePost",
        this.editablePost
      );
      this.$router.push(`/blog/${updatedPost.id}`);
    },
    cancel() {
      this.$router.push(`/blog/${this.blogPost.id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-field {
  display: flex;
  justify-content: center;
  align-items: center;

  textarea {
    width: 300px;
    margin: 10px;
  }
}
</style>
