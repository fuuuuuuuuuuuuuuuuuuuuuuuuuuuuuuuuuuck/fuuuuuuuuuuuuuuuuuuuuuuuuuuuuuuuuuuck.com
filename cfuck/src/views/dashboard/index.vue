<template>
    <div class="dashboard-container">
        <component v-bind:is="currentRole"> </component>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
      name: 'dashboard',
      data() {
        return {
          currentRole: 'EditorDashboard'
        }
      },
    }
</script>
